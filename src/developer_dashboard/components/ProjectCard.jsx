import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaHome, FaChartLine } from "react-icons/fa";

const ProjectCard = ({ project, onEdit, onViewDetails }) => {
  // تأمين البيانات القادمة من الـ API
  const {
    projectName,
    location,
    images = [],
    units,
    completionPercentage,
    developer,
    price,
    description,
  } = project || {};

  const image = images[0] || "https://via.placeholder.com/600x400"; // صورة افتراضية

  // تحديد لون شريط التقدم حسب النسبة
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-accent-gold";
    return "bg-blue-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border-light hover:border-accent-gold"
    >
      {/* صورة المشروع */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={projectName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />

        {/* نسبة الإنجاز */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <span className="text-primary-navy font-bold text-sm">
            {completionPercentage ?? 0}% Complete
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* المحتوى */}
      <div className="p-6">
        {/* اسم المشروع */}
        <h3 className="text-xl font-bold text-text-dark mb-3 hover:text-primary-navy transition-colors">
          {projectName || "Unnamed Project"}
        </h3>

        {/* تفاصيل الموقع والوحدات */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-text-light">
            <FaMapMarkerAlt className="text-accent-gold" />
            <span className="text-sm font-medium">
              {location?.city || "Unknown City"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-text-light">
            <FaHome className="text-primary-navy" />
            <span className="text-sm font-medium">{units} Units Available</span>
          </div>

          <div className="flex items-center gap-2 text-text-light">
            <span className="text-sm font-medium text-gray-500">
              💰 Price: {price?.toLocaleString()} AED
            </span>
          </div>
        </div>

        {/* شريط التقدم */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-text-light flex items-center gap-1">
              <FaChartLine className="text-accent-gold" />
              Progress
            </span>
            <span className="text-xs font-bold text-primary-navy">
              {completionPercentage ?? 0}%
            </span>
          </div>
          <div className="w-full bg-light-gray rounded-full h-2.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage || 0}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`h-full rounded-full ${getProgressColor(
                completionPercentage
              )}`}
            />
          </div>
        </div>

        {/* الأزرار */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewDetails(project)} // 👈 أضف onClick
            className="flex-1 px-4 py-2 bg-primary-navy text-white rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-all"
          >
            View Details
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(project)} // 👈 أضف onClick
            className="flex-1 px-4 py-2 bg-accent-gold text-white rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-all"
          >
            Edit
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
