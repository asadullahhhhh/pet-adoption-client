// pages/EditDonationCamp.jsx
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { LuImageUp } from "react-icons/lu";
import { imageUpload } from "../../../utils/utility";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BeatLoader from "react-spinners/BeatLoader";
import useAuth from "../../../hooks/useAuth";
import ProgressBar from "@ramonak/react-progress-bar";

export default function EditCampain() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [err, setErr] = useState(null);
  const [campaign, setCampaign] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  // Fetch campaign data
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/donation-campaigns/${id}`
        );
        const data = res.data;
        setCampaign(data);
        setValue("maxDonationAmount", data.maxDonationAmount);
        setValue("lastDate", data.lastDate?.split("T")[0]);
        setValue("shortDescription", data.shortDescription);
        editor?.commands.setContent(data.longDescription || "");
        setPreview(data.petImage);
      } catch (error) {
        Swal.fire("Error", "Failed to load campaign", "error");
      } finally {
        setLoading(false);
      }
    };
    if (editor) fetchCampaign();
  }, [id, editor, setValue]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploading(true);
    try {
      const data = await imageUpload(file);
      if (data) {
        setErr(null);
        setPreview(data);
      }
    } catch (err) {
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

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this campaign?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      Swal.fire({ title: "Updating...", didOpen: () => Swal.showLoading() });

      const payload = {
        petImage: preview,
        maxDonationAmount: data.maxDonationAmount,
        lastDate: new Date(data.lastDate).toISOString(),
        shortDescription: data.shortDescription,
        longDescription: editor?.getHTML(),
      };

      await axios.patch(
        `http://localhost:5000/donation-campaigns/${id}`,
        payload
      );

      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Campaign Updated!",
          showConfirmButton: false,
          timer: 1500,
        });
        clearErrors();
        setErr(null);
        navigate("/dashboard/my-campaigns");
      }, 800);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Update",
        text: err?.response?.data?.message || err.message,
      });
    }
  };


  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-72px)]">
      <div className="max-w-3xl mx-5 lg:mx-auto p-4 border border-gray-300/80 shadow-xl bg-gradient-to-bl from-green-50/80 via-blue-50/70 to-amber-50/80 backdrop-blur-3xl rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Donation Campaign
        </h2>

        {/* Progress bar */}
        <div className="mb-6">
          <p className="text-sm text-gray-700 font-medium mb-1">
            Donation Progress
          </p>
          <ProgressBar
            completed={campaign.totalDonatedAmount || 0}
            maxCompleted={campaign.maxDonationAmount}
            bgColor="#4ade80"
            height="16px"
            labelAlignment="outside"
            customLabel={`${campaign?.totalDonatedAmount || 0} / ${
              campaign.maxDonationAmount
            } BDT`}
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-4 justify-center items-center">
          <label
            htmlFor={`imageUpload`}
            className="w-24 h-24 border-2 border-dashed border-blue-300 flex items-center justify-center cursor-pointer bg-blue-50 hover:bg-blue-100 transition rounded"
          >
            {uploading ? (
              <div className="animate-spin h-6 w-6 border-4 border-blue-400 border-t-transparent rounded-full"></div>
            ) : preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="flex flex-col items-center">
                <LuImageUp size={24} />
                <span className="text-[12px] text-gray-500">Upload Image</span>
              </div>
            )}
          </label>
          <input
            type="file"
            id={`imageUpload`}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          {err && <p className="text-red-500 text-sm">{err}</p>}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-6 lg:w-2xl"
        >
          <div className="w-full">
            <label htmlFor="amount" className="text-gray-700 font-semibold">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              {...register("maxDonationAmount", {
                required: "Amount is required",
              })}
              placeholder="Maximum Donation Amount"
              className="w-full p-2 border border-gray-300 text-sm mt-1 focus:outline-gray-300 rounded"
            />
            {errors.maxDonationAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxDonationAmount.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="date" className="text-gray-700 font-semibold">
              Last Date
            </label>
            <input
              id="date"
              type="date"
              {...register("lastDate", {
                required: "Last date is required",
              })}
              className="w-full p-2 border rounded border-gray-300 text-sm mt-1 focus:outline-gray-300"
            />
            {errors.lastDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastDate.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="shortDesc" className="text-gray-700 font-semibold">
              Description
            </label>
            <input
              type="text"
              {...register("shortDescription", {
                required: "Short description is required",
              })}
              placeholder="Short Description"
              className="w-full p-2 border rounded border-gray-300 text-sm mt-1 focus:outline-gray-300"
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-600">
              Details
            </label>
            <div className="border border-gray-300 rounded-md w-full h-[150px]">
              <EditorContent
                editor={editor}
                className="w-full h-full prose-editor p-2"
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
            className="bg-black cursor-pointer hover:bg-black/85 text-white w-full font-semibold px-4 py-2 rounded"
          >
            {isSubmitting ? (
              <BeatLoader color="#fff" size={8} />
            ) : (
              "Update Campaign"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
