import React from "react";
import { useParams } from "react-router-dom";
import {
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";
import Sidebar from "../../Components/Admin/Sidebar";

const AdminAppointmentDetails = () => {
  const { id } = useParams();

  // Fetch the virtual consultation data using the id
  // In real implementation, you would fetch this from an API endpoint based on the id
  const consultationData = {
    patient: {
      name: "John Doe",
      contactInfo: {
        phone: "+91 98765 43210",
        email: "john.doe@example.com",
      },
      medicalHistory: "No major medical history, occasionally gets migraines.",
      symptoms: "Headache and dizziness.",
      insuranceDetails: {
        provider: "HealthCare Ltd.",
        policyNumber: "HC123456789",
      },
    },
    consultationDetails: {
      preferredDate: "2024-11-15T10:00:00Z",
      preferredTime: "10:00 AM",
      doctorid: "1234",
    },
    consentToConsultation: true,
    additionalNotes: "Patient prefers video consultation.",
    status: "Scheduled",
    createdAt: "2024-11-01T12:00:00Z",
    updatedAt: "2024-11-02T14:00:00Z",
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Virtual Consultation Booking
              </h1>
              <p className="mt-2 text-gray-600">
                Patient and consultation details.
              </p>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                {/* Patient Details */}
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Phone className="mr-2 h-5 w-5" /> Phone Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.patient.contactInfo.phone}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail className="mr-2 h-5 w-5" /> Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.patient.contactInfo.email}
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
                    {consultationData.patient.medicalHistory ||
                      "No known conditions"}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Insurance Provider
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.patient.insuranceDetails.provider ||
                      "N/A"}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Insurance Policy Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {consultationData.patient.insuranceDetails.policyNumber ||
                      "N/A"}
                  </dd>
                </div>

                {/* Consultation Details */}
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Calendar className="mr-2 h-5 w-5" /> Preferred Date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(
                      consultationData.consultationDetails.preferredDate
                    ).toLocaleDateString()}
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
                    <CheckCircle className="mr-2 h-5 w-5" /> Consent to
                    Consultation
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
                      <span className="text-green-500">
                        {consultationData.status}
                      </span>
                    )}
                    {consultationData.status === "Completed" && (
                      <span className="text-blue-500">
                        {consultationData.status}
                      </span>
                    )}
                    {consultationData.status === "Cancelled" && (
                      <span className="text-red-500">
                        {consultationData.status}
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAppointmentDetails;
