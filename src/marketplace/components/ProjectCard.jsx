import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBuilding, FaCar, FaSwimmingPool, FaDumbbell, FaShieldAlt } from 'react-icons/fa';

const ProjectCard = ({ project, onClick, isAiRecommended = false }) => {
const {
  _id,
  projectName,
  location,
  developer,
  status,
  images = [],
  price,
  units,
  features = [],
} = project;

const city = location?.city || location?.area || "Unknown";
const image = images[0] || "https://via.placeholder.com/600x400";
const developerName = developer?.name || "Developer";
  const statusConfig = {
    'under-construction': { color: 'bg-blue-500', label: 'Under Construction' },
    'completed': { color: 'bg-green-500', label: 'Completed' },
    'upcoming': { color: 'bg-accent-gold', label: 'Upcoming' }
  };

  const featureIcons = {
    'parking': FaCar,
    'pool': FaSwimmingPool,
    'gym': FaDumbbell,
    'security': FaShieldAlt
  };

  const currentStatus = statusConfig[status] || statusConfig['upcoming'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick && onClick(project)}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border-light hover:border-accent-gold cursor-pointer relative"
    >
      {/* AI Recommended Badge */}
      {isAiRecommended && (
        <div className="absolute top-4 left-4 z-10 bg-accent-gold text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <span>✨</span> AI Recommended
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />

        {/* Status Badge */}
        <div
          className={`absolute top-4 right-4 ${currentStatus.color} text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm`}
        >
          {currentStatus.label}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Price Badge */}
        {price && (
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
            <p className="text-xs text-text-light">Starting from</p>
            <p className="text-lg font-bold text-primary-navy">{price}</p>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Project Name */}
        <h3 className="text-xl font-bold text-text-dark mb-2 hover:text-primary-navy transition-colors line-clamp-1">
          {projectName}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-text-light mb-3">
          <FaMapMarkerAlt className="text-accent-gold flex-shrink-0" />
          <span className="text-sm font-medium">{city}</span>
        </div>

        {/* Developer */}
        <div className="flex items-center gap-2 text-text-light mb-4">
          <FaBuilding className="text-primary-navy flex-shrink-0" />
          <span className="text-sm font-medium">{developerName}</span>
        </div>

        {/* Units Info */}
        {units && (
          <div className="mb-4 pb-4 border-b border-border-light">
            <p className="text-sm text-text-light">
              <span className="font-semibold text-text-dark">{units}</span>{" "}
              units available
            </p>
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {features.slice(0, 4).map((feature, index) => {
              const Icon = featureIcons[feature.toLowerCase()] || FaShieldAlt;
              return (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1.5 bg-light-gray rounded-full text-xs text-text-dark"
                  title={feature}
                >
                  <Icon className="text-accent-gold" />
                  <span className="hidden sm:inline">{feature}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onClick && onClick(project);
          }}
          className="w-full px-4 py-3 bg-primary-navy text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
