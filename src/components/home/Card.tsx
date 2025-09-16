"use client";
import Link from "next/link";
import Popover from "../Popover";
import HeaderFormData from "./HeaderFormData";
import FormDataLink from "./FormDataLink";
import z from "zod";
import DataLinkValidation from "@/validation/dataLink-validation";

export default function Card() {
  async function handleSubmit(
    values: z.infer<typeof DataLinkValidation.DATALINK>
  ) {
    console.log("Edit: ", values);
  }
  return (
    <div className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-primary-500/30 hover:bg-slate-800/60 transition-all duration-300 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
            cihuy
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
            cihuy desc
          </p>
        </div>
        <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Popover
            triggerElement={
              <div className="w-10 cursor-pointer h-10 bg-primary-500/20 hover:bg-primary-500/30 rounded-xl flex items-center justify-center text-primary-400 hover:text-primary-300 transition-all duration-200">
                <i className="ri-pencil-line"></i>
              </div>
            }
          >
            <HeaderFormData />
            <FormDataLink handleSubmit={handleSubmit} />
          </Popover>
          <Popover
            triggerElement={
              <div className="w-10 cursor-pointer h-10 hover:bg-red-500/30 rounded-xl flex items-center justify-center text-primary-400 hover:text-primary-300 transition-all duration-200 bg-red-500/20">
                <i className="ri-delete-bin-line"></i>
              </div>
            }
          >
            cihuy
          </Popover>
        </div>
      </div>
      <div className="bg-slate-900/50 border border-slate-600/20 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <Link
              target="_blank"
              href={"https://instagram.com/aaarrl.r"}
              className="text-primary-400 hover:text-primary-300 font-medium text-sm break-all transition-colors duration-200"
            >
              https://instagram.com/aaarrl.r
            </Link>
          </div>
          <button className="cursor-pointer w-8 h-8 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200">
            <i className="ri-file-copy-line"></i>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center">
          <span className="flex items-center gap-1">
            <i className="ri-calendar-line"></i>
            19/09/2005
          </span>
        </div>
      </div>
    </div>
  );
}
