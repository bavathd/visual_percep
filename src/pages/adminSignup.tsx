import { useState } from "react";
import { adminSignup } from "../utils/auth/adminSignup";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminSignup(email, password);
      alert("Admin account created!");
      nav("/");
    } catch (err) {
      if (err instanceof Error) alert(err.message);
      else alert("Unknown error");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-slate-950">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Signup card */}
      <form
        onSubmit={handleSignup}
        className="relative z-10 p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl space-y-4 w-96"
      >
        <img
          src="/logo(1).png"
          alt="Logo"
          className="w-full h-32 object-contain mb-2 drop-shadow-lg"
        />
        <h2 className="text-2xl font-bold text-center text-white tracking-tight">
          Admin Signup
        </h2>
        <p className="text-center text-slate-300 text-sm -mt-2">
          Create a new admin account
        </p>

        <input
          type="email"
          className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold p-3 rounded-lg shadow-lg shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 hover:-translate-y-0.5"
        >
          Create Admin
        </button>

        <button
          type="button"
          onClick={() => nav("/")}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/20 text-white p-3 rounded-lg transition-all"
        >
          Go to Login
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
