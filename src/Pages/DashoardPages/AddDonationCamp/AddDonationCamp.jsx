// pages/CreateDonationCampaign.jsx
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useState } from "react";
import { LuImageUp } from "react-icons/lu";
import { imageUpload } from "../../../utils/utility";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BeatLoader from "react-spinners/BeatLoader";
import useAuth from "../../../hooks/useAuth";

export default function AddDonationCamp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();

  const { user, darkLight } = useAuth();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [preview, setPrrview] = useState(null);
  const [err, setErr] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  // Handle Image Upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploading(true);
    try {
      const data = await imageUpload(file);
      if (data) {
        setErr(null);
        setPrrview(data);
      }
    } catch (err) {
      console.error(err);
      setErr("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!preview) return setErr("Please select an image.");
    if (!editor?.getText().trim()) {
      setError("longDescription", {
        type: "manual",
        message: "Details is required",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to create this donation campaign?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Create it!",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      Swal.fire({
        title: "Creating...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const payload = {
        email: user?.email,
        petImage: preview,
        maxDonationAmount: data.maxDonationAmount,
        lastDate: new Date(data.lastDate).toISOString(),
        shortDescription: data.shortDescription,
        longDescription: editor?.getHTML(),
        createdAt: new Date(),
      };
      console.log(payload);

      const res = await axios.post(
        "http://localhost:5000/donation-campain",
        payload
      );
      console.log(res);

      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Campaign Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        reset();
        editor?.commands.setContent("");
        setPrrview(null);
        clearErrors();
        setErr(null);
        // navigate("/my-donation-campaigns");
      }, 800);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Create",
        text: err?.response?.data?.message || err.message,
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <section
      className={`flex items-center justify-center min-h-[calc(100vh-72px)] dark:bg-gray-900 py-10 ${
        darkLight ? "dark" : ""
      }`}
    >
      <div
        className="max-w-3xl mx-5 lg:mx-auto p-4 
      border border-gray-300/80 dark:border-gray-700 
      shadow-xl 
      bg-gradient-to-bl from-green-50/80 via-blue-50/70 to-amber-50/80 
      dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 
      backdrop-blur-3xl rounded-2xl"
      >
        <h2 className="text-2xl font-bold mb-7 text-center text-gray-800 dark:text-gray-100">
          Create Donation Campaign
        </h2>

        {/* Image Upload */}
        <div className="flex flex-col gap-4 justify-center items-center">
          <label
            htmlFor={`imageUpload`}
            className="w-24 h-24 border-2 border-dashed border-blue-300 
                   flex items-center justify-center cursor-pointer 
                   bg-blue-50 hover:bg-blue-100 
                   dark:bg-gray-700 dark:hover:bg-gray-600 
                   dark:border-gray-500 transition rounded"
          >
            {uploading ? (
              <div className="animate-spin h-6 w-6 border-4 border-blue-400 border-t-transparent rounded-full"></div>
            ) : preview ? (
              <img
                src={preview}
                alt={`Preview`}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="flex flex-col items-center">
                <LuImageUp
                  size={24}
                  className="text-gray-600 dark:text-gray-300"
                />
                <span className="text-[12px] text-gray-500 dark:text-gray-400">
                  Upload Image
                </span>
              </div>
            )}
          </label>
          <input
            type="file"
            id={`imageUpload`}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
          {err && <p className="text-red-500 text-sm">{err}</p>}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-6 lg:w-2xl"
        >
          <div className="w-full">
            <label
              htmlFor="amount"
              className="text-gray-700 dark:text-gray-200 font-semibold"
            >
              Amount
            </label>
            <input
              id="amount"
              type="number"
              {...register("maxDonationAmount", {
                required: "Amount is required",
              })}
              placeholder="Maximum Donation Amount"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 
                     text-gray-800 dark:text-gray-200 
                     text-sm mt-1 focus:outline-gray-300 dark:focus:outline-gray-500 rounded"
            />
            {errors.maxDonationAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxDonationAmount.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="text-gray-700 dark:text-gray-200 font-semibold"
            >
              Last Date
            </label>
            <input
              id="date"
              type="date"
              {...register("lastDate", {
                required: "Last date is required",
              })}
              className="w-full p-2 border rounded border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 
                     text-gray-800 dark:text-gray-200 
                     text-sm mt-1 focus:outline-gray-300 dark:focus:outline-gray-500"
            />
            {errors.lastDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastDate.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="shortDesc"
              className="text-gray-700 dark:text-gray-200 font-semibold"
            >
              Description
            </label>
            <input
              type="text"
              {...register("shortDescription", {
                required: "Short description is required",
              })}
              placeholder="Short Description"
              className="w-full p-2 border rounded border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 
                     text-gray-800 dark:text-gray-200 
                     text-sm mt-1 focus:outline-gray-300 dark:focus:outline-gray-500"
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-600 dark:text-gray-200">
              Details
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-md w-full h-[150px] bg-white dark:bg-gray-800">
              <EditorContent
                editor={editor}
                className="w-full h-full prose-editor p-2 text-gray-800 dark:text-gray-200"
              />
            </div>
            {errors.longDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.longDescription.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black dark:bg-green-600 cursor-pointer 
                   hover:bg-black/85 dark:hover:bg-green-500 
                   text-white w-full font-semibold px-4 py-2 rounded"
          >
            {isSubmitting ? (
              <BeatLoader color="#fff" size={8} />
            ) : (
              "Create Campaign"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
