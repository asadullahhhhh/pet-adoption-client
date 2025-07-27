import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { imageUpload } from "../../../utils/utility";
import { LuImageUp } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { data, useParams } from "react-router";

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const categoryOptions = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Bird", label: "Bird" },
  { value: "Rabbit", label: "Rabbit" },
];

const traitsOptions = [
  // Dog Traits
  { value: "Loves playing fetch games", label: "Loves playing fetch games" },
  { value: "Great with young children", label: "Great with young children" },
  { value: "Enjoys long daily walks", label: "Enjoys long daily walks" },
  {
    value: "Protective of family members",
    label: "Protective of family members",
  },
  { value: "House trained and obedient", label: "House trained and obedient" },

  // Cat Traits
  { value: "Loves warm sunny spots", label: "Loves warm sunny spots" },
  {
    value: "Very independent and curious",
    label: "Very independent and curious",
  },
  { value: "Uses litter box reliably", label: "Uses litter box reliably" },
  {
    value: "Playful with interactive toys",
    label: "Playful with interactive toys",
  },
  { value: "Gets along with dogs", label: "Gets along with dogs" },

  // Rabbit Traits
  {
    value: "Friendly with other rabbits",
    label: "Friendly with other rabbits",
  },
  {
    value: "Enjoys gentle human handling",
    label: "Enjoys gentle human handling",
  },
  { value: "Litter box trained rabbit", label: "Litter box trained rabbit" },
  { value: "Loves chewing wooden toys", label: "Loves chewing wooden toys" },
  {
    value: "Needs quiet calm environment",
    label: "Needs quiet calm environment",
  },

  // Bird Traits
  { value: "Can mimic human speech", label: "Can mimic human speech" },
  { value: "Very social and friendly", label: "Very social and friendly" },
  { value: "Enjoys flying around house", label: "Enjoys flying around house" },
  { value: "Responds well to training", label: "Responds well to training" },
  { value: "Loves music and whistling", label: "Loves music and whistling" },
];

const UpdatePet = () => {
  const { id } = useParams();

  const { data: petData = {} } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/pets/${id}`);
      return data;
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [previews, setPreviews] = useState(petData?.images || []);
  const [uploading, setUploading] = useState([false, false, false]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: petData?.longDescription || "",
  });

  useEffect(() => {
    reset({
      name: petData?.name,
      age: petData?.age,
      breed: petData?.breed,
      size: petData?.size,
      neutered: petData?.neutered,
      vaccinated: petData?.vaccinated,
      gender: genderOptions.find((g) => g.value === petData?.gender),
      category: categoryOptions.find((c) => c.value === petData?.category),
      traits: petData?.traits?.map((t) => ({ value: t, label: t })),
    });
    setPreviews(petData?.images);
  }, [petData, reset]);

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    const newUploading = [...uploading];
    newUploading[index] = true;
    setUploading(newUploading);

    try {
      const imageUrl = await imageUpload(file);
      const newPreviews = [...previews];
      newPreviews[index] = imageUrl;
      setPreviews(newPreviews);
    } catch (err) {
      console.error("Image Upload Error:", err);
    } finally {
      const updatedUploading = [...uploading];
      updatedUploading[index] = false;
      setUploading(updatedUploading);
    }
  };

  const onSubmit = async (data) => {
    const confirm = await Swal.fire({
      title: "Update pet?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const updatedPet = {
            ...data,
            gender: data.gender.value,
            category: data.category.value,
            traits: data.traits.map((t) => t.value),
            images: previews,
            longDescription: editor.getHTML(),
          };
          const res = await axios.patch(
            `http://localhost:5000/pets/${petData._id}`,
            updatedPet
          );
          return res.data;
        } catch (err) {
          Swal.showValidationMessage(`Update failed: ${err.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (confirm.isConfirmed) {
      Swal.fire("Success!", "Pet updated successfully!", "success");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 mt-5 backdrop-blur-3xl bg-gradient-to-bl from-green-100/20 via-blue-100/20 to-green-100/20 shadow-xl rounded-xl space-y-5"
    >
      <h2 className="text-2xl font-semibold text-center">Update Pet Info</h2>

      {/* Image Upload Section */}
      <div className="flex gap-4">
        {[0, 1, 2].map((index) => (
          <div key={index}>
            <label
              htmlFor={`img-${index}`}
              className="w-20 h-20 border-2 border-dashed rounded flex items-center justify-center cursor-pointer bg-blue-50 hover:bg-blue-100"
            >
              {uploading[index] ? (
                <div className="animate-spin h-6 w-6 border-4 border-blue-400 border-t-transparent rounded-full"></div>
              ) : previews?.[index] ? (
                <img
                  src={previews?.[index]}
                  alt={`Preview-${index}`}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="text-gray-500 text-sm flex flex-col items-center">
                  <LuImageUp size={20} />
                  Image-{index + 1}
                </div>
              )}
            </label>
            <input
              type="file"
              id={`img-${index}`}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
            />
          </div>
        ))}
      </div>

      {/* Pet Name */}
      <div>
        <label className="block mb-1 font-medium">Pet Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="input input-bordered w-full border py-2 px-5 rounded-md bg-white/40 border-gray-300 focus:outline-gray-400"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* Age, Breed, Size */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            {...register("age", { required: "Age is required" })}
            className="input input-bordered w-full  border py-2 px-5 rounded-md bg-white/40 border-gray-300 focus:outline-gray-400"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Breed</label>
          <input
            {...register("breed", { required: "Breed is required" })}
            className="input input-bordered w-full  border py-2 px-5 rounded-md bg-white/40 border-gray-300 focus:outline-gray-400"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Size</label>
          <input
            {...register("size")}
            className="input input-bordered w-full  border py-2 px-5 rounded-md bg-white/40 border-gray-300 focus:outline-gray-400"
          />
        </div>
      </div>

      {/* Gender and Category */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <Select {...field} options={genderOptions} />
            )}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Category</label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select {...field} options={categoryOptions} />
            )}
          />
        </div>
      </div>

      {/* Traits */}
      <div>
        <label className="block font-medium mb-1">Traits</label>
        <Controller
          name="traits"
          control={control}
          rules={{ required: "Traits required" }}
          render={({ field }) => (
            <Select {...field} options={traitsOptions} isMulti />
          )}
        />
      </div>

      {/* Toggles */}
      <div className="flex gap-5 items-center">
        <label className="flex items-center gap-2">
          Neutered
          <input
            type="checkbox"
            {...register("neutered")}
            className="toggle toggle-success"
          />
        </label>
        <label className="flex items-center gap-2">
          Vaccinated
          <input
            type="checkbox"
            {...register("vaccinated")}
            className="toggle toggle-success"
          />
        </label>
      </div>

      {/* long discription */}
      <div className="md:col-span-2">
        <label className="block font-medium mb-1">Long Description</label>
        <div className="border border-gray-300 rounded-md w-full h-[120px]">
          <EditorContent
            editor={editor}
            className="w-full h-full prose-editor bg-white/40"
          />
        </div>
      </div>

      <button
        className="bg-gradient-to-tr bg-black text-white py-2 rounded-lg hover:bg-black/85 cursor-pointer w-full"
        type="submit"
      >
        Update Pet
      </button>
    </form>
  );
};

export default UpdatePet;
