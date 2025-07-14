import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { FaCheck, FaTimes } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../../../../hooks/useAuth";

const ReceivedRequests = () => {
  const {user} = useAuth() // replace with auth context
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["received-requests", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/adoption-requests/received/${user?.email}`
      );
      return res.data;
    },
  });

  console.log(data);

  console.log(data);

  const handleAction = async (id, status) => {
    Swal.fire({
      title: `Are you sure to ${status}?`,
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: async () => {
        try {
          await axios.patch(`http://localhost:5000/adoption-requests/${id}`, {
            status,
          });
          return true;
        } catch (err) {
          Swal.showValidationMessage(
            `Error: ${err.response?.data?.message || "Something went wrong"}`
          );
          return false;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", `Request ${status} successfully.`, "success");
        queryClient.invalidateQueries(["received-requests", user?.email]);
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        header: "Pet",
        accessorKey: "petImage",
        cell: ({ row }) => (
          <img
            src={row.original.petImage}
            alt="pet"
            className="w-12 h-12 rounded object-cover"
          />
        ),
      },
      {
        header: "Pet Name",
        accessorKey: "petName",
      },
      {
        header: "Requester",
        accessorKey: "userName",
      },
      {
        header: "Email",
        accessorKey: "userEmail",
      },
      {
        header: "Phone",
        accessorKey: "phone",
      },
      {
        header: "Address",
        accessorKey: "address",
      },
      {
        header: "Date",
        accessorKey: "createdAt",
        cell: ({ getValue }) => {
          const value = getValue();
          const date = new Date(value);
          console.log(value);

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
          const status = row.original.status;
          if (status !== "pending")
            return <span className="text-gray-400 italic"> </span>;
          return (
            <div className="flex gap-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                onClick={() => handleAction(row.original._id, "accepted")}
                title="Accept"
              >
                <FaCheck />
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                onClick={() => handleAction(row.original._id, "rejected")}
                title="Reject"
              >
                <FaTimes />
              </button>
            </div>
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
    <div className="w-full bg-gradient-to-br from-green-100/50 via-gray-200/50 to-blue-100/50 p-4 rounded-lg shadow-md border border-gray-300">
      <table className="w-full overflow-x-auto table-auto text-sm md:text-base">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left whitespace-nowrap"
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
              className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 font-semibold px-2">
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <div className="space-x-2">
          <button
            className="px-3 py-1 bg-green-300 text-gray-700 font-semibold rounded disabled:bg-gray-300 cursor-pointer active:scale-90 duration-300"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 cursor-pointer bg-green-300 font-semibold text-gray-700 rounded disabled:bg-gray-300 active:scale-90 duration-300"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceivedRequests;
