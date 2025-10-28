import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

const AiChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Hello! I'm your AI Real Estate Assistant. How can I help you find the perfect project today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "Show me projects under 2M in New Cairo",
    "Which developer has the most completed projects?",
    "Luxury villas in Dubai",
    "Projects with swimming pools"
  ];

  const handleSendMessage = async (text = inputText) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAiResponse(text);
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAiResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('2m') || lowerQuery.includes('price')) {
      return "I found 3 projects under 2M in New Cairo: Marina Heights (1.8M), Green Valley (1.5M), and Sunset Residences (1.9M). Would you like to see more details about any of these?";
    } else if (lowerQuery.includes('developer')) {
      return "Based on our database, Elite Developments has the most completed projects with 18 successful deliveries. They're known for quality construction and timely handovers. Would you like to explore their portfolio?";
    } else if (lowerQuery.includes('luxury') || lowerQuery.includes('villa')) {
      return "I found 5 luxury villa projects in Dubai: Palm Beachfront Villas (from 8M), Arabian Ranches Estate (from 6.5M), and Downtown Luxury Mansions (from 12M). All feature premium amenities and prime locations.";
    } else if (lowerQuery.includes('pool') || lowerQuery.includes('swimming')) {
      return "Great choice! I found 8 projects with swimming pools: Marina Bay Residences, JBR Beach Apartments, and Palm Jumeirah Towers all feature beautiful pool facilities. Shall I filter by price range?";
    } else {
      return "I can help you find the perfect project! Try asking about specific cities, price ranges, or amenities you're looking for. You can also ask about developers or project types like villas or apartments.";
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-t-3xl md:rounded-xl shadow-2xl w-full md:max-w-2xl h-[85vh] md:h-[600px] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-navy to-accent-gold px-6 py-4 rounded-t-3xl md:rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <FaRobot className="text-accent-gold text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-bold">AI Real Estate Assistant</h3>
                  <p className="text-light-gold text-xs">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <FaTimes className="text-white text-xl" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-light-gray">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'ai' 
                      ? 'bg-gradient-to-r from-accent-gold to-primary-navy' 
                      : 'bg-primary-navy'
                  }`}>
                    {message.type === 'ai' ? (
                      <FaRobot className="text-white text-sm" />
                    ) : (
                      <FaUser className="text-white text-sm" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[75%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'ai'
                        ? 'bg-white text-text-dark shadow-md'
                        : 'bg-accent-gold text-white'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <p className="text-xs text-text-light mt-1 px-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-gold to-primary-navy flex items-center justify-center">
                    <FaRobot className="text-white text-sm" />
                  </div>
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-text-light rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-text-light rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-text-light rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-white border-t border-border-light">
                <p className="text-xs font-semibold text-text-light mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSendMessage(question)}
                      className="text-xs px-3 py-1.5 bg-light-gold text-primary-navy rounded-full hover:bg-accent-gold hover:text-white transition-all"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-border-light rounded-b-3xl md:rounded-b-xl">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about properties..."
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="px-6 py-3 bg-accent-gold text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FaPaperPlane />
                  <span className="hidden sm:inline">Send</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AiChatModal;
