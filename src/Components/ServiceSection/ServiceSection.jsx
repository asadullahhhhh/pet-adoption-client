import React from "react";

const bgUrl =
  "https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/bone-bg.png";
const dogDiagram =
  "https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/diagram.png";

const servicesLeft = [
  "Dog Training Services",
  "Dog Veterinary",
  "Dog Food and Nutrition",
];

const servicesRight = [
  "Pet Care Services",
  "Emergency Services",
  "Report Harassment",
];

export default function ServiceSection() {
  return (
    <section
      className="py-16 bg-repeat bg-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="max-w-7xl relative mx-auto px-4 text-center">
        <div className="flex absolute left-[50%] -top-12 -translate-x-[50%] items-center justify-center gap-5 sm:justify-start mb-10">
          <div className="w-16 h-[3px] bg-amber-300"></div>
          <span className="text-amber-400 w-full font-semibold text-lg sm:text-base mr-2">
            Our Services
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mt-10 text-gray-800 mb-12">
          Taking Care of Pets
        </h2>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Center image */}
          <div className="">
            <img
              src={dogDiagram}
              alt="Dog Services"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
