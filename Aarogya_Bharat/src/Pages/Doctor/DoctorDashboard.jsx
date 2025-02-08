import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Calendar, DollarSign, Users, TrendingUp, Star, Activity } from "lucide-react"
import Navbar from "../../Components/Doctor/Navbar"

// Mock data
const doctorInfo = {
  name: "Dr. Jane Smith",
  specialty: "Cardiologist",
  avatar: "/placeholder.svg?height=128&width=128",
  appointments: 8,
  patients: 11,
  revenue: 11000,
}

const appointmentData = [
  { name: "Mon", appointments: 6 },
  { name: "Tue", appointments: 8 },
  { name: "Wed", appointments: 7 },
  { name: "Thu", appointments: 9 },
  { name: "Fri", appointments: 5 },
  { name: "Sat", appointments: 4 },
  { name: "Sun", appointments: 3 },
]

const recentPatients = [
  { name: "Karan Rajput", date: "2023-11-16", time: "9:00 AM", status: "Scheduled" },
  { name: "Pritesh Singh", date: "2023-11-16", time: "9:30 AM", status: "Unscheduled" },
  { name: "Anita Desai", date: "2023-11-16", time: "10:00 AM", status: "Completed" },
]

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Dr. Smith</h1>
          <p className="text-gray-300">Here's an overview of your practice today</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <OverviewCard
            icon={<Calendar className="h-8 w-8 text-teal-400" />}
            label="Total Appointments"
            value={doctorInfo.appointments}
            extraText="Today"
          />
          <OverviewCard
            icon={<Users className="h-8 w-8 text-blue-400" />}
            label="Total Patients"
            value={doctorInfo.patients}
            extraText="+2 from last month"
          />
          <OverviewCard
            icon={<DollarSign className="h-8 w-8 text-green-400" />}
            label="Total Revenue"
            value={`Rs. ${doctorInfo.revenue}`}
            extraText="+10% from last month"
          />
          <OverviewCard
            icon={<Star className="h-8 w-8 text-yellow-400" />}
            label="Patient Satisfaction"
            value="95%"
            extraText="Excellent"
            progress={95}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Weekly Appointments</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#ffffff80" />
                <YAxis stroke="#ffffff80" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff20", borderColor: "#ffffff40" }}
                  labelStyle={{ color: "#ffffff" }}
                />
                <Bar dataKey="appointments" fill="#4fd1c5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Upcoming Appointments</h2>
            <p className="text-sm text-gray-300 mb-4">You have {doctorInfo.appointments} appointments today</p>
            <div className="space-y-4">
              {recentPatients.map((patient, index) => (
                <AppointmentCard key={index} patient={patient} />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Patient Overview</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <PatientOverviewCard
              icon={<TrendingUp className="h-8 w-8 text-green-400" />}
              label="New Patients"
              value="+12"
              extraText="+8% from last month"
            />
            <PatientOverviewCard
              icon={<Activity className="h-8 w-8 text-blue-400" />}
              label="Returning Patients"
              value="108"
              extraText="+2% from last month"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function OverviewCard({ icon, label, value, extraText, progress }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-white">{label}</h3>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-sm text-gray-300">{extraText}</p>
        {progress && (
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
    </div>
  )
}

function AppointmentCard({ patient }) {
  return (
    <div className="flex items-center space-x-4 bg-white/5 rounded-lg p-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            {patient.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
      </div>
      <div className="flex-grow">
        <h4 className="text-white font-medium">{patient.name}</h4>
        <p className="text-sm text-gray-300">
          {patient.date} at {patient.time}
        </p>
      </div>
      <div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            patient.status === "Scheduled"
              ? "bg-green-500 text-green-100"
              : patient.status === "Unscheduled"
                ? "bg-yellow-500 text-yellow-100"
                : "bg-blue-500 text-blue-100"
          }`}
        >
          {patient.status}
        </span>
      </div>
    </div>
  )
}

function PatientOverviewCard({ icon, label, value, extraText }) {
  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-white">{label}</h3>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-300">{extraText}</p>
    </div>
  )
}

