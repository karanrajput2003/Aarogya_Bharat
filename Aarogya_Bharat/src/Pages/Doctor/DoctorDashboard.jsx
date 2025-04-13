import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Calendar,
  Users,
  IndianRupee,
  Star,
  Activity,
  Clock,
  ChevronRight,
  BellRing,
  Plus,
  Edit,
  Search,
  Heart,
  ChevronLeft
} from "lucide-react";
import Navbar from "../../Components/Doctor/Navbar";

// Mock data
const doctorInfo = {
  name: "Dr. Jane Smith",
  specialty: "Cardiologist",
  avatar: "/placeholder.svg?height=128&width=128",
  appointments: 8,
  patients: 11,
  revenue: 11000,
  rating: 4.8,
};

const appointmentData = [
  { name: "Mon", appointments: 6, expected: 7 },
  { name: "Tue", appointments: 8, expected: 8 },
  { name: "Wed", appointments: 7, expected: 7 },
  { name: "Thu", appointments: 9, expected: 8 },
  { name: "Fri", appointments: 5, expected: 6 },
  { name: "Sat", appointments: 4, expected: 5 },
  { name: "Sun", appointments: 3, expected: 3 },
];

const revenueData = [
  { name: "Jan", value: 8500 },
  { name: "Feb", value: 9200 },
  { name: "Mar", value: 8900 },
  { name: "Apr", value: 9800 },
  { name: "May", value: 10200 },
  { name: "Jun", value: 11000 },
];

const patientDemographics = [
  { name: "Male", value: 58 },
  { name: "Female", value: 42 },
];

const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#6366f1'];
const STATUS_COLORS = {
  Scheduled: "bg-indigo-500 text-indigo-100",
  Pending: "bg-amber-500 text-amber-100",
  Completed: "bg-blue-500 text-blue-100",
  Cancelled: "bg-red-500 text-red-100"
};

const todayAppointments = [
  {
    name: "Matt Smith",
    time: "11:30 AM",
    type: "Emergency",
    completed: true,
  },
  {
    name: "Angelika Kravets",
    time: "1:30 PM",
    type: "Video consultation",
    completed: true,
  },
  {
    name: "Emily Blunt",
    time: "4:00 PM",
    type: "Check-up",
    completed: false,
  },
  {
    name: "John Krasinski",
    time: "5:30 PM",
    type: "Consultation",
    completed: false,
  },
];

// Calendar data
const calendarDays = [5, 6, 7, 8, 9, 10, 11];
const weekDays = ["MO", "TU", "WE", "TH", "FR", "ST", "SN"];
const currentMonth = "December 2022";

