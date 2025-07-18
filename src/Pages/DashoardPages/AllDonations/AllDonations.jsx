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
import { FaEdit, FaPause, FaPlay, FaTrash } from "react-icons/fa";
import "react-loading-skeleton/dist/skeleton.css";
import { useLocation, useNavigate } from "react-router";

const AllDonations = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const loaction = useLocation()

  // Local pagination state using TanStack Table
  const table = useReactTable({
    data: [],
    columns: [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  const { data, isLoading } = useQuery({
    queryKey: ["all-donations", pageIndex],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/donations?page=${
          pageIndex + 1
        }&limit=${pageSize}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete this campaign?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await axios.delete(`http://localhost:5000/donations/${id}`);
          return true;
        } catch (error) {
          Swal.showValidationMessage("Delete failed!");
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Campaign deleted successfully.", "success");
        queryClient.invalidateQueries(["all-donations"]);
      }
    });
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";

    Swal.fire({
      title: `Set status to "${newStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await axios.patch(
            `http://localhost:5000/donation-campaigns/${id}/status`,
            { status: newStatus }
          );
          return true;
        } catch (error) {
          Swal.showValidationMessage("Status update failed!");
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Updated!", `Status changed to ${newStatus}.`, "success");
        queryClient.invalidateQueries(["all-donations"]);
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        cell: ({ row }) => row.index + 1 + pageIndex * pageSize,
      },
      {
        header: "Pet Image",
        accessorKey: "petImage",
        cell: ({ getValue }) => (
          <img
            src={getValue()}
            alt="pet"
            className="w-12 h-12 rounded object-cover"
          />
        ),
      },
      {
        header: "Campaign Name",
        accessorKey: "shortDescription",
      },
      {
        header: "Added By",
        accessorKey: "userEmail",
      },
      {
        header: "Max Donation",
        accessorKey: "maxDonationAmount",
        cell: ({ getValue }) => `${getValue()}৳`,
      },
      {
        header: "Total Donated",
        accessorKey: "totalDonatedAmount",
        cell: ({ getValue }) => `${getValue()}৳`,
      },
      {
        header: "Last Date",
        accessorKey: "lastDate",
        cell: ({ getValue }) => {
          const date = new Date(getValue());
          return isNaN(date) ? "N/A" : format(date, "dd MMM, yyyy");
        },
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
              : "bg-yellow-100 text-yellow-700";
          return <span className={`${base} ${style}`}>{status}</span>;
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          const { _id, status } = row.original;
          return (
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/dashboard/edit-campaign/${_id}`, {
                    state : location.pathname
                })}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleToggleStatus(_id, status)}
                className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                title={status === "active" ? "Pause" : "Unpause"}
              >
                {status === "active" ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onClick={() => handleDelete(_id)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          );
        },
      },
    ],
    [pageIndex, pageSize]
  );

  const tableWithData = useReactTable({
    data: data?.donations || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const nextState =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;
      table.setPageIndex(nextState.pageIndex);
    },
    manualPagination: true,
    pageCount: Math.ceil((data?.total || 0) / pageSize),
  });

  if (isLoading) {
    return <Skeleton height={40} count={8} className="mb-2" />;
  }

  return (
    <div className="p-10">
      <div className="w-full bg-gradient-to-br from-green-100/50 via-gray-100/50 to-blue-100/50 p-4 rounded-lg border shadow-lg border-gray-300">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          All Donation Campaigns
        </h2>
        <table className="w-full overflow-x-auto table-auto text-sm md:text-base">
          <thead className="bg-gray-100">
            {tableWithData.getHeaderGroups().map((headerGroup) => (
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
            {tableWithData.getRowModel().rows.map((row) => (
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
            Page {pageIndex + 1} of {tableWithData.getPageCount()}
          </span>
          <div className="space-x-2">
            <button
              className="px-3 py-1 bg-green-300 text-gray-700 font-semibold rounded disabled:bg-gray-300 cursor-pointer active:scale-90 duration-300"
              onClick={() => tableWithData.previousPage()}
              disabled={!tableWithData.getCanPreviousPage()}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 cursor-pointer bg-green-300 font-semibold text-gray-700 rounded disabled:bg-gray-300 active:scale-90 duration-300"
              onClick={() => tableWithData.nextPage()}
              disabled={!tableWithData.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDonations;
