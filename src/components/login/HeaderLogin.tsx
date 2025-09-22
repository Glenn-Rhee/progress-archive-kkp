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

      <h1
        className="text-5xl font-black mb-2"
        style={{
          background: "linear-gradient(135deg, #60a5fa, #a78bfa, #60a5fa)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% 200%",
          animation: "gradientShift 3s ease infinite",
        }}
      >
        ARSIP PROGRESS
      </h1>

      <p className="text-xl font-light mb-4" style={{ color: "#94a3b8" }}>
        MONITORING DAN EVALUASI TU SDMAO DJPT TAHUN 2025
      </p>

      <div
        className="w-24 h-1 mx-auto rounded-full"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        }}
      />
    </div>
  );
}
