import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import ProjectsHero from '../components/ProjectsHero';
import ProjectFilterBar from '../components/ProjectFilterBar';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailsModal from '../components/ProjectDetailsModal';
import AiChatButton from '../components/AiChatButton';
import AiChatModal from '../components/AiChatModal';
import AiRecommendationSection from '../components/AiRecommendationSection';
import sampleProjects from '../data/sampleProjects';

const ProjectsMarketplace = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);

  // Filter projects based on active filters
  const filteredProjects = sampleProjects.filter(project => {
    // Status filter
    if (activeFilter !== 'all' && project.status !== activeFilter) {
      return false;
    }

    // City filter
    if (selectedCity && project.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.name.toLowerCase().includes(query) ||
        project.city.toLowerCase().includes(query) ||
        project.developer.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (type, value) => {
    if (type === 'city') {
      setSelectedCity(value);
    }
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* AI Upgrade Banner */}
      {showUpgradeBanner && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-accent-gold to-primary-navy text-white py-3 px-6 relative"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <p className="text-sm md:text-base font-medium">
                <strong>Upgrade to AI Plan</strong> for Smart Property Recommendations & Advanced Search
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-white text-primary-navy rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
              >
                Upgrade Now
              </motion.button>
              <button
                onClick={() => setShowUpgradeBanner(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <ProjectsHero 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

        {/* AI Recommendations */}
        <AiRecommendationSection 
          projects={sampleProjects}
          onProjectClick={handleProjectClick}
        />

        {/* Filter Bar */}
        <ProjectFilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Projects Grid */}
        <div className="mb-12">
          {filteredProjects.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={handleProjectClick}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold text-text-dark mb-2">
                No Projects Found
              </h3>
              <p className="text-text-light mb-6">
                Try adjusting your filters or search criteria
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                  setSelectedCity('');
                }}
                className="px-8 py-3 bg-accent-gold text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Results Summary */}
        {filteredProjects.length > 0 && (
          <div className="text-center text-text-light">
            Showing {filteredProjects.length} of {sampleProjects.length} projects
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      {/* AI Chat Components */}
      <AiChatButton onClick={() => setIsChatModalOpen(true)} />
      <AiChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
    </div>
  );
};

export default ProjectsMarketplace;
