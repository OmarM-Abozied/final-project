import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

const ChatMessages = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-end space-x-3 mb-6"
    >
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#d4af37] flex items-center justify-center text-white text-xs font-bold shadow-lg mb-1">
        AI
      </div>
      
      <div className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-xl px-4 py-3 max-w-xs shadow-md border border-gray-200 dark:border-gray-600 transition-all duration-300">
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -4, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-[#6c757d] dark:bg-gray-300 rounded-full transition-colors duration-300"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );

  const MessageBubble = ({ message, index }) => {
    const isUser = message.sender === 'user';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.4,
          delay: index * 0.1,
          ease: "easeOut"
        }}
        className={`flex mb-6 items-end space-x-3 ${isUser ? 'justify-end flex-row-reverse space-x-reverse' : 'justify-start'}`}
      >
        {/* Avatar */}
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#d4af37] flex items-center justify-center text-white text-xs font-bold shadow-lg mb-1">
            AI
          </div>
        )}
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-700 flex items-center justify-center text-white text-xs font-bold shadow-lg mb-1">
            You
          </div>
        )}
        <div
          className={`max-w-xs lg:max-w-md px-5 py-4 rounded-3xl shadow-lg transition-all duration-300 ${
            isUser
              ? 'bg-gradient-to-r from-[#d4af37] to-[#e6c249] text-white rounded-br-lg shadow-[#d4af37]/30'
              : 'bg-white dark:bg-gray-700 text-[#2c3e50] dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-lg shadow-gray-200/50 dark:shadow-gray-800/50'
          }`}
        >
          <p className="text-sm leading-relaxed font-medium">{message.text}</p>
          <span className={`text-xs mt-2 block transition-colors duration-300 ${
            isUser ? 'text-[#f5e6a8] opacity-90' : 'text-[#6c757d] dark:text-gray-400'
          }`}>
            {message.timestamp}
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900 transition-all duration-300">
      <AnimatePresence>
        {messages.map((message, index) => (
          <MessageBubble key={message.id} message={message} index={index} />
        ))}
        
        {isTyping && <TypingIndicator />}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;