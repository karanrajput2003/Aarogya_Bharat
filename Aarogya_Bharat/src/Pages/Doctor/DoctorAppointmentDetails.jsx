import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  FileText,
} from "lucide-react";
import Navbar from "../../Components/Doctor/Navbar";

const DoctorAppointmentDetails = () => {
  const { id } = useParams(); // Get the appointment ID from the URL
  const [consultationData, setConsultationData] = useState(null); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch the virtual consultation data from the backend
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/appointments/${id}`);
        if (!response.ok) {
          throw new Error("Error fetching appointment details.");
        }
        const data = await response.json();
        setConsultationData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  // If loading, show a loading message
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If there's an error, show the error message
  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  // If data hasn't loaded or is null, return null (shouldn't happen with proper loading/error handling)
  if (!consultationData) {
    return null;
  }

  return (
    <>
    <Navbar />
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container mx-auto px-4 py-8">
        <div className="mb-8 md:mb-10 lg:mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white text-center">
            Patient and Consultation Details
              </h1>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Virtual Consultation Booking
              </h1>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                {/* Patient Details */}
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Phone className="mr-2 h-5 w-5" /> Phone Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.patient.phone}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail className="mr-2 h-5 w-5" /> Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.patient.email}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Symptoms
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.patient.symptoms}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Medical History
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.patient.medicalHistory || "No known conditions"}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Insurance Provider
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.patient.insuranceDetails.provider || "N/A"}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Insurance Policy Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.patient.insuranceDetails.policyNumber || "N/A"}
                  </dd>
                </div>

                {/* Consultation Details */}
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Calendar className="mr-2 h-5 w-5" /> Preferred Date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(consultationData.consultationDetails.preferredDate).toLocaleDateString()}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Clock className="mr-2 h-5 w-5" /> Preferred Time
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.consultationDetails.preferredTime}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Doctor ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.consultationDetails.doctorid}
                  </dd>
                </div>

                {/* Consent and Status */}
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5" /> Consent to Consultation
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.consentToConsultation ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Additional Notes
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.additionalNotes || "None"}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.status === "Scheduled" && (
                      <span className="text-green-500">{consultationData.status}</span>
                    )}
                    {consultationData.status === "Completed" && (
                      <span className="text-blue-500">{consultationData.status}</span>
                    )}
                    {consultationData.status === "Unscheduled" && (
                      <span className="text-red-500">{consultationData.status}</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DoctorAppointmentDetails;
