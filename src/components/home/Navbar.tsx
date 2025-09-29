// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import toast from "react-hot-toast";
import EditForm from "./EditForm";
import Popover from "../Popover";
import Dropdown from "../Dropdown";
import Image from "next/image";
import { useDataLink } from "@/store/dataLink-store";

interface NavbarProps {
  token?: string;
}

interface DataUser {
  title: string;
  descriptionUser: string;
  username: string;
}

interface ResponsePayload<T = null> {
  status: "success" | "failed";
  statusCode: number;
  message: string;
  data?: T;
}

class ResponseError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "ResponseError";
  }
}

export default function Navbar({ token }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isChange, setIsChange } = useDataLink();
  const [dataUser, setDataUser] = useState<DataUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      router.push("/");
      router.refresh();
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
        return;
      }
      toast.error("An error occurred, please try again later");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const getUser = async () => {
      if (!token) {
        setDataUser(null);
        return;
      }

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

        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [token, isChange]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-700/30 backdrop-blur-xl shadow-lg rounded-b-3xl "
          : "bg-[#074e2e] backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-20 h-20  flex items-center justify-center ">
              <Image
                src="/dfaajib.png"
                alt="Logo"
                width={140}
                height={140}
                className="p-2 "
                priority
              />
            </div>
            <div className="text-white">
              <h1 className="text-lg font-bold leading-tight">DFA Academy</h1>
              <p className="text-xs text-white/80 hidden sm:block">
                Dynamic, Future, Application!
              </p>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            {token ? (
              <Dropdown
                className="flex flex-col items-start gap-y-2 px-2"
                triggerElement={
                  <span
                    className={clsx(
                      "relative z-10 px-4 py-2 rounded-xl font-semibold text-white cursor-pointer",
                      loading
                        ? "h-10 w-[90px] rounded-md bg-slate-600/20"
                        : "h-fit bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 transition-all duration-300"
                    )}
                  >
                    {loading ? "" : dataUser?.username}
                  </span>
                }
              >
                <Popover
                  className="flex item-center text-left"
                  triggerElement={
                    <span className="w-full rounded-md hover:text-slate-900 transition-colors duration-200 text-sm font-medium py-2 hover:bg-slate-300 ps-3 cursor-pointer">
                      Edit Profile
                    </span>
                  }
                >
                  <EditForm data={dataUser} />
                </Popover>

                <Link
                  href="/change-password"
                  className="w-full rounded-md hover:text-slate-900 transition-colors duration-200 text-sm font-medium py-2 hover:bg-slate-300 ps-3"
                >
                  Ganti Password
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={loading}
                  type="button"
                  className={clsx(
                    "w-full text-left rounded-md transition-colors duration-200 text-sm font-medium py-2 ps-3",
                    loading
                      ? "cursor-not-allowed bg-slate-500/50 text-white"
                      : "cursor-pointer hover:text-slate-900 hover:bg-slate-300 text-white-600"
                  )}
                >
                  {loading ? "Loading..." : "Logout"}
                </button>
              </Dropdown>
            ) : (
              <Link
                href="/auth/login"
                className="group relative overflow-hidden cursor-pointer 
                  bg-gradient-to-r from-orange-500 to-orange-700 
                  hover:from-orange-600 hover:to-orange-800 
                  px-4 py-2 rounded-xl font-semibold text-white 
                  transition-all duration-300 transform hover:scale-105 
                  hover:shadow-2xl"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                    transform -skew-x-12 -translate-x-full 
                    group-hover:translate-x-full 
                    transition-transform duration-700 rounded-xl"
                />
                <span className="relative z-10">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
