import { useState } from "react";
import { adminLogin } from "../utils/auth/adminAuth";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await adminLogin(email, password);
      nav("/home");
    } catch (err) {
      if (err instanceof Error) alert(err.message);
      else alert("Unknown login error");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-100">
      {/* Floating Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-300 opacity-40 blur-3xl animate-pulse"
          style={{ animationDuration: "6s" }}
        />

        <div
          className="absolute right-0 top-20 h-[28rem] w-[28rem] rounded-full bg-cyan-300 opacity-40 blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />

        <div
          className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-indigo-300 opacity-30 blur-3xl animate-pulse"
          style={{ animationDuration: "10s" }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right,#2563eb 1px,transparent 1px),
            linear-gradient(to bottom,#2563eb 1px,transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Login Card */}
      <form
        onSubmit={loginHandler}
        className="relative z-10 w-[420px] rounded-3xl border border-white bg-white/70 backdrop-blur-xl shadow-2xl p-10 transition-all duration-300 hover:shadow-blue-200"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo(1).png"
            alt="Logo"
            className="h-28 object-contain animate-bounce"
            style={{ animationDuration: "4s" }}
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-slate-800">
          Welcome Back
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Digitalized Comprehensive Visual Perception Assessment - Children
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-slate-600 font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600 transition"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-white font-semibold shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          Login
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-slate-200"></div>

          <span className="px-3 text-sm text-slate-400">OR</span>

          <div className="flex-1 border-t border-slate-200"></div>
        </div>

        {/* Signup */}
        <button
          type="button"
          onClick={() => nav("/signup")}
          className="w-full rounded-xl border border-slate-300 bg-white py-3 font-medium text-slate-700 transition hover:bg-slate-100 hover:border-blue-400"
        >
          Create Admin Account
        </button>
      </form>

      {/* Footer */}
      <div className="absolute bottom-6 text-sm text-slate-500">
        © {new Date().getFullYear()} DCVPA Administration Portal
      </div>
    </div>
  );
};

export default AdminLogin;
