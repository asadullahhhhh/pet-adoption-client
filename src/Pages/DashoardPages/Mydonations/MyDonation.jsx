import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyDonation = () => {
  const { user, darkLight } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["my-donated-campaigns", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `https://server-iota-henna.vercel.app/donation-campaigns/donated/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleRefund = async (campaignId) => {
    const result = await Swal.fire({
      title: "Are you sure you want to ask for a refund?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, ask refund",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        try {
          await axios.patch(
            `https://server-iota-henna.vercel.app/donation-campaigns/refund/${campaignId}`,
            { donorEmail: user.email }
          );
          return true;
        } catch (error) {
          Swal.showValidationMessage(
            `Request failed: ${error.response?.data?.message || error.message}`
          );
          return false;
        }
      },
    });

    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Refund requested successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["my-donated-campaigns", user?.email]);
    }
  };

  const columns = [
    {
      header: "Pet",
      accessorKey: "petImage",
      cell: ({ row }) => (
        <img
          src={row.original.petImage}
          alt="pet"
          className="w-16 h-16 rounded object-cover"
        />
      ),
    },
    {
      header: "Max Donation",
      accessorKey: "maxDonationAmount",
      cell: ({ getValue }) => `$${getValue()}`,
    },
    {
      header: "Last Date",
      accessorKey: "lastDate",
      cell: ({ getValue }) =>
        new Date(getValue()).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue();
        const base = "text-xs px-2 py-1 rounded-full capitalize";
        const style =
          status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700";
        return <span className={`${base} ${style}`}>{status}</span>;
      },
    },
    {
      header: "Total Donated",
      accessorKey: "totalDonatedAmount",
      cell: ({ getValue }) => `$${getValue()}`,
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <button
          className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded"
          onClick={() => handleRefund(row.original._id)}
          disabled={row.original.status !== "active"}
        >
          Ask for Refund
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  if (isLoading) {
    return (
      <div
        className={`${
          darkLight ? "dark" : ""
        } dark:bg-gray-900 min-h-[calc(100vh-74px)]`}
      >
        <Skeleton
          height={40}
          count={5}
          baseColor="#1f2937"
          highlightColor="#374151"
          className="mb-2"
        />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-72px)]">
        <p className="text-center font-bold text-3xl">
          No donation campaigns found.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`${
        darkLight ? "dark" : ""
      } p-5 lg:p-10 dark:bg-gray-900 min-h-[calc(100vh-74px)] flex justify-center items-start`}
    >
      <div
        className="p-4 overflow-x-auto w-[350px] md:w-[450px] lg:w-[750px] xl:w-[1000px] 2xl:w-full transition-all duration-500 
    bg-gradient-to-tl from-blue-100/50 via-gray-200/50 to-green-100/50 
    dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
    rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
      >
        <table className="w-full table-auto text-sm md:text-base">
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
              hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 whitespace-nowrap text-gray-800 dark:text-gray-200"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 font-semibold px-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <div className="space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 bg-green-300 text-gray-700 font-semibold rounded 
            disabled:bg-gray-300 dark:bg-green-600 dark:text-white dark:disabled:bg-gray-600
            cursor-pointer active:scale-90 duration-300"
            >
              Prev
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 bg-green-300 text-gray-700 font-semibold rounded 
            disabled:bg-gray-300 dark:bg-green-600 dark:text-white dark:disabled:bg-gray-600
            cursor-pointer active:scale-90 duration-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDonation;
