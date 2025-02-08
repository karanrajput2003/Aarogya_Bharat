"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Phone, Mail, Calendar, Clock, CheckCircle, FileText, Laptop, User, Shield, Activity, Clipboard } from "lucide-react"
import Navbar from "../../Components/Doctor/Navbar"

const DoctorAppointmentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [consultationData, setConsultationData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/appointments/${id}`)
        if (!response.ok) {
          throw new Error("Error fetching appointment details.")
        }
        const data = await response.json()
        setConsultationData(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointmentDetails()
  }, [id])

  const handleStatusChange = async () => {
    setUpdating(true)
    setError(null)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/appointments/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      })

      if (!response.ok) throw new Error("Failed to update status.")

      setConsultationData((prevData) => ({
        ...prevData,
        status: "Completed",
      }))
    } catch (error) {
      setError(error.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!consultationData) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Patient and Consultation Details</h1>
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-2xl font-semibold text-white">Virtual Consultation Booking</h2>
          </div>
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <InfoSection title="Patient Information">
                <InfoItem icon={<Laptop />} label="Meet Link" value={consultationData.consultationDetails.meetLink || 'http://localhost:3030/kdkskdn1q121'} />
                <InfoItem icon={<Phone />} label="Phone Number" value={consultationData.patient.phone} />
                <InfoItem icon={<Mail />} label="Email" value={consultationData.patient.email} />
                <InfoItem icon={<Activity />} label="Symptoms" value={consultationData.patient.symptoms} />
                <InfoItem icon={<FileText />} label="Medical History" value={consultationData.patient.medicalHistory || "No known conditions"} />
              </InfoSection>
              <InfoSection title="Insurance Details">
                <InfoItem icon={<Shield />} label="Insurance Provider" value={consultationData.patient.insuranceDetails.provider || "N/A"} />
                <InfoItem icon={<FileText />} label="Policy Number" value={consultationData.patient.insuranceDetails.policyNumber || "N/A"} />
              </InfoSection>
            </div>
            
            {/* Consultation Details */}
            <InfoSection title="Consultation Details">
              <div className="grid gap-6 md:grid-cols-2">
                <InfoItem icon={<Calendar />} label="Preferred Date" value={new Date(consultationData.consultationDetails.preferredDate).toLocaleDateString()} />
                <InfoItem icon={<Clock />} label="Preferred Time" value={consultationData.consultationDetails.preferredTime} />
                <InfoItem icon={<User />} label="Doctor ID" value={consultationData.consultationDetails.doctorid} />
                <InfoItem icon={<CheckCircle />} label="Status" value={<StatusBadge status={consultationData.status} />} />
              </div>
            </InfoSection>

            {/* Prescription Section */}
            <InfoSection title="Prescription">
              {consultationData.prescription ? (
                <div className="bg-gray-800 text-white p-4 rounded-md">
                  <p><strong>Medicines:</strong> {consultationData.prescription.medicines}</p>
                  <p><strong>Dosage:</strong> {consultationData.prescription.dosage}</p>
                  <p><strong>Instructions:</strong> {consultationData.prescription.instructions}</p>
                </div>
              ) : (
                <button
                  onClick={() => navigate(`/doctor/giveprescription/${id}`)}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Add Prescription
                </button>
              )}
            </InfoSection>

            {/* Status Update Button */}
            {consultationData.status !== "Completed" && (
              <div className="mt-6">
                <button
                  onClick={handleStatusChange}
                  disabled={updating}
                  className={`w-full px-4 py-2 text-white rounded-md transition-colors duration-300 ${
                    updating ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {updating ? "Updating..." : "Set Status to Completed"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

const InfoSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
)

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-1 text-teal-400">{icon}</div>
    <div className="ml-3">
      <p className="text-sm font-medium text-gray-300">{label}</p>
      <p className="mt-1 text-sm text-white">{value}</p>
    </div>
  </div>
)

const StatusBadge = ({ status }) => {
  const colors = {
    Scheduled: "bg-yellow-500 text-yellow-100",
    Completed: "bg-green-500 text-green-100",
    Unscheduled: "bg-red-500 text-red-100",
  }

  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>{status}</span>
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
  </div>
)

const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center h-screen">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  </div>
)

export default DoctorAppointmentDetails
