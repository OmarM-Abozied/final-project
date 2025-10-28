import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const PricingPlans = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Basic",
      description: "Perfect for new agents getting started",
      monthlyPrice: 49,
      annualPrice: 39,
      popular: false,
      features: [
        "Up to 25 property listings",
        "Basic AI responses",
        "Email support",
        "Property description generator",
        "Standard templates",
        "Basic analytics"
      ],
      limitations: [
        "No phone support",
        "Limited customization",
        "No API access"
      ],
      buttonText: "Start Basic Plan",
      buttonStyle: "bg-[#e9ecef] text-[#2c3e50] hover:bg-[#d4af37] hover:text-white"
    },
    {
      name: "Pro",
      description: "Most popular for growing teams",
      monthlyPrice: 99,
      annualPrice: 79,
      popular: true,
      features: [
        "Unlimited property listings",
        "Advanced AI conversations",
        "24/7 priority support",
        "Smart market analysis",
        "Custom branding",
        "Lead qualification system",
        "Multilingual support",
        "Virtual tour integration",
        "Advanced analytics dashboard",
        "CRM integration"
      ],
      limitations: [],
      buttonText: "Choose Pro Plan",
      buttonStyle: "bg-[#d4af37] text-[#1e3a5f] hover:bg-[#f5e6a8] hover:scale-105"
    },
    {
      name: "Enterprise",
      description: "For large agencies and teams",
      monthlyPrice: 199,
      annualPrice: 159,
      popular: false,
      features: [
        "Everything in Pro",
        "White-label solution",
        "API access & integrations",
        "Dedicated account manager",
        "Custom AI training",
        "Advanced compliance tools",
        "Team collaboration features",
        "Custom reporting",
        "SLA guarantees",
        "Priority feature requests"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonStyle: "bg-[#1e3a5f] text-white hover:bg-[#2c4f7c] hover:scale-105"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#2c3e50] mb-6">
            Choose Your <span className="text-[#d4af37]">Perfect Plan</span>
          </h2>
          <p className="text-xl text-[#6c757d] max-w-3xl mx-auto mb-8">
            Start with a plan that fits your needs and scale as you grow. 
            All plans include our core AI agent features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-lg ${!isAnnual ? 'text-[#2c3e50] font-semibold' : 'text-[#6c757d]'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                isAnnual ? 'bg-[#d4af37]' : 'bg-[#e9ecef]'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  isAnnual ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg ${isAnnual ? 'text-[#2c3e50] font-semibold' : 'text-[#6c757d]'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-[#d4af37] text-[#1e3a5f] px-3 py-1 rounded-full text-sm font-semibold">
                Save 20%
              </span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 ${
                plan.popular ? 'scale-105 border-4 border-[#d4af37]' : 'hover:scale-105 border border-[#e9ecef]'
              }`}
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d4af37] text-[#1e3a5f] px-6 py-1 mt-4 rounded-full font-semibold text-sm">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[#2c3e50] mb-2">{plan.name}</h3>
                  <p className="text-[#6c757d] mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-[#2c3e50]">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-[#6c757d] text-lg">/month</span>
                    {isAnnual && (
                      <div className="text-sm text-[#6c757d] mt-1">
                        Billed annually (${(isAnnual ? plan.annualPrice : plan.monthlyPrice) * 12})
                      </div>
                    )}
                  </div>

                  <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${plan.buttonStyle}`}>
                    {plan.buttonText}
                  </button>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#2c3e50] mb-4">What's included:</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                      <span className="text-[#6c757d]">{feature}</span>
                    </div>
                  ))}

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-[#e9ecef]">
                      <h4 className="font-semibold text-[#2c3e50] mb-4">Not included:</h4>
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-start gap-3">
                          <XMarkIcon className="w-5 h-5 text-[#6c757d] mt-0.5 flex-shrink-0" />
                          <span className="text-[#6c757d]">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6c757d] mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[#6c757d]">
            <div className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-[#d4af37]" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-[#d4af37]" />
              <span>24/7 support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-[#d4af37]" />
              <span>Secure payments</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPlans;