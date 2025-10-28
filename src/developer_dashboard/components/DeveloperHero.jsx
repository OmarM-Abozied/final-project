import { motion } from 'framer-motion';

const DeveloperHero = ({ developer }) => {
  const defaultDeveloper = {
    name: "Elite Developments",
    tagline: "Building Tomorrow's Landmarks Today",
    profilePhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=80&fit=crop"
  };

  const dev = developer || defaultDeveloper;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-xl mb-8"
      style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5282 50%, #1e3a5f 100%)'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-light-gold opacity-10 rounded-full blur-2xl"></div>

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Section */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent-gold rounded-full blur-xl opacity-50"></div>
              <img
                src={dev.profilePhoto}
                alt={dev.name}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-accent-gold shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Info Section */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Company Logo */}
              <div className="mb-4 flex justify-center md:justify-start">
                <img
                  src={dev.companyLogo}
                  alt="Company Logo"
                  className="h-12 object-contain opacity-90"
                />
              </div>

              {/* Developer Name */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                {dev.name}
              </h1>

              {/* Tagline */}
              <p className="text-light-gold text-lg md:text-xl mb-6 max-w-2xl">
                {dev.tagline}
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-accent-gold text-primary-navy font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Manage Projects
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeveloperHero;
