import React from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, StarIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to AI chat
    handleWatchChat();
  };

  const handleWatchDemo = () => {
    navigate('/about');
    console.log('Watch Demo clicked');
  };
const handleWatchChat = () => {
  navigate('/ai-chat');
};
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary-navy via-blue-900 to-primary-navy pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent-gold/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent-gold/10 to-transparent rounded-full"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent-gold/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full mx-auto px-6 pt-20 pb-16 lg:pt-32">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Left Column - Content */}
            <motion.div
              className="text-center lg:text-left space-y-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-accent-gold/10 border border-accent-gold/20 rounded-full px-6 py-3 text-accent-gold font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <StarIcon className="w-5 h-5" />
                #1 AI Real Estate Agent
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Meet Your
                <span className="block bg-gradient-to-r from-accent-gold to-light-gold bg-clip-text text-transparent">
                  AI Agent
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-gray-300 font-normal">
                  Real Estate Assistant
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Transform your real estate business with AI-powered insights, automated client interactions, and intelligent property recommendations.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <motion.button
                  onClick={handleGetStarted}
                  className="group relative bg-gradient-to-r from-accent-gold to-light-gold hover:from-light-gold hover:to-accent-gold text-primary-navy font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Get Started Free
                    <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.button>

                <motion.button
                  onClick={handleWatchDemo}
                  className="group flex items-center justify-center gap-3 border-2 border-white/20 hover:border-accent-gold/50 text-white hover:text-accent-gold font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlayIcon className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-accent-gold">500K+</div>
                  <div className="text-sm text-gray-400">Properties Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-accent-gold">98%</div>
                  <div className="text-sm text-gray-400">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-accent-gold">24/7</div>
                  <div className="text-sm text-gray-400">AI Availability</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Virtual Agent */}
            <motion.div
              className="relative flex items-center justify-center lg:justify-end"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-80 h-80 lg:w-[450px] lg:h-[500px]">
                {/* Main Agent Container */}
                <motion.div
                  className="relative w-full h-full"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Agent Screen/Monitor */}
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl border border-accent-gold/20 overflow-hidden">
                    {/* Screen Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-blue-500/5 to-transparent rounded-3xl"></div>
                    
                    {/* Screen Content */}
                    <div className="relative w-full h-full p-6 flex flex-col">
                      {/* Header Bar */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-accent-gold text-xs font-mono">AI-AGENT-v2.0</div>
                      </div>

                      {/* Virtual Avatar Area */}
                      <div className="flex-1 flex items-center justify-center relative">
                        {/* Avatar Background */}
                        <motion.div
                          className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-accent-gold/20 to-blue-500/20 rounded-full flex items-center justify-center relative"
                          animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {/* Neural Network Pattern */}
                          <div className="absolute inset-2 rounded-full border border-accent-gold/30 bg-gradient-to-br from-primary-navy to-blue-900">
                            <div className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden">
                              {/* Circuit Pattern */}
                              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                                <defs>
                                  <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M10,0 L10,10 L0,10" stroke="#d4af37" strokeWidth="0.5" fill="none"/>
                                    <circle cx="10" cy="10" r="1" fill="#d4af37"/>
                                  </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#circuit)"/>
                              </svg>
                              
                              {/* AI Icon */}
                              <motion.div
                                className="relative z-10 text-4xl lg:text-5xl"
                                animate={{
                                  opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                <div className="text-accent-gold font-bold text-2xl lg:text-3xl">AI</div>
                              </motion.div>
                            </div>
                          </div>

                          {/* Scanning Lines */}
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.3) 50%, transparent 100%)'
                            }}
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </motion.div>
                      </div>

                      {/* Status Information */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Status:</span>
                          <div className="flex items-center gap-2">
                            <motion.div
                              className="w-2 h-2 bg-green-400 rounded-full"
                              animate={{
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            />
                            <span className="text-green-400 text-xs">Online & Active</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Response Time:</span>
                          <span className="text-accent-gold text-xs">&lt; 0.5s</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Properties Analyzed:</span>
                          <motion.span
                            className="text-blue-400 text-xs"
                            animate={{
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          >
                            500,847
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg border border-green-400/30"
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🟢 Live
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-gradient-to-r from-accent-gold to-yellow-500 text-black px-4 py-2 rounded-full text-xs font-semibold shadow-lg border border-accent-gold/30"
                    animate={{
                      y: [0, 10, 0],
                      x: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  >
                    ⚡ AI-Powered
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 -left-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg border border-blue-400/30"
                    animate={{
                      x: [0, -10, 0],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.8
                    }}
                  >
                    🏠 Real Estate Expert
                  </motion.div>
                </motion.div>

                {/* Data Streams */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 bg-gradient-to-t from-accent-gold/20 to-accent-gold rounded-full"
                    style={{
                      height: `${20 + Math.random() * 40}px`,
                      left: `${20 + i * 15}%`,
                      bottom: '-10px',
                    }}
                    animate={{
                      scaleY: [0.5, 1, 0.8, 1, 0.6],
                      opacity: [0.3, 1, 0.6, 1, 0.4],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* Orbiting Data Points */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-accent-gold/60 rounded-full shadow-lg"
                    style={{
                      top: '50%',
                      left: '50%',
                      marginTop: '-6px',
                      marginLeft: '-6px',
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    transformOrigin={`${80 + i * 20}px 0px`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          opacity: { delay: 3, duration: 0.5 }
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;