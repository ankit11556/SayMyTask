import { useState } from "react";
import { userSignup } from "../services/AuthApi";
import { Link } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    try {
      const res = await userSignup({ email, password });
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 font-poppins">
          Create your account ✨
        </h2>
        <p className="text-center text-gray-600 mb-8 font-poppins">
          Sign up to get started
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition w-full"
            />
            <p className="text-xs text-gray-500 mt-2">Minimum 6 characters</p>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg 
                   hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
          >
            Signup
          </button>
          <p className="text-sm text-black mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline "
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
