import Alert from "@/components/Alert";
import BackButton from "@/components/login/BackButton";
import BorderEffect from "@/components/login/BorderEffect";
import FormLogin from "@/components/login/FormLogin";
import HeaderLogin from "@/components/login/HeaderLogin";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #59AC77 0%, #3A6F43 25%,)",
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
          <Alert />
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
