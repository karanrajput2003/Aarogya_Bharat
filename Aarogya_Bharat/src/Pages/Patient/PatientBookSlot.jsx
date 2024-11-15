import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Navbar from "../../Components/Patient/Navbar";
import { FaClock, FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function PatientBookSlot() {
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.userId);
  const [doctorId] = useState(id);
  const [date, setDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [message, setMessage] = useState("");

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch available slots from the backend
  const fetchAvailableSlots = async () => {
    if (date) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/doctor/slots/${doctorId}/${date}`
        );
        setAvailableSlots(response.data);
      } catch (error) {
        console.error("Error fetching slots:", error);
        setMessage("No Slots Available.");
      }
    }
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const bookSlot = async (data) => {
    if (selectedSlot) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND}/create-order`,
          {
            ...data,
            date,
            time: selectedSlot.time,
            doctorId,
            userId,
            preferredDate: date,
            preferredTime: selectedSlot.time,
          }
        );

        if (response.data.url) {
          window.open(response.data.url, '_blank');
          
        } else {
          alert("Registration successful!");
          reset(); // Reset the form after successful submission
          setSelectedSlot(null); // Reset selected slot
          setDate(""); // Reset date
        }
      } catch (error) {
        console.error("Error booking slot:", error);
        setMessage("Error booking the selected slot.");
      }
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
  }, [date]);

  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen pt-6 md:pt-12 lg:pt-16 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-10 xl:space-y-16">
          <div className="bg-white backdrop-blur-md rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Book a Slot with Doctor</h1>

            <div className="mb-6">
              <label htmlFor="date" className="text-xl font-semibold text-gray-900 mb-2 block">Select Date:</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-black w-full p-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Slots:</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {availableSlots.length > 0 ? (
                availableSlots.map((slot, index) => (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => handleSlotSelection(slot)}
                      className={`w-full p-4 bg-${selectedSlot?.time === slot.time ? "indigo-600" : "white"} text-${selectedSlot?.time === slot.time ? "white" : "gray-800"} rounded-lg shadow-md hover:bg-indigo-700 hover:text-white transition-colors duration-200 focus:outline-none`}
                    >
                      <div className="flex justify-between items-center">
                        <FaClock className="text-black-500 mr-2" />
                        <span className="text-lg font-semibold">{slot.time}</span>
                      </div>
                      {selectedSlot?.time === slot.time && (
                        <div className="absolute top-0 right-0 p-2 text-green-400">
                          <FaCheckCircle />
                        </div>
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-4">No available slots for this date.</p>
              )}
            </div>

            {selectedSlot && (
              <form onSubmit={handleSubmit(bookSlot)} className="mt-8 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Patient Details:</h2>

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2 border border-gray-300 text-black rounded-md"
                  {...register("name", { required: "Full name is required" })}
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full p-2 border border-gray-300 text-black rounded-md"
                  {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 text-black rounded-md"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <textarea
                  placeholder="Medical History"
                  className="w-full p-2 border border-gray-300 text-black rounded-md"
                  {...register("medicalHistory")}
                />

                <textarea
                  placeholder="Symptoms"
                  className="w-full p-2 border border-gray-300 text-black rounded-md"
                  {...register("symptoms", { required: "Symptoms are required" })}
                />
                {errors.symptoms && <p className="text-red-500">{errors.symptoms.message}</p>}

                <input
                  type="text"
                  placeholder="Insurance Provider"
                  className="w-full p-2 border border-gray-300 text-black rounded-md"
                  {...register("insuranceProvider")}
                />

                <input
                  type="text"
                  placeholder="Policy Number"
                  className="w-full p-2 border border-gray-300 text-black rounded-md"
                  {...register("policyNumber")}
                />

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...register("consentToConsultation", { required: "Consent is required" })}
                  />
                  <span>Consent to Consultation</span>
                </label>
                {errors.consentToConsultation && <p className="text-red-500">{errors.consentToConsultation.message}</p>}

                <textarea
                  placeholder="Additional Notes"
                  className="w-full p-2 border border-gray-300 text-black rounded-md"
                  {...register("additionalNotes")}
                />

                <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
                  Book Slot
                </button>
              </form>
            )}

            {message && <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>}
          </div>
        </div>
      </section>
    </>
  );
}

export default PatientBookSlot;
