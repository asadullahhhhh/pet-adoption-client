import React from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PetLoadingS = () => {
    return (
      <div className="p-8 overflow-x-auto rounded-lg">
        <table className="min-w-[80%] mx-auto table-auto rounded-lg">
          <thead>
            <tr className="bg-green-100">
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
                  <Skeleton width={20} />
                </td>
                <td className="px-6 py-4">
                  <Skeleton width={140} />
                </td>
                <td className="px-6 py-4">
                  <Skeleton width={80} />
                </td>
                <td className="px-6 py-4">
                  <Skeleton circle width={40} height={40} />
                </td>
                <td className="px-6 py-4">
                  <Skeleton width={100} />
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Skeleton height={32} width={32} />
                  <Skeleton height={32} width={32} />
                  <Skeleton height={32} width={100} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default PetLoadingS;