import { useState, useMemo, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Inbox } from 'lucide-react';

import { useLocalStorage } from './hooks/useLocalStorage';
import { initialProducts, AVAILABLE_CATEGORIES } from './data/mockData';

import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { AddLinkModal } from './components/AddLinkModal';
import { FloatingActionButton } from './components/FloatingActionButton';

// THAY THẾ LINK NÀY BẰNG WEB APP URL CỦA BẠN SAU KHI DEPLOY GOOGLE APPS SCRIPT
const API_URL = "https://script.google.com/macros/s/AKfycbwvLLdN8DAyi0eiZ57yNnN5RnbMIpLtUe6zh9uSD7blo0O76px5SmYZan4HV-agojzRGQ/exec";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'az'
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useLocalStorage('dark_mode', false);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark(!isDark);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Gọi API GAS (mặc định trình duyệt sẽ follow redirect)
      const response = await fetch(API_URL);
      const data = await response.json();

      // Chuyển đổi dữ liệu từ Google Sheet sang format của App
      const formattedData = data.map(item => ({
        id: item.id || Math.random().toString(),
        title: item.name || item.title,
        url: item.link || item.url,
        description: item.description || '',
        image: item.image || '',
        category: item.category || 'Khác',
        tags: item.tags ? item.tags.split('|').map(t => t.trim()) : [],
        createdAt: item.createdAt || new Date().toISOString()
      }));

      setProducts(formattedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      // Nếu API lỗi thì dùng initial thay thế để web ko trắng xóa
      setProducts(initialProducts);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      setProducts((prev) => [newProduct, ...prev]);

      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors', // Cần thiết khi gọi GAS từ domain khác
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          data: {
            name: newProduct.title,
            link: newProduct.url,
            image: newProduct.image || '',
            category: newProduct.category,
            tags: newProduct.tags.join('|')
          }
        })
      });
      // Vì no-cors không trả về body, chúng ta coi như thành công hoặc fetch lại sau 1s
      setTimeout(fetchProducts, 1000);
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
    }
  };

  const handleDeleteProduct = async (id, title) => {
    try {
      setProducts((prev) => prev.filter(p => p.id !== id));

      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          name: title
        })
      });
      setTimeout(fetchProducts, 1000);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    // Filter by search and category
    let result = products.filter(
      (product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesSearch;
      }
    );

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'az') {
        return a.title.localeCompare(b.title);
      } else {
        // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [products, searchQuery, sortBy, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-black font-sans transition-colors duration-300">
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'dark:bg-[#1d1d1f] dark:text-white dark:border dark:border-white/10',
          style: {
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500',
            padding: '12px 20px',
          },
        }}
      />

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDark={isDark}
        toggleDark={toggleDark}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-32">


        {/* Product List */}
        <motion.div layout className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-8 h-8 border-4 border-[#1d1d1f]/10 dark:border-white/10 border-t-[#1d1d1f] dark:border-t-white rounded-full animate-spin"></div>
                <p className="text-[#86868b] dark:text-[#a1a1a6] text-sm font-medium">Đang tải dữ liệu...</p>
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDeleteProduct}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-black/[0.03] dark:bg-white/[0.03] rounded-full flex items-center justify-center mx-auto mb-6 text-[#86868b] dark:text-[#a1a1a6]">
                  <Inbox size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white mb-2">Không có mục nào</h3>
                <p className="text-[#86868b] dark:text-[#a1a1a6]">Thử tìm kiếm hoặc chọn danh mục khác.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <FloatingActionButton onClick={() => setIsModalOpen(true)} />

      <AddLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
}

export default App;