export default function DoctorDashboard() {
  const [selectedTab, setSelectedTab] = useState("All");

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Navbar />

      {/* Main Content */}
      <main className="ml-20 flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative">
            {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" /> */}
            <input
              type="text"
              placeholder="Aarogya Bharat"
              readonly
              className="pl-10 pr-4 py-2 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-72 shadow-sm"
            />
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full bg-white shadow-sm mr-4 relative">
              <BellRing className="h-5 w-5 text-slate-600" />
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1 text-slate-800">
            Good morning, Dr Luke
          </h1>
          <p className="text-slate-500">Have a great and productive day</p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Left side - 4/7 */}
          <div className="lg:col-span-4 space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-4 gap-6">
              <MetricCard
                icon={<Calendar className="h-6 w-6 text-indigo-600" />}
                label="Today's Appointments"
                value={doctorInfo.appointments}
                trend="+2"
                trendUp={true}
                bgColor="indigo-200"
                iconBgColor="bg-indigo-100"
              />
              <MetricCard
                icon={<Users className="h-6 w-6 text-indigo-600" />}
                label="Total Patients"
                value={doctorInfo.patients}
                trend="+5%"
                trendUp={true}
                bgColor="green-200"
                iconBgColor="bg-indigo-100"
              />
              <MetricCard
                icon={<IndianRupee className="h-6 w-6 text-indigo-600" />}
                label="Total Revenue"
                value={`₹${doctorInfo.revenue.toLocaleString()}`}
                trend="+10%"
                trendUp={true}
                bgColor="red-200"
                iconBgColor="bg-indigo-100"
              />
              <MetricCard
                icon={<Star className="h-6 w-6 text-indigo-600" />}
                label="Patient Rating"
                value={doctorInfo.rating}
                subtext="out of 5"
                progress={doctorInfo.rating * 20}
                bgColor="yellow-200"
                iconBgColor="bg-indigo-100"
              />
            </div>

            {/* Patient Statistics */}
            <div className="bg-white rounded-xl shadow-sm p-6 text-slate-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Weekly Appointments</h2>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <span className="h-3 w-3 rounded-full bg-indigo-600 mr-1"></span>
                    <span className="text-xs text-slate-500">Actual</span>
                  </span>
                  <span className="flex items-center">
                    <span className="h-3 w-3 rounded-full bg-indigo-200 mr-1"></span>
                    <span className="text-xs text-slate-500">Expected</span>
                  </span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={appointmentData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.5rem" }}
                      labelStyle={{ color: "#1e293b" }}
                      itemStyle={{ color: "#1e293b" }}
                    />
                    <Bar dataKey="expected" fill="#c7d2fe" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="appointments" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Revenue Trend</h2>
                <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
                  <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded">6M</button>
                  <button className="text-xs text-slate-600 px-3 py-1">1Y</button>
                  <button className="text-xs text-slate-600 px-3 py-1">All</button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.5rem" }}
                      labelStyle={{ color: "#1e293b" }}
                      formatter={(value) => [`₹${value}`, "Revenue"]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#4f46e5" 
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#4f46e5", strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: "#4f46e5", stroke: "#c7d2fe", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right side - 3/7 */}
          <div className="lg:col-span-3 space-y-6">
            {/* Calendar */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-slate-800">{currentMonth}</h2>
                <div className="flex space-x-2">
                  <button className="p-1 rounded-md hover:bg-slate-100">
                    <ChevronLeft className="h-5 w-5 text-slate-600" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-slate-100">
                    <ChevronRight className="h-5 w-5 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {weekDays.map((day, i) => (
                  <div key={i} className="text-xs text-slate-500">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {calendarDays.map((day, i) => (
                  <div
                    key={i}
                    className={`py-2 rounded-lg text-sm ${
                      day === 7 ? "bg-indigo-100 text-indigo-600 font-medium" : "text-slate-800"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Today's appointments */}
              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-medium text-slate-500 mb-3">Today's Appointments</h3>
                {todayAppointments.map((appointment, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium mr-3">
                        {appointment.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800">{appointment.name}</h4>
                        <p className="text-xs text-slate-500">
                          {appointment.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-3 text-slate-600">{appointment.time}</span>
                      {appointment.completed ? (
                        <div className="h-6 w-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M20 6 9 17l-5-5"></path>
                          </svg>
                        </div>
                      ) : (
                        <div className="h-6 w-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 text-slate-800">Patient Demographics</h2>
              <div className="flex justify-center">
                <div className="w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={patientDemographics}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {patientDemographics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, "Percentage"]}
                        contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex justify-center mt-4 space-x-6">
                {patientDemographics.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="h-3 w-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-slate-600">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  trend,
  trendUp,
  subtext,
  progress,
  bgColor,
  iconBgColor
}) {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-black">{label}</h3>
        <div className={`p-2 ${iconBgColor} rounded-full`}>{icon}</div>
      </div>
      <div className="mt-2">
        <div className="flex items-end">
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          {subtext && (
            <p className="ml-1 mb-1 text-sm text-slate-500">{subtext}</p>
          )}
        </div>

        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={`text-xs font-medium ${
                trendUp ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {trendUp ? "↑" : "↓"} {trend}
            </span>
            <span className="text-xs text-slate-500 ml-1">vs last month</span>
          </div>
        )}

        {progress && (
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5">
            <div
              className="bg-indigo-500 h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}