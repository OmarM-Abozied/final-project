import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import { useRef } from 'react';

const AiRecommendationSection = ({ projects, onProjectClick }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const recommendedProjects = projects.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-accent-gold to-primary-navy rounded-full flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-dark">
              Projects You Might Like
            </h2>
          </div>
          <p className="text-text-light ml-13">
            Personalized recommendations based on your preferences
          </p>
        </div>

        {/* Navigation Buttons - Desktop */}
        <div className="hidden md:flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('left')}
            className="p-3 bg-white border-2 border-accent-gold rounded-full hover:bg-accent-gold hover:text-white transition-all shadow-md"
          >
            <FaChevronLeft />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('right')}
            className="p-3 bg-white border-2 border-accent-gold rounded-full hover:bg-accent-gold hover:text-white transition-all shadow-md"
          >
            <FaChevronRight />
          </motion.button>
        </div>
      </div>

      {/* Scrollable Projects Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-light-gray to-transparent z-10 pointer-events-none"></div>
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-light-gray to-transparent z-10 pointer-events-none"></div>

        {/* Horizontal Scroll Area */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {recommendedProjects.map((project) => (
            <div key={project.id} className="flex-shrink-0 w-80 md:w-96">
              <ProjectCard
                project={project}
                onClick={onProjectClick}
                isAiRecommended={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex md:hidden justify-center gap-2 mt-4">
        {recommendedProjects.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-accent-gold/30"
          />
        ))}
      </div>

      {/* See All Button */}
      <div className="text-center mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-accent-gold to-primary-navy text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          See All AI Recommendations
        </motion.button>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
};

export default AiRecommendationSection;
