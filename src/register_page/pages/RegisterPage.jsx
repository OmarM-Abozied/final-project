import React from 'react';
import { motion } from 'framer-motion';
import RegisterForm from '../components/RegisterForm';
import Logo from '../components/Logo';
import { Brain, BarChart3, Search, Zap, Users, Shield, CheckCircle, TrendingUp } from 'lucide-react';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div  className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - AI Agent Features */}
        <div className="hidden lg:flex lg:w-1/2 relative" style={{ backgroundColor: 'var(--primary-navy)' }}>
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: 'var(--accent-gold)', opacity: 0.1 }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center p-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <Logo className="w-12 h-12" />
                <h1 className="text-2xl font-bold mt-4" style={{ color: 'var(--accent-gold)' }}>RealEstate AI Pro</h1>
              </div>
              
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                AI-Powered Real Estate
                <span className="block" style={{ color: 'var(--accent-gold)' }}>Intelligence Platform</span>
              </h2>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Join thousands of agents and investors leveraging our advanced AI agent 
                to automate property analysis, market predictions, and deal sourcing.
              </p>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--accent-gold)', opacity: 0.4 }}>
                    <Brain className="w-6 h-6" style={{ color: 'var(--accent-gold)' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">AI Property Analyzer</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">
                      Our AI agent analyzes property data, market trends, and investment potential 
                      in seconds. Get instant ROI calculations and risk assessments.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--accent-gold)', opacity: 0.4 }}>
                    <Search className="w-6 h-6" style={{ color: 'var(--accent-gold)' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Smart Deal Finder</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">
                      AI automatically scans MLS, off-market listings, and foreclosure data 
                      to find profitable deals matching your investment criteria.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--accent-gold)', opacity: 0.4 }}>
                    <BarChart3 className="w-6 h-6" style={{ color: 'var(--accent-gold)' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Predictive Analytics</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">
                      Machine learning models predict price trends, rental yields, and 
                      neighborhood growth patterns with 94% accuracy.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--accent-gold)', opacity: 0.4 }}>
                    <Zap className="w-6 h-6" style={{ color: 'var(--accent-gold)' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Automated Workflows</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">
                      AI agent handles lead qualification, property comparisons, and 
                      market reports automatically. Save 20+ hours per week.
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-8 p-6 rounded-lg border backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6" style={{ color: 'var(--accent-gold)' }} />
                  <span className="text-lg font-semibold">Trusted by 50,000+ Professionals</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
                    <span className="text-blue-200">$2.5B+ Properties Analyzed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
                    <span className="text-blue-200">99.9% Uptime SLA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
                    <span className="text-blue-200">Bank-Grade Security</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
                    <span className="text-blue-200">Real-Time Data Sync</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-200">Average ROI Increase:</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
                      <span className="font-bold" style={{ color: 'var(--accent-gold)' }}>+34%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div  className="w-full lg:w-1/2 flex items-center justify-center p-8"  >
          <div  className="w-full max-w-md">
            {/* Mobile Header */}
            <motion.div 
              className="lg:hidden text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Logo className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--primary-navy)' }}>RealEstate AI Pro</h1>
              <p style={{ color: 'var(--text-light)' }}>Join the future of AI-powered real estate</p>
            </motion.div>
            
            <RegisterForm />
            
            {/* Trust Indicators */}
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <p className="text-xs mb-4" style={{ color: 'var(--text-light)' }}>
                Trusted by leading real estate professionals worldwide
              </p>
              <div className="flex justify-center space-x-6 opacity-60">
                <div className="text-xs font-medium" style={{ color: 'var(--text-light)' }}>MLS Compatible</div>
                <div className="text-xs font-medium" style={{ color: 'var(--text-light)' }}>AI Powered</div>
                <div className="text-xs font-medium" style={{ color: 'var(--text-light)' }}>SOC2 Certified</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;