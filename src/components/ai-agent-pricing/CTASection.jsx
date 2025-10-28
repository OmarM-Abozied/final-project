import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';

const CTASection = () => {
  const benefits = [
    "Start earning more in 30 days or money back",
    "No setup fees or hidden costs",
    "Cancel anytime with one click",
    "Dedicated success manager included"
  ];

  const stats = [
    { number: "10,000+", label: "Active Agents" },
    { number: "500K+", label: "Properties Sold" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "AI Availability" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#1e3a5f] via-[#2c4f7c] to-[#1e3a5f] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-[#d4af37] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-[#f5e6a8] rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA Content */}
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to <span className="text-[#d4af37]">Transform</span> Your Real Estate Business?
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of successful real estate professionals who've already revolutionized 
            their workflow with our AI agent. Start your free trial today and see results in 24 hours.
          </motion.p>

          {/* Benefits List */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 text-left"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <CheckIcon className="w-6 h-6 text-[#d4af37] flex-shrink-0" />
                <span className="text-gray-200">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group relative px-8 py-4 bg-[#d4af37] text-[#1e3a5f] font-bold text-lg rounded-xl shadow-lg overflow-hidden min-w-[200px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-[#f5e6a8]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="group px-8 py-4 border-2 border-[#d4af37] text-[#d4af37] font-semibold text-lg rounded-xl hover:bg-[#d4af37] hover:text-[#1e3a5f] transition-all duration-300 min-w-[200px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="mb-2">✓ 14-day free trial • ✓ No credit card required • ✓ Cancel anytime</p>
            <p>Trusted by leading real estate agencies worldwide</p>
          </motion.div>
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f5e6a8] rounded-full border-2 border-white flex items-center justify-center text-[#1e3a5f] font-bold text-sm"
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-[#d4af37] font-semibold">Join 10,000+ agents</div>
              <div className="text-gray-300 text-sm">who chose our AI solution</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#d4af37] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CTASection;