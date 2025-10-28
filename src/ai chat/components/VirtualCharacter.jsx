import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

const VirtualCharacter = () => {
  // TODO: Replace with professional real estate agent character
  // Load your custom Lottie animation here: import characterAnimation from './animations/real-estate-agent.json';
  const animationData = {
    "v": "5.5.7",
    "fr": 30,
    "ip": 0,
    "op": 60,
    "w": 200,
    "h": 200,
    "nm": "Simple Waving Animation",
    "ddd": 0,
    "assets": [],
    "layers": [
      {
        "ddd": 0,
        "ind": 1,
        "ty": 4,
        "nm": "Circle",
        "sr": 1,
        "ks": {
          "o": { "a": 0, "k": 100 },
          "r": { "a": 1, "k": [
            { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 0, "s": [0] },
            { "t": 30, "s": [20] },
            { "t": 60, "s": [0] }
          ]},
          "p": { "a": 0, "k": [100, 100, 0] },
          "a": { "a": 0, "k": [0, 0, 0] },
          "s": { "a": 1, "k": [
            { "i": { "x": [0.833, 0.833, 0.833], "y": [0.833, 0.833, 0.833] }, "o": { "x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167] }, "t": 0, "s": [100, 100, 100] },
            { "i": { "x": [0.833, 0.833, 0.833], "y": [0.833, 0.833, 0.833] }, "o": { "x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167] }, "t": 30, "s": [110, 110, 100] },
            { "t": 60, "s": [100, 100, 100] }
          ]}
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "d": 1,
                "ty": "el",
                "s": { "a": 0, "k": [60, 60] },
                "p": { "a": 0, "k": [0, 0] }
              },
              {
                "ty": "fl",
                "c": { "a": 0, "k": [0.831, 0.686, 0.216, 1] }
              }
            ]
          }
        ],
        "ip": 0,
        "op": 60,
        "st": 0
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-[#1e3a5f] via-[#2c4f70] to-[#d4af37] dark:from-gray-800 dark:via-gray-700 dark:to-[#d4af37] rounded-2xl p-6 relative overflow-hidden transition-all duration-300"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
        <div className="absolute top-8 right-8 w-4 h-4 border border-white rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-6 h-6 border border-white rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full"></div>
      </div>
      
      {/* Floating particles */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          delay: 0
        }}
        className="absolute top-6 left-6 w-2 h-2 bg-[#d4af37] rounded-full"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          delay: 1
        }}
        className="absolute top-12 right-12 w-1.5 h-1.5 bg-white rounded-full"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, -25, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          delay: 2
        }}
        className="absolute bottom-12 left-8 w-1 h-1 bg-[#f5e6a8] rounded-full"
      ></motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="w-40 h-40 flex items-center justify-center mb-4"
      >
        <div className="w-40 h-40 bg-gradient-to-br from-white to-gray-50 rounded-full flex items-center justify-center shadow-2xl border-4 border-white relative overflow-hidden">
          {/* Professional Avatar Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f8f9fa] via-white to-[#e9ecef] rounded-full"></div>
          
          {/* Professional Icon/Avatar */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Professional Business Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center shadow-xl border-2 border-[#d4af37] mb-2">
              <svg className="w-12 h-12 text-[#1e3a5f]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5L12 7L9 5.5L3 7V9H4V20H5V9H7V20H8V9H10V20H11V9H13V20H14V9H16V20H17V9H19V20H20V9H21ZM12 8.5C12.83 8.5 13.5 9.17 13.5 10C13.5 10.83 12.83 11.5 12 11.5C11.17 11.5 10.5 10.83 10.5 10C10.5 9.17 11.17 8.5 12 8.5Z"/>
              </svg>
            </div>
            
            {/* Professional Badge */}
            <div className="bg-gradient-to-r from-[#d4af37] to-[#f1c54e] text-[#1e3a5f] px-4 py-1.5 rounded-full text-sm font-bold shadow-lg border-2 border-white">
              ⭐ EXPERT AGENT
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-2 right-2 w-3 h-3 bg-[#d4af37] rounded-full opacity-60"></div>
          <div className="absolute bottom-3 left-3 w-2 h-2 bg-[#1e3a5f] rounded-full opacity-40"></div>
          <div className="absolute top-1/2 left-1 w-1 h-1 bg-[#d4af37] rounded-full opacity-50"></div>
        </div>
      </motion.div>
      
      {/* Professional Information Cards */}
      <div className="grid grid-cols-2 gap-2 mb-4 w-full px-2">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="bg-white/20 dark:bg-gray-800/30 backdrop-blur rounded-lg p-2 text-center transition-colors duration-300"
        >
          <div className="text-[#d4af37] text-lg font-bold">24/7</div>
          <div className="text-white text-xs">Available</div>
        </motion.div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="bg-white/20 dark:bg-gray-800/30 backdrop-blur rounded-lg p-2 text-center transition-colors duration-300"
        >
          <div className="text-[#d4af37] text-lg font-bold">AI</div>
          <div className="text-white text-xs">Powered</div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <h3 className="text-white text-xl font-bold mb-1 tracking-wide">
          Alex Thompson
        </h3>
        <div className="bg-[#d4af37] text-[#1e3a5f] px-3 py-1 rounded-full text-sm font-semibold mb-2">
          Senior Property Advisor
        </div>
        <p className="text-[#f5e6a8] text-sm leading-relaxed">
          Expert AI Real Estate Agent
        </p>
        <p className="text-white/80 text-xs mt-2 leading-relaxed">
          Specializing in property investment, market analysis, and personalized recommendations
        </p>
        
        {/* Professional Stats */}
        <div className="flex items-center justify-center space-x-4 mt-3 text-xs">
          <div className="text-center">
            <div className="text-[#d4af37] font-bold">500K+</div>
            <div className="text-white/70">Properties</div>
          </div>
          <div className="w-px h-8 bg-white/30"></div>
          <div className="text-center">
            <div className="text-[#d4af37] font-bold">99%</div>
            <div className="text-white/70">Satisfaction</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VirtualCharacter;