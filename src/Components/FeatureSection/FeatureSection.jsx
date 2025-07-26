import { PawPrint, Stethoscope, Dog } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const features = [
  {
    icon: <PawPrint className="text-yellow-500 w-10 h-10" />,
    title: "Grooming Services",
    description:
      "Professional grooming to keep your pet clean, happy, and healthy.",
  },
  {
    icon: <Stethoscope className="text-yellow-500 w-10 h-10" />,
    title: "Veterinary 24/7",
    description:
      "Round-the-clock vet support for all emergency and wellness needs.",
  },
  {
    icon: <Dog className="text-yellow-500 w-10 h-10" />,
    title: "Fun Activities",
    description:
      "Engaging play sessions and pet-friendly activities to keep them active.",
  },
];

const FeatureSection = () => {

  const { darkLight } = useAuth();

  return (
    <section
      className={`${
        darkLight ? "dark" : ""
      } py-10 px-4 md:px-8 bg-white dark:bg-[#1e293b] transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1e293b]/80 backdrop-blur-sm rounded-xl 
          shadow-[6px_-6px_20px_rgba(0,0,0,0.06),_-6px_6px_20px_rgba(0,0,0,0.06)] 
          dark:shadow-[0_0_20px_rgba(0,0,0,0.7)] 
          p-6 flex flex-col items-start gap-4 hover:shadow-lg 
          dark:hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] 
          transition-all duration-300"
          >
            <div className="text-blue-500 dark:text-sky-400 text-3xl">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
