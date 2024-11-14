import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/Patient/Navbar";
import { FaClock, FaCheckCircle } from "react-icons/fa"; 
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function PatientBookSlot() {
  const { id } = useParams();
  const [doctorId, setDoctorId] = useState(id);
  const userId = useSelector((state) => state.auth.userId);
  const [date, setDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [message, setMessage] = useState("");

  // New form fields based on schema
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    phone: "",
    email: "",
    medicalHistory: "",
    symptoms: "",
    insuranceProvider: "",
    policyNumber: "",
    consentToConsultation: false,
    additionalNotes: ""
  });

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

  const bookSlot = async () => {
    if (selectedSlot) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND}/create-order`,
          {
            ...patientDetails,
            date,
            time: selectedSlot.time,
            doctorId,
            userId,
            preferredDate: date,
            preferredTime: selectedSlot.time
          }
        );

        if (response.data.url) {
          window.location.href = response.data.url;
        } else {
          alert("Registration successful!");
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
                className="text-black w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
              <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <h2 className="text-2xl font-semibold text-gray-900">Patient Details:</h2>
                <input type="text" placeholder="Full Name" className="w-full" required
                  value={patientDetails.name}
                  onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                />
                <input type="tel" placeholder="Phone" className="w-full" required
                  value={patientDetails.phone}
                  onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                />
                <input type="email" placeholder="Email" className="w-full" required
                  value={patientDetails.email}
                  onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })}
                />
                <textarea placeholder="Medical History" className="w-full"
                  value={patientDetails.medicalHistory}
                  onChange={(e) => setPatientDetails({ ...patientDetails, medicalHistory: e.target.value })}
                />
                <textarea placeholder="Symptoms" className="w-full" required
                  value={patientDetails.symptoms}
                  onChange={(e) => setPatientDetails({ ...patientDetails, symptoms: e.target.value })}
                />
                <input type="text" placeholder="Insurance Provider" className="w-full"
                  value={patientDetails.insuranceProvider}
                  onChange={(e) => setPatientDetails({ ...patientDetails, insuranceProvider: e.target.value })}
                />
                <input type="text" placeholder="Policy Number" className="w-full"
                  value={patientDetails.policyNumber}
                  onChange={(e) => setPatientDetails({ ...patientDetails, policyNumber: e.target.value })}
                />
                <label>
                  <input type="checkbox" checked={patientDetails.consentToConsultation} required
                    onChange={(e) => setPatientDetails({ ...patientDetails, consentToConsultation: e.target.checked })}
                  />
                  <span className="ml-2">Consent to Consultation</span>
                </label>
                <textarea placeholder="Additional Notes" className="w-full"
                  value={patientDetails.additionalNotes}
                  onChange={(e) => setPatientDetails({ ...patientDetails, additionalNotes: e.target.value })}
                />
                <button type="submit" onClick={bookSlot} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
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
