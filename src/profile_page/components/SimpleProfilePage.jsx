import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaBuilding,
  FaKey,
  FaHistory,
  FaChartLine,
} from "react-icons/fa";
import NewProfileHero from "../components/NewProfileHero";
import OwnedProperties from "../components/OwnedProperties";
import RentedProperties from "../components/RentedProperties";
import AIInsights from "../components/AIInsights";
import TransactionsTable from "../components/TransactionsTable";
import AIAssistantChat from "../components/AIAssistantChat";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: FaHome },
    { id: "owned", label: "Owned Properties", icon: FaBuilding },
    { id: "rented", label: "Rented Properties", icon: FaKey },
    { id: "transactions", label: "Transactions", icon: FaHistory },
    { id: "insights", label: "AI Insights", icon: FaChartLine },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <AIInsights />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-primary-navy mb-4">
                  Recent Owned Properties
                </h3>
                <OwnedProperties limit={2} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-navy mb-4">
                  Current Rentals
                </h3>
                <RentedProperties limit={2} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-navy mb-4">
                Recent Transactions
              </h3>
              <TransactionsTable limit={3} />
            </div>
          </div>
        );
      case "owned":
        return <OwnedProperties />;
      case "rented":
        return <RentedProperties />;
      case "transactions":
        return <TransactionsTable />;
      case "insights":
        return <AIInsights />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Hero Section */}
      <NewProfileHero />

      {/* Sticky Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white border-b border-border-light shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "text-accent-gold"
                      : "text-text-light hover:text-primary-navy"
                  }`}
                >
                  <Icon
                    className={`text-lg ${isActive ? "text-accent-gold" : ""}`}
                  />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold to-primary-navy"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* AI Chat Assistant */}
      <AIAssistantChat />

      {/* Footer Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border-light py-3 px-4 shadow-lg z-30 lg:hidden">
        <div className="flex justify-around text-center">
          <div>
            <p className="text-xs text-text-light">Total Value</p>
            <p className="text-sm font-bold text-primary-navy">7.9M AED</p>
          </div>
          <div>
            <p className="text-xs text-text-light">ROI</p>
            <p className="text-sm font-bold text-green-600">+8.2%</p>
          </div>
          <div>
            <p className="text-xs text-text-light">Properties</p>
            <p className="text-sm font-bold text-primary-navy">4 Total</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
