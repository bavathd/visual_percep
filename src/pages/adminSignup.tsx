import { useState } from "react";
import { adminSignup } from "../utils/auth/adminSignup";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await adminSignup(email, password);
      alert("Admin account created successfully!");
      nav("/");
    } catch (err) {
      if (err instanceof Error) alert(err.message);
      else alert("Unknown error");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-100">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-300 opacity-40 blur-3xl animate-float" />

        <div
          className="absolute right-0 top-20 h-[28rem] w-[28rem] rounded-full bg-cyan-300 opacity-40 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        <div
          className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-indigo-300 opacity-30 blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Grid */}
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

      {/* Signup Card */}
      <form
        onSubmit={handleSignup}
        className="relative z-10 w-[430px] rounded-3xl border border-white bg-white/70 backdrop-blur-xl shadow-2xl p-10 transition-all duration-300 hover:shadow-blue-200"
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
          Create Admin Account
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Register a new administrator to access the portal.
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Create Button */}
        <button
          type="submit"
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-white font-semibold shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          Create Admin Account
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-slate-200"></div>

          <span className="px-3 text-sm text-slate-400">OR</span>

          <div className="flex-1 border-t border-slate-200"></div>
        </div>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => nav("/")}
          className="w-full rounded-xl border border-slate-300 bg-white py-3 font-medium text-slate-700 transition hover:bg-slate-100 hover:border-blue-500"
        >
          Back to Login
        </button>
      </form>

      {/* Footer */}
      <div className="absolute bottom-6 text-sm text-slate-500">
        © {new Date().getFullYear()} DCVPA Administration Portal
      </div>
    </div>
  );
};

export default AdminSignup;
