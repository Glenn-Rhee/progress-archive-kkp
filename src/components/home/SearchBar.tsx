export default function SearchBar() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center justify-center mb-8 animate-slide-up">
      <div className="relative flex-1 w-full lg:max-w-2xl">
        <div className="w-full bg-slate-800/50 backdrop-blur-sm px-6 py-4 gap-x-4 border border-slate-600/30 rounded-2xl items-center flex">
          <button>
            <i className="text-slate-400 ri-search-line"></i>
          </button>
          <input
            type="search"
            placeholder="Cari link berdasarkan judul, deskripsi, atau URL..."
            className="w-full text-white placeholder-slate-400 focus:outline-none transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex gap-3 shrink-0">
        <button className="group relative overflow-hidden cursor-pointer bg-gradient-to-r from-primary-500 to-primary-800 hover:from-primary-500 hover:to-primary-400 px-6 py-4 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <div className="relative flex items-center gap-2">
            <i className="ri-add-line"></i>
            <span className="hidden sm:inline">Tambah Link Baru</span>
            <span className="sm:hidden">Tambah</span>
          </div>
        </button>
      </div>
    </div>
  );
}
