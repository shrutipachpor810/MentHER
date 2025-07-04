import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "mentee",
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
      const res = await API.post("/auth/signup", formData);
      localStorage.setItem("token", res.data.token);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-pink-100">
      {/* Left image */}
      <div
  className="hidden md:block bg-cover bg-center h-screen filter brightness-90 saturate-150"
  style={{ backgroundImage: "url('/signuuuu.png')" }}
/>


      {/* Right form */}
      <div className="flex items-center justify-center p-6">
        <div className="border-4 border-pink-100 p-8 w-full max-w-md bg-white">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
            Create an Account :3
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-pink-200 rounded-md px-4 py-2 focus:outline-none focus:border-pink-400"
              required
            />
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
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-pink-200 rounded-md px-4 py-2 focus:outline-none focus:border-pink-400"
            >
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-600 transition disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
