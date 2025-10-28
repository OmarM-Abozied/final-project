import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, PlayIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-navy via-blue-900 to-primary-navy">
      {/* Header */}
      <header className="relative z-50 bg-primary-navy/80 backdrop-blur-md border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-white hover:text-accent-gold transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Home
            </button>
            <div className="text-accent-gold font-bold text-xl">AI Agent Demo</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Title */}
          <motion.h1
            className="text-4xl lg:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Watch Our
            <span className="block bg-gradient-to-r from-accent-gold to-light-gold bg-clip-text text-transparent">
              AI Agent
            </span>
            <span className="block text-3xl lg:text-5xl text-gray-300 font-normal">
              In Action
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            See how our AI-powered real estate assistant transforms property searches, 
            client interactions, and market analysis with cutting-edge technology.
          </motion.p>

          {/* Video Demo Section */}
          <motion.div
            className="relative max-w-4xl mx-auto mt-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Video Container */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border border-accent-gold/20 overflow-hidden">
              {/* Video Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary-navy to-blue-900 flex items-center justify-center relative">
                {/* Play Button */}
                <motion.button
                  className="bg-accent-gold hover:bg-light-gold text-primary-navy rounded-full p-6 shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlayIcon className="w-12 h-12" />
                </motion.button>

                {/* Demo Content Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-white text-2xl font-bold">AI Agent Demo</div>
                    <div className="text-gray-300">Click to watch interactive demo</div>
                  </div>
                </div>

                {/* Animated Elements */}
                <div className="absolute top-4 left-4 text-green-400 text-sm flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  LIVE DEMO
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              {
                icon: "🏠",
                title: "Smart Property Search",
                description: "AI-powered property matching based on client preferences and market data"
              },
              {
                icon: "💬",
                title: "Natural Conversations",
                description: "Engage with clients through natural language processing and intelligent responses"
              },
              {
                icon: "📊",
                title: "Market Analytics",
                description: "Real-time market analysis and property valuation with AI insights"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-accent-gold font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <button
              onClick={handleBackToHome}
              className="bg-gradient-to-r from-accent-gold to-light-gold hover:from-light-gold hover:to-accent-gold text-primary-navy font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started with AI Agent
            </button>
          </motion.div>
        </motion.div>
      </main>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent-gold/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default About;