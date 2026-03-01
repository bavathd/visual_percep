import { useState } from "react";
import { adminLogin } from "../utils/auth/adminAuth";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await adminLogin(email, password);
      nav("/home");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Unknown login error");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={loginHandler}
        className="p-6 bg-white rounded-md shadow-md space-y-4 w-80"
      >
        <img
          src="/logo(1).png"
          alt="Admin Login Background"
          className="w-full h-32 object-contain mb-4"
        />
        <h2 className="text-xl font-bold text-center">Admin Login</h2>

        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        {/* Signup Button */}
        <button
          type="button"
          onClick={() => nav("/signup")}
          className="w-full bg-gray-800 text-white p-2 rounded hover:bg-black"
        >
          Create Admin Account
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
