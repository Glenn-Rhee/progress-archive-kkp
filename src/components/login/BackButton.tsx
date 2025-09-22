"use client";
import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href={"/"}
      className="flex fixed top-6 left-6 z-20 items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
      style={{
        background: "rgba(30, 41, 59, 0.5)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(71, 85, 105, 0.3)",
        color: "#94a3b8",
      }}
      onMouseEnter={(e) => {
        const target = e.target as HTMLElement;
        target.style.background = "rgba(30, 41, 59, 0.8)";
        target.style.color = "#ffffff";
        target.style.transform = "scale(1.05)";
        target.style.boxShadow = "0 8px 24px rgba(99, 102, 241, 0.2)";
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLElement;
        target.style.background = "rgba(30, 41, 59, 0.5)";
        target.style.color = "#94a3b8";
        target.style.transform = "scale(1)";
        target.style.boxShadow = "none";
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </Link>
  );
}
