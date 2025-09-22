import Image from "next/image";
import Link from "next/link";

export default function Header({ token }: { token: string | undefined }) {
  return (
    <div className="bg-slate-800/50 relative backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 mb-8 shadow-2xl animate-fade-in">
      <div className="flex justify-end p-2 w-fit absolute top-4 right-4 rounded-full hover:scale-105 transition-transform duration-100">
        {token ? (
          <button className="group relative overflow-hidden cursor-pointer bg-gradient-to-r from-red-500 to-red-700 hover:from-red-500 hover:to-red-400 px-4 py-2 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25">
            Logout
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="group relative overflow-hidden cursor-pointer bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-500 hover:to-primary-400 px-4 py-2 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25"
          >
            LOGIN
          </Link>
        )}
      </div>

      {/* Main content centered */}
      <div className="text-center">
        <div className="flex-col relative items-center justify-center mt-1 hover:scale-105 w-fit right-1/2 left-1/2 -translate-x-1/2">
          <Image
            src="/dirjen.png"
            alt="djpt logo"
            width={140}
            height={140}
            className="mb-4 flex justify-center p-2"
          />
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
