"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePopover } from "@/store/popover-store";
import { BeatLoader } from "react-spinners";
import { useEffect } from "react";

// Validation schema
const UserProfileValidation = z.object({
  title: z.string().min(1, "Title wajib diisi"),
  descriptionUser: z
    .string()
    .max(500, "Deskripsi maksimal 500 karakter")
    .optional(),
});

interface UserData {
  title: string;
  descriptionUser?: string;
}

interface FormUserProfileProps {
  handleSubmit: (
    values: z.infer<typeof UserProfileValidation>
  ) => Promise<void>;
  isForEdit?: boolean;
  loading: boolean;
  data?: UserData;
}

export default function EditForm(props: FormUserProfileProps) {
  const { handleSubmit, isForEdit, loading, data } = props;
  const { setOpenId, openId, autoFocus } = usePopover();

  const form = useForm<z.infer<typeof UserProfileValidation>>({
    resolver: zodResolver(UserProfileValidation),
    mode: "onChange",
    defaultValues: {
      title: data?.title || "",
      descriptionUser: data?.descriptionUser || "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        descriptionUser: data.descriptionUser,
      });
    }
  }, [data, form]);

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
          Title
        </label>
        <input
          autoFocus={autoFocus}
          {...form.register("title")}
          type="text"
          id={isForEdit ? "editTitle" : "title"}
          className="w-full bg-slate-700/50 border border-slate-600/30 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-primary-500/50 focus:bg-slate-700/70 transition-all duration-300"
          placeholder="Masukkan title/jabatan Anda"
        />
        {form.formState.errors.title && (
          <p className="text-red-700 text-sm font-semibold mt-1 ml-1">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor={isForEdit ? "editDescriptionUser" : "descriptionUser"}
          className="block text-sm font-semibold text-slate-300"
        >
          Description
        </label>
        <textarea
          {...form.register("descriptionUser")}
          id={isForEdit ? "editDescriptionUser" : "descriptionUser"}
          className="w-full bg-slate-700/50 border border-slate-600/30 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-primary-500/50 focus:bg-slate-700/70 transition-all duration-300 resize-none"
          placeholder="Ceritakan sedikit tentang diri Anda..."
          rows={4}
        />
        <p className="text-xs text-slate-400">
          {form.watch("descriptionUser")?.length || 0}/500 karakter
        </p>
        {form.formState.errors.descriptionUser && (
          <p className="text-red-700 text-sm font-semibold mt-1 ml-1">
            {form.formState.errors.descriptionUser.message}
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
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-500 hover:to-orange-400 px-6 py-3 rounded-xl font-medium cursor-pointer text-white transition-all duration-300 transform hover:scale-105"
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
