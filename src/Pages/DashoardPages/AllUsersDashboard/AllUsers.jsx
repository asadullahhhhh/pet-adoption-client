// AllUsers.jsx
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";
import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { user, darkLight } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users", search, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?search=${search}&excludeEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handleMakeRole = async (email, role) => {
    const newRole = role === "admin" ? "user" : "admin";
    Swal.fire({
      title: `Make this user ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const res = await axios.patch(
            `https://server-roan-one.vercel.app/users/role`,
            {
              email,
              currentRole: role,
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
        if (result.value?.result?.modifiedCount) {
          Swal.fire("Success", "Role updated successfully", "success");
          queryClient.invalidateQueries(["all-users"]);
        }
      }
    });
  };

  const filteredUsers = useMemo(() => {
    if (roleFilter === "all") return users;
    return users.filter((u) => u.role === roleFilter);
  }, [users, roleFilter]);

  const toggleRoleFilter = () => {
    if (roleFilter === "all") setRoleFilter("admin");
    else if (roleFilter === "admin") setRoleFilter("user");
    else setRoleFilter("all");
  };

  const columns = useMemo(
    () => [
      {
        header: "SL",
        cell: ({ row }) => row.index + 1,
      },
      {
        header: "Image",
        accessorKey: "image",
        cell: ({ getValue }) => (
          <img
            src={getValue()}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />
        ),
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: () => (
          <button
            onClick={toggleRoleFilter}
            className="flex cursor-pointer dark:bg-gray-600 bg-gray-200 rounded-lg active:scale-90 duration-300 px-5 py-2 items-center gap-1"
          >
            Role ({roleFilter})
          </button>
        ),
        accessorKey: "role",
        cell: ({ getValue }) => (
          <span
            className={`capitalize ${
              getValue() === "admin" ? "text-blue-600" : "text-green-600"
            } font-medium `}
          >
            {getValue()}
          </span>
        ),
      },
      {
        header: "Action",
        cell: ({ row }) => {
          const { email, role } = row.original;
          return (
            <button
              onClick={() => handleMakeRole(email, role)}
              className={`${
                role === "admin"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600 "
              } text-white px-3 py-1 cursor-pointer rounded text-sm`}
            >
              {role === "admin" ? "Make User" : "Make Admin"}
            </button>
          );
        },
      },
    ],
    [roleFilter]
  );

  const table = useReactTable({
    data: filteredUsers,
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

  return (
    <div
      className={`${
        darkLight ? "dark" : ""
      } dark:bg-gray-900 min-h-[calc(100vh-74px)] py-5 px-5`}
    >
      <div className="flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email..."
          className="mb-5 py-2 px-5 border border-gray-400 focus:outline-none focus:border-gray-600 focus:shadow 
        rounded-xl w-full max-w-xs 
        bg-white text-gray-800 
        dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:border-gray-400"
        />
      </div>

      {isLoading ? (
        <Skeleton
          height={40}
          baseColor={darkLight ? "#1f2937" : undefined}
          highlightColor={darkLight ? "#374151" : undefined}
          count={8}
          className="mb-2"
        />
      ) : (
        <div className="flex justify-center items-center">
          <div
            className="w-[350px] md:w-[450px] lg:w-[750px] xl:w-[1000px] 2xl:w-full transition-all duration-500  
        bg-gradient-to-br from-green-100/50 via-gray-100/50 to-blue-100/50 
        dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
        p-8 rounded-xl border border-gray-300 dark:border-gray-700 shadow-xl"
          >
            <table className="w-full text-sm md:text-base table-auto">
              <thead className="bg-gray-100 dark:bg-gray-700">
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
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-b-gray-300 dark:border-gray-700 
                  hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
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
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1 rounded bg-green-300 text-gray-800 font-medium 
                dark:bg-green-600 dark:text-white 
                active:translate-1 duration-300 
                disabled:bg-gray-300 dark:disabled:bg-gray-600"
                >
                  Prev
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1 rounded bg-green-300 text-gray-800 font-medium 
                dark:bg-green-600 dark:text-white 
                active:translate-1 duration-300 
                disabled:bg-gray-300 dark:disabled:bg-gray-600"
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

export default AllUsers;
