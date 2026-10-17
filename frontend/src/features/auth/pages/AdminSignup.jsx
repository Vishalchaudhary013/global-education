import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { getApiErrorMessage } from "@/shared/utils/apiError";
import { register } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../components/AuthLayout";

const inputClass =
  "block w-full px-4 py-3 bg-white border border-slate-300 rounded-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F2853]/15 focus:border-[#1F2853] transition-all";

const AdminSignup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = { ...formData, role: "admin" };
      const { token, user } = await register(payload);

      if (user.role === "admin" || user.role === "superadmin") {
        login(token, user);
        navigate("/admin");
      } else {
        // If they sign up here but aren't in the admin list, they become a student
        // We should inform them they are registered but not as an admin
        // Actually, normal users can't login now, so this might be useless
        alert("Account created successfully, but your email is not on the pre-approved admin list.");
        navigate("/");
      }
    } catch (err) {
      setError(getApiErrorMessage(err, "Registration failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading="Manage your platform, faster"
      subheading="Create an admin profile to publish courses, curate universities and respond to counselling requests from one place."
      title="Create your admin account"
      footer={
        <>
          Already have an admin account?{" "}
          <Link to="/login" className="text-[#FF4E45] font-semibold hover:underline">
            Sign in here
          </Link>
        </>
      }
    >
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name <span className="text-[#FF4E45]">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Admin Name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Admin Email <span className="text-[#FF4E45]">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="name@globaledu.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number <span className="text-[#FF4E45]">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="10 digit number"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Secure Password <span className="text-[#FF4E45]">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`${inputClass} pr-12`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <HiEyeSlash className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF4E45] hover:bg-[#E03A30] text-white font-semibold py-3.5 rounded-sm transition-all duration-300 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Create Admin Account"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default AdminSignup;
