import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

const VirtualAgentPreview = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  const chatMessages = [
    {
      type: 'user',
      message: "Hi, I'm interested in the property at 123 Oak Street. Can you tell me more about it?",
      timestamp: "2:34 PM"
    },
    {
      type: 'agent',
      message: "Hello! I'd be happy to help you with that beautiful property. The 123 Oak Street home is a stunning 3-bedroom, 2-bathroom colonial with 2,100 sq ft of living space, built in 2018.",
      timestamp: "2:34 PM"
    },
    {
      type: 'agent',
      message: "Key features include hardwood floors throughout, a modern kitchen with granite countertops, and a spacious backyard perfect for entertaining. The neighborhood is highly rated for schools and has excellent walkability.",
      timestamp: "2:35 PM"
    },
    {
      type: 'user',
      message: "What's the asking price and when can I schedule a viewing?",
      timestamp: "2:36 PM"
    },
    {
      type: 'agent',
      message: "The asking price is $485,000. Based on recent comparable sales in the area, this is competitively priced and represents excellent value. I can schedule a viewing for you today or tomorrow - which works better for your schedule?",
      timestamp: "2:36 PM"
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % chatMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, chatMessages.length]);

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2c3e50] mb-6">
              See Your <span className="text-[#d4af37]">AI Agent</span> in Action
            </h2>
            <p className="text-xl text-[#6c757d] mb-8 leading-relaxed">
              Watch how your virtual real estate broker engages with potential clients, 
              providing instant responses and valuable property insights 24/7.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1e3a5f] font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#2c3e50] mb-2">Instant Response</h3>
                  <p className="text-[#6c757d]">Your AI agent responds immediately to every inquiry, capturing leads that might otherwise be lost.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1e3a5f] font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#2c3e50] mb-2">Smart Conversations</h3>
                  <p className="text-[#6c757d]">Engages in natural, helpful conversations while gathering important lead qualification data.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1e3a5f] font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#2c3e50] mb-2">Schedule & Convert</h3>
                  <p className="text-[#6c757d]">Automatically schedules viewings and hands off qualified leads to you for closing.</p>
                </div>
              </div>
            </div>

            <button className="mt-8 bg-[#d4af37] text-[#1e3a5f] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#f5e6a8] transition-all duration-300 transform hover:scale-105">
              Try Demo Conversation
            </button>
          </motion.div>

          {/* Right Side - Chat Interface */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            variants={floatingVariants}
            animate="animate"
          >
            {/* Mobile Frame */}
            <div className="relative mx-auto w-80 h-[600px] bg-[#1e3a5f] rounded-[3rem] p-4 shadow-2xl">
              {/* Screen */}
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {/* Header */}
                <div className="bg-[#d4af37] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center">
                      <span className="text-[#d4af37] font-bold text-sm">AI</span>
                    </div>
                    <div>
                      <h4 className="text-[#1e3a5f] font-semibold">Real Estate AI</h4>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-[#1e3a5f] text-xs">Online</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <PauseIcon className="w-4 h-4 text-[#d4af37]" />
                    ) : (
                      <PlayIcon className="w-4 h-4 text-[#d4af37]" />
                    )}
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="p-4 h-[calc(100%-80px)] overflow-y-auto space-y-4">
                  {chatMessages.slice(0, currentMessage + 1).map((msg, index) => (
                    <motion.div
                      key={index}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-2xl ${
                          msg.type === 'user'
                            ? 'bg-[#1e3a5f] text-white rounded-br-none'
                            : 'bg-[#f5e6a8] text-[#2c3e50] rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.message}</p>
                        <span className={`text-xs mt-1 block ${
                          msg.type === 'user' ? 'text-gray-300' : 'text-[#6c757d]'
                        }`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {currentMessage < chatMessages.length - 1 && chatMessages[currentMessage + 1]?.type === 'agent' && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="bg-[#f5e6a8] p-3 rounded-2xl rounded-bl-none">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-[#6c757d] rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-[#6c757d] rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-[#6c757d] rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Live Demo
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-[#d4af37] text-[#1e3a5f] px-3 py-1 rounded-full text-sm font-semibold"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              24/7 Available
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VirtualAgentPreview;