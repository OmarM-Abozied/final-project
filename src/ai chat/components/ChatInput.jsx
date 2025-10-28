import { useState } from 'react';
import { motion } from 'framer-motion';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-600 px-6 py-5 transition-colors duration-300 shadow-lg"
    >
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <div className="flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            disabled={disabled}
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
          />
        </div>
        
        <motion.button
          type="submit"
          disabled={!message.trim() || disabled}
          whileHover={{ 
            scale: message.trim() && !disabled ? 1.05 : 1,
            backgroundColor: message.trim() && !disabled ? '#d4af37' : undefined
          }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-4 bg-gradient-to-r from-[#1e3a5f] to-[#2c4f70] dark:from-gray-700 dark:to-gray-600 text-white rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:from-[#d4af37] hover:to-[#e6c249] dark:hover:from-[#d4af37] dark:hover:to-[#e6c249] focus:outline-none focus:ring-4 focus:ring-[#d4af37]/30 shadow-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ChatInput;