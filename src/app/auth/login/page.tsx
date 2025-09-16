"use client";

import { useState } from "react";
import Link from "next/link";

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface AlertProps {
  type: "error" | "success";
  message: string;
  isVisible: boolean;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps>({
    type: "error",
    message: "",
    isVisible: false,
  });

  const showAlert = (type: "error" | "success", message: string) => {
    setAlert({ type, message, isVisible: true });
    setTimeout(
      () => {
        setAlert((prev) => ({ ...prev, isVisible: false }));
      },
      type === "success" ? 3000 : 5000
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.username.trim()) {
      showAlert("error", "Username atau email harus diisi");
      return;
    }
    if (!formData.password.trim()) {
      showAlert("error", "Password harus diisi");
      return;
    }
    if (formData.password.length < 6) {
      showAlert("error", "Password minimal 6 karakter");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (formData.username === "admin" && formData.password === "admin123") {
        showAlert("success", "Login berhasil! Mengalihkan ke dashboard...");
        setTimeout(() => {
          console.log("Redirect ke dashboard");
        }, 2000);
      } else {
        showAlert("error", "Username atau password salah.");
      }
    } catch (error) {
      showAlert("error", "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    showAlert(
      "success",
      "Link reset password telah dikirim ke email Anda (simulasi)"
    );
  };

  const handleRegister = () => {
    showAlert("success", "Fitur registrasi akan segera tersedia");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f0f23 0%, #1e1b4b 25%, #312e81 50%, #1e1b4b 75%, #0f0f23 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        {/* Floating Orb 1 */}
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

        {/* Floating Orb 2 */}
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

        {/* Floating Orb 3 */}
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

        {/* Floating Orb 4 */}
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

      {/* Back to Home Button */}
      <Link href={"/"} className="hidden md:block">
        <button
          onClick={() => window.history.back()}
          className="fixed top-6 left-6 z-20 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
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
          title="Kembali ke Beranda"
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
        </button>
      </Link>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-lg">
        <div
          className="relative rounded-3xl p-12 overflow-hidden"
          style={{
            background: "rgba(30, 41, 59, 0.5)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(71, 85, 105, 0.5)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
            animation: "fadeIn 1s ease-out",
          }}
        >
          {/* Rotating Border Effect */}
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

          {/* Header Section */}
          <div className="text-center mb-10">
            {/* Logo */}
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

            {/* Title */}
            <h1
              className="text-5xl font-black mb-2"
              style={{
                background:
                  "linear-gradient(135deg, #60a5fa, #a78bfa, #60a5fa)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
                animation: "gradientShift 3s ease infinite",
              }}
            >
              ARSIP PROGRESS
            </h1>

            {/* Subtitle */}
            <p className="text-xl font-light mb-4" style={{ color: "#94a3b8" }}>
              MONITORING DAN EVALUASI TU SDMAO DJPT TAHUN 2025
            </p>

            {/* Divider */}
            <div
              className="w-24 h-1 mx-auto rounded-full"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              }}
            />
          </div>

          {/* Alert Messages */}
          {alert.isVisible && (
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
              <span className="mr-2">
                {alert.type === "error" ? "⚠️" : "✅"}
              </span>
              {alert.message}
            </div>
          )}

          {/* Login Form */}
          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-2"
                style={{ color: "#cbd5e1" }}
              >
                Username atau Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{
                  background: "rgba(15, 23, 42, 0.5)",
                  border: "2px solid rgba(71, 85, 105, 0.5)",
                }}
                placeholder="Masukkan username atau email"
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.background = "rgba(15, 23, 42, 0.7)";
                  target.style.borderColor = "#6366f1";
                  target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.background = "rgba(15, 23, 42, 0.5)";
                  target.style.borderColor = "rgba(71, 85, 105, 0.5)";
                  target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                style={{ color: "#cbd5e1" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl text-white pr-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{
                    background: "rgba(15, 23, 42, 0.5)",
                    border: "2px solid rgba(71, 85, 105, 0.5)",
                  }}
                  placeholder="Masukkan password"
                  onFocus={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.style.background = "rgba(15, 23, 42, 0.7)";
                    target.style.borderColor = "#6366f1";
                    target.style.boxShadow =
                      "0 0 0 3px rgba(99, 102, 241, 0.1)";
                  }}
                  onBlur={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.style.background = "rgba(15, 23, 42, 0.5)";
                    target.style.borderColor = "rgba(71, 85, 105, 0.5)";
                    target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl transition-colors duration-200"
                  style={{ color: "#64748b" }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.color = "#94a3b8";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.color = "#64748b";
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full p-4 rounded-xl text-white font-semibold relative overflow-hidden transition-all duration-300 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                if (!isLoading) {
                  target.style.transform = "translateY(-2px)";
                  target.style.boxShadow =
                    "0 12px 40px rgba(99, 102, 241, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = "translateY(0)";
                target.style.boxShadow = "none";
              }}
            >
              <div className="flex items-center justify-center">
                {isLoading && (
                  <div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                )}
                {isLoading ? "Memproses..." : "Masuk ke Dashboard"}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
