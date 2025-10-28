import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-opacity-50"
    >
      <motion.div
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
        className="w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center"
      >
        {isDark ? (
          <svg className="w-3 h-3 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
          </svg>
        ) : (
          <svg className="w-3 h-3 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2.25a.75.75,0,0,0-.75.75v2.5a.75.75,0,0,0,1.5,0V3A.75.75,0,0,0,12,2.25ZM19.78,4.22a.75.75,0,1,0-1.06,1.06L20.5,7.06a.75.75,0,0,0,1.06-1.06ZM21,11.25H18.5a.75.75,0,0,0,0,1.5H21a.75.75,0,0,0,0-1.5Zm-1.72,7.69a.75.75,0,1,0-1.06,1.06l1.78,1.78a.75.75,0,0,0,1.06-1.06ZM12,21.75a.75.75,0,0,0,.75-.75V18.5a.75.75,0,0,0-1.5,0V21A.75.75,0,0,0,12,21.75ZM4.22,19.78a.75.75,0,1,0,1.06-1.06L3.5,16.94a.75.75,0,1,0-1.06,1.06ZM3,12.75H5.5a.75.75,0,0,0,0-1.5H3a.75.75,0,0,0,0,1.5ZM4.22,4.22A.75.75,0,0,0,3.16,5.28L4.94,7.06A.75.75,0,1,0,6,6ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;