import { useState, useEffect, Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion, AnimatePresence } from "framer-motion";
import ReceivedRequests from "./Tabs/ReceivedRequests";
import SentRequests from "./Tabs/SentRequests";

const PetRequest = () => {
  const [activeTab, setActiveTab] = useState("received");
  const [loading, setLoading] = useState(true);

  // Simulate loading delay when tab switches
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1700);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  const tabs = [
    { name: "Received Requests", value: "received" },
    { name: "Sent Requests", value: "sent" },
  ];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-full font-medium transition duration-300 ${
              activeTab === tab.value
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content Section with animation and skeleton loader */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Skeleton height={40} count={6} className="mb-2" />
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Suspense fallback={<Skeleton height={40} count={5} />}>
              {activeTab === "received" ? (
                <ReceivedRequests />
              ) : (
                <SentRequests />
              )}
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetRequest;
