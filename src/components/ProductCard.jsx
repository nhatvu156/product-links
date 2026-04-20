import { ExternalLink, Copy, Trash2, CheckCircle2 } from 'lucide-react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export function ProductCard({ product, onDelete }) {
  const [copied, setCopied] = useState(false);
  const controls = useAnimation();
  const x = useMotionValue(0);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(product.url);
    setCopied(true);
    toast.success('Đã sao chép liên kết!');
    setTimeout(() => setCopied(false), 2000);
  };

  const currentUrl = product.url.startsWith('http') ? product.url : `https://${product.url}`;

  // Reset position handle
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -70) {
      // Swiped far enough to lock or trigger something, but let's just snap to -80
      controls.start({ x: -80 });
    } else {
      // Snap back
      controls.start({ x: 0 });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }} // Apple ease
      className="relative mb-4 w-full touch-pan-y"
    >
      {/* Background Actions (Revealed on Swipe) */}
      <div className="absolute inset-0 flex items-center justify-end rounded-[20px] bg-red-500/10 dark:bg-red-500/20 pr-5">
        <button
          onClick={() => onDelete(product.id, product.title)}
          className="text-red-500 hover:text-red-600 transition-colors p-2"
          aria-label="Delete"
        >
          <Trash2 size={22} />
        </button>
      </div>

      {/* Foreground Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -80, right: 0 }}
        dragElastic={0.1}
        style={{ x }}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="relative bg-white dark:bg-[#1d1d1f] rounded-[20px] p-6 flex flex-col gap-4 border border-black/[0.03] dark:border-white/[0.05] apple-shadow z-10"
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            {product.image && (
              <div className="mb-4 rounded-xl overflow-hidden aspect-video bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.05]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
            <h3 className="text-[17px] font-semibold text-[#1d1d1f] dark:text-white leading-snug">
              {product.title}
            </h3>
            {product.description && (
              <p className="text-[15px] text-[#86868b] dark:text-[#a1a1a6] mt-1.5 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Tags area */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-black/[0.04] dark:bg-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-md text-xs font-medium tracking-wide"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f] text-sm font-semibold hover:opacity-90 transition-opacity active:scale-95"
          >
            <span>Mở Link</span>
            <ExternalLink size={16} />
          </a>
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7] text-sm font-medium hover:bg-black/[0.08] dark:hover:bg-white/[0.12] transition-colors active:scale-95"
            aria-label="Copy link"
          >
            {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
            <span className="hidden sm:inline">Sao chép</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
