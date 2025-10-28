import { motion } from 'framer-motion';
import { FaBuilding, FaHammer, FaCheckCircle, FaClock } from 'react-icons/fa';

const ProjectFilterBar = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Projects', icon: FaBuilding },
    { id: 'under-construction', label: 'Under Construction', icon: FaHammer },
    { id: 'completed', label: 'Completed', icon: FaCheckCircle },
    { id: 'upcoming', label: 'Upcoming', icon: FaClock }
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;

          return (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onFilterChange(filter.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-md
                transition-all duration-300
                ${isActive 
                  ? 'bg-accent-gold text-white shadow-lg' 
                  : 'bg-white text-text-dark hover:bg-light-gold hover:border-accent-gold border-2 border-transparent'
                }
              `}
            >
              <Icon className={`text-lg ${isActive ? 'text-white' : 'text-accent-gold'}`} />
              <span className="hidden sm:inline">{filter.label}</span>
              <span className="sm:hidden">{filter.label.split(' ')[0]}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-text-light text-sm"
      >
        <span className="font-semibold text-text-dark">
          {activeFilter === 'all' ? 'All' : filters.find(f => f.id === activeFilter)?.label}
        </span>
        {' '}projects available
      </motion.div>
    </div>
  );
};

export default ProjectFilterBar;
