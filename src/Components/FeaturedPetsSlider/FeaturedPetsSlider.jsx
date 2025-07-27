import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const FeaturedPetsSlider = () => {
  const [pets, setPets] = useState([]);
  const { darkLight } = useAuth();
  const navigate = useNavigate();

  // Refs for custom buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://server-roan-one.vercel.app/featured") // API replace as needed
      .then((res) => setPets(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className={`${
        darkLight ? "dark" : ""
      } bg-gray-50 duration-500 dark:bg-gray-900`}
    >
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* Section header */}
        <div className="flex absolute left-1/2 top-10 -translate-x-1/2 items-center justify-center gap-5 sm:justify-start mb-10">
          <div className="w-16 h-[3px] bg-amber-300"></div>
          <span className="text-amber-400 w-full font-semibold text-lg sm:text-base mr-2">
            Available Pets
          </span>
        </div>

        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Featured Pets
        </h2>

        {/* Custom navigation buttons */}
        <div className="absolute top-1/2 left-3 z-10 transform -translate-y-1/2">
          <button
            ref={prevRef}
            className="bg-white dark:bg-gray-800 text-red-500 hover:text-white hover:-translate-x-1 duration-300 hover:bg-red-500 border border-red-500 rounded-full p-3 shadow-lg transition"
          >
            <FaArrowLeft />
          </button>
        </div>
        <div className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2">
          <button
            ref={nextRef}
            className="bg-white dark:bg-gray-800 text-red-500 hover:text-white hover:translate-x-1 duration-300 hover:bg-red-500 border border-red-500 rounded-full p-3 shadow-lg transition"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {pets.map((pet, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src={pet.images[0]}
                    alt={pet.name}
                    className="h-64 w-full object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                    {pet.age}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {pet.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {pet.shortDescription}
                  </p>
                  <button
                    onClick={() => navigate(`/pet-details/${pet?._id}`)}
                    className="bg-red-500 cursor-pointer active:scale-[1.1] duration-300 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedPetsSlider;
