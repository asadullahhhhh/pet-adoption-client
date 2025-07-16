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

const AllUsers = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const {user} = useAuth()


  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users", search, user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/users?search=${search}&excludeEmail=${user?.email}`
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
          const res = await axios.patch(`http://localhost:5000/users/role`, {
            email,
            currentRole : role,
          });
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
            className="flex cursor-pointer bg-gray-200 rounded-lg active:scale-90 duration-300 px-5 py-2 items-center gap-1"
          >
            Role ({roleFilter})
          </button>
        ),
        accessorKey: "role",
        cell: ({ getValue }) => (
          <span className={`capitalize ${getValue() === 'admin' ? 'text-blue-600': 'text-green-600'} font-medium `}>
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
    <div className="py-5 px-5">
      <div className="flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email..."
          className="mb-5 py-2 px-5 border border-gray-400 focus:outline-none focus:border-gray-600 focus:shadow rounded-xl w-full max-w-sm"
        />
      </div>

      {isLoading ? (
        <Skeleton height={40} count={8} className="mb-2" />
      ) : (
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-green-100/50 via-gray-100/50 to-blue-100/50 p-8 rounded-xl border border-gray-300 shadow-xl">
          <table className="w-full text-sm md:text-base table-auto">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3 text-left">
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
                  className="border-b border-b-gray-300 hover:bg-gray-300 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2">
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
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-medium text-gray-700">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 rounded bg-green-300 cursor-pointer font-medium text-gray-700/80 active:translate-1 duration-300 disabled:bg-gray-300"
              >
                Prev
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 bg-green-300 cursor-pointer font-medium text-gray-700/80 active:translate-1 duration-300 rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
