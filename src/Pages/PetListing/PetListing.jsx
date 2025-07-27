import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { RingLoader } from "react-spinners";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const fetchPets = async ({ pageParam = 1, queryKey }) => {
  const [_key, { name, category }] = queryKey;
  const res = await axios.get(`https://server-roan-one.vercel.app/pets`, {
    params: {
      page: pageParam,
      limit: 9,
      name,
      category,
    },
  });
  return res.data;
};

const PetListing = () => {
  const location = useLocation();
  const defaultCategory = location.state?.selectedCategory || "";
  const [name, setName] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const { darkLight } = useAuth();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["pets", { name, category }],
    queryFn: fetchPets,
    getNextPageParam: (lastPage, allPages) => {
      // console.log('pages',lastPage, "allpage",allPages);
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });
  // console.log(data);
  // console.log(hasNextPage);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // console.log(hasNextPage, 'has');

  // Optional: Refetch automatically when filters change
  useEffect(() => {
    refetch();
  }, [name, category, refetch]);

  // Flatten pets pages into one array
  const pets = data?.pages.flatMap((page) => page.pets) || [];

  // console.log(data);

  return (
    <>
      <Helmet>
        <title>Pet-Listing</title>
      </Helmet>
      <div
        className={`${
          darkLight ? "dark" : ""
        } bg-gray-100 duration-500 dark:bg-gray-900 min-h-[calc(100vh-72px)]`}
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full py-2 px-5 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              type="text"
              placeholder="Search by name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <select
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full px-5 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
            </select>
          </div>

          {/* Pets grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading
              ? Array(9)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="rounded overflow-hidden shadow-lg">
                      <Skeleton
                        height={200}
                        baseColor={darkLight ? "#1f2937" : undefined}
                        highlightColor={darkLight ? "#374151" : undefined}
                      />
                      <Skeleton
                        height={20}
                        baseColor={darkLight ? "#1f2937" : undefined}
                        highlightColor={darkLight ? "#374151" : undefined}
                        style={{ marginTop: 10 }}
                      />
                      <Skeleton
                        height={20}
                        baseColor={darkLight ? "#1f2937" : undefined}
                        highlightColor={darkLight ? "#374151" : undefined}
                      />
                      <Skeleton
                        height={20}
                        baseColor={darkLight ? "#1f2937" : undefined}
                        highlightColor={darkLight ? "#374151" : undefined}
                      />
                    </div>
                  ))
              : pets.map((pet) => (
                  <div
                    key={pet._id}
                    className="rounded-2xl bg-white dark:bg-gray-800 hover:scale-[1.01] duration-200 group overflow-hidden shadow-lg transition"
                  >
                    <img
                      src={pet.images[0]}
                      alt={pet.name}
                      className="w-full h-56 object-cover rounded-t group-hover:scale-105 duration-300"
                    />
                    <div className="p-4">
                      <div className="text-center">
                        <span className="bg-amber-300 px-3 py-1 rounded-lg font-semibold text-white">
                          {pet.category}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mt-2 text-gray-900 dark:text-white">
                        {pet.name}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        Age: {pet.age}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Location: {pet.location}
                      </p>
                      <Link to={`/pet-details/${pet._id}`}>
                        <button className="bg-red-500 mt-2 hover:bg-red-600 text-white font-semibold px-3 py-1 cursor-pointer rounded-lg shadow-md transition-all">
                          View Puppies →
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
          </div>

          {/* Infinite scroll trigger */}
          <div ref={ref} className="h-10 my-10 py-10">
            {isFetchingNextPage && (
              <div className="flex justify-center items-center">
                <RingLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PetListing;
