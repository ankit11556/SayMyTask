import { useState } from "react";
import { userLogin } from "../services/AuthApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAutheticated, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    try {
      const res = await userLogin({ email, password });
      alert(res.data.message);
      setIsAutheticated(true);
      setUser(res.data);
      navigate("/set-reminder");
    } catch (error) {
      console.log("Error object:", error);
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div
        className="w-full max-w-md bg-white p-8 rounded-xl  border border-gray-200 shadow-lg
"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 font-poppins">
          Welcome back👋
        </h2>
        <p className="text-center text-gray-600 mb-8 font-poppins">
          Log in to continue
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-indigo-600 transition shadow-md hover:scale-[1.02] active:scale-[0.98] mt-3"
          >
            Login
          </button>
          <p className="text-sm text-black">
            Don’t have an account yet?{" "}
            <Link
              to="/sign-up"
              className="font-medium text-blue-600 hover:underline "
            >
              Sign up
            </Link>
          </p>
          <div className="flex items-center my-4 gap-3">
            <div className="h-[1px] bg-gray-300 flex-1"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="h-[1px] bg-gray-300 flex-1"></div>
          </div>

          <GoogleLogin></GoogleLogin>
        </form>
      </div>
    </div>
  );
};

export default Login;
