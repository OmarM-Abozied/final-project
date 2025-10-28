import React, { useState } from "react";
import {
  Home,
  Search,
  TrendingUp,
  FileText,
  Shield,
  Clock,
  DollarSign,
  CheckCircle,
  MessageSquare,
  Calendar,
  Award,
  Users,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function AIBrokerServicePage() {
  const [activeStep, setActiveStep] = useState(null);

  const features = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "Get instant support anytime, anywhere. No more waiting for broker callbacks.",
    },
    {
      icon: DollarSign,
      title: "Low Cost",
      description:
        "Save thousands with minimal fees compared to traditional 2-5% commissions.",
    },
    {
      icon: TrendingUp,
      title: "Smart Matching",
      description:
        "AI-powered property recommendations based on your exact preferences.",
    },
    {
      icon: Shield,
      title: "Fraud Detection",
      description:
        "Built-in security with AI verification and document validation.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Tell Us What You Need",
      description:
        "Ahmed searches: '3-bedroom apartment in Fifth Settlement, 3M EGP budget, near school'",
      icon: Search,
      color: "from-primary-navy to-blue-700",
    },
    {
      number: "02",
      title: "AI Analyzes & Recommends",
      description:
        "Get 3 smart suggestions with detailed comparisons, pros & cons, and financing options",
      icon: TrendingUp,
      color: "from-accent-gold to-yellow-600",
    },
    {
      number: "03",
      title: "Schedule Your Visit",
      description:
        "Book physical visits or take 360° virtual tours at your convenience",
      icon: Calendar,
      color: "from-primary-navy to-blue-700",
    },
    {
      number: "04",
      title: "AI Negotiates for You",
      description:
        "Our AI contacts sellers and negotiates the best price on your behalf",
      icon: MessageSquare,
      color: "from-accent-gold to-yellow-600",
    },
    {
      number: "05",
      title: "Secure Payment",
      description:
        "Pay safely via Paymob or Fawry with instant digital receipts",
      icon: Shield,
      color: "from-primary-navy to-blue-700",
    },
    {
      number: "06",
      title: "Digital Contract Ready",
      description:
        "Auto-generated contracts with digital signatures, securely stored on our platform",
      icon: FileText,
      color: "from-accent-gold to-yellow-600",
    },
  ];

  const comparison = [
    {
      feature: "Availability",
      traditional: "Limited hours",
      ai: "24/7 automated support",
    },
    { feature: "Commission", traditional: "2%–5%", ai: "Free or low fee" },
    {
      feature: "Speed",
      traditional: "Slow transactions",
      ai: "Instant matching",
    },
    {
      feature: "Documentation",
      traditional: "Manual paperwork",
      ai: "Auto-generated contracts",
    },
    {
      feature: "Security",
      traditional: "Often unverified",
      ai: "AI Fraud Detection",
    },
  ];

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-inter">
        <Navbar />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-navy via-blue-900 to-primary-navy">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent-gold rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
      
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold/20 border border-accent-gold/30 rounded-full text-accent-gold text-sm font-semibold backdrop-blur-sm animate-bounce-slow">
              <Award className="w-4 h-4" />
              The Future of Real Estate
            </div>


<h1 className="font-playfair text-5xl md:text-7xl font-bold text-white leading-tight">
              Your AI-Powered
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-light-gold">
                Real Estate Broker
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Experience the revolution in property buying and selling. No high
              commissions, no waiting, just intelligent automation at your
              service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button className="group px-8 py-4 bg-accent-gold hover:bg-yellow-500 text-primary-navy font-semibold rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Start Your Journey
                <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-navy mb-4">
            Why Choose Our AI Agent?
          </h2>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            Experience the advantages of intelligent automation in every
            transaction
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-100 hover:border-accent-gold/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-navy to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <feature.icon className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-primary-navy mb-3">
                {feature.title}
              </h3>
              <p className="text-text-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-navy mb-4">
              How It Works
            </h2>
            <p className="text-xl text-text-light max-w-2xl mx-auto">
              From search to contract in six seamless steps
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`group flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}


>
                <div className="flex-1 relative">
                  <div
                    className={`absolute -inset-4 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-3xl`}
                  ></div>
                  <div className="relative bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 border-transparent group-hover:border-accent-gold/30">
                    <div className="flex items-start gap-6">
                      <div
                        className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-playfair text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-600">
                            {step.number}
                          </span>
                          <h3 className="font-playfair text-2xl font-bold text-primary-navy">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-text-light text-lg leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 hidden md:block">
                  <div
                    className={`w-3 h-3 rounded-full bg-accent-gold ${activeStep === index ? "scale-150" : ""} transition-transform duration-300`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-navy mb-4">
            Traditional vs AI Agent
          </h2>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            See the clear difference in every aspect
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary-navy to-blue-900 text-white">
                  <th className="px-8 py-6 text-left font-playfair text-2xl font-bold">
                    Feature
                  </th>
                  <th className="px-8 py-6 text-left font-playfair text-2xl font-bold">
                    Traditional Broker
                  </th>
                  <th className="px-8 py-6 text-left font-playfair text-2xl font-bold bg-accent-gold/20">
                    <div className="flex items-center gap-2">
                      AI Agent
                      <Award className="w-6 h-6 text-accent-gold" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                  >
                    <td className="px-8 py-6 font-semibold text-primary-navy text-lg">


{row.feature}
                    </td>
                    <td className="px-8 py-6 text-text-light">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                        {row.traditional}
                      </span>
                    </td>
                    <td className="px-8 py-6 bg-accent-gold/5">
                      <span className="inline-flex items-center gap-2 text-primary-navy font-semibold">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        {row.ai}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-navy via-blue-900 to-primary-navy">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-gold rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold/20 border border-accent-gold/30 rounded-full text-accent-gold text-sm font-semibold backdrop-blur-sm mb-8">
            <Users className="w-4 h-4" />
            Join 10,000+ Smart Property Seekers
          </div>

          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Experience the Future?
          </h2>

          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Let our AI agent handle your real estate journey from start to
            finish. Save time, money, and stress.
          </p>

          <button className="group px-12 py-5 bg-accent-gold hover:bg-yellow-500 text-primary-navy text-lg font-bold rounded-xl shadow-2xl hover:shadow-accent-gold/50 transform hover:-translate-y-1 transition-all duration-300">
            Get Started Now
            <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
    
  );
}