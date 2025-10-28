import { motion } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const AIAssistantChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: "Hello! I'm your AI Real Estate Assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "What's my property value?",
    "Should I renew my rent contract?",
    "Show me market trends",
    "Calculate my ROI",
  ];

  const handleSendMessage = async (text = inputText) => {
    if (!text.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateAiResponse(text);
      const aiMessage = {
        id: messages.length + 2,
        type: "ai",
        text: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAiResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("value") || lowerQuery.includes("property")) {
      return "Your total property portfolio value is 7.9M AED with a +8.2% increase from your initial investment of 7.3M AED. Sky Residence has grown 8% this quarter!";
    } else if (
      lowerQuery.includes("renew") ||
      lowerQuery.includes("contract")
    ) {
      return "Your Palm Beachfront Apartment contract ends in 75 days. Based on market trends, I recommend renewing now to lock in the current rate. Would you like me to draft a renewal request?";
    } else if (lowerQuery.includes("market") || lowerQuery.includes("trend")) {
      return "Dubai real estate market is showing an upward trend with +5.5% quarter growth. Your properties are in prime locations with strong appreciation potential.";
    } else if (lowerQuery.includes("roi") || lowerQuery.includes("return")) {
      return "Your current ROI is +8.2% with a total gain of 600K AED. Sky Residence is your best performer at +8.3% while Marina Bay is at +8% with more room for growth upon completion.";
    } else {
      return "I can help you with property valuations, market predictions, contract renewals, and investment insights. What would you like to know?";
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-primary-navy rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"></div>
          <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-accent-gold to-primary-navy rounded-full shadow-2xl flex items-center justify-center text-white">
            <FaRobot className="text-2xl md:text-3xl" />
          </div>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <p className="text-xs font-semibold text-primary-navy">
              AI Assistant
            </p>
          </div>
        </motion.button>
      )}

      {/* Chat Drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-96 h-[600px] bg-white rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-navy to-accent-gold px-6 py-4 rounded-t-3xl md:rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <FaRobot className="text-accent-gold text-xl" />
              </div>
              <div>
                <h3 className="text-white font-bold">AI Assistant</h3>
                <p className="text-light-gold text-xs">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
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
                className={`flex gap-3 ${
                  message.type === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "ai"
                      ? "bg-gradient-to-r from-accent-gold to-primary-navy"
                      : "bg-primary-navy"
                  }`}
                >
                  <FaRobot className="text-white text-sm" />
                </div>

                <div className={`max-w-[75%]`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.type === "ai"
                        ? "bg-white text-text-dark shadow-md"
                        : "bg-accent-gold text-white"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs text-text-light mt-1 px-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}

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
                    <div
                      className="w-2 h-2 bg-text-light rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-text-light rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-text-light rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-white border-t border-border-light">
              <p className="text-xs font-semibold text-text-light mb-2">
                Quick questions:
              </p>
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
          <div className="p-4 bg-white border-t border-border-light rounded-b-3xl md:rounded-b-2xl">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="px-4 py-3 bg-accent-gold text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AIAssistantChat;
