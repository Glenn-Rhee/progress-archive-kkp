"use client";
import ResponseError from "@/error/ResponseError";
import { useDataLink } from "@/store/dataLink-store";
import { ResponsePayload } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DataUser {
  title: string;
  descriptionUser: string;
  username: string;
}

export default function Header({ token }: { token: string | undefined }) {
  const { isChange, setIsChange } = useDataLink();
  const [dataUser, setDataUser] = useState<DataUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function getUser() {
    setLoading(true);
    try {
      const response = await fetch("/api/user", { cache: "no-store" });
      const dataResponse = (await response.json()) as ResponsePayload<DataUser>;

      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.statusCode, dataResponse.message);
      }

      setDataUser(dataResponse.data!);
    } catch (error) {
      setDataUser(null);
      if (error instanceof ResponseError) {
        toast.error(error.message);
        return;
      }
      toast.error("An error occured");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();

    if (isChange) {
      setIsChange(false);
      getUser();
    }
  }, [token, isChange, setIsChange]);

  return (
    <div className="bg-slate-900/50 relative backdrop-blur-xl border border-slate-800/50 rounded-3xl p-6 mb-6 shadow-2xl animate-fade-in">
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
        <h1
          className={clsx(
            "text-5xl font-black mb-2",
            loading
              ? "h-4 bg-slate-700/40 max-w-lg mx-auto rounded-md"
              : "bg-[#f1ede0] h-fit bg-clip-text text-transparent"
          )}
        >
          {loading ? "" : dataUser?.title}
        </h1>
        <p
          className={clsx(
            "text-xl text-slate-300 font-light",
            loading
              ? "h-2 bg-slate-700/40 max-w-lg mx-auto rounded-md"
              : "h-fit"
          )}
        >
          {loading ? "" : dataUser?.descriptionUser}
        </p>
        <div className="w-40 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-4 rounded-full"></div>
      </div>
    </div>
  );
}
