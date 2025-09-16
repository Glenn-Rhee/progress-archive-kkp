"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import DataLinkValidation from "@/validation/dataLink-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePopover } from "@/store/popover-store";
import { BeatLoader } from "react-spinners";
import { DataLink } from "@/types";
import { useEffect } from "react";

interface FormDataLinkProps {
  handleSubmit: (
    values: z.infer<typeof DataLinkValidation.DATALINK>
  ) => Promise<void>;
  isForEdit?: boolean;
  loading: boolean;
  data?: DataLink;
}

export default function FormDataLink(props: FormDataLinkProps) {
  const { handleSubmit, isForEdit, loading, data } = props;
  const { setOpenId, openId } = usePopover();

  const form = useForm<z.infer<typeof DataLinkValidation.DATALINK>>({
    resolver: zodResolver(DataLinkValidation.DATALINK),
    mode: "onChange",
    defaultValues: {
      description: data?.description,
      title: data?.title,
      url: data?.url,
    },
  });

  useEffect(() => {
    if (!openId) {
      form.reset();
    }
  }, [openId, form]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(handleSubmit)();
      }}
      className="space-y-4 md:space-y-6 mt-4 pb-4"
    >
      <div className="space-y-2">
        <label
          htmlFor={isForEdit ? "editTitle" : "title"}
          className="block text-sm font-semibold text-slate-300"
        >
          Judul Link
        </label>
        <input
          {...form.register("title")}
          type="text"
          id={isForEdit ? "editTitle" : "title"}
          className="w-full bg-slate-700/50 border border-slate-600/30 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-primary-500/50 focus:bg-slate-700/70 transition-all duration-300"
          placeholder="Masukkan judul link"
        />
        {form.formState.errors.title && (
          <p className="text-red-700 text-sm font-semibold mt-1 ml-1">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor={isForEdit ? "editUrl" : "url"}
          className="block text-sm font-semibold text-slate-300"
        >
          URL
        </label>
        <input
          {...form.register("url")}
          type="text"
          id={isForEdit ? "editUrl" : "url"}
          className="w-full bg-slate-700/50 border border-slate-600/30 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-primary-500/50 focus:bg-slate-700/70 transition-all duration-300"
          placeholder="https://example.com"
        />
        {form.formState.errors.url && (
          <p className="text-red-700 text-sm font-semibold mt-1 ml-1">
            {form.formState.errors.url.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor={isForEdit ? "editDescription" : "description"}
          className="block text-sm font-semibold text-slate-300"
        >
          Deskripsi
        </label>
        <input
          {...form.register("description")}
          type="text"
          id={isForEdit ? "editDescription" : "description"}
          className="w-full bg-slate-700/50 border border-slate-600/30 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-primary-500/50 focus:bg-slate-700/70 transition-all duration-300"
          placeholder="Deskripsi opsional"
        />
        {form.formState.errors.description && (
          <p className="text-red-700 text-sm font-semibold mt-1 ml-1">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          onClick={(e) => {
            e.stopPropagation();
            form.handleSubmit(handleSubmit)();
          }}
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 px-6 py-3 rounded-xl font-medium cursor-pointer text-white transition-all duration-300 transform hover:scale-105"
        >
          {loading ? (
            <BeatLoader />
          ) : (
            <>
              <i className="ri-save-line text-xl"></i> <span>simpan</span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpenId(null);
            form.reset();
          }}
          className="px-6 py-3 cursor-pointer bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/30 rounded-xl font-medium text-slate-300 hover:text-white transition-all duration-300"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
