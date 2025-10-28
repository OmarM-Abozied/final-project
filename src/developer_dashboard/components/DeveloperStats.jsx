import { motion } from 'framer-motion';
import { FaBuilding, FaClipboardList, FaEye, FaEnvelope } from 'react-icons/fa';

const DeveloperStats = ({ stats }) => {
  const defaultStats = {
    totalProjects: 24,
    activeListings: 156,
    totalViews: 45230,
    clientRequests: 89
  };

  const statsData = stats || defaultStats;

  const statsConfig = [
    {
      label: 'Total Projects',
      value: statsData.totalProjects,
      icon: FaBuilding,
      color: '#1e3a5f'
    },
    {
      label: 'Active Listings',
      value: statsData.activeListings,
      icon: FaClipboardList,
      color: '#d4af37'
    },
    {
      label: 'Total Views',
      value: statsData.totalViews.toLocaleString(),
      icon: FaEye,
      color: '#1e3a5f'
    },
    {
      label: 'Client Requests',
      value: statsData.clientRequests,
      icon: FaEnvelope,
      color: '#d4af37'
    }
  ];

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
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-accent-gold"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <Icon className="text-2xl" style={{ color: stat.color }} />
              </div>
              <div className="text-right">
                <motion.h3
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-3xl font-bold text-text-dark"
                >
                  {stat.value}
                </motion.h3>
              </div>
            </div>
            <p className="text-text-light font-medium">{stat.label}</p>
            
            {/* Accent Line */}
            <div className="mt-4 h-1 bg-gradient-to-r from-accent-gold to-transparent rounded-full"></div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default DeveloperStats;
