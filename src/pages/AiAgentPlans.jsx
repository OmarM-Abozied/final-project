import React from 'react';
import Navbar from '../home_page/components/Navbar';
import HeroSection from '../components/ai-agent-pricing/HeroSection';
import FeaturesSection from '../components/ai-agent-pricing/FeaturesSection';
import VirtualAgentPreview from '../components/ai-agent-pricing/VirtualAgentPreview';
import PricingPlans from '../components/ai-agent-pricing/PricingPlans';
import CTASection from '../components/ai-agent-pricing/CTASection';
import FAQSection from '../components/ai-agent-pricing/FAQSection';

const AiAgentPlans = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Virtual Agent Preview */}
      <VirtualAgentPreview />
      
      {/* Pricing Plans */}
      <PricingPlans />
      
      {/* Call to Action */}
      <CTASection />
      
      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};

export default AiAgentPlans;