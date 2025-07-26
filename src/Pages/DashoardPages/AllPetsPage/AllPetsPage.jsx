import React, { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AllPetsPage = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { darkLight } = useAuth();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Fetch pets with pagination and search
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["pets", { page, search }],
    queryFn: async ({ queryKey }) => {
      const [_key, { page, search }] = queryKey;

      const res = await axiosSecure.get(
        `/petss?page=${page}&limit=10&search=${search}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleDelete = async (petId) => {
    const result = await Swal.fire({
      title: "Are you sure to delete this pet?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const res = await axios.delete(
            `https://server-iota-henna.vercel.app/pets/${petId}`
          );
          return res.data;
        } catch (err) {
          Swal.showValidationMessage("Action failed. Try again.");
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value?.result?.deletedCount) {
          Swal.fire("Success", "Role updated successfully", "success");
          queryClient.invalidateQueries(["all-users"]);
        }
      }
    });
  };

  const handleToggleAdopt = async (petId, currentStatus) => {
    const newStatus = currentStatus === "adopted" ? "available" : "adopted";

    Swal.fire({
      title: `Are you sure to mark this pet as ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const res = await axios.patch(
            `https://server-iota-henna.vercel.app/pets/${petId}/adopt`,
            {
              status: newStatus,
            }
          );
          return res.data;
        } catch (err) {
          Swal.showValidationMessage("Action failed. Try again.");
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result);
        if (result.value?.result?.modifiedCount) {
          Swal.fire("Success", "Role updated successfully", "success");
          queryClient.invalidateQueries(["pets"]);
        }
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        header: "SL",
        cell: ({ row }) => row.index + 1 + (page - 1) * 10,
      },
      {
        header: "Image",
        accessorKey: "images",
        cell: ({ getValue }) => {
          const images = getValue();
          const firstImage =
            Array.isArray(images) && images.length > 0 ? images[0] : null;

          return firstImage ? (
            <img
              src={firstImage}
              alt="pet"
              className="w-12 h-12 rounded object-cover"
            />
          ) : (
            <span>No Image</span>
          );
        },
      },
      {
        header: "Added By",
        accessorKey: "addedBy.email", // deep access the email
        cell: ({ getValue }) => getValue() || "N/A",
      },
      {
        header: "Added On",
        accessorKey: "createdAt",
        cell: ({ getValue }) => {
          const dateStr = getValue();
          if (!dateStr) return "N/A";
          const date = new Date(dateStr);
          return date.toLocaleDateString(); // format as per your locale
        },
      },

      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => (
          <span
            className={`capitalize font-semibold ${
              getValue() === "adopted" ? "text-green-600" : "text-red-600"
            }`}
          >
            {getValue()}
          </span>
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          const pet = row.original;
          return (
            <div className="flex gap-2">
              <button
                onClick={() =>
                  navigate(`/dashboard/update-pet-details/${pet?._id}`)
                }
                className="bg-amber-400 hover:bg-amber-500 cursor-pointer p-2 rounded-md"
              >
                <MdEdit size={20} color="#fff" />
              </button>
              <button
                onClick={() => handleToggleAdopt(pet._id, pet.status)}
                className={`px-3 py-1 rounded cursor-pointer text-white ${
                  pet.status === "adopted"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {pet.status === "adopted" ? "Mark Pending" : "Mark Adopted"}
              </button>

              <button
                onClick={() => handleDelete(pet._id)}
                className="px-3 py-1 rounded bg-red-600 cursor-pointer hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    [page]
  );

  const table = useReactTable({
    data: data?.pets || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: data ? Math.ceil(data.total / 10) : -1,
    state: { pagination: { pageIndex: page - 1, pageSize: 10 } },
    manualPagination: true,
    onPaginationChange: (updater) => {
      const nextPage =
        typeof updater === "function" ? updater(page - 1) + 1 : updater + 1;
      setPage(nextPage);
    },
  });

  return (
    <div
      className={`${
        darkLight ? "dark" : ""
      } dark:bg-gray-900 min-h-[calc(100vh-74px)] py-5 px-5`}
    >
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by pet name..."
          className="w-full max-w-xs px-4 py-2 rounded-xl border border-gray-400 focus:outline-none focus:border-gray-600 focus:shadow dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400"
          value={search}
          onChange={(e) => {
            setPage(1); // reset to first page on search
            setSearch(e.target.value);
          }}
        />
      </div>

      {(isLoading || isFetching) && (
        <Skeleton
          count={8}
          baseColor="#1f2937"
          highlightColor="#374151"
          height={40}
          className="mb-2"
        />
      )}

      {!isLoading && !isFetching && (
        <div className="flex justify-center items-center">
          <div
            className="overflow-x-auto w-[350px] md:w-[450px] lg:w-[750px] xl:w-[1000px] 2xl:w-full transition-all duration-500 
                      bg-gradient-to-br from-green-100/50 via-gray-100/50 to-blue-100/50 
                      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                      p-6 rounded-xl border border-gray-300 dark:border-gray-700 shadow-xl"
          >
            <table className="w-full text-sm md:text-base table-auto">
              <thead className="bg-gray-100 dark:bg-gray-800">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-gray-800 dark:text-gray-200"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="text-center py-8 text-gray-500 dark:text-gray-400"
                    >
                      No pets found.
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-2 text-gray-800 dark:text-gray-200"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Page {page} of {data ? Math.ceil(data.total / 10) : 1}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => setPage((old) => Math.max(old - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded bg-green-300 cursor-pointer font-medium text-gray-700/80 active:translate-y-[1px] duration-300 disabled:bg-gray-300 
                         dark:bg-green-700 dark:text-gray-100 dark:disabled:bg-gray-600"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setPage((old) =>
                      data && page < Math.ceil(data.total / 10) ? old + 1 : old
                    )
                  }
                  disabled={data && page >= Math.ceil(data.total / 10)}
                  className="px-3 py-1 rounded bg-green-300 cursor-pointer font-medium text-gray-700/80 active:translate-y-[1px] duration-300 disabled:bg-gray-300 
                         dark:bg-green-700 dark:text-gray-100 dark:disabled:bg-gray-600"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPetsPage;
