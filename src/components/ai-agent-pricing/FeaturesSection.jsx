import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  ChatBubbleLeftRightIcon, 
  ChartBarIcon, 
  GlobeAltIcon,
  HomeIcon,
  UserGroupIcon,
  BanknotesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const FeaturesSection = () => {
  const features = [
    {
      icon: ClockIcon,
      title: "24/7 Customer Support",
      description: "Never miss a lead again. Your AI agent responds to inquiries instantly, any time of day or night.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Smart Property Descriptions",
      description: "Generate compelling, SEO-optimized property listings that attract more qualified buyers.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: ChartBarIcon,
      title: "Market Analysis & Insights",
      description: "Get real-time market data and pricing recommendations to maximize your property values.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: GlobeAltIcon,
      title: "Multilingual Communication",
      description: "Serve international clients with support for 50+ languages and cultural nuances.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: HomeIcon,
      title: "Virtual Property Tours",
      description: "Create immersive virtual tours and schedule showings automatically with prospects.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: UserGroupIcon,
      title: "Lead Qualification",
      description: "Automatically qualify leads and prioritize hot prospects for your personal attention.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: BanknotesIcon,
      title: "Pricing Intelligence",
      description: "Dynamic pricing suggestions based on market trends, comparable sales, and demand.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: ShieldCheckIcon,
      title: "Compliance & Security",
      description: "GDPR compliant with bank-level security to protect your clients' sensitive information.",
      color: "from-red-500 to-red-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#2c3e50] mb-6">
            Why Choose Our <span className="text-[#d4af37]">AI Agent</span>?
          </h2>
          <p className="text-xl text-[#6c757d] max-w-3xl mx-auto">
            Discover the powerful features that make our AI agent the perfect partner 
            for your real estate business growth.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-full h-full text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-[#2c3e50] mb-4 group-hover:text-[#d4af37] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-[#6c757d] leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-1 bg-gradient-to-r from-[#d4af37] to-[#f5e6a8] rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c4f7c] rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Real Estate Business?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of successful agents who've already revolutionized their workflow.
            </p>
            <button className="bg-[#d4af37] text-[#1e3a5f] px-8 py-3 rounded-xl font-semibold hover:bg-[#f5e6a8] transition-colors duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;