import { Search, Moon, Sun } from 'lucide-react';

export function Header({ searchQuery, setSearchQuery, isDark, toggleDark }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-header pt-10 pb-5 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDark}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-3xl bg-[#1d1d1f] dark:bg-white flex items-center justify-center apple-shadow">
            <span className="text-white dark:text-[#1d1d1f] font-semibold text-xl">LH</span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] dark:text-white transition-colors duration-300">
              Product Link
            </h1>
          </div>
        </div>

        <div className="relative max-w-xl mx-auto w-full group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1d1d1f] dark:group-focus-within:text-white transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3.5 bg-white/80 dark:bg-[#1d1d1f]/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-2xl text-[#1d1d1f] dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1d1d1f]/10 dark:focus:ring-white/10 apple-shadow transition-all duration-300 text-[15px]"
            placeholder="Tìm kiếm link sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
