import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

const AiChatButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 group"
    >
      {/* Glowing Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-primary-navy rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"></div>
      
      {/* Main Button */}
      <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-accent-gold to-primary-navy rounded-full shadow-2xl flex items-center justify-center text-white">
        <FaRobot className="text-2xl md:text-3xl" />
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap hidden md:block"
      >
        <p className="text-sm font-semibold text-primary-navy">Ask AI Agent</p>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
          <div className="w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-white border-b-8 border-b-transparent"></div>
        </div>
      </motion.div>

      {/* Mobile Label */}
      <div className="md:hidden absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-xs font-semibold text-primary-navy whitespace-nowrap">Ask AI</p>
      </div>
    </motion.button>
  );
};

export default AiChatButton;
