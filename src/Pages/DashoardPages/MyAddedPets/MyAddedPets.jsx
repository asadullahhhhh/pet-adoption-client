import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md"; 
 import Swal from "sweetalert2";
 import axios from "axios";
 import { Circles } from "react-loader-spinner";
 import ReactDOMServer from "react-dom/server";
 import { IoMdCloudUpload } from "react-icons/io";
import PetLoadingS from "./PetLoadingS";

const MyAddedPets = () => {
  const {user} = useAuth()
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myAddedPets", page, user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/my-added-pets?email=${user?.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(data?.pets);

// Delete methode here
 const handleDelete = (id) => {
   Swal.fire({
     title: "Are you sure?",
     text: "This pet will be deleted permanently!",
     icon: "warning",
     showCancelButton: true,
     confirmButtonText: "Yes, delete it!",
   }).then(async (result) => {
     if (result.isConfirmed) {
       try {
         Swal.fire({
           title: "Deleting...",
           allowOutsideClick: false,
           didOpen: () => {
             Swal.showLoading();
           },
         });

         await axios.delete(`http://localhost:5000/pet/${id}`);

         Swal.fire({
           icon: "success",
           title: "Deleted!",
           text: "The pet has been deleted.",
           timer: 1500,
           showConfirmButton: false,
         });

         refetch();
       } catch (error) {
         Swal.fire({
           icon: "error",
           title: "Error!",
           text: error?.response?.data?.message || "Something went wrong.",
           confirmButtonText: "OK",
         });
       }
     }
   });
 };


 
// adopt method here
  const handleAdopt = async (id) => {
    console.log(id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this pet as adopted?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      // Spinner as HTML from React
      const spinnerHTML = ReactDOMServer.renderToString(
        <div className="flex justify-center items-center flex-col gap-2">
          <Circles height="50" width="50" color="#3085d6" ariaLabel="loading" />
          <p style={{ marginTop: "10px" }}>Updating...</p>
        </div>
      );

      // Show spinner in same modal
      Swal.fire({
        html: spinnerHTML,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      try {
        await axios.patch(`http://localhost:5000/pet-adopted/${id}`);

        // Replace spinner with success, auto-close after 1.5s
        Swal.fire({
          icon: "success",
          title: "Marked as Adopted!",
          showConfirmButton: false,
          timer: 1500,
        });

        refetch();
      } catch (error) {
        // Replace spinner with error and OK button
        Swal.fire({
          icon: "error",
          title: "Failed to Update",
          text: error?.response?.data?.message || "Something went wrong.",
          confirmButtonText: "OK",
        });
      }
    }
  };


  const columns = [
    {
      header: "SL",
      accessorFn: (row, index) => (page - 1) * limit + index + 1,
    },
    {
      header: "Pet Name",
      cell: ({ row }) => (
        <p className="font-semibold text-gray-700">{row.original.name}</p>
      ),
    },
    {
      header: "Category",
      cell: ({ row }) => (
        <p className="text-gray-700">{row.original.category}</p>
      ),
    },
    {
      header: "Image",
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <img
            src={row.original.images?.[0]}
            alt=""
            className="w-16 h-16 object-cover rounded"
          />
        </div>
      ),
    },
    {
      header: "Adoption Status",
      cell: ({ row }) =>
        row.original.adopted ? (
          <span className="text-green-600 font-semibold">Adopted</span>
        ) : (
          <span className="text-red-400 font-semibold">Not Adopted</span>
        ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate(`/dashboard/update-pet-details/${row.original._id}`)
              }
              className="btn btn-xs btn-warning bg-amber-200 hover:bg-amber-300/80 p-3 rounded-lg cursor-pointer"
            >
              <FaPen color="#1e1e1e" />
            </button>
            <button
              onClick={() => handleDelete(row.original._id)}
              className="btn btn-xs btn-error bg-red-300 hover:bg-red-400/70 p-3 rounded-lg cursor-pointer"
            >
              <MdDelete className="scale-110" />
            </button>
            <button
              onClick={() => handleAdopt(row.original._id)}
              className="bg-green-400/70 rounded-lg px-3 font-semibold text-gray-800 cursor-pointer hover:bg-green-400 hover:text-gray-900"
              disabled={row.original.adopted}
            >
              {row.original.adopted ? "Adopted" : "Mark Adopted"}
            </button>
          </div>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: data?.pets || [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <PetLoadingS></PetLoadingS>;

  if(data?.pets.length === 0) return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
      <div>
        <p className="font-bold text-2xl">You don't post any pet yet</p>
        <div className="flex justify-center mt-3">
          <Link to={"/dashboard/add-pet"}>
            <button className="px-5 flex cursor-pointer items-center gap-3 rounded-lg font-semibold text-gray-800 py-2 bg-gradient-to-tr from-green-200 via-green-300 to-green-400">
              Post <IoMdCloudUpload size={20} color="#fff" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 flex flex-col justify-between min-h-[calc(100vh-72px)]">
      <div className="overflow-x-auto w-[80%] mx-auto bg-gradient-to-br from-green-100/50 via-gray-200/50 to-blue-100/50 border border-gray-300 rounded-lg  backdrop-blur-3xl ">
        <table className="table  overflow-hidden w-full ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-green-100">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer py-5 border-b-2 border-b-green-200"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() && (
                      <span>
                        {header.column.getIsSorted() === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-b-neutral-300">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-5 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className=" py-5 px-7 flex w-full justify-between gap-2">
          <div>
            <span className="self-center text-sm font-semibold text-gray-600">
              Page {data.currentPage} of {data.totalPages}
            </span>
          </div>
          <div className="space-x-3">
            <button
              className="px-3 py-1 cursor-pointer bg-green-300 font-semibold text-gray-700 rounded disabled:bg-gray-300 active:scale-90 duration-300"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>

            <button
              className="px-3 py-1 cursor-pointer bg-green-300 font-semibold text-gray-700 rounded disabled:bg-gray-300 active:scale-90 duration-300"
              disabled={page >= data.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAddedPets;
