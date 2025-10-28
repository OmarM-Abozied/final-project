import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const ProjectsHero = ({ onSearch, onFilterChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-xl mb-8"
      style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5282 50%, #f5e6a8 100%)'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-light-gold opacity-20 rounded-full blur-2xl"></div>

      <div className="relative z-10 px-6 py-16 md:px-12 md:py-24">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Explore Real Estate Projects
          </h1>
          <p className="text-light-gold text-lg md:text-xl max-w-3xl mx-auto">
            Discover projects under construction, completed, or upcoming
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-light" />
                <input
                  type="text"
                  placeholder="Search by city, developer, or project name..."
                  onChange={(e) => onSearch && onSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all text-text-dark"
                />
              </div>

              {/* City Filter Dropdown */}
              <div className="relative md:w-64">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-gold" />
                <select
                  onChange={(e) => onFilterChange && onFilterChange('city', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all text-text-dark appearance-none cursor-pointer bg-white"
                >
                  <option value="">All Cities</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="New Cairo">New Cairo</option>
                  <option value="6th October">6th October</option>
                  <option value="Sheikh Zayed">Sheikh Zayed</option>
                </select>
              </div>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-accent-gold text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
              >
                Search Projects
              </motion.button>
            </div>

            {/* Quick Filters */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-text-light text-sm font-medium">Quick filters:</span>
              {['Luxury Villas', 'Apartments', 'Under 2M', 'Ready to Move'].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-light-gray text-text-dark text-sm rounded-full hover:bg-accent-gold hover:text-white transition-all"
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectsHero;
