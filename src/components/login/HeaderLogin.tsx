import Image from "next/image";

export default function HeaderLogin() {
  return (
    <div className="text-center mb-8">
      <div className="flex-col relative items-center justify-center mt-1 hover:scale-105 w-fit right-1/2 left-1/2 -translate-x-1/2">
        <Image
          src="/dirjen.png"
          alt="djpt logo"
          width={140}
          height={140}
          className="mb-2 flex justify-center p-2"
        />
      </div>

      <h1 className="text-5xl font-black mb-2 text-white">ARSIP PROGRESS</h1>

      <p className="text-xl font-light mb-4 text-white">
        MONITORING DAN EVALUASI TU SDMAO DJPT TAHUN 2025
      </p>

      <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />
    </div>
  );
}
