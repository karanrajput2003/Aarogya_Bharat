import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Navbar from "../../Components/Patient/Navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Clock, CheckCircle, Calendar, User, Phone, Mail, FileText, Thermometer, Shield, Info, AlertCircle } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

function PatientBookSlot() {
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.userId);
  const [doctorId] = useState(id);
  const [date, setDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/doctor/slots/${doctorId}/${date}`
        );
        setAvailableSlots(response.data);
        if (response.data.length === 0) {
          toast.error("No slots available for the selected date.");
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
        toast.error("Failed to load available slots.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    toast.success(`Time slot ${slot.time} selected`);
  };

  const bookSlot = async (data) => {
    if (selectedSlot) {
      setLoading(true);
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
          toast.success("Payment page opened in a new tab");
        } else {
          toast.success("Appointment booked successfully!");
          reset(); // Reset the form after successful submission
          setSelectedSlot(null); // Reset selected slot
          setDate(""); // Reset date
        }
      } catch (error) {
        console.error("Error booking slot:", error);
        toast.error("Failed to book appointment. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
  }, [date]);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border-none text-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white text-center">
            Book Your Appointment
          </h1>
          
          {/* Date Selection */}
          <div className="mt-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <label htmlFor="date" className="text-lg font-semibold">
                Select Date
              </label>
            </div>
            <input
              id="date"
              type="date"
              min={getTodayDate()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mt-2 bg-white/20 border border-white/30 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          {/* Available Slots */}
          <div className="mt-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-semibold">Available Time Slots</h2>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white"></div>
              </div>
            ) : (
              <>
                {date ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot, index) => (
                        <div key={index} className="relative">
                          <button
                            onClick={() => handleSlotSelection(slot)}
                            className={`w-full p-3 rounded ${
                              selectedSlot?.time === slot.time
                                ? "bg-teal-500 text-white"
                                : "bg-white/20 border border-white/30 hover:bg-white/30"
                            } transition-all duration-300`}
                          >
                            <div className="flex justify-center items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{slot.time}</span>
                            </div>
                            {selectedSlot?.time === slot.time && (
                              <CheckCircle className="absolute top-2 right-2 h-4 w-4" />
                            )}
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="col-span-full text-white/80 bg-white/10 border border-white/30 p-4 rounded text-center mt-3">
                        <AlertCircle className="inline h-5 w-5 mr-2" />
                        No available slots for this date.
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="bg-white/10 border border-white/30 p-4 rounded text-center text-white/80 mt-3">
                    <Info className="inline h-5 w-5 mr-2" />
                    Please select a date to view available slots
                  </p>
                )}
              </>
            )}
          </div>
          
          {/* Patient Form */}
          {selectedSlot && (
            <div className="mt-8 bg-white/10 border border-white/30 rounded-lg p-5">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/30">
                Patient Details
              </h2>
              
              <form onSubmit={handleSubmit(bookSlot)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <div className="flex items-center mb-1">
                      <User className="h-4 w-4 mr-2" />
                      <label className="text-white/90">Full Name</label>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className={`w-full bg-white/20 border ${
                        errors.name ? "border-red-400" : "border-white/30"
                      } text-white placeholder:text-white/50 rounded p-2`}
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <div className="flex items-center mb-1">
                      <Phone className="h-4 w-4 mr-2" />
                      <label className="text-white/90">Phone Number</label>
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className={`w-full bg-white/20 border ${
                        errors.phone ? "border-red-400" : "border-white/30"
                      } text-white placeholder:text-white/50 rounded p-2`}
                      {...register("phone", { required: "Phone number is required" })}
                    />
                    {errors.phone && (
                      <p className="text-red-300 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                
                {/* Email Field */}
                <div>
                  <div className="flex items-center mb-1">
                    <Mail className="h-4 w-4 mr-2" />
                    <label className="text-white/90">Email Address</label>
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className={`w-full bg-white/20 border ${
                      errors.email ? "border-red-400" : "border-white/30"
                    } text-white placeholder:text-white/50 rounded p-2`}
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                {/* Medical History Field */}
                <div>
                  <div className="flex items-center mb-1">
                    <FileText className="h-4 w-4 mr-2" />
                    <label className="text-white/90">Medical History</label>
                  </div>
                  <textarea
                    placeholder="Share any relevant medical history"
                    rows="3"
                    className="w-full bg-white/20 border border-white/30 text-white placeholder:text-white/50 rounded p-2"
                    {...register("medicalHistory")}
                  ></textarea>
                </div>
                
                {/* Symptoms Field */}
                <div>
                  <div className="flex items-center mb-1">
                    <Thermometer className="h-4 w-4 mr-2" />
                    <label className="text-white/90">Current Symptoms</label>
                  </div>
                  <textarea
                    placeholder="Describe your symptoms"
                    rows="3"
                    className={`w-full bg-white/20 border ${
                      errors.symptoms ? "border-red-400" : "border-white/30"
                    } text-white placeholder:text-white/50 rounded p-2`}
                    {...register("symptoms", { required: "Symptoms description is required" })}
                  ></textarea>
                  {errors.symptoms && (
                    <p className="text-red-300 text-sm mt-1">{errors.symptoms.message}</p>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Insurance Provider */}
                  <div>
                    <div className="flex items-center mb-1">
                      <Shield className="h-4 w-4 mr-2" />
                      <label className="text-white/90">Insurance Provider</label>
                    </div>
                    <input
                      type="text"
                      placeholder="Your insurance company"
                      className="w-full bg-white/20 border border-white/30 text-white placeholder:text-white/50 rounded p-2"
                      {...register("insuranceProvider")}
                    />
                  </div>
                  
                  {/* Policy Number */}
                  <div>
                    <div className="flex items-center mb-1">
                      <FileText className="h-4 w-4 mr-2" />
                      <label className="text-white/90">Policy Number</label>
                    </div>
                    <input
                      type="text"
                      placeholder="Your policy number"
                      className="w-full bg-white/20 border border-white/30 text-white placeholder:text-white/50 rounded p-2"
                      {...register("policyNumber")}
                    />
                  </div>
                </div>
                
                {/* Additional Notes */}
                <div>
                  <div className="flex items-center mb-1">
                    <Info className="h-4 w-4 mr-2" />
                    <label className="text-white/90">Additional Notes</label>
                  </div>
                  <textarea
                    placeholder="Any additional information"
                    rows="2"
                    className="w-full bg-white/20 border border-white/30 text-white placeholder:text-white/50 rounded p-2"
                    {...register("additionalNotes")}
                  ></textarea>
                </div>
                
                {/* Consent Checkbox */}
                <div className="bg-white/10 border border-white/30 rounded-lg p-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      className="mt-1 mr-3"
                      {...register("consentToConsultation", { required: "Consent is required" })}
                    />
                    <span className="text-white/90 text-sm">
                      I consent to this consultation and understand that my information will be handled according to privacy policies.
                    </span>
                  </label>
                  {errors.consentToConsultation && (
                    <p className="text-red-300 text-sm mt-1">{errors.consentToConsultation.message}</p>
                  )}
                </div>
                
                {/* Booking Summary */}
                <div className="bg-white/10 border border-white/30 rounded-lg p-3">
                  <h3 className="font-medium text-white mb-2">Appointment Summary</h3>
                  <div className="flex space-x-4">
                    <p>
                      <span className="text-white/70">Date:</span>{" "}
                      <span className="text-white">{new Date(date).toLocaleDateString()}</span>
                    </p>
                    <p>
                      <span className="text-white/70">Time:</span>{" "}
                      <span className="text-white">{selectedSlot.time}</span>
                    </p>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  } transition duration-300 ease-in-out flex justify-center items-center`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </button>
              </form>
            </div>
          )}
          
          {/* Message display */}
          {message && (
            <div className="mt-4 bg-white/10 border border-white/30 rounded-lg p-4">
              <p className="text-white flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PatientBookSlot;