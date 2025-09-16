"use client";
import { usePopover } from "@/store/popover-store";
import dynamic from "next/dynamic";
import FormDataLink from "./FormDataLink";

const Popover = dynamic(() => import("../Popover"), {
  ssr: false,
});

export default function SearchBar() {
  const { setOpenId } = usePopover();

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
        <Popover
          triggerElement={
            <div className="group relative overflow-hidden cursor-pointer bg-gradient-to-r from-primary-500 to-primary-800 hover:from-primary-500 hover:to-primary-400 px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center gap-2">
                <i className="ri-add-line text-2xl"></i>
                <span className="hidden sm:inline">
                  Tambah <span className="hidden md:inline">Link Baru</span>
                </span>
              </div>
            </div>
          }
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between border-b py-3 border-slate-700/50"
          >
            <h3 className="text-xl font-bold text-white">Tambah Link baru</h3>
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="w-10 h-10 cursor-pointer text-xl bg-slate-700/50 hover:bg-slate-600/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
          <FormDataLink />
        </Popover>
      </div>
    </div>
  );
}
