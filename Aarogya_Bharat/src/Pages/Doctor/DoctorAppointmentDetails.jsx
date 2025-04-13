"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  Laptop,
  User,
  Shield,
  Activity,
  Bell,
  ChevronLeft,
  Search
} from "lucide-react";
import Navbar from "../../Components/Doctor/Navbar";

const DoctorAppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consultationData, setConsultationData] = useState(null);
  const [prescriptionData, setprescriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  
  // Get today's date for the header
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND}/api/appointments/${id}`
        );
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

    const fetchPrescriptionDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND}/prescriptions`
        );
        if (!response.ok) {
          throw new Error("Error fetching appointment details.");
        }
        const data = await response.json();
        const prescription = data.find((item) => item.appointmentId === id);
        if (prescription) {
          setprescriptionData(prescription);
        } else {
          setprescriptionData(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPrescriptionDetails();
    fetchAppointmentDetails();
  }, [id]);

  const handleStatusChange = async () => {
    setUpdating(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/appointments/status/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Completed" }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status.");

      setConsultationData((prevData) => ({
        ...prevData,
        status: "Completed",
      }));
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleGoBack = () => {
    navigate('/doctor/appointments');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-md">
          <h3 className="text-red-600 font-semibold text-lg mb-2">Error Loading Appointment Details</h3>
          <p className="text-slate-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!consultationData) return null;

  const statusBadgeColor = {
    Scheduled: "bg-green-500 text-white",
    Completed: "bg-blue-500 text-white",
    Unscheduled: "bg-amber-500 text-white",
    Cancelled: "bg-red-500 text-white"
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <main className="ml-20 flex-1 p-8">
        {/* Header with search and profile */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative">
            {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" /> */}
            <input
              type="text"
              placeholder="Aarogya Bharat"
              readOnly
              className="pl-10 pr-4 py-2 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-72 shadow-sm"
            />
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full bg-white shadow-sm mr-4 relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium mr-2">
                DL
              </div>
              <div className="relative">
                <button className="flex items-center">
                  <span className="font-medium text-slate-800">Dr Luke</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 ml-1 text-slate-500"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-slate-800">
              Appointment Details
            </h1>
            <p className="text-slate-500">{today}</p>
          </div>
          <button
            onClick={handleGoBack}
            className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Appointments
          </button>
        </div>
        
        {/* Patient Info Card */}
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-14 w-14 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-medium text-lg">
                  {consultationData.patient.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-slate-800">{consultationData.patient.name}</h2>
                <div className="mt-1 flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeColor[consultationData.status]}`}>
                    {consultationData.status}
                  </span>
                  <span className="mx-2 text-slate-300">•</span>
                  <span className="text-sm text-slate-500">
                    {new Date(consultationData.consultationDetails.preferredDate).toLocaleDateString()} at {consultationData.consultationDetails.preferredTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-lg font-medium text-slate-800">Patient Information</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoItem 
                    icon={<Phone className="h-5 w-5 text-indigo-500" />} 
                    label="Phone Number" 
                    value={consultationData.patient.phone} 
                  />
                  <InfoItem 
                    icon={<Mail className="h-5 w-5 text-indigo-500" />} 
                    label="Email" 
                    value={consultationData.patient.email} 
                  />
                  <InfoItem 
                    icon={<Activity className="h-5 w-5 text-indigo-500" />} 
                    label="Symptoms" 
                    value={consultationData.patient.symptoms} 
                  />
                  <InfoItem 
                    icon={<FileText className="h-5 w-5 text-indigo-500" />} 
                    label="Medical History" 
                    value={consultationData.patient.medicalHistory || "No known conditions"} 
                  />
                </div>
              </div>
            </div>

            {/* Consultation Details */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-lg font-medium text-slate-800">Consultation Details</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoItem 
                    icon={<Calendar className="h-5 w-5 text-indigo-500" />} 
                    label="Preferred Date" 
                    value={new Date(consultationData.consultationDetails.preferredDate).toLocaleDateString()} 
                  />
                  <InfoItem 
                    icon={<Clock className="h-5 w-5 text-indigo-500" />} 
                    label="Preferred Time" 
                    value={consultationData.consultationDetails.preferredTime} 
                  />
                  <InfoItem 
                    icon={<Laptop className="h-5 w-5 text-indigo-500" />} 
                    label="Meet Link" 
                    value={
                      <a href={consultationData.consultationDetails.meetLink || "https://aarogya-bharat-video-call.onrender.com/kdkskdn1q121"} 
                         className="text-indigo-600 hover:underline" 
                         target="_blank" 
                         rel="noopener noreferrer">
                        Join Meeting
                      </a>
                    } 
                  />
                  <InfoItem 
                    icon={<User className="h-5 w-5 text-indigo-500" />} 
                    label="Doctor ID" 
                    value={consultationData.consultationDetails.doctorid} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Insurance Details */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-lg font-medium text-slate-800">Insurance Details</h3>
              </div>
              <div className="p-6">
                <InfoItem 
                  icon={<Shield className="h-5 w-5 text-indigo-500" />} 
                  label="Insurance Provider" 
                  value={consultationData.patient.insuranceDetails?.provider || "N/A"} 
                />
                <div className="mt-4">
                  <InfoItem 
                    icon={<FileText className="h-5 w-5 text-indigo-500" />} 
                    label="Policy Number" 
                    value={consultationData.patient.insuranceDetails?.policyNumber || "N/A"} 
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-lg font-medium text-slate-800">Prescription</h3>
              </div>
              <div className="p-6">
              {prescriptionData ? (
              <table className="min-w-full divide-y divide-slate-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Medicine Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Dosage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Instructions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {prescriptionData.medicines.map((medicine) => (
                    <tr key={medicine._id}>
                      <td className="px-6 py-4 text-sm text-slate-800">
                        {medicine.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-800">
                        {medicine.dosage}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-800">
                        {medicine.instructions}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-800">
                        {medicine.duration} days
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-800">
                        {medicine.notes || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <button
                onClick={() =>
                  navigate(
                    `/doctor/giveprescription/${consultationData.patient.userId}/${id}`
                  )
                }
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Prescription
              </button>
            )}
              </div>
            </div>
            {consultationData.status !== "Completed" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="text-lg font-medium text-slate-800">Actions</h3>
                </div>
                <div className="p-6">
                  <button
                    onClick={handleStatusChange}
                    disabled={updating}
                    className={`w-full px-4 py-2 rounded-lg transition-colors ${
                      updating
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {updating ? "Updating..." : "Mark as Completed"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-0.5">
      {icon}
    </div>
    <div className="ml-3">
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <div className="mt-1 text-slate-800">{value}</div>
    </div>
  </div>
);

export default DoctorAppointmentDetails;