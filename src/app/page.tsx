"use client";
import BackgroundAnimated from "@/components/BackgroundAnimated";
import Card from "@/components/home/Card";
import CardShell from "@/components/home/CardShell";
import Header from "@/components/home/Header";
import SearchBar from "@/components/home/SearchBar";
import ResponseError from "@/error/ResponseError";
import { useDataLink } from "@/store/dataLink-store";
import { DataLink, ResponsePayload } from "@/types";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function HomePage() {
  const { data, setData, setLoading, loading } = useDataLink();

  useEffect(() => {
    const getDataLink = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/link");
        const dataResponse = (await response.json()) as ResponsePayload<
          DataLink[]
        >;
        if (dataResponse.status === "failed") {
          throw new ResponseError(
            dataResponse.statusCode,
            dataResponse.message
          );
        }

        setData(dataResponse.data!);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
          return;
        }

        toast.error("An error occured");
      } finally {
        setLoading(false);
      }
    };

    getDataLink();
  }, [setLoading, setData]);

  return (
    <div>
      <BackgroundAnimated />
      <div className="relative z-10 container mx-auto px-2 py-8 max-w-7xl">
        <Header />
        <SearchBar />
      </div>
      {!data && loading ? (
        <CardShell>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-primary-500/30 hover:bg-slate-800/60 transition-all duration-300 animate-pulse h-[15rem]"
            ></div>
          ))}
        </CardShell>
      ) : data?.length === 0 ? (
        <div className="w-full mx-auto flex-col max-w-7xl px-2 flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mb-6">
            <i className="ri-link text-3xl text-slate-500"></i>
          </div>
          <h3 className="text-2xl font-bold text-slate-300 mb-2">
            Belum ada link
          </h3>
          <p className="text-slate-400 mb-6 max-w-md">
            Mulai dengan menambahkan link pertama Anda
          </p>
          <button className="bg-gradient-to-r from-primary-600 to-primary-500 flex items-center cursor-pointer hover:bg-gradient-to-br hover:from-primary-500 hover:to-primary-600 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105">
            <i className="ri-add-line text-2xl"></i>
            <span className="hidden sm:inline">Tambah Link Pertama</span>
          </button>
        </div>
      ) : (
        <CardShell>
          {data!.map((d) => (
            <Card key={d.id} data={d} />
          ))}
        </CardShell>
      )}
    </div>
  );
}
