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
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Unknown error");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="p-6 bg-white rounded-md shadow-md space-y-4 w-80"
      >
        <h2 className="text-xl font-bold">Admin Signup</h2>

        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email"
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Create Admin
        </button>
        <button
          type="button"
          onClick={() => nav("/")}
          className="w-full bg-gray-800 text-white p-2 rounded hover:bg-black"
        >
          Go to Login
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
