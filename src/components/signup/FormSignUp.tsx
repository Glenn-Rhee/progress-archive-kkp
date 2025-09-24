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

// Extended validation schema for signup
const SignupValidation = z
  .object({
    username: z
      .string()
      .min(3, "Username minimal 3 karakter")
      .max(20, "Username maksimal 20 karakter"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z
      .string()
      .min(6, "Konfirmasi password minimal 6 karakter"),
    title: z.string().min(2, "Title minimal 2 karakter"),
    description: z
      .string()
      .min(10, "Description minimal 10 karakter")
      .max(500, "Description maksimal 500 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password harus sama",
    path: ["confirmPassword"],
  });

export default function FormSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setType, setMessage, setIsVisible } = useAlertStore();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      title: "",
      description: "",
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

  async function handleSubmit(values: z.infer<typeof SignupValidation>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          title: values.title,
          description: values.description,
        }),
      });

      const responseData = (await response.json()) as ResponsePayload;
      if (responseData.status === "failed") {
        throw new ResponseError(responseData.statusCode, responseData.message);
      }

      toast.success("Akun berhasil dibuat! Silakan login.");
      router.push("/login");
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

  const inputFocusHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    target.style.background = "rgba(15, 23, 42, 0.7)";
    target.style.borderColor = "#6366f1";
    target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
  };

  const inputBlurHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
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
      {/* Username Field */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium mb-2"
          style={{ color: "#cbd5e1" }}
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="w-full p-4 rounded-xl text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          style={inputStyle}
          placeholder="Masukkan username"
          {...form.register("username", {
            onBlur: inputBlurHandler,
          })}
          onFocus={inputFocusHandler}
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
            className="w-full p-4 rounded-xl text-white pr-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={inputStyle}
            placeholder="Masukkan password"
            {...form.register("password", {
              onBlur: inputBlurHandler,
            })}
            onFocus={inputFocusHandler}
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

      {/* Confirm Password Field */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium mb-2"
          style={{ color: "#cbd5e1" }}
        >
          Konfirmasi Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            className="w-full p-4 rounded-xl text-white pr-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={inputStyle}
            placeholder="Konfirmasi password"
            {...form.register("confirmPassword", {
              onBlur: inputBlurHandler,
            })}
            onFocus={inputFocusHandler}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* Title Field */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium mb-2"
          style={{ color: "#cbd5e1" }}
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="w-full p-4 rounded-xl text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          style={inputStyle}
          placeholder="Masukkan title/jabatan Anda"
          {...form.register("title", {
            onBlur: inputBlurHandler,
          })}
          onFocus={inputFocusHandler}
        />
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium mb-2"
          style={{ color: "#cbd5e1" }}
        >
          Description
        </label>
        <textarea
          id="description"
          className="w-full p-4 rounded-xl text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          style={inputStyle}
          placeholder="Ceritakan sedikit tentang diri Anda..."
          rows={4}
          {...form.register("description", {
            onBlur: inputBlurHandler,
          })}
          onFocus={inputFocusHandler}
        />
        <p className="text-xs mt-1" style={{ color: "#64748b" }}>
          {form.watch("description")?.length || 0}/500 karakter
        </p>
      </div>

      {/* Signup Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="group w-full p-4 rounded-xl text-white font-semibold relative overflow-hidden 
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
          {isLoading ? <BeatLoader color="white" size={8} /> : "Daftar Akun"}
        </div>
      </button>

      {/* Link to Login */}
      <div className="text-center mt-6">
        <p className="text-sm" style={{ color: "#cbd5e1" }}>
          Sudah punya akun?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="font-medium text-orange-400 hover:text-orange-300 transition-colors duration-200"
          >
            Login
          </button>
        </p>
      </div>
    </form>
  );
}
