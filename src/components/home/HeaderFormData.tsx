"use client";
import { usePopover } from "@/store/popover-store";

export default function HeaderFormData({ title }: { title: string }) {
  const { setOpenId } = usePopover();

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-between border-b py-3 border-slate-700/50"
    >
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <button
        type="button"
        onClick={() => setOpenId(null)}
        className="w-10 h-10 cursor-pointer text-xl bg-slate-700/50 hover:bg-slate-600/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
      >
        <i className="ri-close-line"></i>
      </button>
    </div>
  );
}
