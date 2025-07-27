import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const ModalForm = ({ user, pet, close, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(pet.addedBy.email);

  const onSubmit = async (data) => {
    const adoptionData = {
      userName: user?.displayName,
      userEmail: user?.email,
      phone: data.phone,
      address: data.address,
      petId: pet._id,
      petName: pet.name,
      petImage: pet.images?.[0],
      adoptedAt: new Date().toISOString(),
      status: "pending", // Optional
      ownerEmail: pet?.addedBy?.email,
    };

    try {
      const res = await axios.post(
        "https://server-roan-one.vercel.app/adoptPet",
        adoptionData
      );
      if (res.data.insertedId) {
        Swal.fire({
          title: "Request Sent!",
          text: "Your adoption request has been submitted successfully.",
          icon: "success",
          background: "rgba(255, 255, 255)",
          backdrop: "blur(5px)",
          showConfirmButton: false,
          timer: 1500,
        });
        close(); // close modal
        refetch();
      }
    } catch (err) {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        background: "rgba(255, 255, 255)",
        backdrop: "blur(4px)",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
      {/* Name */}
      <div className="relative z-0 w-full group">
        <input
          type="text"
          defaultValue={user?.displayName}
          disabled
          className="block py-2.5 w-full text-sm text-white/80 font-medium px-3 bg-transparent rounded-lg border border-gray-800/40 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 peer"
          placeholder=" "
        />
        <label className="absolute text-lg text-white font-medium duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
          Your Name
        </label>
      </div>

      {/* Email */}
      <div className="relative z-0 w-full group">
        <input
          type="text"
          defaultValue={user?.email}
          disabled
          className="block py-2.5 w-full text-sm text-white/80 font-medium px-3 bg-transparent rounded-lg border border-gray-800/40 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 peer"
          placeholder=" "
        />
        <label className="absolute text-lg text-white font-medium duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
          Your Email
        </label>
      </div>

      {/* Phone Number */}
      <div className="relative z-0 w-full group">
        <input
          type="text"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^01[0-9]{9}$/,
              message: "Invalid Bangladeshi phone number",
            },
          })}
          className="block py-2.5 w-full text-sm text-white/80 font-medium px-3 bg-transparent rounded-lg border border-gray-700/40 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 peer"
          placeholder=" "
        />
        <label className="absolute text-lg text-white duration-300 transform -translate-y-8 left-2 font-medium scale-75 top-1.5 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:left-1">
          Phone Number
        </label>
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="relative z-0 w-full group">
        <input
          type="text"
          {...register("address", { required: "Address is required" })}
          className="block py-2.5 w-full text-sm text-white/80 font-medium px-3 bg-transparent rounded-lg border border-gray-800/40 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 peer"
          placeholder=" "
        />
        <label className="absolute text-lg text-white duration-300 transform -translate-y-8 left-2 font-medium scale-75 top-1.5 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:left-1">
          Your Address
        </label>
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="inline-flex items-center gap-2 cursor-pointer rounded-md bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 hover:bg-green-600"
        >
          Confirm
        </button>
        <button
          type="button"
          onClick={close}
          className="inline-flex items-center gap-2 cursor-pointer rounded-md bg-red-500 px-5 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default ModalForm;
