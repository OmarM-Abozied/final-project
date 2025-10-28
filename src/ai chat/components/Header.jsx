import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#1e3a5f] dark:bg-gray-800 text-white shadow-lg transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold">
            AI Property Assistant
          </h1>
          <div className="h-0.5 bg-[#d4af37] mt-2 mx-auto w-32"></div>
        </div>
        <div className="absolute right-4">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;