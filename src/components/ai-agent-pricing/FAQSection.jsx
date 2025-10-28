import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely! You can cancel your subscription at any time with just one click. There are no cancellation fees or complicated processes. Your AI agent will remain active until the end of your current billing period, and you won't be charged again."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a comprehensive 14-day free trial that includes access to all Pro plan features. No credit card is required to start your trial. You can test all features, including the AI agent, property analysis tools, and lead management system."
    },
    {
      question: "How do I integrate the AI Agent into my website?",
      answer: "Integration is simple and takes just 5 minutes. We provide a widget code that you copy and paste into your website. Our team also offers white-glove setup service for Enterprise customers, and we have plugins available for popular platforms like WordPress, Squarespace, and Wix."
    },
    {
      question: "What languages does the AI Agent support?",
      answer: "Our AI Agent supports over 50 languages including English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Arabic, and many more. The agent automatically detects the language being used and responds accordingly, making it perfect for international markets."
    },
    {
      question: "How accurate is the market analysis feature?",
      answer: "Our market analysis uses real-time data from multiple MLS systems, public records, and market trends. We maintain a 95%+ accuracy rate for property valuations and market insights. The system is continuously updated and learns from actual market transactions to improve accuracy over time."
    },
    {
      question: "Can I customize the AI Agent's responses?",
      answer: "Yes! Pro and Enterprise plans include customization options where you can train the AI with your specific brand voice, add custom responses, and upload your own property templates. Enterprise customers get advanced AI training capabilities for highly personalized interactions."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide 24/7 support for all customers. Basic plan users get email support, Pro plan users get priority email and chat support, and Enterprise customers get dedicated phone support with a personal account manager. We also offer comprehensive documentation and video tutorials."
    },
    {
      question: "Is my data secure and compliant?",
      answer: "Security is our top priority. We're GDPR compliant, SOC 2 certified, and use bank-level encryption for all data. Your client information is stored securely and never shared with third parties. We also provide detailed audit logs and data export capabilities for compliance purposes."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#2c3e50] mb-6">
            Frequently Asked <span className="text-[#d4af37]">Questions</span>
          </h2>
          <p className="text-xl text-[#6c757d] max-w-2xl mx-auto">
            Have questions about our AI agent? We've got answers. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#e9ecef] hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-[#f8f9fa] transition-colors duration-200"
              >
                <h3 className="text-lg md:text-xl font-semibold text-[#2c3e50] pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUpIcon className="w-6 h-6 text-[#d4af37]" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6 text-[#6c757d]" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <div className="w-full h-px bg-[#e9ecef] mb-4"></div>
                      <p className="text-[#6c757d] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c4f7c] rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Still have questions?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Our team is here to help you get started with your AI agent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#d4af37] text-[#1e3a5f] px-8 py-3 rounded-xl font-semibold hover:bg-[#f5e6a8] transition-all duration-300 transform hover:scale-105">
                Contact Support
              </button>
              <button className="border-2 border-[#d4af37] text-[#d4af37] px-8 py-3 rounded-xl font-semibold hover:bg-[#d4af37] hover:text-[#1e3a5f] transition-all duration-300 transform hover:scale-105">
                Schedule Demo
              </button>
            </div>
          </div>
        </motion.div>

        {/* Help Links */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-[#6c757d]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <a href="#" className="hover:text-[#d4af37] transition-colors duration-200">
            📚 Documentation
          </a>
          <a href="#" className="hover:text-[#d4af37] transition-colors duration-200">
            🎥 Video Tutorials
          </a>
          <a href="#" className="hover:text-[#d4af37] transition-colors duration-200">
            💬 Community Forum
          </a>
          <a href="#" className="hover:text-[#d4af37] transition-colors duration-200">
            📧 Email Support
          </a>
          <a href="#" className="hover:text-[#d4af37] transition-colors duration-200">
            📞 Phone Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;