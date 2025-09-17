"use client";
import dynamic from "next/dynamic";
import FormDataLink from "./FormDataLink";
import HeaderFormData from "./HeaderFormData";
import DataLinkValidation from "@/validation/dataLink-validation";
import z from "zod";
import ResponseError from "@/error/ResponseError";
import toast from "react-hot-toast";
import { DataLink, ResponsePayload } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePopover } from "@/store/popover-store";
import { useDataLink } from "@/store/dataLink-store";

const Popover = dynamic(() => import("../Popover"), {
  ssr: false,
});

export default function SearchBar() {
  const router = useRouter();
  const { setOpenId } = usePopover();
  const {
    setIsChange,
    setLoading: setLoadingDataLink,
    setData,
  } = useDataLink();
  const [loading, setLoading] = useState(false);
  const [valueSearch, setValueSearch] = useState<string>("");
  const handleSearch = useCallback(async () => {
    setLoadingDataLink(true);
    try {
      const query = valueSearch === "" ? "" : `?q=${valueSearch}`;
      const response = await fetch(`/api/link${query}`);
      const dataResponse = (await response.json()) as ResponsePayload<
        DataLink[]
      >;
      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.statusCode, dataResponse.message);
      }
      setData(dataResponse.data!);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
        return;
      }

      toast.error("An error occured");
    }
  }, [setData, setLoadingDataLink, valueSearch]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      handleSearch();
    }, 800);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [valueSearch, handleSearch]);

  async function handleSubmit(
    values: z.infer<typeof DataLinkValidation.DATALINK>
  ) {
    setLoading(true);
    try {
      const response = await fetch("/api/link", {
        method: "POST",
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
      setIsChange(true);
      setOpenId(null);
      router.refresh();
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
        return;
      }

      toast.error("An error occured");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center justify-center mb-8 animate-slide-up">
      <div className="relative flex-1 w-full lg:max-w-2xl">
        <div className="w-full bg-slate-800/50 backdrop-blur-sm px-6 py-4 gap-x-4 border border-slate-600/30 rounded-2xl items-center flex">
          <button type="button" onClick={handleSearch}>
            <i className="text-slate-400 ri-search-line"></i>
          </button>
          <input
            type="search"
            onChange={(e) => setValueSearch(e.target.value)}
            onKeyUp={handleSearch}
            placeholder="Cari link berdasarkan judul, deskripsi, atau URL..."
            className="w-full text-white placeholder-slate-400 focus:outline-none transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex gap-3 shrink-0">
        <Popover
          triggerElement={
            <div className="group relative overflow-hidden cursor-pointer bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-500 hover:to-primary-400 px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25">
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
          <HeaderFormData title="Tambah data link" />
          <FormDataLink handleSubmit={handleSubmit} loading={loading} />
        </Popover>
      </div>
    </div>
  );
}
