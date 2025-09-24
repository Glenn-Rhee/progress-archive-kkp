"use client";
import Card from "@/components/home/Card";
import CardShell from "@/components/home/CardShell";
import FormDataLink from "@/components/home/FormDataLink";
import HeaderFormData from "@/components/home/HeaderFormData";
import Popover from "@/components/Popover";
import ResponseError from "@/error/ResponseError";
import { useDataLink } from "@/store/dataLink-store";
import { usePopover } from "@/store/popover-store";
import { DataLink, ResponsePayload } from "@/types";
import DataLinkValidation from "@/validation/dataLink-validation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import z from "zod";

interface CardsProps {
  token: string | undefined;
}

export default function Cards(props: CardsProps) {
  const { token } = props;
  const { data, setData, setLoading, loading, isChange, setIsChange } =
    useDataLink();
  const { setOpenId } = usePopover();
  const router = useRouter();
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

      toast.error("An error occured!");
    } finally {
      setLoading(false);
    }
  }
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
    if (isChange) {
      setIsChange(false);
      getDataLink();
    }
  }, [setLoading, setData, isChange, setIsChange]);
  return !data && loading ? (
    <CardShell>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-primary-500/30 hover:bg-slate-800/60 transition-all duration-300 animate-pulse h-[15rem]"
        ></div>
      ))}
    </CardShell>
  ) : data?.length === 0 ? (
    <div className="w-full mx-auto flex-col max-w-7xl px-2 flex items-center justify-center">
      <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mb-6">
        <i className="ri-link text-3xl text-slate-500"></i>
      </div>
      <h3 className="text-2xl font-bold text-slate-300 mb-2">Belum ada link</h3>
      <p className="text-slate-400 mb-6 max-w-md">
        Mulai dengan menambahkan link pertama Anda
      </p>
      <Popover
        triggerElement={
          <div className="relative group w-fit mx-auto">
            <div className="group relative overflow-hidden cursor-pointer bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-500 hover:to-orange-400 px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

              <i className="ri-add-line text-2xl relative z-10"></i>

              <span className="hidden sm:inline relative z-10">
                Tambah Link Pertama
              </span>
            </div>
          </div>
        }
      >
        <HeaderFormData title="Tambah data link" />
        <FormDataLink
          token={token}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </Popover>
    </div>
  ) : (
    <CardShell>
      {data!
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((d) => (
          <Card key={d.id} data={d} token={token} />
        ))}
    </CardShell>
  );
}
