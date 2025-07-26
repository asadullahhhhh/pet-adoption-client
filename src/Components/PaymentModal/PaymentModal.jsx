import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { Fragment, useState } from "react";
import Swal from "sweetalert2";

export default function PaymentModal({ isOpen, setIsOpen, data, user }) {
  function close() {
    setIsOpen(false);
  }

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [amount, setAmount] = useState(null);
  const [processing, setProcessing] = useState(false);

  const amountInSents = parseInt(amount) * 100;

  const handelPayment = async (e) => {
    e.preventDefault();
    setError2("");

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0)
      return setError2("Please enter a valid amount");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card == null) return;

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setProcessing(false);
      setError(error.message);
      return;
    }

    try {
      setError("");
      const res = await axios.post(
        "https://server-iota-henna.vercel.app/create-payment-intent",
        {
          amountInSents,
        }
      );

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
          },
        },
      });

      if (result.error) {
        setProcessing(false);
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: result.error.message,
          confirmButtonText: "OK",
        });
      } else if (result.paymentIntent.status === "succeeded") {
        await axios.patch(
          `https://server-iota-henna.vercel.app/donations/${data._id}/donate`,
          {
            donorEmail: user.email,
            donatedAmount: parseFloat(amount),
          }
        );

        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your donation was successful.",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          close();
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Could not process the donation.",
        confirmButtonText: "OK",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <DialogPanel className="w-full text-white max-w-md rounded-xl shadow-2xl bg-gray-500/90 p-6 backdrop-blur-2xl">
                <DialogTitle
                  as="h3"
                  className="text-3xl text-center mb-5 font-semibold text-white"
                >
                  Donate Now
                </DialogTitle>
                <form
                  onSubmit={handelPayment}
                  className="w-full max-w-md p-5 rounded-lg bg-gray-50 shadow"
                >
                  <label className="font-medium text-gray-700 mb-2 block">
                    Card information
                  </label>
                  <div className="border border-gray-300 rounded-md p-4 focus-within:border-indigo-600 transition">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#333",
                            "::placeholder": {
                              color: "#a0aec0",
                            },
                          },
                          invalid: {
                            color: "#e53e3e",
                          },
                        },
                      }}
                    />
                  </div>
                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <div className="mt-5">
                    <label className="font-medium text-gray-700 mb-2 block">
                      Amount
                    </label>
                    <input
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                      type="number"
                      className="border border-gray-300 rounded-md p-3 w-full text-black focus:outline-none"
                      placeholder="Enter amount"
                    />
                  </div>
                  {error2 && <p className="text-red-400 text-sm">{error2}</p>}

                  <button
                    type="submit"
                    disabled={processing}
                    className={`mt-5 w-full font-semibold py-2 px-4 rounded-md transition ${
                      processing
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    {processing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Pay"
                    )}
                  </button>
                </form>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
