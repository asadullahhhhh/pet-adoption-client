import React from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PetLoadingS = ({darkLight}) => {
    return (
      <div
        className={`${darkLight ? "dark" : ""} p-8 overflow-x-auto rounded-lg dark:bg-gray-900 min-h-[calc(100vh-72px)]`}
      >
        <table className="min-w-[80%] mx-auto table-auto rounded-lg">
          <thead>
            <tr className="bg-green-100 dark:bg-gray-800 dark:text-white">
              {[
                "SL",
                "Pet Name",
                "Category",
                "Image",
                "Adoption Status",
                "Actions",
              ].map((item, index) => (
                <th
                  key={index}
                  className="text-left font-semibold px-5 cursor-pointer py-5 border-b-2 border-b-green-200"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4">
                  <Skeleton
                    baseColor={darkLight ? "#1f2937" : undefined}
                    highlightColor={darkLight ? "#374151" : undefined}
                    width={20}
                  />
                </td>
                <td className="px-6 py-4">
                  <Skeleton
                    baseColor={darkLight ? "#1f2937" : undefined}
                    highlightColor={darkLight ? "#374151" : undefined}
                    width={140}
                  />
                </td>
                <td className="px-6 py-4">
                  <Skeleton
                    baseColor={darkLight ? "#1f2937" : undefined}
                    highlightColor={darkLight ? "#374151" : undefined}
                    width={80}
                  />
                </td>
                <td className="px-6 py-4">
                  <Skeleton
                    baseColor={darkLight ? "#1f2937" : undefined}
                    highlightColor={darkLight ? "#374151" : undefined}
                    circle
                    width={40}
                    height={40}
                  />
                </td>
                <td className="px-6 py-4">
                  <Skeleton
                    baseColor={darkLight ? "#1f2937" : undefined}
                    highlightColor={darkLight ? "#374151" : undefined}
                    width={100}
                  />
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Skeleton
                    baseColor={darkLight ? "#1f2937" : undefined}
                    highlightColor={darkLight ? "#374151" : undefined}
                    height={32}
                    width={32}
                  />
                  <Skeleton
                    baseColor={darkLight ? "#1f2937" : undefined}
                    highlightColor={darkLight ? "#374151" : undefined}
                    height={32}
                    width={32}
                  />
                  <Skeleton
                    baseColor={darkLight ? "#1f2937" : undefined}
                    highlightColor={darkLight ? "#374151" : undefined}
                    height={32}
                    width={100}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default PetLoadingS;