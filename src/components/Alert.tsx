"use client";
import { useAlertStore } from "@/store/alert-store";

export default function Alert() {
  const alert = useAlertStore();

  return (
    alert.isVisible && (
      <div
        className={`mb-5 p-3 rounded-lg text-sm border flex items-center ${
          alert.type === "error"
            ? "text-red-300 border-red-500/30"
            : "text-green-300 border-green-500/30"
        }`}
        style={{
          background:
            alert.type === "error"
              ? "rgba(239, 68, 68, 0.1)"
              : "rgba(34, 197, 94, 0.1)",
        }}
      >
        <span className="mr-2">{alert.type === "error" ? "⚠️" : "✅"}</span>
        {alert.message}
      </div>
    )
  );
}
