import { motion } from "framer-motion";
import {
  FaChartLine,
  FaDollarSign,
  FaArrowUp,
  FaLightbulb,
  FaHome,
  FaPercent,
} from "react-icons/fa";

const AIInsights = ({ insights }) => {
  const defaultInsights = {
    totalPropertyValue: "7.9M AED",
    totalInvestment: "7.3M AED",
    roi: "+8.2%",
    roiAmount: "+600K AED",
    marketTrend: "Upward",
    quarterGrowth: "+5.5%",
    suggestions: [
      {
        id: 1,
        property: "Sky Residence - Penthouse 12A",
        insight:
          "Your property in Sky Residence increased 8% in value this quarter.",
        suggestion: "Would you like to list it for rent?",
        icon: FaArrowUp,
        color: "text-green-600",
      },
      {
        id: 2,
        property: "Marina Bay Residence",
        insight:
          "Construction progress is on track. Expected completion in 14 months.",
        suggestion:
          "Consider securing a tenant before delivery for immediate ROI.",
        icon: FaHome,
        color: "text-blue-600",
      },
    ],
  };

  const insightsData = insights || defaultInsights;

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-2">
          AI Investment Insights
        </h2>
        <p className="text-text-light">
          Smart analytics and recommendations powered by AI
        </p>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
      >
        {/* Total Property Value */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-primary-navy to-blue-700 text-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <FaChartLine className="text-4xl text-light-gold" />
            <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
              Portfolio
            </span>
          </div>
          <p className="text-sm text-light-gold mb-1">Total Property Value</p>
          <p className="text-3xl font-bold mb-1">
            {insightsData.totalPropertyValue}
          </p>
          <p className="text-xs text-light-gold">
            Initial Investment: {insightsData.totalInvestment}
          </p>
        </motion.div>

        {/* ROI */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-accent-gold to-yellow-500 text-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <FaPercent className="text-4xl text-primary-navy" />
            <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
              Returns
            </span>
          </div>
          <p className="text-sm text-primary-navy mb-1">
            Return on Investment (ROI)
          </p>
          <p className="text-3xl font-bold mb-1">{insightsData.roi}</p>
          <p className="text-xs text-primary-navy">
            +{insightsData.roiAmount} total gain
          </p>
        </motion.div>

        {/* Market Trend */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <FaArrowUp className="text-4xl" />
            <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
              Trending
            </span>
          </div>
          <p className="text-sm mb-1">Market Trend</p>
          <p className="text-3xl font-bold mb-1">{insightsData.marketTrend}</p>
          <p className="text-xs">
            Quarter growth: {insightsData.quarterGrowth}
          </p>
        </motion.div>
      </motion.div>

      {/* AI Suggestions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-accent-gold to-primary-navy rounded-full flex items-center justify-center">
            <FaLightbulb className="text-white text-lg" />
          </div>
          <h3 className="text-xl font-bold text-text-dark">
            Smart Suggestions
          </h3>
        </div>

        {insightsData.suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-accent-gold hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 bg-light-gray rounded-xl flex items-center justify-center flex-shrink-0 ${suggestion.color}`}
                >
                  <Icon className="text-2xl" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary-navy mb-2">
                    {suggestion.property}
                  </h4>
                  <p className="text-sm text-text-dark mb-2">
                    {suggestion.insight}
                  </p>
                  <p className="text-sm text-accent-gold font-semibold">
                    {suggestion.suggestion}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-accent-gold text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                    >
                      Take Action
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-light-gray text-text-dark rounded-lg text-sm font-semibold hover:bg-light-gold transition-all"
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Insights Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 bg-gradient-to-r from-light-gold/30 to-accent-gold/20 rounded-2xl p-6 border-2 border-accent-gold/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <FaDollarSign className="text-2xl text-accent-gold" />
          <h4 className="font-bold text-primary-navy">
            Investment Performance Summary
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-text-light mb-1">Properties Owned</p>
            <p className="text-lg font-bold text-primary-navy">2</p>
          </div>
          <div>
            <p className="text-text-light mb-1">Average Property Growth</p>
            <p className="text-lg font-bold text-green-600">+8.2%</p>
          </div>
          <div>
            <p className="text-text-light mb-1">Portfolio Performance</p>
            <p className="text-lg font-bold text-accent-gold">Excellent</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIInsights;
