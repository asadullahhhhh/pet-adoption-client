import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { format } from "date-fns";
import { FaTrash } from "react-icons/fa";
import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const SentRequests = ({ darkLight }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["sent-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:5000/adoption-requests/sent/${user?.email}`
      );
      return res.data;
    },
  });

  const handleCancel = async (petId) => {
    Swal.fire({
      title: "Cancel this request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await axios.delete(`http://localhost:5000/delete/request`, {
            data: {
              userEmail: user?.email,
              petId,
            },
          });
          return true;
        } catch (error) {
          Swal.showValidationMessage("Cancel failed!");
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
        queryClient.invalidateQueries(["sent-requests", user?.email]);
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        header: "Pet",
        accessorKey: "petImage",
        cell: ({ row }) => (
          <div className="flex justify-center items-center w-16">
            <img
              src={row.original.petImage}
              alt="pet"
              className="w-12 h-12 rounded object-cover"
            />
          </div>
        ),
      },
      {
        header: "Pet Name",
        accessorKey: "petName",
      },
      {
        header: "Owner Name",
        accessorKey: "ownerName",
      },
      {
        header: "Owner Email",
        accessorKey: "ownerEmail",
      },
      {
        header: "Adopted Date",
        accessorKey: "adoptedAt",
        cell: ({ getValue }) => {
          const value = getValue();
          const date = new Date(value);
          return isNaN(date.getTime()) ? "N/A" : format(date, "dd MMM, yyyy");
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const status = getValue();
          const base = "text-xs px-2 py-1 rounded-full capitalize";
          const style =
            status === "accepted"
              ? "bg-green-100 text-green-700"
              : status === "rejected"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700";
          return <span className={`${base} ${style}`}>{status}</span>;
        },
      },
      {
        header: "Action",
        cell: ({ row }) => {
          const { petId, status } = row.original;

          if (status === "accepted") {
            return (
              <span className="text-gray-400 italic text-xs">Can't cancel</span>
            );
          }

          return (
            <button
              onClick={() => handleCancel(petId)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              title="Cancel Request"
            >
              <FaTrash />
            </button>
          );
        },
      },
    ],
    [queryClient]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (isLoading) {
    return <Skeleton height={40} count={8} className="mb-2" />;
  }

  return (
    <div
      className={`flex justify-center items-center ${darkLight ? "dark" : ""}`}
    >
      <div
        className="w-[350px] md:w-[450px] lg:w-[750px] xl:w-[1000px] 2xl:w-full 
      transition-all duration-500 overflow-x-auto 
      bg-gradient-to-br from-blue-100/50 via-gray-200/50 to-green-100/50 
      dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
      p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
      >
        <table className="w-full overflow-x-auto table-auto text-sm md:text-base">
          <thead className="bg-gray-100 dark:bg-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left whitespace-nowrap text-gray-800 dark:text-gray-200"
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
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-300 dark:border-gray-700 
                       hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 font-semibold px-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <div className="space-x-2">
            <button
              className="px-3 py-1 bg-green-300 text-gray-700 font-semibold rounded 
                     disabled:bg-gray-300 cursor-pointer active:scale-90 duration-300
                     dark:bg-green-600 dark:text-gray-100 dark:disabled:bg-gray-600"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 cursor-pointer bg-green-300 font-semibold text-gray-700 rounded 
                     disabled:bg-gray-300 active:scale-90 duration-300
                     dark:bg-green-600 dark:text-gray-100 dark:disabled:bg-gray-600"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentRequests;
