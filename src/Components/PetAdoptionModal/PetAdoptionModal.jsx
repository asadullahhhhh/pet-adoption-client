import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";// your custom auth hook or context
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const PetAdoptionModal = ({ pet, isOpen, closeModal }) => {
  const { user } = useAuth(); // Assumes user = { displayName, email }
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adoptionData = {
      petId: pet._id,
      petName: pet.name,
      petImage: pet.image,
      userName: user.displayName,
      userEmail: user.email,
      phone,
      address,
      status: "pending",
      createdAt: new Date(),
    };

    await axios.post("/api/adoptions", adoptionData);
    closeModal();
    alert("Adoption request submitted!");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          leave="ease-in duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 shadow-xl transition-all">
            <Dialog.Title className="text-lg font-bold mb-4">
              Adopt {pet.name}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={user.displayName}
                disabled
                className="w-full border p-2 rounded bg-gray-100"
              />
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full border p-2 rounded bg-gray-100"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
              <textarea
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit Request
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PetAdoptionModal;
