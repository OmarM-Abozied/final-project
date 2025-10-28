import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMapMarkerAlt, FaBuilding, FaChevronLeft, FaChevronRight, FaPhone, FaEnvelope } from 'react-icons/fa';
import ProjectFeatures from './ProjectFeatures';
import DeveloperInfoCard from './DeveloperInfoCard';
import InquiryForm from './InquiryForm';

const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  if (!project) return null;

  const {
    projectName, // 👈 غيّر من name
    location, // 👈 أضف location object
    developer,
    status,
    description,
    images = [],
    price,
    units,
    features = [],
    completionPercentage = 0,
    developerInfo = {},
  } = project;

  const city = location?.city || location?.area || "Unknown Location"; // 👈 استخرج city من location

  const galleryImages = images.length > 0 ? images : [project.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const statusConfig = {
    "under-construction": { color: "bg-blue-500", label: "Under Construction" },
    completed: { color: "bg-green-500", label: "Completed" },
    upcoming: { color: "bg-accent-gold", label: "Upcoming" },
  };

  const currentStatus = statusConfig[status] || statusConfig["upcoming"];

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-border-light px-6 py-4 flex items-center justify-between rounded-t-xl z-10 shadow-sm">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-1">
                  {projectName} {/* 👈 غيّر من name */}
                </h2>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-text-light">
                    <FaMapMarkerAlt className="text-accent-gold" />
                    <span>{city}</span>
                  </div>
                  <div
                    className={`${currentStatus.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                  >
                    {currentStatus.label}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-light-gray rounded-full transition-colors ml-4"
              >
                <FaTimes className="text-text-light text-xl" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Image Gallery */}
              <div className="mb-8">
                <div className="relative h-96 rounded-xl overflow-hidden bg-light-gray">
                  <img
                    src={galleryImages[currentImageIndex]}
                    alt={`${projectName} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Gallery Navigation */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                      >
                        <FaChevronLeft className="text-primary-navy" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                      >
                        <FaChevronRight className="text-primary-navy" />
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {galleryImages.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {galleryImages.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {galleryImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-accent-gold scale-105"
                            : "border-border-light hover:border-accent-gold"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Left Side */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Price & Units */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {price && (
                      <div className="bg-light-gold/30 rounded-xl p-4 border border-accent-gold/30">
                        <p className="text-sm text-text-light mb-1">
                          Starting Price
                        </p>
                        <p className="text-2xl font-bold text-primary-navy">
                          {price}
                        </p>
                      </div>
                    )}
                    {units && (
                      <div className="bg-light-gray rounded-xl p-4 border border-border-light">
                        <p className="text-sm text-text-light mb-1">
                          Available Units
                        </p>
                        <p className="text-2xl font-bold text-text-dark">
                          {units}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar for Under Construction */}
                  {status === "under-construction" &&
                    completionPercentage > 0 && (
                      <div className="bg-white rounded-xl p-6 border border-border-light shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-text-dark">
                            Construction Progress
                          </h4>
                          <span className="text-2xl font-bold text-primary-navy">
                            {completionPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-light-gray rounded-full h-4 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${completionPercentage}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-gradient-to-r from-accent-gold to-primary-navy rounded-full"
                          />
                        </div>
                      </div>
                    )}

                  {/* Description */}
                  <div className="bg-white rounded-xl p-6 border border-border-light shadow-sm">
                    <h3 className="text-xl font-bold text-text-dark mb-4">
                      About This Project
                    </h3>
                    <p className="text-text-light leading-relaxed">
                      {description ||
                        "No description available for this project."}
                    </p>
                  </div>

                  {/* Features */}
                  <ProjectFeatures features={features} />

                  {/* Map Placeholder */}
                  <div className="bg-white rounded-xl p-6 border border-border-light shadow-sm">
                    <h3 className="text-xl font-bold text-text-dark mb-4">
                      Location
                    </h3>
                    <div className="h-64 bg-light-gray rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <FaMapMarkerAlt className="text-6xl text-accent-gold mx-auto mb-3" />
                        <p className="text-text-light">{city}</p>
                        <p className="text-sm text-text-light mt-2">
                          Map integration coming soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar - Right Side */}
                <div className="space-y-6">
                  {/* Developer Info */}
                  <DeveloperInfoCard
                    developer={{
                      name: developerInfo.name || "Developer Name", // لو الاسم موجود
                      ...developerInfo,
                    }}
                  />

                  {showInquiryForm && (
                    <InquiryForm
                      projectName={projectName}
                      developerName={developerInfo.name || "Developer Name"}
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
