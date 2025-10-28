import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Building,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    company: "",
    role: "", // أضف دي
  });
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 🟠 الاسم الكامل
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }

    // 🟢 الإيميل
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // 🔵 رقم الهاتف
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10–14 digits)";
    }

    // 🟣 كلمة المرور
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // 🟤 تأكيد كلمة المرور
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // ⚫ الدور (Role)
    if (!formData.role) {
      newErrors.role = "Please select a user role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(""); // تصفير الرسائل قبل المحاولة الجديدة

    if (validateForm()) {
      const userData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
        company: formData.company,
      };

      try {
        const resultAction = await dispatch(register(userData)).unwrap();

        // ✅ لو التسجيل تم بنجاح
        if (resultAction.token) {
          localStorage.setItem("token", resultAction.token);
          localStorage.setItem("user", JSON.stringify(resultAction.user));
        }

        console.log("✅ Registered user:", resultAction);

        // 🔁 توجيه المستخدم بعد النجاح
        navigate("/login");
      } catch (error) {
        console.error("❌ Registration error:", error);

        // 🟥 عرض رسالة الخطأ من السيرفر (لو موجودة)
        if (error?.response?.data?.message) {
          setServerError(error.response.data.message);
        } else {
          setServerError("Registration failed. Please try again.");
        }
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
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
            Join the Elite
          </motion.h2>

          <motion.p
            style={{ color: "var(--text-light)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Start your premium real estate journey
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
              className="text-red-600 bg-red-50 border border-red-300 p-3 rounded-md text-sm mb-4 text-center"
            >
              {serverError}
            </motion.div>
          )}

          {/* Full Name */}
          <motion.div variants={itemVariants} className="relative">
            <motion.label
              htmlFor="fullName"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-dark)" }}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              Full Name *
            </motion.label>
            <motion.div
              className="relative"
              variants={inputVariants}
              whileFocus="focus"
              initial="blur"
              animate={focusedField === "fullName" ? "focus" : "blur"}
            >
              <User
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                  focusedField === "fullName" ? "" : "text-gray-400"
                }`}
                style={
                  focusedField === "fullName"
                    ? { color: "var(--accent-gold)" }
                    : {}
                }
              />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField("")}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg transition-all duration-300 focus:outline-none ${
                  errors.fullName
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2"
                }`}
                style={{
                  backgroundColor:
                    focusedField === "fullName" ? "white" : "var(--light-gray)",
                  ...(focusedField === "fullName" && !errors.fullName
                    ? {
                        borderColor: "var(--accent-gold)",
                        boxShadow: `0 0 0 3px rgba(212, 175, 55, 0.2)`,
                      }
                    : {}),
                }}
                placeholder="Enter your full name"
              />
              <AnimatePresence>
                {formData.fullName && !errors.fullName && (
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
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.fullName}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-dark mb-2"
            >
              Email Address *
            </label>
            <div className="relative">
              <Mail
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                  focusedField === "email"
                    ? "text-primary-navy"
                    : "text-gray-400"
                }`}
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/20"
                }`}
                placeholder="your.email@company.com"
              />
              {formData.email &&
                !errors.email &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-dark mb-2"
            >
              Password *
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                  focusedField === "password"
                    ? "text-primary-navy"
                    : "text-gray-400"
                }`}
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/20"
                }`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-navy transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {formData.password && (
              <div className="mt-2 text-xs text-gray-500">
                Password strength:{" "}
                {formData.password.length >= 8
                  ? "Strong"
                  : formData.password.length >= 6
                  ? "Medium"
                  : "Weak"}
              </div>
            )}
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.password}
              </motion.p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-text-dark mb-2"
            >
              Confirm Password *
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                  focusedField === "confirmPassword"
                    ? "text-primary-navy"
                    : "text-gray-400"
                }`}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField("")}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/20"
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-navy transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.confirmPassword}
              </motion.p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-text-dark mb-2"
            >
              Account Type *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full pl-3 pr-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/20 focus:outline-none"
            >
              <option value="">Select Role</option>
              <option value="real_estate_developer">
                Real Estate Developer
              </option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>

          {/* Optional Fields in Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="relative">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-text-dark mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "phone"
                      ? "text-primary-navy"
                      : "text-gray-400"
                  }`}
                />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField("")}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/20 focus:outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Company */}
            <div className="relative">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-text-dark mb-2"
              >
                Company/Agency
              </label>
              <div className="relative">
                <Building
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "company"
                      ? "text-primary-navy"
                      : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("company")}
                  onBlur={() => setFocusedField("")}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/20 focus:outline-none"
                  placeholder="Your brokerage"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg mt-6 relative overflow-hidden"
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
            <span className="relative z-10">Create My Premium Account</span>
          </motion.button>

          {/* Terms */}
          <motion.p
            variants={itemVariants}
            className="text-xs text-center leading-relaxed"
            style={{ color: "var(--text-light)" }}
          >
            By creating an account, you agree to our{" "}
            <motion.a
              href="#"
              className="transition-colors underline hover:opacity-80"
              style={{ color: "var(--accent-gold)" }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Terms of Service
            </motion.a>{" "}
            and{" "}
            <motion.a
              href="#"
              className="transition-colors underline hover:opacity-80"
              style={{ color: "var(--accent-gold)" }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Privacy Policy
            </motion.a>
          </motion.p>
        </form>

        {/* Login Link */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-6 pt-6 border-t border-gray-200"
        >
          <p style={{ color: "var(--text-light)" }}>
            Already have an account?{" "}
            <motion.span
              whileHover={{ scale: 1.05, x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/login"
                className="font-medium transition-colors duration-200 hover:opacity-80"
                style={{ color: "var(--accent-gold)" }}
              >
                Sign in here
              </Link>
            </motion.span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
