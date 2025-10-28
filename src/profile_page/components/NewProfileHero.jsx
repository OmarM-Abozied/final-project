import { motion } from "framer-motion";
import { FaUserCircle, FaEdit, FaCrown } from "react-icons/fa";

const ProfileHero = ({ user }) => {
  const defaultUser = {
    name: "Abdelrahman",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    plan: "AI Real Estate Plus",
    planType: "premium", // free, premium, ai
    memberSince: "January 2024",
  };

  const userData = user || defaultUser;

  const planColors = {
    free: "bg-gray-500",
    premium: "bg-accent-gold",
    ai: "bg-gradient-to-r from-accent-gold to-primary-navy",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl shadow-lg mb-8"
      style={{
        background:
          "linear-gradient(135deg, #1e3a5f 0%, #2c5282 50%, #f5e6a8 100%)",
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-light-gold opacity-20 rounded-full blur-2xl"></div>

      <div className="relative z-10 p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-accent-gold rounded-full blur-xl opacity-50"></div>
            <img
              src={userData.avatar}
              alt={userData.name}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-accent-gold shadow-2xl"
            />
            <div
              className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white ${
                userData.planType === "ai"
                  ? "bg-accent-gold"
                  : userData.planType === "premium"
                  ? "bg-accent-gold"
                  : "bg-gray-400"
              }`}
            ></div>
          </motion.div>

          {/* Info Section */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Greeting */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                Welcome back, {userData.name} 👋
              </h1>

              {/* Plan Badge */}
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div
                  className={`${
                    planColors[userData.planType]
                  } text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg`}
                >
                  <FaCrown className="text-lg" />
                  <span className="font-semibold">
                    Your current plan: {userData.plan}
                  </span>
                </div>
              </div>

              <p className="text-light-gold text-sm md:text-base mb-6">
                Member since {userData.memberSince}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-primary-navy rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  Edit Profile
                </motion.button>

                {userData.planType !== "ai" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-accent-gold text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <FaCrown />
                    Upgrade Plan
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHero;
