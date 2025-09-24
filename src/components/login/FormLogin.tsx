"use client";
import ResponseError from "@/error/ResponseError";
import { useAlertStore } from "@/store/alert-store";
import { ResponsePayload } from "@/types";
import UserValidation from "@/validation/user-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import z from "zod";

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const { setType, setMessage, setIsVisible } = useAlertStore();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserValidation.USER>>({
    resolver: zodResolver(UserValidation.USER),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
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
      setIsVisible(false); // ini sekarang langsung clear error
    }
  }, [form.formState.errors, showAlert, setIsVisible]);

  async function handleSubmit(values: z.infer<typeof UserValidation.USER>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
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

      toast.success("Login successfully!");
      router.push("/");
    } catch (error) {
      if (error instanceof ResponseError) {
        showAlert("error", error.message);
        return;
      }

      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

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
          style={{
            background: "rgba(15, 23, 42, 0.5)",
            border: "2px solid rgba(71, 85, 105, 0.5)",
          }}
          placeholder="Masukkan username"
          onFocus={(e) => {
            const target = e.target as HTMLInputElement;
            target.style.background = "rgba(15, 23, 42, 0.7)";
            target.style.borderColor = "#6366f1";
            target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
          }}
          {...form.register("username")}
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
            {...form.register("password")}
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
              target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
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
        type="submit"
        onClick={() => form.handleSubmit(handleSubmit)()}
        disabled={isLoading}
        className="group w-full p-4 rounded-xl text-white font-semibold relative overflow-hidden transition-all duration-300 disabled:opacity-50 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-500 hover:to-orange-400"
      >
        <span
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                       transform -skew-x-12 -translate-x-full 
                       group-hover:translate-x-full 
                       transition-transform duration-700 rounded-xl"
        ></span>

        <div className="flex items-center justify-center relative z-10">
          {isLoading ? <BeatLoader /> : "Masuk ke Dashboard"}
        </div>
      </button>

      {/* Link to Signup */}
      <div className="text-center mt-6">
        <p className="text-sm" style={{ color: "#cbd5e1" }}>
          Belum punya akun?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/signup")}
            className="font-medium text-orange-400 hover:text-orange-300 transition-colors duration-200"
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
}
