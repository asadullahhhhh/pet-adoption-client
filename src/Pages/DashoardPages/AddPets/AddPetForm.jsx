// AddPetForm.jsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { imageUpload } from "../../../utils/utility";
import useAuth from "../../../hooks/useAuth";
import { LuImageUp } from "react-icons/lu";

const categories = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Bird", label: "Bird" },
  { value: "Rabbit", label: "Rabbit" },
];

const gender = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
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

const AddPetForm = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [uploading, setUploading] = useState(false);
  const [uploading1, setUploading1] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [preview, setPrrview] = useState(null);
  const [preview1, setPrrview1] = useState(null);
  const [preview2, setPrrview2] = useState(null);
  const [imageError, setImageError] = useState(null)

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  // Handel Image
  const handleImageChange = async (e, s) => {
    const file = e.target.files[0];
    s === 2
      ? setUploading2(true)
      : s === 1
      ? setUploading1(true)
      : setUploading(true);
    s === 2
      ? setPrrview2(null)
      : s === 1
      ? setPrrview1(null)
      : setPrrview(null);
    try {
      const data = await imageUpload(file);
      if(data) {
        setImageError(null)
      }
      s === 2
        ? setPrrview2(data)
        : s === 1
        ? setPrrview1(data)
        : setPrrview(data);
      s;
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      setUploading1(false);
      setUploading2(false);
    }
  };

  // Handel form submit
  const onSubmit = async (data) => {
    console.log(preview, preview1, preview2);
    if(preview === null && preview1 === null && preview2 === null) return setImageError('Must upload an Image')

    const result = await Swal.fire({
      title: "Add this pet?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const pet = {
            ...data,
            images: [preview, preview1, preview2].filter(img => img !== null),
            gender : data.gender.value,
            traits: data.traits.map((t) => t.value),
            category: data.category.value,
            longDescription: editor.getHTML() || '',
            addedBy: {
              name: user?.displayName,
              email: user?.email,
            }
          };

          const res = await axios.post(`http://localhost:5000/pets`, pet);
          console.log(res.data);
          return res.data;

        } catch (err) {
          Swal.showValidationMessage(`Request failed: ${err.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (result.isConfirmed) {
      Swal.fire("Success!", "Pet added successfully!", "success");
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6 
  bg-gradient-to-br from-green-100/30 via-gray-200/30 to-blue-100/30 
  backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl mt-10"
    >
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Add a New Pet
      </h2>

      {/* Image section */}
      <div className="mb-7">
        <h2 className="mb-3 font-semibold text-md">Select pet images</h2>
        <div className="flex gap-4">
          {[...Array(3)].map((_, index) => {
            const previews = [preview, preview1, preview2];
            const uploadings = [uploading, uploading1, uploading2];

            return (
              <div key={index}>
                <label
                  htmlFor={`imageUpload-${index}`}
                  className="w-20 h-20 border-2 border-dashed border-blue-300 flex items-center justify-center cursor-pointer bg-blue-50 hover:bg-blue-100 transition rounded"
                >
                  {uploadings?.[index] ? (
                    <div className="animate-spin h-6 w-6 border-4 border-blue-400 border-t-transparent rounded-full"></div>
                  ) : previews?.[index] ? (
                    <img
                      src={previews?.[index]}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <LuImageUp size={24} />
                      <span className="text-[12px] text-gray-500">
                        Image-{index + 1}
                      </span>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id={`imageUpload-${index}`}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </div>
            );
          })}
        </div>
        {imageError ? <p className="text-red-500 mt-3">{imageError}</p> : ""}
      </div>

      {/* Details form section */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* pet Name */}
          <div>
            <label className="block font-medium mb-1">Pet Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Pet name"
              className="input input-bordered w-full border py-2 px-5 rounded-md border-gray-300 focus:outline-gray-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* pet age */}
          <div>
            <label className="block font-medium mb-1">Pet Age</label>
            <input
              {...register("age", {
                required: "Age is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Age must be a number",
                },
              })}
              placeholder="Pet age"
              className="input input-bordered w-full border py-2 px-5 rounded-md border-gray-300 focus:outline-gray-400"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* pet gender */}
          <div>
            <label className="block font-medium mb-1">Gender</label>
            <Controller
              control={control}
              name="gender"
              rules={{ required: "Select gender" }}
              render={({ field }) => (
                <Select {...field} options={gender}></Select>
              )}
            ></Controller>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender?.message}
              </p>
            )}
          </div>

          {/* pet category */}
          <div>
            <label className="block font-medium mb-1">Pet Category</label>
            <Controller
              control={control}
              name="category"
              rules={{ required: "Category is required" }}
              render={({ field }) => <Select {...field} options={categories} />}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* breed */}
          <div>
            <label className="block font-medium mb-1">Breed</label>
            <input
              {...register("breed", { required: "Breed is required" })}
              className="input input-bordered w-full border py-2 px-5 rounded-md border-gray-300 focus:outline-gray-400"
            />
          </div>

          {/* pet size */}
          <div>
            <label className="block font-medium mb-1">Size</label>
            <input
              {...register("size")}
              className="input input-bordered w-full border py-2 px-5 rounded-md border-gray-300 focus:outline-gray-400"
            />
          </div>

          <div>
            <div className="flex items-center gap-[30px]">
              <label htmlFor="tt" className="block font-medium mb-1">
                Neutered
              </label>
              <input
                type="checkbox"
                id="tt"
                {...register("neutered")}
                className="toggle toggle-success ml-2"
              />
            </div>

            <div className="flex items-center gap-5">
              <label htmlFor="ss" className="block font-medium mb-1">
                Vaccinated
              </label>
              <input
                type="checkbox"
                id="ss"
                {...register("vaccinated")}
                className="toggle toggle-success ml-2"
              />
            </div>
          </div>

          {/* pet Traits */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Traits</label>
            <Controller
              control={control}
              name="traits"
              rules={{ required: "Select atleast one traits" }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={traitsOptions}
                  value={field.value}
                  onChange={(selected) => {
                    // Limit to max 3
                    if (selected.length <= 3) {
                      field.onChange(selected);
                    }
                  }}
                  isOptionDisabled={(option) =>
                    field.value &&
                    field.value.length >= 3 &&
                    !field.value.find(
                      (selectedOption) => selectedOption.value === option.value
                    )
                  }
                  placeholder="Select up to 3 traits"
                />
              )}
            />
            {errors.traits && (
              <p className="text-red-500 text-sm mt-1">
                {errors.traits.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Pickup Location</label>
            <input
              {...register("location", { required: true })}
              className="input input-bordered w-full border py-2 px-5 rounded-md border-gray-300 focus:outline-gray-400"
            />
          </div>

          {/* sort dicription */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Short Description</label>
            <input
              {...register("description", {
                required: "Short description is required",
                maxLength: {
                  value: 100,
                  message: "Maximum 100 characters allowed",
                },
              })}
              maxLength={100}
              className="input input-bordered w-full border py-2 px-5 rounded-md border-gray-300 focus:outline-gray-400"
            />

            <div className="flex justify-between items-center mt-1">
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* long discription */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Long Description</label>
            <div className="border border-gray-300 rounded-md w-full h-[150px]">
              <EditorContent
                editor={editor}
                className="w-full h-full prose-editor"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary bg-black text-white py-2 rounded-lg font-semibold hover:bg-black/85 cursor-pointer w-full mt-6 text-lg"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPetForm;
