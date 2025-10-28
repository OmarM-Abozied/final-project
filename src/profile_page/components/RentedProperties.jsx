import { motion } from "framer-motion";
import {
  FaHome,
  FaMapMarkerAlt,
  FaCalendar,
  FaDollarSign,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaBell,
  FaSync,
} from "react-icons/fa";

const RentedProperties = ({ properties }) => {
  const defaultProperties = [
    {
      id: 1,
      name: "Palm Beachfront Apartment",
      location: "Palm Jumeirah, Dubai",
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop",
      contractStart: "January 1, 2024",
      contractEnd: "December 31, 2024",
      monthlyRent: "8,500 AED",
      remainingDays: 75,
      paymentStatus: "Paid",
      nextPaymentDue: "November 1, 2024",
    },
    {
      id: 2,
      name: "Business Bay Studio",
      location: "Business Bay, Dubai",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
      contractStart: "March 15, 2024",
      contractEnd: "March 14, 2025",
      monthlyRent: "5,200 AED",
      remainingDays: 147,
      paymentStatus: "Due Soon",
      nextPaymentDue: "October 25, 2024",
    },
  ];

  const propertiesData = properties || defaultProperties;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const getPaymentStatusColor = (status) => {
    return status === "Paid" ? "bg-green-500" : "bg-orange-500";
  };

  const getPaymentStatusIcon = (status) => {
    return status === "Paid" ? <FaCheckCircle /> : <FaExclamationCircle />;
  };

  const getRemainingDaysColor = (days) => {
    if (days <= 10) return "text-red-600";
    if (days <= 30) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-2">
            Your Rented Properties
          </h2>
          <p className="text-text-light">
            Properties you are currently renting
          </p>
        </div>
        <div className="hidden md:block">
          <span className="px-4 py-2 bg-light-gold text-primary-navy rounded-full font-semibold text-sm">
            {propertiesData.length} Active Rentals
          </span>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {propertiesData.map((property) => (
          <motion.div
            key={property.id}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border-light"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />

              {/* Payment Status Badge */}
              <div
                className={`absolute top-4 right-4 ${getPaymentStatusColor(
                  property.paymentStatus
                )} text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm flex items-center gap-2`}
              >
                {getPaymentStatusIcon(property.paymentStatus)}
                {property.paymentStatus}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Property Name */}
              <h3 className="text-xl font-bold text-text-dark mb-3">
                {property.name}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-2 text-text-light mb-4">
                <FaMapMarkerAlt className="text-accent-gold" />
                <span className="text-sm">{property.location}</span>
              </div>

              {/* Contract Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border-light">
                <div>
                  <div className="flex items-center gap-2 text-text-light mb-1">
                    <FaCalendar className="text-primary-navy" />
                    <span className="text-xs">Contract Start</span>
                  </div>
                  <p className="text-sm font-semibold text-text-dark">
                    {property.contractStart}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-text-light mb-1">
                    <FaCalendar className="text-accent-gold" />
                    <span className="text-xs">Contract End</span>
                  </div>
                  <p className="text-sm font-semibold text-text-dark">
                    {property.contractEnd}
                  </p>
                </div>
              </div>

              {/* Monthly Rent */}
              <div className="bg-primary-navy/10 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-text-light mb-1">Monthly Rent</p>
                    <p className="text-2xl font-bold text-primary-navy flex items-center gap-2">
                      <FaDollarSign className="text-lg" />
                      {property.monthlyRent}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-light mb-1">Next Payment</p>
                    <p className="text-sm font-semibold text-text-dark">
                      {property.nextPaymentDue}
                    </p>
                  </div>
                </div>
              </div>

              {/* Remaining Days */}
              <div className="bg-light-gray rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-accent-gold text-lg" />
                    <span className="text-sm text-text-light">
                      Contract remaining:
                    </span>
                  </div>
                  <span
                    className={`text-xl font-bold ${getRemainingDaysColor(
                      property.remainingDays
                    )}`}
                  >
                    {property.remainingDays} days
                  </span>
                </div>
              </div>

              {/* AI Reminder (if contract ending soon) */}
              {property.remainingDays <= 30 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-accent-gold/20 to-primary-navy/20 border-2 border-accent-gold rounded-xl p-4 mb-4"
                >
                  <div className="flex items-start gap-3">
                    <FaBell className="text-accent-gold text-xl flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-primary-navy mb-1">
                        AI Reminder
                      </p>
                      <p className="text-xs text-text-dark">
                        Your rent contract ends in {property.remainingDays}{" "}
                        days. Would you like to renew it?
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-primary-navy text-white rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <FaHome />
                  View Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-accent-gold text-white rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <FaSync />
                  Renew Contract
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RentedProperties;
