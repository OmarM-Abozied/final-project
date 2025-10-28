import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import DeveloperHero from './DeveloperHero';
import DeveloperStats from './DeveloperStats';
import ProjectsGrid from './ProjectsGrid';
import AddProjectForm from './AddProjectForm';
import { useDispatch, useSelector } from "react-redux";
import { getSellerProperties } from "../../redux/slices/propertySlice";
import { useEffect, useState } from "react";
import ProjectDetailsModal from '../../marketplace/components/ProjectDetailsModal';

const DeveloperDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null); // 👈 أضف دي
  const [selectedProject, setSelectedProject] = useState(null); // 👈 أضف دي
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // 👈 أضف دي
  // const [projects, setProjects] = useState([
  //   {
  //     id: 1,
  //     name: "Marina Bay Residences",
  //     city: "Dubai Marina",
  //     unitsAvailable: 45,
  //     completionPercentage: 85,
  //     image:
  //       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
  //   },
  //   {
  //     id: 2,
  //     name: "Downtown Luxury Towers",
  //     city: "Downtown Dubai",
  //     unitsAvailable: 32,
  //     completionPercentage: 65,
  //     image:
  //       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
  //   },
  //   {
  //     id: 3,
  //     name: "Palm Beachfront Villas",
  //     city: "Palm Jumeirah",
  //     unitsAvailable: 18,
  //     completionPercentage: 92,
  //     image:
  //       "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
  //   },
  //   {
  //     id: 4,
  //     name: "Business Bay Complex",
  //     city: "Business Bay",
  //     unitsAvailable: 67,
  //     completionPercentage: 48,
  //     image:
  //       "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
  //   },
  //   {
  //     id: 5,
  //     name: "Arabian Ranches Community",
  //     city: "Arabian Ranches",
  //     unitsAvailable: 28,
  //     completionPercentage: 75,
  //     image:
  //       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
  //   },
  //   {
  //     id: 6,
  //     name: "JBR Beach Apartments",
  //     city: "Jumeirah Beach",
  //     unitsAvailable: 52,
  //     completionPercentage: 55,
  //     image:
  //       "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop",
  //   },
  // ]);

  const [stats, setStats] = useState({
    totalProjects: 24,
    activeListings: 156,
    totalViews: 45230,
    clientRequests: 89,
  });
  const dispatch = useDispatch();
  const { sellerProperties = [], loading = false } = useSelector(
    (state) => state.propertiesReducer || {}
  );
  // const handleAddProject = (projectData) => {
  //   const newProject = {
  //     id: projects.length + 1,
  //     name: projectData.projectName,
  //     city: projectData.location,
  //     unitsAvailable: parseInt(projectData.unitsCount),
  //     completionPercentage: 0,
  //     image: projectData.images[0]
  //       ? URL.createObjectURL(projectData.images[0])
  //       : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"
  //   };

  //   setProjects(prev => [...prev, newProject]);
  //   setStats(prev => ({
  //     ...prev,
  //     totalProjects: prev.totalProjects + 1,
  //     activeListings: prev.activeListings + parseInt(projectData.unitsCount)
  //   }));
  // };
  // Load properties on mount
  useEffect(() => {
    dispatch(getSellerProperties());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <DeveloperHero />

        {/* Stats Section */}
        <DeveloperStats stats={stats} />

        {/* Projects Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <ProjectsGrid
            projects={sellerProperties}
            onEdit={(project) => {
              setEditingProject(project);
              setIsFormOpen(true);
            }}
            onViewDetails={(project) => {
              // 👈 أضف دي
              setSelectedProject(project);
              setIsDetailsOpen(true);
            }}
          />
        </div>

        {/* Desktop Add Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFormOpen(true)}
          className="hidden md:flex mt-8 mx-auto items-center gap-3 px-8 py-4 bg-accent-gold text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <FaPlus />
          Add New Project
        </motion.button>
      </div>

      {/* Mobile Fixed Add Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsFormOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-16 h-16 bg-accent-gold text-white rounded-full shadow-2xl flex items-center justify-center z-40"
      >
        <FaPlus className="text-2xl" />
      </motion.button>

      {/* Add Project Form Modal */}
      <AddProjectForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProject(null); // 👈 Reset عند الإغلاق
        }}
        editingProject={editingProject} // 👈 أضف دي
      />
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedProject(null);
        }}
      />
    </div>
  );
};

export default DeveloperDashboard;
