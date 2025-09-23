"use client";
import Link from "next/link";
import Popover from "../Popover";
import HeaderFormData from "./HeaderFormData";
import FormDataLink from "./FormDataLink";
import z from "zod";
import DataLinkValidation from "@/validation/dataLink-validation";
import { usePopover } from "@/store/popover-store";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { DataLink, ResponsePayload } from "@/types";
import { getFormattDate } from "@/helper/getFormattDate";
import ResponseError from "@/error/ResponseError";
import { useRouter } from "next/navigation";
import { useDataLink } from "@/store/dataLink-store";
import clsx from "clsx";

interface CardProps {
  data: DataLink;
  token: string | undefined;
}

export default function Card(props: CardProps) {
  const { data, token } = props;
  const { setOpenId } = usePopover();
  const { setIsChange } = useDataLink();
  const [loading, setLoading] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const router = useRouter();

  async function handleEdit(
    values: z.infer<typeof DataLinkValidation.DATALINK>
  ) {
    setLoading(true);
    try {
      const response = await fetch("/api/link?id=" + data.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.statusCode, dataResponse.message);
      }

      toast.success(dataResponse.message);
      setOpenId(null);
      setIsChange(true);
      router.refresh();
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
        return;
      }

      toast.error("An error occured!");
    } finally {
      setLoading(false);
    }
  }

  function copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("URL berhasil disalin ke clipboard!");
      setIsCopy(true);
    });
  }

  async function handleDelete() {
    setLoading(true);
    try {
      const response = await fetch("/api/link?id=" + data.id, {
        method: "DELETE",
      });
      const dataResponse = (await response.json()) as ResponsePayload;

      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.statusCode, dataResponse.message);
      }

      toast.success(dataResponse.message);
      setOpenId(null);
      setIsChange(true);
      router.refresh();
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
        return;
      }

      toast.error("An error occured!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isCopy) {
      const timeout = setTimeout(() => {
        setIsCopy(false);
      }, 1900);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopy]);

  return (
    <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-primary-500/30 hover:bg-slate-800/60 transition-all duration-300 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
            {data.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {data.description}
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
            <HeaderFormData title="Edit Link" />
            <FormDataLink
              token={token}
              data={data}
              loading={loading}
              isForEdit
              handleSubmit={handleEdit}
            />
          </Popover>
          <Popover
            triggerElement={
              <div className="w-10 cursor-pointer h-10 hover:bg-red-500/30 rounded-xl flex items-center justify-center text-primary-400 hover:text-primary-300 transition-all duration-200 bg-red-500/20">
                <i className="ri-delete-bin-line"></i>
              </div>
            }
          >
            <h3 className="w-full text-center text-xl font-semibold">
              Apakah anda yakin ingin menghapus link &quot;{data.title}&quot;?
            </h3>
            <div className="flex gap-x-3 items-center w-full mt-6 justify-center">
              <button
                type="button"
                disabled={loading}
                onClick={handleDelete}
                className={clsx(
                  "px-3 py-2 rounded-lg",
                  loading
                    ? "bg-red-500/20 cursor-not-allowed"
                    : "bg-red-500/70 cursor-pointer"
                )}
              >
                Ya
              </button>
              <button
                onClick={() => setOpenId(null)}
                className="cursor-pointer px-3 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-700"
              >
                Tidak
              </button>
            </div>
          </Popover>
        </div>
      </div>
      <div className="bg-slate-900/50 border border-slate-600/20 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            {!data.isPrivate || token ? (
              <Link
                target="_blank"
                href={data.url}
                className="text-primary-400 hover:text-primary-300 font-medium text-sm break-all transition-colors duration-200"
              >
                {data.url}
              </Link>
            ) : (
              <div className="w-full flex flex-col gap-y-1">
                <div className="w-full bg-slate-600/40 h-2 rounded-xs" />
                <div className="w-full bg-slate-600/40 h-2 rounded-xs" />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              if (!isCopy) {
                if (!data.isPrivate || token) {
                  copyTextToClipboard(data.url);
                } else {
                  toast.error("Oops! Anda tidak memiliki akses ke link ini");
                }
              }
            }}
            className="cursor-pointer w-8 h-8 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
          >
            {isCopy ? (
              <i className="ri-check-line"></i>
            ) : (
              <i className="ri-file-copy-line"></i>
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center">
          <span className="flex items-center gap-1">
            <i className="ri-calendar-line"></i>
            {getFormattDate(data.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
}
