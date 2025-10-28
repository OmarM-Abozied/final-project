import { motion } from "framer-motion";
import {
  FaCalendar,
  FaHome,
  FaDollarSign,
  FaCheckCircle,
  FaClock,
  FaFileInvoice,
} from "react-icons/fa";

const TransactionsTable = ({ transactions }) => {
  const defaultTransactions = [
    {
      id: 1,
      date: "October 15, 2024",
      type: "Rent",
      projectName: "Palm Beachfront Apartment",
      amount: "8,500 AED",
      status: "Completed",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 2,
      date: "September 15, 2024",
      type: "Rent",
      projectName: "Business Bay Studio",
      amount: "5,200 AED",
      status: "Completed",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 3,
      date: "March 15, 2024",
      type: "Purchase",
      projectName: "Marina Bay Residence - Unit 504",
      amount: "2,500,000 AED",
      status: "Completed",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 4,
      date: "January 10, 2023",
      type: "Purchase",
      projectName: "Sky Residence - Penthouse 12A",
      amount: "4,800,000 AED",
      status: "Completed",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 5,
      date: "November 1, 2024",
      type: "Rent",
      projectName: "Palm Beachfront Apartment",
      amount: "8,500 AED",
      status: "Pending",
      statusColor: "text-orange-600",
      statusBg: "bg-orange-100",
    },
  ];

  const transactionsData = transactions || defaultTransactions;

  const getTypeIcon = (type) => {
    return type === "Purchase" ? FaHome : FaDollarSign;
  };

  const getTypeColor = (type) => {
    return type === "Purchase" ? "bg-primary-navy" : "bg-accent-gold";
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-2">
            Transaction History
          </h2>
          <p className="text-text-light">
            All your purchases and rental payments
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-accent-gold text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          <FaFileInvoice />
          Export Report
        </motion.button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary-navy to-blue-700 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Project Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionsData.map((transaction, index) => {
                const TypeIcon = getTypeIcon(transaction.type);
                return (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ backgroundColor: "#f8f9fa", scale: 1.01 }}
                    className={`border-b border-border-light transition-all ${
                      index % 2 === 0 ? "bg-white" : "bg-light-gray/50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-text-dark">
                        <FaCalendar className="text-accent-gold" />
                        {transaction.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 ${getTypeColor(
                          transaction.type
                        )} text-white rounded-full text-xs font-semibold`}
                      >
                        <TypeIcon />
                        {transaction.type}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-text-dark">
                        {transaction.projectName}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-primary-navy">
                        {transaction.amount}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 ${transaction.statusBg} ${transaction.statusColor} rounded-full text-xs font-semibold`}
                      >
                        {transaction.status === "Completed" ? (
                          <FaCheckCircle />
                        ) : (
                          <FaClock />
                        )}
                        {transaction.status}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {transactionsData.map((transaction, index) => {
          const TypeIcon = getTypeIcon(transaction.type);
          return (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="bg-white rounded-2xl p-5 shadow-lg border border-border-light"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 ${getTypeColor(
                    transaction.type
                  )} text-white rounded-full text-xs font-semibold`}
                >
                  <TypeIcon />
                  {transaction.type}
                </div>
                <div
                  className={`inline-flex items-center gap-1 px-3 py-1 ${transaction.statusBg} ${transaction.statusColor} rounded-full text-xs font-semibold`}
                >
                  {transaction.status === "Completed" ? (
                    <FaCheckCircle />
                  ) : (
                    <FaClock />
                  )}
                  {transaction.status}
                </div>
              </div>

              <h4 className="font-bold text-text-dark mb-2">
                {transaction.projectName}
              </h4>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-text-light">
                  <FaCalendar className="text-accent-gold" />
                  {transaction.date}
                </div>
                <p className="text-lg font-bold text-primary-navy">
                  {transaction.amount}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-6 bg-gradient-to-r from-light-gold/30 to-accent-gold/20 rounded-2xl p-6 border border-accent-gold/50"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-text-light mb-1">Total Transactions</p>
            <p className="text-2xl font-bold text-primary-navy">
              {transactionsData.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-text-light mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {transactionsData.filter((t) => t.status === "Completed").length}
            </p>
          </div>
          <div>
            <p className="text-xs text-text-light mb-1">Pending</p>
            <p className="text-2xl font-bold text-orange-600">
              {transactionsData.filter((t) => t.status === "Pending").length}
            </p>
          </div>
          <div>
            <p className="text-xs text-text-light mb-1">This Month</p>
            <p className="text-2xl font-bold text-accent-gold">2</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionsTable;
