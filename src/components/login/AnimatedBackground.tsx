export default function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      <div
        className="absolute rounded-full"
        style={{
          width: "400px",
          height: "400px",
          top: "-10%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)",
          animation: "float1 20s infinite ease-in-out",
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: "300px",
          height: "300px",
          top: "60%",
          right: "-15%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)",
          animation: "float2 20s infinite ease-in-out",
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: "200px",
          height: "200px",
          top: "20%",
          right: "30%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)",
          animation: "float3 20s infinite ease-in-out",
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: "250px",
          height: "250px",
          bottom: "-10%",
          left: "40%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)",
          animation: "float4 20s infinite ease-in-out",
        }}
      />
    </div>
  );
}
