import { motion } from 'framer-motion';
import { FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';

const DeveloperInfoCard = ({ developer }) => {
  const {
    name = 'Developer Name',
    logo = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=80&fit=crop',
    location = 'Dubai, UAE',
    phone = '+971 4 123 4567',
    email = 'info@developer.com',
    website = 'www.developer.com',
    totalProjects = 12,
    description = 'Leading real estate developer committed to excellence.'
  } = developer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 border-2 border-accent-gold/30 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border-light">
        <div className="w-16 h-16 rounded-lg bg-light-gray flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-lg text-text-dark truncate">{name}</h4>
          <div className="flex items-center gap-2 text-text-light text-sm mt-1">
            <FaBuilding className="text-accent-gold flex-shrink-0" />
            <span className="truncate">{totalProjects} Projects</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-text-light mb-4 leading-relaxed">
        {description}
      </p>

      {/* Contact Info */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <FaMapMarkerAlt className="text-accent-gold flex-shrink-0" />
          <span className="text-text-dark">{location}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <FaPhone className="text-accent-gold flex-shrink-0" />
          <a href={`tel:${phone}`} className="text-primary-navy hover:underline">
            {phone}
          </a>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <FaEnvelope className="text-accent-gold flex-shrink-0" />
          <a href={`mailto:${email}`} className="text-primary-navy hover:underline truncate">
            {email}
          </a>
        </div>

        {website && (
          <div className="flex items-center gap-3 text-sm">
            <FaGlobe className="text-accent-gold flex-shrink-0" />
            <a 
              href={`https://${website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-navy hover:underline truncate"
            >
              {website}
            </a>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-primary-navy to-accent-gold text-white rounded-lg font-semibold hover:shadow-lg transition-all"
      >
        View All Projects
      </motion.button>
    </motion.div>
  );
};

export default DeveloperInfoCard;
