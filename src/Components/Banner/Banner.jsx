import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const Banner = () => {

  const {darkLight} = useAuth()

  const bgUrl =
    "https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/its-breakfast-time-dog-wrapped-in-a-blue-knitted-blanket-on-an-early-morning-sitting-at-the-table_t20_ZV4Gak.jpg";


  return (
    <section
      className={`${
        darkLight ? "dark" : ""
      } relative min-h-[70vh] overflow-hidden flex items-center bg-no-repeat bg-center bg-cover transition-colors duration-500`}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50 z-0 transition-all duration-500"></div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 w-full relative z-10">
        {/* Left content */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center lg:text-left max-w-xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-gray-100">
            Ready to{" "}
            <span className="text-yellow-300 dark:text-yellow-400">Adopt!</span>
          </h1>
          <div className="w-24 h-2 bg-yellow-400 mx-auto lg:mx-0 my-4 rounded-full"></div>
          <p className="text-gray-100 dark:text-gray-300 mb-6 transition-colors duration-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all dark:shadow-[0_0_20px_rgba(239,68,68,0.6)]">
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
            className="fill-white dark:fill-[#1e293b] transition-colors duration-500"
          ></path>
        </svg>
      </div>
    </section>
  );
};
  

export default Banner;
