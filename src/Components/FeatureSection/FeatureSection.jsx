import { PawPrint, Stethoscope, Dog } from "lucide-react";

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
  return (
    <section className="py-10 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-[6px_-6px_20px_rgba(0,0,0,0.06),_-6px_6px_20px_rgba(0,0,0,0.06),_6px_6px_20px_rgba(0,0,0,0.06),_-6px_-6px_20px_rgba(0,0,0,0.06)] p-6 flex flex-col items-start gap-4 hover:shadow-lg transition-all duration-200"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
