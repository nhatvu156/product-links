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

function App() {
  const [products, setProducts] = useLocalStorage('product_links', initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'az'
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter(p => p.id !== id));
  };

  const filteredAndSortedProducts = useMemo(() => {
    // Filter by search and category
    let result = products.filter(
      (product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
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
        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          {AVAILABLE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1d1d1f] text-white dark:bg-white dark:text-black'
                  : 'bg-black/[0.04] text-[#86868b] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:text-[#a1a1a6] dark:hover:bg-white/[0.12]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-[13px] font-semibold text-[#86868b] dark:text-[#a1a1a6] uppercase tracking-wider">
            {filteredAndSortedProducts.length} Mục
          </div>
          <div className="flex items-center gap-3">
            <Filter size={14} className="text-[#86868b] dark:text-[#a1a1a6]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[13px] font-semibold text-[#1d1d1f] dark:text-white cursor-pointer focus:outline-none uppercase tracking-wider"
            >
              <option value="newest">Mới nhất</option>
              <option value="az">Tên A-Z</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <motion.div layout className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProducts.length > 0 ? (
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
