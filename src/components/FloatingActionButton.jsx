import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export function FloatingActionButton({ onClick }) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] rounded-full flex items-center justify-center apple-shadow hover:opacity-90 transition-opacity z-40"
      aria-label="Add new link"
    >
      <Plus size={24} strokeWidth={2.5} />
    </motion.button>
  );
}
