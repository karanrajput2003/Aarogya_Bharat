"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../Components/Patient/Navbar"
import { useSelector } from "react-redux"
import axios from "axios"
import { Calendar, Clock, User, MapPin } from "lucide-react"

function MyAppointments() {
  const [appointments, setAppointments] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [view, setView] = useState("scheduled")
  const userId = useSelector((state) => state.auth.userId)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/myappointments?userId=${userId}`)
        setAppointments(response.data)
        setFilteredAppointments(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [userId])

  const displayedAppointments = filteredAppointments.filter((appointment) =>
    view === "scheduled"
      ? appointment.status === "Scheduled"
      : view === "completed"
        ? appointment.status === "Completed"
        : appointment.status === "Unscheduled",
  )

  const handleViewDetails = (id) => {
    navigate(`/patient/appointmentdetails/${id}`)
  }

  if (loading) {
    return <p className="text-white">Loading appointments...</p>
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8 md:mb-10 lg:mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white text-center">
              {view === "scheduled"
                ? "Scheduled Appointments"
                : view === "completed"
                  ? "Completed Appointments"
                  : "Unscheduled Appointments"}
            </h1>
          </div>

          <div className="flex gap-2 mb-8 flex-wrap">
            <button
              onClick={() => setView("scheduled")}
              className={`px-4 sm:px-6 py-2 rounded ${view === "scheduled" ? "bg-[#189AB4] text-white" : "bg-[#F0F4F8] border-[#7B6E58] text-[#0d6270] border"}`}
            >
              Scheduled Appointments
            </button>
            <button
              onClick={() => setView("completed")}
              className={`px-4 sm:px-6 py-2 rounded ${view === "completed" ? "bg-[#189AB4] text-white" : "bg-[#F0F4F8] border-[#7B6E58] text-[#0d6270] border"}`}
            >
              Completed Appointments
            </button>
            <button
              onClick={() => setView("unscheduled")}
              className={`px-4 sm:px-6 py-2 rounded ${view === "unscheduled" ? "bg-[#189AB4] text-white" : "bg-[#F0F4F8] border-[#7B6E58] text-[#0d6270] border"}`}
            >
              Unscheduled Appointments
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {displayedAppointments.length > 0 ? (
              displayedAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  handleViewDetails={handleViewDetails}
                />
              ))
            ) : (
              <p className="text-white">No appointments found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function AppointmentCard({ appointment, handleViewDetails }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <User className="text-[#189AB4] mr-2" size={20} />
          <h3 className="text-lg font-semibold text-[#05445E]">
            {appointment.consultationDetails.doctorid === "6737533059a5ef98b0a15846"
              ? "Dr. Rajesh Sharma"
              : "Dr. Arjun Desai"}
          </h3>
        </div>
        <p className="text-[#189AB4] mb-3">{appointment.specialization}</p>
        <div className="flex items-center mb-2">
          <Calendar className="text-[#75E6DA] mr-2" size={16} />
          <p className="text-[#0d6270] text-sm">
            {new Date(appointment.consultationDetails.preferredDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center mb-4">
          <Clock className="text-[#75E6DA] mr-2" size={16} />
          <p className="text-[#0d6270] text-sm">{appointment.consultationDetails.preferredTime}</p>
        </div>
        <div className="flex items-center mb-4">
          <MapPin className="text-[#75E6DA] mr-2" size={16} />
          <p className="text-[#0d6270] text-sm">Telehealth Session</p>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              appointment.status === "Scheduled"
                ? "bg-green-100 text-green-800"
                : appointment.status === "Completed"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {appointment.status}
          </span>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        {appointment.status === "Scheduled" && (
          <button
            onClick={() => handleViewDetails(appointment._id)}
            className="w-full mb-2 px-4 py-2 bg-[#189AB4] text-white rounded hover:bg-[#0a4c59] transition-colors duration-300"
          >
            Start Telehealth Session
          </button>
        )}
        <button
          onClick={() => handleViewDetails(appointment._id)}
          className="w-full px-4 py-2 bg-[#F0F4F8] text-[#05445E] rounded hover:bg-[#E0E4E8] transition-colors duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default MyAppointments

