import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaEnvelope, FaComment, FaPaperPlane } from 'react-icons/fa';

const InquiryForm = ({ projectName, developerName }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: `I'm interested in ${projectName}. Please provide more details.`
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Inquiry submitted:', formData);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl p-6 border border-border-light shadow-lg"
    >
      <h4 className="text-lg font-bold text-text-dark mb-4">Send Inquiry</h4>

      {isSubmitted ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaPaperPlane className="text-3xl text-green-500" />
          </div>
          <h5 className="text-xl font-bold text-green-600 mb-2">Inquiry Sent!</h5>
          <p className="text-text-light">
            {developerName} will contact you soon.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-2">
              Your Name *
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                placeholder="+971 50 123 4567"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-2">
              Email Address *
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-2">
              Message *
            </label>
            <div className="relative">
              <FaComment className="absolute left-3 top-3 text-text-light" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all resize-none"
                placeholder="I'm interested in this project..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 bg-accent-gold text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <FaPaperPlane />
            Send Inquiry
          </motion.button>

          <p className="text-xs text-text-light text-center">
            By submitting, you agree to be contacted by {developerName}
          </p>
        </form>
      )}
    </motion.div>
  );
};

export default InquiryForm;
