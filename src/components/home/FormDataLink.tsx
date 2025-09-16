"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import DataLinkValidation from "@/validation/dataLink-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePopover } from "@/store/popover-store";

export default function FormDataLink() {
  const { setOpenId } = usePopover();

  const form = useForm<z.infer<typeof DataLinkValidation.DATALINK>>({
    resolver: zodResolver(DataLinkValidation.DATALINK),
    mode: "onChange",
    defaultValues: {
      description: "",
      title: "",
      url: "",
    },
  });
  async function handleSubmit(
    values: z.infer<typeof DataLinkValidation.DATALINK>
  ) {
    console.log(values);
  }
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
          htmlFor="title"
          className="block text-sm font-semibold text-slate-300"
        >
          Judul Link
        </label>
        <input
          {...form.register("title")}
          type="text"
          id="title"
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
          htmlFor="url"
          className="block text-sm font-semibold text-slate-300"
        >
          URL
        </label>
        <input
          {...form.register("url")}
          type="text"
          id="url"
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
          htmlFor="description"
          className="block text-sm font-semibold text-slate-300"
        >
          URL
        </label>
        <input
          {...form.register("url")}
          type="text"
          id="description"
          className="w-full bg-slate-700/50 border border-slate-600/30 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-primary-500/50 focus:bg-slate-700/70 transition-all duration-300"
          placeholder="Deskripsi opsional"
        />
        {form.formState.errors.url && (
          <p className="text-red-700 text-sm font-semibold mt-1 ml-1">
            {form.formState.errors.url.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 px-6 py-3 rounded-xl font-medium cursor-pointer text-white transition-all duration-300 transform hover:scale-105"
        >
          <i className="ri-save-line text-xl"></i> Simpan
        </button>
        <button
          type="button"
          onClick={() => setOpenId(null)}
          className="px-6 py-3 cursor-pointer bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/30 rounded-xl font-medium text-slate-300 hover:text-white transition-all duration-300"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
