import { motion } from "framer-motion";
import {
  FaHome,
  FaMapMarkerAlt,
  FaCalendar,
  FaDollarSign,
  FaHammer,
  FaCheckCircle,
  FaEye,
  FaFileContract,
  FaChartLine,
} from "react-icons/fa";

const OwnedProperties = ({ properties }) => {
  const defaultProperties = [
    {
      id: 1,
      name: "Marina Bay Residence - Unit 504",
      location: "Dubai Marina, UAE",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      purchaseDate: "March 15, 2024",
      purchasePrice: "2.5M AED",
      currentMarketValue: "2.7M AED",
      valueIncrease: "+8%",
      deliveryStatus: "Under Construction",
      completionPercentage: 65,
      estimatedDelivery: "December 2025",
    },
    {
      id: 2,
      name: "Sky Residence - Penthouse 12A",
      location: "Downtown Dubai, UAE",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
      purchaseDate: "January 10, 2023",
      purchasePrice: "4.8M AED",
      currentMarketValue: "5.2M AED",
      valueIncrease: "+8.3%",
      deliveryStatus: "Delivered",
      completionPercentage: 100,
      estimatedDelivery: "Completed",
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

  const getStatusColor = (status) => {
    return status === "Delivered" ? "bg-green-500" : "bg-blue-500";
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-2">
            Your Owned Properties
          </h2>
          <p className="text-text-light">
            Properties you have purchased and invested in
          </p>
        </div>
        <div className="hidden md:block">
          <span className="px-4 py-2 bg-light-gold text-primary-navy rounded-full font-semibold text-sm">
            {propertiesData.length} Properties
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

              {/* Status Badge */}
              <div
                className={`absolute top-4 right-4 ${getStatusColor(
                  property.deliveryStatus
                )} text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm flex items-center gap-2`}
              >
                {property.deliveryStatus === "Delivered" ? (
                  <FaCheckCircle />
                ) : (
                  <FaHammer />
                )}
                {property.deliveryStatus}
              </div>

              {/* AI Value Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-accent-gold to-primary-navy text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <FaChartLine />
                Market Value: {property.currentMarketValue}
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

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border-light">
                <div>
                  <div className="flex items-center gap-2 text-text-light mb-1">
                    <FaCalendar className="text-primary-navy" />
                    <span className="text-xs">Purchase Date</span>
                  </div>
                  <p className="text-sm font-semibold text-text-dark">
                    {property.purchaseDate}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-text-light mb-1">
                    <FaDollarSign className="text-accent-gold" />
                    <span className="text-xs">Purchase Price</span>
                  </div>
                  <p className="text-sm font-semibold text-text-dark">
                    {property.purchasePrice}
                  </p>
                </div>
              </div>

              {/* Market Value & Increase */}
              <div className="bg-light-gold/30 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-text-light mb-1">
                      AI Estimated Value
                    </p>
                    <p className="text-lg font-bold text-primary-navy">
                      {property.currentMarketValue}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-light mb-1">Value Change</p>
                    <p className="text-lg font-bold text-green-600">
                      {property.valueIncrease}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar (for under construction) */}
              {property.deliveryStatus !== "Delivered" && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-text-light">
                      Completion Progress
                    </span>
                    <span className="text-xs font-bold text-primary-navy">
                      {property.completionPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-light-gray rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${property.completionPercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-accent-gold to-primary-navy rounded-full"
                    />
                  </div>
                  <p className="text-xs text-text-light mt-1">
                    Estimated delivery: {property.estimatedDelivery}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 bg-primary-navy text-white rounded-lg text-xs font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-1"
                >
                  <FaEye />
                  Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 bg-accent-gold text-white rounded-lg text-xs font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-1"
                >
                  <FaFileContract />
                  Contract
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 bg-light-gray text-primary-navy rounded-lg text-xs font-semibold hover:bg-light-gold transition-all flex items-center justify-center gap-1"
                >
                  <FaChartLine />
                  Track
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default OwnedProperties;
