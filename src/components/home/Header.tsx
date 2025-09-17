import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 mb-8 shadow-2xl animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div></div>
        <Link
          href="/auth/login"
          className="group relative overflow-hidden cursor-pointer bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-500 hover:to-primary-400 px-4 py-2 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25"
        >
          LOGIN
        </Link>
      </div>

      {/* Main content centered */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center text-3xl w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl mb-4 animate-glow">
          <i className="ri-link"></i>
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent mb-2">
          ARSIP PROGRESS
        </h1>
        <p className="text-xl text-slate-300 font-light">
          MONITORING DAN EVALUASI TU SDMAO DJPT TAHUN 2025
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-4 rounded-full"></div>
      </div>
    </div>
  );
}
