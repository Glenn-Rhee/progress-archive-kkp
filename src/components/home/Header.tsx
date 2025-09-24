"use client";
import ResponseError from "@/error/ResponseError";
import { useDataLink } from "@/store/dataLink-store";
import { ResponsePayload } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DataUser {
  title: string;
  descriptionUser: string;
  username: string;
}

export default function Header({ token }: { token: string | undefined }) {
  const router = useRouter();
  const { isChange, setIsChange } = useDataLink();
  const [dataUser, setDataUser] = useState<DataUser | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  async function handleLogout() {
    setLoading(true);
    try {
      const response = await fetch("/api/auth", {
        method: "DELETE",
      });

      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.statusCode, dataResponse.message);
      }

      toast.success(dataResponse.message);
      setIsChange(true);
      router.refresh();
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
        return;
      }

      toast.error("An error occured, please try again later");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/user");
        const dataResponse =
          (await response.json()) as ResponsePayload<DataUser>;
        if (dataResponse.status === "failed") {
          throw new ResponseError(
            dataResponse.statusCode,
            dataResponse.message
          );
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
    };

    getUser();
    if (isChange) {
      setIsChange(false);
      getUser();
    }
  }, [isChange, setIsChange]);
  return (
    <div className="bg-slate-900/50 relative backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 mb-8 shadow-2xl animate-fade-in">
      <div className="flex justify-start p-2 w-fit absolute top-4 left-4 rounded-full hover:scale-105 transition-transform duration-100">
        {token ? (
          <span
            className={clsx(
              "relative hover:scale-100 z-10 px-4 py-2 rounded-xl font-semibold text-white",
              loading
                ? "h-10 w-[90px] rounded-md bg-slate-600/20"
                : "h-fit bg-gradient-to-r from-orange-500 to-orange-700"
            )}
          >
            {loading ? "" : dataUser?.username}
          </span>
        ) : null}
      </div>
      <div className="flex justify-end p-2 w-fit absolute top-4 right-4 rounded-full hover:scale-105 transition-transform duration-100">
        {token ? (
          <button
            onClick={handleLogout}
            disabled={loading}
            type="button"
            className={clsx(
              "group relative overflow-hidden px-4 py-2 rounded-xl font-semibold text-white",
              loading
                ? "cursor-not-allowed bg-slate-500/50"
                : "cursor-pointer bg-gradient-to-r from-red-500 to-red-700 hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25"
            )}
          >
            Logout
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="group relative overflow-hidden cursor-pointer 
             bg-gradient-to-r from-orange-500 to-orange-700 
             hover:from-orange-500 hover:to-orange-400 
             px-4 py-2 rounded-xl font-semibold text-white 
             transition-all duration-300 transform hover:scale-105 
             hover:shadow-2xl hover:shadow-primary-500/25"
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
               transform -skew-x-12 -translate-x-full 
               group-hover:translate-x-full 
               transition-transform duration-700 rounded-xl"
            ></span>

            <span className="relative z-10">LOGIN</span>
          </Link>
        )}
      </div>

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
