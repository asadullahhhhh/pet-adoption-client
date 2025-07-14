import React, { useState, useEffect, Fragment } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Dialog, Transition } from "@headlessui/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import ProgressBar from "@ramonak/react-progress-bar";

const MySwal = withReactContent(Swal);

const MyCampaign = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [donators, setDonators] = useState([]);
  const { user } = useAuth();
  const [sorting, setSorting] = useState([]);

  const navigate = useNavigate();

  // Fetch campaign data from backend
  const fetchCampaigns = async (page) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/my-donation-campaigns?email=${
          user?.email
        }&page=${page + 1}&limit=${pageSize}`
      );
      setData(res.data.campaigns || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error(error);
      MySwal.fire("Error", "Failed to fetch campaigns", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns(pageIndex);
  }, [pageIndex]);

  // Fetch donators for a campaign and open modal
  const handleViewDonators = async (campaignId) => {
    try {
      setDonators([]);
      setModalOpen(true);
      const res = await axios.get(
        `http://localhost:5000/donation-campaigns/${campaignId}/donators`
      );
      setDonators(res.data.donators || []);
    } catch (error) {
      console.error(error);
      MySwal.fire("Error", "Failed to fetch donators", "error");
      setModalOpen(false);
    }
  };

  // Pause/unpause campaign
  const handlePauseToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "paused" ? "active" : "paused";

    const confirm = await MySwal.fire({
      title:
        currentStatus === "paused"
          ? "Unpause this campaign?"
          : "Pause this campaign?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.patch(
          `http://localhost:5000/donation-campaigns/${id}/status`,
          {
            status: newStatus,
          }
        );
        fetchCampaigns(pageIndex);
        MySwal.fire("Success", "Campaign status updated", "success");
      } catch (err) {
        MySwal.fire("Error", "Failed to update status", "error");
      }
    }
  };

  // Columns for TanStack Table
  const columns = [
    {
      accessorKey: "shortDescription",
      header: "Campaign",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "maxDonationAmount",
      header: "Goal ($)",
      cell: (info) => `$${info.getValue()}`,
    },
    {
      header: "Raised",
      accessorKey: "totalDonatedAmount",
      cell: ({ row }) => {
        const max = row.original.maxDonationAmount || 100; // fallback max amount
        const raised = row.original.totalDonatedAmount || 0;
        const percentage = Math.min((raised / max) * 100, 100); // clamp max 100%

        return (
          <div className="w-40">
            {" "}
            {/* width to control size */}
            <ProgressBar
              completed={percentage}
              bgColor="#2ecc71  " // Tailwind green-600
              height="20px"
              labelColor="#ecf0f1"
              labelAlignment="center"
              ariaValuenow={percentage}
              ariaValuemin={0}
              ariaValuemax={100}
              customLabel={`${raised.toLocaleString()} / ${max.toLocaleString()}`}
              isLabelVisible={true}
              borderRadius="8px"
            />
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "lastDate",
      header: "Deadline",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <button
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc" ? "desc" : "asc"
            )
          }
          className="flex items-center gap-1"
          title="Sort"
        >
          Status
          {{
            asc: " 🔼",
            desc: " 🔽",
          }[column.getIsSorted()] ?? ""}
        </button>
      ),
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded text-sm font-semibold ${
            info.getValue() === "active"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {info.getValue()}
        </span>
      ),
      enableSorting: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const campaign = row.original;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleViewDonators(campaign._id)}
              className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              Donators
            </button>
            <button
              onClick={() => handlePauseToggle(campaign._id, campaign.status)}
              className={`px-3 py-1 rounded text-white font-semibold transition ${
                campaign.status === "paused"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-yellow-600 hover:bg-yellow-700"
              }`}
            >
              {campaign.status === "paused" ? "Unpause" : "Pause"}
            </button>
            <button
              onClick={() => navigate(`/dashboard/edit-campaign/${campaign._id}`)}
              className="px-3 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  // Setup TanStack Table instance
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / pageSize),
    state: {
      pagination: { pageIndex, pageSize },
      sorting,
    },
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPageIndex,
    onSortingChange: setSorting,
  });

  return (
    <div className="py-10">
      <div className="w-[80%] mx-auto bg-gradient-to-tl from-blue-100/50 via-gray-200/50 to-green-100/50 p-4 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-semibold mb-4">My Donation Campaigns</h2>

        <div className="overflow-x-auto">
          {isLoading ? (
            <table className="w-full table-auto text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3">Loading...</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-300">
                    <td className="px-4 py-2 whitespace-nowrap">
                      <Skeleton height={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full table-auto text-sm md:text-base">
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left whitespace-nowrap cursor-pointer select-none"
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
                    className="border-b border-gray-300 hover:bg-gray-300 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-5 whitespace-nowrap max-w-xs truncate"
                        title={cell.getValue()}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

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

        {/* Donators Modal */}
        <Transition appear show={modalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setModalOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50 bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white/80 p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-4"
                    >
                      Donators
                    </Dialog.Title>
                    {donators.length === 0 ? (
                      <p>No donators found.</p>
                    ) : (
                      <ul className="space-y-2 max-h-96 overflow-y-auto">
                        {donators.map((donator) => (
                          <li
                            key={donator._id || donator.email}
                            className="border-b border-gray-300 pb-2"
                          >
                            <p>
                              <strong>Name:</strong> {donator.name || "N/A"}
                            </p>
                            <p>
                              <strong>Email:</strong> {donator.email}
                            </p>
                            <p>
                              <strong>Amount:</strong> $
                              {donator.amount.toLocaleString()}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setModalOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default MyCampaign;
