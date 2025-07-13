// PetRequest.jsx
import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import ReceivedRequests from "./Tabs/ReceivedRequests";
import SentRequests from "./Tabs/SentRequests";

export default function PetRequest() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log(selectedIndex);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Adoption Requests</h2>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-md">
          {["Received Requests", "Sent Requests"].map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `w-full py-2 text-sm font-medium text-center rounded-lg transition-all duration-300 ${
                  selected
                    ? "bg-green-600 text-white shadow"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-6">
          <Tab.Panel>
            <motion.div
              key={"received"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              <ReceivedRequests />
            </motion.div>
          </Tab.Panel>
          <Tab.Panel>
            <motion.div
              key={"sent"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              <SentRequests />
            </motion.div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
