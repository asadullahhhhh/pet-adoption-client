import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { RingLoader } from "react-spinners";

const fetchPets = async ({ pageParam = 1, queryKey }) => {
  const [_key, { name, category }] = queryKey;
  const res = await axios.get(`http://localhost:5000/pets`, {
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
  const location = useLocation()
  const defaultCategory = location.state?.selectedCategory || "";
  console.log(defaultCategory);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(defaultCategory);


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
      return lastPage.hasMore ? allPages.length + 1 : undefined
    },
  });
  // console.log(data);
  // console.log(hasNextPage);

  const { ref, inView } = useInView({
    threshold : 1
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
    <div className="bg-gray-100 min-h-[calc(100vh-72px)]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="mb-4 flex justify-center items-center">
          <div>
            <div>
              <input
                className="border border-gray-300 rounded-full py-2 px-5 focus:ring-blue-200 focus:outline-none "
                type="text"
                placeholder="Search by name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="text-center mt-3">
              <select
                className="border-gray-300 border rounded-full  px-5 py-2 focus:outline-blue-200"
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
          </div>
        </div>

        {/* Pets grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {isLoading
            ? Array(9)
                .fill(null)
                .map((_, i) => (
                  <div key={i}>
                    <Skeleton height={200} />
                    <Skeleton height={20} style={{ marginTop: 10 }} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                  </div>
                ))
            : pets.map((pet) => (
                <div
                  key={pet._id}
                  className="rounded bg-white hover:scale-[1.01] duration-200 group overflow-hidden shadow-lg"
                >
                  <img
                    src={pet.images[0]}
                    alt={pet.name}
                    className="w-full h-48 object-cover rounded group-hover:scale-105 duration-300"
                  />
                  <div className="p-3">
                    <div className="text-center">
                      <span className="bg-amber-300 px-3 py-1 rounded-lg font-semibold text-white">
                        {pet.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mt-2">{pet.name}</h2>
                    <p>Age: {pet.age}</p>
                    <p>Location: {pet.location}</p>
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
              <RingLoader></RingLoader>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetListing;
