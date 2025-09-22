export default function HeaderLogin() {
  return (
    <div className="text-center mb-10">
      <div
        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 text-3xl text-white"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: "0 8px 32px rgba(99, 102, 241, 0.4)",
          animation: "glow 3s ease-in-out infinite",
        }}
      >
        🔗
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
