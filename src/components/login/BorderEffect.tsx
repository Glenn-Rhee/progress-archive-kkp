export default function BorderEffect() {
  return (
    <div
      className="absolute -top-1/2 -left-1/2 w-full h-full -z-10"
      style={{
        width: "200%",
        height: "200%",
        background:
          "conic-gradient(from 0deg, transparent, rgba(99, 102, 241, 0.1), transparent)",
        animation: "rotate 30s linear infinite",
      }}
    />
  );
}
