"use client";

import { useState } from "react";
import BackButton from "@/components/login/BackButton";
import BorderEffect from "@/components/login/BorderEffect";
import HeaderLogin from "@/components/login/HeaderLogin";
import { useAlertStore } from "@/store/alert-store";

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setType, setMessage, setIsVisible } = useAlertStore();

  const showAlert = (type: "error" | "success", message: string) => {
    setType(type);
    setMessage(message);
    setIsVisible(true);
    setTimeout(
      () => {
        setIsVisible(false);
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
      <BackButton />
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
          <BorderEffect />
          <HeaderLogin />

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
