import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';


const ProjectsGrid = ({ projects, onEdit, onViewDetails }) => {
  const defaultProjects = [
    {
      id: 1,
      name: "Marina Bay Residences",
      city: "Dubai Marina",
      unitsAvailable: 45,
      completionPercentage: 85,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Downtown Luxury Towers",
      city: "Downtown Dubai",
      unitsAvailable: 32,
      completionPercentage: 65,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Palm Beachfront Villas",
      city: "Palm Jumeirah",
      unitsAvailable: 18,
      completionPercentage: 92,
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Business Bay Complex",
      city: "Business Bay",
      unitsAvailable: 67,
      completionPercentage: 48,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    },
    {
      id: 5,
      name: "Arabian Ranches Community",
      city: "Arabian Ranches",
      unitsAvailable: 28,
      completionPercentage: 75,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    },
    {
      id: 6,
      name: "JBR Beach Apartments",
      city: "Jumeirah Beach",
      unitsAvailable: 52,
      completionPercentage: 55,
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop",
    },
  ];

  const projectsData = projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-2">
            My Projects
          </h2>
          <p className="text-text-light">
            Manage and track all your development projects
          </p>
        </div>
        <div className="hidden md:block">
          <span className="px-4 py-2 bg-light-gold text-primary-navy rounded-full font-semibold text-sm">
            {projectsData.length} Projects
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projectsData.map((project) => (
          <ProjectCard
            key={project._id} // 👈 تأكد إن بتستخدم _id
            project={project}
            onEdit={onEdit}
            onViewDetails={onViewDetails} // 👈 أضف دي
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {projectsData.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🏗️</div>
          <h3 className="text-xl font-semibold text-text-dark mb-2">
            No Projects Yet
          </h3>
          <p className="text-text-light mb-6">
            Start by adding your first project
          </p>
          <button className="px-6 py-3 bg-accent-gold text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all">
            Add New Project
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectsGrid;
