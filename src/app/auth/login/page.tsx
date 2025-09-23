import Alert from "@/components/Alert";
import BackgroundAnimated from "@/components/BackgroundAnimated";
import AnimatedBackground from "@/components/login/AnimatedBackground";
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
      <BackgroundAnimated />
      {/* Login Container */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="relative rounded-3xl p-12 overflow-hidden bg-slate-900/50 border border-slate-700/30">
          <BorderEffect />
          <HeaderLogin />
          <Alert />
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
