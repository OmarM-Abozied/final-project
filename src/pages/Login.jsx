import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, CheckCircle, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState("");
  const [serverError, setServerError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (validateForm()) {
      try {
        const result = await dispatch(login(formData)).unwrap();
          navigate("/");

      } catch (error) {
        console.error("❌ Login failed:", error);
        const message =
          error?.response?.data?.message || "Invalid email or password";
        setServerError(message);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    blur: {
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)",
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(135deg, #1a1f3a 0%, #2d3561 100%)",
      }}
    >
      <style>{`
        :root {
          --primary-navy: #1a1f3a;
          --accent-gold: #d4af37;
          --text-dark: #2d3748;
          --text-light: #718096;
          --light-gray: #f7fafc;
        }
      `}</style>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div
          className="rounded-xl shadow-2xl p-8 border backdrop-blur-sm relative overflow-hidden"
          style={{
            backgroundColor: "white",
            borderColor: "var(--accent-gold)",
            borderWidth: "2px",
          }}
        >
          {/* Golden glow effect */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background: `radial-gradient(circle at top right, var(--accent-gold), transparent 70%)`,
            }}
          ></div>

          {/* Floating particles animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: "var(--accent-gold)",
                  left: `${Math.random() * 100}%`,
                  top: "100%",
                }}
                animate={{
                  y: [-20, -100],
                  x: [Math.random() * 400, Math.random() * 400],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="text-center mb-8 relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ backgroundColor: "var(--accent-gold)" }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h2
              className="text-3xl font-bold mb-2"
              style={{ color: "var(--primary-navy)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Welcome Back
            </motion.h2>

            <motion.p
              style={{ color: "var(--text-light)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Continue your premium journey
            </motion.p>

            <motion.div
              className="w-24 h-1 mx-auto mt-4 rounded-full"
              style={{ backgroundColor: "var(--accent-gold)" }}
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            ></motion.div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 bg-red-50 border border-red-300 p-3 rounded-md text-sm text-center"
              >
                {serverError}
              </motion.div>
            )}

            {/* Email */}
            <motion.div variants={itemVariants} className="relative">
              <motion.label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-dark)" }}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                Email Address *
              </motion.label>
              <motion.div
                className="relative"
                variants={inputVariants}
                whileFocus="focus"
                initial="blur"
                animate={focusedField === "email" ? "focus" : "blur"}
              >
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                    focusedField === "email" ? "" : "text-gray-400"
                  }`}
                  style={
                    focusedField === "email"
                      ? { color: "var(--accent-gold)" }
                      : {}
                  }
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg transition-all duration-300 focus:outline-none ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:ring-2"
                  }`}
                  style={{
                    backgroundColor:
                      focusedField === "email" ? "white" : "var(--light-gray)",
                    ...(focusedField === "email" && !errors.email
                      ? {
                          borderColor: "var(--accent-gold)",
                          boxShadow: `0 0 0 3px rgba(212, 175, 55, 0.2)`,
                        }
                      : {}),
                  }}
                  placeholder="your.email@company.com"
                />
                <AnimatePresence>
                  {formData.email &&
                    !errors.email &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                </AnimatePresence>
              </motion.div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="relative">
              <motion.label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-dark)" }}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                Password *
              </motion.label>
              <motion.div
                className="relative"
                variants={inputVariants}
                whileFocus="focus"
                initial="blur"
                animate={focusedField === "password" ? "focus" : "blur"}
              >
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                    focusedField === "password" ? "" : "text-gray-400"
                  }`}
                  style={
                    focusedField === "password"
                      ? { color: "var(--accent-gold)" }
                      : {}
                  }
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg transition-all duration-300 focus:outline-none ${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:ring-2"
                  }`}
                  style={{
                    backgroundColor:
                      focusedField === "password"
                        ? "white"
                        : "var(--light-gray)",
                    ...(focusedField === "password" && !errors.password
                      ? {
                          borderColor: "var(--accent-gold)",
                          boxShadow: `0 0 0 3px rgba(212, 175, 55, 0.2)`,
                        }
                      : {}),
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                  style={{
                    color:
                      focusedField === "password"
                        ? "var(--accent-gold)"
                        : "#9ca3af",
                  }}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </motion.div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Forgot Password */}
            <motion.div variants={itemVariants} className="flex justify-end">
              <motion.a
                href="#"
                className="text-sm font-medium transition-colors duration-200 hover:opacity-80"
                style={{ color: "var(--accent-gold)" }}
                whileHover={{ scale: 1.05, x: 2 }}
                transition={{ duration: 0.2 }}
              >
                Forgot your password?
              </motion.a>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, var(--accent-gold), #b8941f)`,
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "100%", opacity: 0.1 }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Sign In to Your Account</span>
            </motion.button>
          </form>

          {/* Register Link */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-6 pt-6 border-t border-gray-200 relative z-10"
          >
            <p style={{ color: "var(--text-light)" }}>
              Don't have an account?{" "}
              <motion.div
                whileHover={{ scale: 1.05, x: 2 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                <Link
                  to="/register"
                  className="font-medium transition-colors duration-200 hover:opacity-80"
                  style={{ color: "var(--accent-gold)" }}
                >
                  Join the elite
                </Link>
              </motion.div>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
