"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Phone, Mail, Calendar, Clock, CheckCircle, FileText, User, Clipboard, Shield, Activity } from "lucide-react"
import Navbar from "../../Components/Patient/Navbar"

const PatientAppointmentDetails = () => {
  const { id } = useParams()
  const [consultationData, setConsultationData] = useState(null)
  const [prescription, setPrescription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/appointments/${id}`)
        if (!response.ok) {
          throw new Error("Error fetching appointment details.")
        }
        const data = await response.json()
        setConsultationData(data)
        console.log(consultationData.patient.userId)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }


    fetchAppointmentDetails()
  }, [id])

  const fetchPrescription = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/getprescriptions/${consultationData.patient.userId}/${id}`)
      if (!response.ok) {
        throw new Error("Error fetching appointment details.")
      }
      const data = await response.json()
      setPrescription(data)
      console.log(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrescription();
  },[consultationData]);

  if (loading) {
    return <LoadingSpinner />
  }

  // if (error) {
  //   return <ErrorMessage message={error} />
  // }

  if (!consultationData) {
    return null
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white text-center">Patient and Consultation Details</h1>
          <br />
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800">Virtual Consultation Booking</h2>
              <p className="text-sm text-gray-600 mt-1">Appointment ID: {id}</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Section title="Patient Information">
                  <InfoItem
                    icon={<Phone className="text-blue-500" />}
                    label="Phone Number"
                    value={consultationData.patient.phone}
                  />
                  <InfoItem
                    icon={<Mail className="text-blue-500" />}
                    label="Email"
                    value={consultationData.patient.email}
                  />
                  <InfoItem
                    icon={<Activity className="text-blue-500" />}
                    label="Symptoms"
                    value={consultationData.patient.symptoms}
                  />
                  <InfoItem
                    icon={<Clipboard className="text-blue-500" />}
                    label="Medical History"
                    value={consultationData.patient.medicalHistory || "No known conditions"}
                  />
                </Section>
                <Section title="Insurance Details">
                  <InfoItem
                    icon={<Shield className="text-blue-500" />}
                    label="Insurance Provider"
                    value={consultationData.patient.insuranceDetails.provider || "N/A"}
                  />
                  <InfoItem
                    icon={<FileText className="text-blue-500" />}
                    label="Policy Number"
                    value={consultationData.patient.insuranceDetails.policyNumber || "N/A"}
                  />
                </Section>
              </div>
              <div className="mt-8">
                <Section title="Consultation Details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem
                      icon={<Calendar className="text-green-500" />}
                      label="Preferred Date"
                      value={new Date(consultationData.consultationDetails.preferredDate).toLocaleDateString()}
                    />
                    <InfoItem
                      icon={<Clock className="text-green-500" />}
                      label="Preferred Time"
                      value={consultationData.consultationDetails.preferredTime}
                    />
                    <InfoItem
                      icon={<User className="text-green-500" />}
                      label="Doctor ID"
                      value={consultationData.consultationDetails.doctorid}
                    />
                    <InfoItem
                      icon={<CheckCircle className="text-green-500" />}
                      label="Consent to Consultation"
                      value={consultationData.consentToConsultation ? "Yes" : "No"}
                    />
                  </div>
                </Section>
              </div>
              <div className="mt-8">
                <Section title="Prescription and Status">
                  <InfoItem
                    icon={<FileText className="text-purple-500" />}
                    label="Prescription Notes"
                    value={prescription && (
                        <ul className="list-disc list-inside space-y-2">
                          {prescription[0].medicines.map((medicine, index) => (
                            <li key={index} className="text-sm text-gray-900">
                              <strong>{medicine.name}</strong>: {medicine.dosage}, {medicine.instructions}, Duration: {medicine.duration} days
                            </li>
                          ))}
                        </ul>
                    ) || "None"}
                  />
                  <InfoItem
                    icon={<Activity className="text-purple-500" />}
                    label="Status"
                    value={<StatusBadge status={consultationData.status} />}
                  />
                </Section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
)

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div className="ml-3">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-sm text-gray-900">{value}</p>
    </div>
  </div>
)

const StatusBadge = ({ status }) => {
  const colors = {
    Scheduled: "bg-green-100 text-green-800",
    Completed: "bg-blue-100 text-blue-800",
    Unscheduled: "bg-red-100 text-red-800",
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  )
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
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

export default PatientAppointmentDetails

