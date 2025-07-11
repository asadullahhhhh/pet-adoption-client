import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import ModalForm from "./ModalForm";

export default function AdoptModal({ isOpen, setIsOpen, pet, user }) {
  function close() {
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full text-gray-800 max-w-md rounded-xl shadow-2xl bg-gray-500/30 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-2xl font-semibold text-gray-700">
              {pet.name}
            </DialogTitle>
            <div className="flex items-start gap-5">
              <div>
                <img
                  src={pet.images[0]}
                  className="h-[100px] w-[100px] object-cover object-center rounded-xl my-3"
                  alt=""
                />
              </div>
              <div className="py-5">
                <p className="font-semibold">
                  Pet ID :{" "}
                  <span className="text-sm font-normal text-gray-600">
                    {pet._id}
                  </span>
                </p>
                <p className="font-semibold">
                  Pet Owner :{" "}
                  <span className="text-sm font-normal text-gray-600">
                    {pet.addedBy.name}
                  </span>
                </p>
              </div>
            </div>

            <div>
             <ModalForm user={user} close={close} pet={pet}></ModalForm>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
