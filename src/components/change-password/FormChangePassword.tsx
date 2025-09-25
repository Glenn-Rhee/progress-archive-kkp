"use client";
import ResponseError from "@/error/ResponseError";
import { useAlertStore } from "@/store/alert-store";
import { ResponsePayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import z from "zod";

// Validation schema for change password
const ChangePasswordValidation = z
  .object({
    currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
    newPassword: z.string().min(8, "Password baru minimal 8 karakter"),
    confirmNewPassword: z
      .string()
      .min(1, "Konfirmasi password baru wajib diisi"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password baru dan konfirmasi password tidak cocok",
    path: ["confirmNewPassword"],
  });

export default function FormChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const { setType, setMessage, setIsVisible } = useAlertStore();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof ChangePasswordValidation>>({
    resolver: zodResolver(ChangePasswordValidation),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const router = useRouter();

  const showAlert = useCallback(
    (type: "error" | "success", message: string) => {
      setType(type);
      setMessage(message);
      setIsVisible(true);
    },
    [setType, setMessage, setIsVisible]
  );

  useEffect(() => {
    const errors = Object.values(form.formState.errors);

    if (errors.length > 0) {
      const firstError = errors[0]?.message as string;
      if (firstError) {
        showAlert("error", firstError);
      }
    } else {
      setIsVisible(false);
    }
  }, [form.formState.errors, showAlert, setIsVisible]);

  async function handleSubmit(
    values: z.infer<typeof ChangePasswordValidation>
  ) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = (await response.json()) as ResponsePayload;
      if (responseData.status === "failed") {
        throw new ResponseError(responseData.statusCode, responseData.message);
      }

      toast.success("Password berhasil diubah!");
      form.reset();
    } catch (error) {
      if (error instanceof ResponseError) {
        showAlert("error", error.message);
        return;
      }

      toast.error("Terjadi kesalahan yang tidak terduga.");
    } finally {
      setIsLoading(false);
    }
  }

  const inputStyle = {
    background: "rgba(15, 23, 42, 0.5)",
    border: "2px solid rgba(71, 85, 105, 0.5)",
  };

  const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.style.background = "rgba(15, 23, 42, 0.7)";
    target.style.borderColor = "#6366f1";
    target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
  };

  const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.style.background = "rgba(15, 23, 42, 0.5)";
    target.style.borderColor = "rgba(71, 85, 105, 0.5)";
    target.style.boxShadow = "none";
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(handleSubmit)();
      }}
      className="space-y-6"
    >
      {/* Current Password Field */}
      <div>
        <label
          htmlFor="currentPassword"
          className="block text-sm font-medium mb-2"
          style={{ color: "#cbd5e1" }}
        >
          Password Saat Ini
        </label>
        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            id="currentPassword"
            className="w-full p-4 rounded-xl text-white pr-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={inputStyle}
            placeholder="Masukkan password saat ini"
            {...form.register("currentPassword", {
              onBlur: inputBlurHandler,
            })}
            onFocus={inputFocusHandler}
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
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
            {showCurrentPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* New Password Field */}
      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium mb-2"
          style={{ color: "#cbd5e1" }}
        >
          Password Baru
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            className="w-full p-4 rounded-xl text-white pr-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={inputStyle}
            placeholder="Masukkan password baru"
            {...form.register("newPassword", {
              onBlur: inputBlurHandler,
            })}
            onFocus={inputFocusHandler}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
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
            {showNewPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <p className="text-xs mt-1" style={{ color: "#64748b" }}>
          Password minimal 8 karakter
        </p>
      </div>

      {/* Confirm New Password Field */}
      <div>
        <label
          htmlFor="confirmNewPassword"
          className="block text-sm font-medium mb-2"
          style={{ color: "#cbd5e1" }}
        >
          Konfirmasi Password Baru
        </label>
        <div className="relative">
          <input
            type={showConfirmNewPassword ? "text" : "password"}
            id="confirmNewPassword"
            className="w-full p-4 rounded-xl text-white pr-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={inputStyle}
            placeholder="Konfirmasi password baru"
            {...form.register("confirmNewPassword", {
              onBlur: inputBlurHandler,
            })}
            onFocus={inputFocusHandler}
          />
          <button
            type="button"
            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
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
            {showConfirmNewPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* Change Password Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="group cursor-pointer w-full p-4 rounded-xl text-white font-semibold relative overflow-hidden 
             transition-all duration-300 disabled:opacity-50 
             bg-gradient-to-r from-orange-500 to-orange-600 
             hover:from-orange-500 hover:to-orange-400"
      >
        <span
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
               transform -skew-x-12 -translate-x-full 
               group-hover:translate-x-full 
               transition-transform duration-700 rounded-xl"
        ></span>
        <div className="flex items-center justify-center relative z-10">
          {isLoading ? <BeatLoader color="white" size={8} /> : "Ubah Password"}
        </div>
      </button>

      {/* Back Button */}
      <div className="text-center mt-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="font-medium cursor-pointer text-orange-400 hover:text-orange-300 transition-colors duration-200"
        >
          Kembali
        </button>
      </div>
    </form>
  );
}
