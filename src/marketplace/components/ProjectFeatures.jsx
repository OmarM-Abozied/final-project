import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaCar, 
  FaDumbbell, 
  FaChild, 
  FaTree, 
  FaSwimmingPool,
  FaStore,
  FaWifi,
  FaVideo,
  FaLeaf
} from 'react-icons/fa';

const ProjectFeatures = ({ features = [] }) => {
  const featureConfig = {
    'Security': { icon: FaShieldAlt, color: 'text-red-500' },
    'Parking': { icon: FaCar, color: 'text-blue-500' },
    'Gym': { icon: FaDumbbell, color: 'text-purple-500' },
    'Playground': { icon: FaChild, color: 'text-yellow-500' },
    'Green Area': { icon: FaTree, color: 'text-green-500' },
    'Pool': { icon: FaSwimmingPool, color: 'text-cyan-500' },
    'Shopping': { icon: FaStore, color: 'text-pink-500' },
    'WiFi': { icon: FaWifi, color: 'text-indigo-500' },
    'CCTV': { icon: FaVideo, color: 'text-gray-600' },
    'Garden': { icon: FaLeaf, color: 'text-green-600' }
  };

  // Default features if none provided
  const displayFeatures = features.length > 0 
    ? features 
    : ['Security', 'Parking', 'Gym', 'Playground', 'Green Area', 'Pool'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-border-light shadow-sm">
      <h3 className="text-xl font-bold text-text-dark mb-4">Features & Amenities</h3>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
      >
        {displayFeatures.map((feature, index) => {
          const config = featureConfig[feature] || { icon: FaShieldAlt, color: 'text-accent-gold' };
          const Icon = config.icon;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center justify-center p-4 bg-light-gray rounded-lg hover:bg-light-gold/30 transition-all cursor-pointer border border-transparent hover:border-accent-gold"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Icon className={`text-3xl ${config.color}`} />
              </div>
              <span className="text-sm font-medium text-text-dark text-center">
                {feature}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ProjectFeatures;
