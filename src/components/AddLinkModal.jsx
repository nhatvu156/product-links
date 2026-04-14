import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AVAILABLE_CATEGORIES } from '../data/mockData';

export function AddLinkModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Tech');
  const [tagsInput, setTagsInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      toast.error('Vui lòng nhập Tên và URL.');
      return;
    }
    
    // Process tags
    const tagsArray = tagsInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t);

    onAdd({
      id: Date.now().toString(),
      title,
      url,
      description,
      category,
      tags: tagsArray,
      createdAt: new Date().toISOString(),
    });
    
    toast.success('Đã thêm liên kết thành công!');
    setTitle('');
    setUrl('');
    setDescription('');
    setCategory('Công nghệ');
    setTagsInput('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#1d1d1f]/40 dark:bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ ease: [0.25, 0.1, 0.25, 1.0] }}
              className="bg-white dark:bg-[#1d1d1f] rounded-[24px] w-full max-w-md apple-shadow overflow-hidden pointer-events-auto border border-black/[0.03] dark:border-white/[0.05]"
            >
              <div className="flex items-center justify-between p-6 border-b border-black/[0.05] dark:border-white/[0.05]">
                <h2 className="text-xl font-semibold text-[#1d1d1f] dark:text-white tracking-tight">Thêm Liên Kết Mới</h2>
                <button
                  onClick={onClose}
                  className="p-2 bg-black/[0.04] dark:bg-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] rounded-full transition-colors active:scale-95"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
                <div>
                  <label className="block text-[13px] font-medium text-[#86868b] dark:text-[#a1a1a6] mb-1.5 uppercase tracking-wider">
                    Tên Sản Phẩm *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.05] rounded-xl focus:bg-white dark:focus:bg-[#1d1d1f] focus:outline-none focus:border-[#1d1d1f] dark:focus:border-white transition-all text-[15px] font-medium text-[#1d1d1f] dark:text-white"
                    placeholder="VD: Bàn phím Magic Keyboard"
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] font-medium text-[#86868b] dark:text-[#a1a1a6] mb-1.5 uppercase tracking-wider">
                    Đường Dẫn (URL) *
                  </label>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.05] rounded-xl focus:bg-white dark:focus:bg-[#1d1d1f] focus:outline-none focus:border-[#1d1d1f] dark:focus:border-white transition-all text-[15px] text-[#1d1d1f] dark:text-white"
                    placeholder="https://..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#86868b] dark:text-[#a1a1a6] mb-1.5 uppercase tracking-wider">
                      Danh Mục
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.05] rounded-xl focus:bg-white dark:focus:bg-[#1d1d1f] focus:outline-none focus:border-[#1d1d1f] dark:focus:border-white transition-all text-[15px] text-[#1d1d1f] dark:text-white appearance-none"
                    >
                      {AVAILABLE_CATEGORIES.filter(c => c !== "Tất cả").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#86868b] dark:text-[#a1a1a6] mb-1.5 uppercase tracking-wider">
                      Thẻ (Tags)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full px-4 py-3 bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.05] rounded-xl focus:bg-white dark:focus:bg-[#1d1d1f] focus:outline-none focus:border-[#1d1d1f] dark:focus:border-white transition-all text-[15px] text-[#1d1d1f] dark:text-white"
                      placeholder="thiết kế, tech"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#86868b] dark:text-[#a1a1a6] mb-1.5 uppercase tracking-wider">
                    Ghi Chú
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.05] rounded-xl focus:bg-white dark:focus:bg-[#1d1d1f] focus:outline-none focus:border-[#1d1d1f] dark:focus:border-white transition-all resize-none text-[15px] text-[#1d1d1f] dark:text-white"
                    placeholder="Tại sao bạn khuyên dùng món này?"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f] font-semibold py-3.5 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
                  >
                    <Plus size={20} />
                    <span>Lưu Liên Kết</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
