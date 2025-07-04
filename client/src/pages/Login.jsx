// src/pages/Login.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", formData);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("name", user.name);
      localStorage.setItem("role", user.role);
      localStorage.setItem("email", user.email);

      navigate("/welcome");
    } catch (error) {
      console.error(error.response?.data || error);
      alert(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-pink-100">
      {/* Left image */}
      <div
        className="hidden md:block bg-cover bg-center"
        style={{ backgroundImage: "url('/hello.png')" }}
      />

      {/* Right form */}
      <div className="flex items-center justify-center p-6">
        <div className="border-4 border-pink-100 p-8 w-full max-w-md bg-white">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
            Welcome Back ;)
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-pink-200 rounded-md px-4 py-2 focus:outline-none focus:border-pink-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-pink-200 rounded-md px-4 py-2 focus:outline-none focus:border-pink-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-600 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-pink-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
