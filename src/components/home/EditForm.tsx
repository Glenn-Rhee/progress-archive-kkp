"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePopover } from "@/store/popover-store";
import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";
import UserValidation from "@/validation/user-validation";
import ResponseError from "@/error/ResponseError";
import toast from "react-hot-toast";
import { DataPutUser, ResponsePayload } from "@/types";
import { useDataLink } from "@/store/dataLink-store";

interface FormUserProfileProps {
  data: DataPutUser | null;
}

export default function EditForm(props: FormUserProfileProps) {
  const { data } = props;
  const { setIsChange } = useDataLink();
  const [loading, setLoading] = useState<boolean>(false);
  const { setOpenId, openId, autoFocus } = usePopover();

  const form = useForm<z.infer<typeof UserValidation.PUTUSER>>({
    resolver: zodResolver(UserValidation.PUTUSER),
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

  async function handleEdit(values: z.infer<typeof UserValidation.PUTUSER>) {
    setLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const dataRresponse = (await response.json()) as ResponsePayload;
      if (dataRresponse.status === "failed") {
        throw new ResponseError(
          dataRresponse.statusCode,
          dataRresponse.message
        );
      }

      toast.success(dataRresponse.message);
      setIsChange(true);
      setOpenId(null);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
        return;
      }

      toast.error("Terjadi kesalahan yang tidak terduga.");
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(handleEdit)();
      }}
      className="space-y-4 md:space-y-6 mt-4 pb-4"
    >
      <div className="space-y-2">
        <label
          htmlFor={"title"}
          className="block text-sm font-semibold text-slate-300"
        >
          Title
        </label>
        <input
          autoFocus={autoFocus}
          {...form.register("title")}
          type="text"
          id={"title"}
          className="w-full bg-slate-700/50 border border-slate-600/30 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-primary-500/50 focus:bg-slate-700/70 transition-all duration-300"
          placeholder="Masukkan title"
        />
        {form.formState.errors.title && (
          <p className="text-red-700 text-sm font-semibold mt-1 ml-1">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor={"descriptionUser"}
          className="block text-sm font-semibold text-slate-300"
        >
          Description
        </label>
        <textarea
          {...form.register("descriptionUser")}
          id={"descriptionUser"}
          className="w-full bg-slate-700/50 border border-slate-600/30 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-primary-500/50 focus:bg-slate-700/70 transition-all duration-300 resize-none"
          placeholder="Description..."
          rows={4}
        />
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
            form.handleSubmit(handleEdit)();
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
