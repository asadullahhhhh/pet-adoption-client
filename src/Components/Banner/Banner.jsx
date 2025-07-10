import { motion } from "framer-motion";

const Banner = () => {
  const bgUrl =
    "https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/its-breakfast-time-dog-wrapped-in-a-blue-knitted-blanket-on-an-early-morning-sitting-at-the-table_t20_ZV4Gak.jpg";


  return (
    <section
      className="relative min-h-[70vh] overflow-hidden flex items-center bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-25 lg:opacity-10 z-0"></div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 w-full">
        {/* Left content */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center lg:text-left max-w-xl z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold lg:text-gray-900 text-white">
            Ready to <span className="lg:text-black text-white">Adopt!</span>
          </h1>
          <div className="w-24 h-2 bg-yellow-400 mx-auto lg:mx-0 my-4 rounded-full"></div>
          <p className="lg:text-gray-600 text-white mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all">
            View Puppies →
          </button>
        </motion.div>
      </div>

      {/* Wave bottom effect */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-20"
        >
          <path
            d="M-9.31,91.41 C170.54,190.92 271.70,14.36 500.00,89.09 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: "none", fill: "#ffffff" }}
          ></path>
        </svg>
      </div>
    </section>
  );
};
  

export default Banner;
