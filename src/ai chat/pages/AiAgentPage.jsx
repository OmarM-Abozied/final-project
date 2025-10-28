import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VirtualCharacter from '../components/VirtualCharacter';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';

const AiAgentPage = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Sample AI responses
  const aiResponses = [
    "I'd be happy to help you with your property questions! What would you like to know?",
    "That's a great question! Based on current market trends, I can provide you with some insights.",
    "Let me analyze that for you. Here are some key points to consider...",
    "I understand your concern. Property investment can be complex, but I'm here to guide you.",
    "Excellent choice! That area has shown promising growth potential recently.",
    "I can help you with property valuations, market analysis, and investment advice. What interests you most?",
    "Based on the data I have access to, here's what I recommend...",
    "That's an interesting property type. Let me share some relevant information with you."
  ];

  // Add welcome message on component mount
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm Alex, your AI Property Assistant. I'm here to help you with property advice, market insights, and investment guidance. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = (messageText) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-20 min-h-screen bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300 flex flex-col lg:flex-row"
    >
        {/* Character Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:w-[30%] h-64 lg:h-full p-4"
        >
          <div className="h-full">
            <VirtualCharacter />
          </div>
        </motion.div>

        {/* Chat Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:w-[70%] flex-1 flex flex-col bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl m-4 lg:ml-0 lg:mr-4 overflow-hidden transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600 px-6 py-4 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <div>
                  <span className="text-[#2c3e50] dark:text-gray-100 font-semibold text-lg transition-colors duration-300">Alex Thompson</span>
                  <p className="text-[#6c757d] dark:text-gray-400 text-sm">AI Real Estate Assistant • Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-[#d4af37]/20 text-[#d4af37] px-3 py-1 rounded-full text-xs font-semibold">
                  PREMIUM
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <ChatMessages messages={messages} isTyping={isTyping} />
            <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
          </div>
        </motion.div>
    </motion.div>
  );
};

export default AiAgentPage;