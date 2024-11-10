import React from 'react'
import { 
  Users as UsersIcon,
  Bell,
  ChevronDown
} from 'lucide-react'
import MonthlyRevenue from '../../Components/Admin/Dashboard/MonthlyRevenue'
import AppointmentsChart from '../../Components/Admin/Dashboard/AppointmentsChart'
import Alldetails from '../../Components/Admin/Dashboard/Alldetails'
import RecentAppointment from '../../Components/Admin/Dashboard/RecentAppointment'
import TopDoctor from '../../Components/Admin/Dashboard/TopDoctor'
import Sidebar from '../../Components/Admin/Sidebar'

export default function AdminHome() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Bell className="h-5 w-5" />
              </button>
              <button className="ml-2 p-2 text-gray-500 hover:text-gray-700">
                <img src="/placeholder-avatar.jpg" alt="Admin" className="h-8 w-8 rounded-full" />
              </button>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <Alldetails />

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <MonthlyRevenue />
            <AppointmentsChart />
          </div>

          {/* Recent Appointments */}
          <RecentAppointment />

          {/* Top Doctors */}
          <TopDoctor />
        </div>
      </main>
    </div>
  )
}



// import React from 'react';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
// import { FaUserMd, FaCalendarCheck, FaDollarSign, FaClipboardList, FaCog } from 'react-icons/fa';
// import { AiOutlineLineChart, AiOutlineMedicineBox, AiOutlineCheck, AiOutlineClose, AiOutlineQuestion } from 'react-icons/ai';

// const COLORS = ["#4A90E2", "#50E3C2", "#FFC658"];
// const revenueData = [
//   { name: 'Jan', revenue: 4000 },
//   { name: 'Feb', revenue: 3000 },
//   { name: 'Mar', revenue: 5000 },
//   { name: 'Apr', revenue: 4500 },
//   { name: 'May', revenue: 6000 },
//   { name: 'Jun', revenue: 5500 },
// ];

// const appointmentData = [
//   { name: 'Completed', value: 400 },
//   { name: 'Cancelled', value: 30 },
//   { name: 'No-show', value: 50 },
// ];

// const recentAppointments = [
//   { id: 1, patient: "John Doe", doctor: "Dr. Smith", date: "2023-06-15", time: "10:00 AM", status: "Completed" },
//   { id: 2, patient: "Jane Smith", doctor: "Dr. Johnson", date: "2023-06-15", time: "11:30 AM", status: "Cancelled" },
//   { id: 3, patient: "Bob Brown", doctor: "Dr. Lee", date: "2023-06-16", time: "2:00 PM", status: "Upcoming" },
// ];

// const topDoctors = [
//   { id: 1, name: "Dr. Emily Smith", specialty: "Cardiology", rating: 4.9, consultations: 120 },
//   { id: 2, name: "Dr. Michael Johnson", specialty: "Pediatrics", rating: 4.8, consultations: 110 },
//   { id: 3, name: "Dr. Sarah Lee", specialty: "Dermatology", rating: 4.7, consultations: 95 },
// ];

// export default function AdminHome() {
//   return (
//     <div className="flex min-h-screen bg-gray-50 text-gray-800">
//       {/* Sidebar */}
//       <aside className="w-64 bg-blue-900 text-white flex flex-col p-4">
//         <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
//         <nav className="flex flex-col gap-4">
//           <button className="flex items-center hover:bg-blue-800 rounded-md py-2 px-3 gap-2">
//             <AiOutlineLineChart /> Dashboard
//           </button>
//           <button className="flex items-center hover:bg-blue-800 rounded-md py-2 px-3 gap-2">
//             <FaUserMd /> Doctors & Staff
//           </button>
//           <button className="flex items-center hover:bg-blue-800 rounded-md py-2 px-3 gap-2">
//             <FaCalendarCheck /> Appointments
//           </button>
//           <button className="flex items-center hover:bg-blue-800 rounded-md py-2 px-3 gap-2">
//             <FaDollarSign /> Payments
//           </button>
//           <button className="flex items-center hover:bg-blue-800 rounded-md py-2 px-3 gap-2">
//             <FaCog /> Settings
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <header className="bg-white p-4 rounded-md shadow-md mb-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
//         </header>

//         {/* Quick Stats */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//           <div className="bg-white p-4 rounded-md shadow-md flex items-center gap-4">
//             <FaCalendarCheck className="text-blue-600 text-2xl" />
//             <div>
//               <h3 className="text-sm font-medium">Total Appointments</h3>
//               <div className="text-2xl font-bold">1,234</div>
//               <p className="text-xs text-gray-500">+20.1% from last month</p>
//             </div>
//           </div>
//           <div className="bg-white p-4 rounded-md shadow-md flex items-center gap-4">
//             <FaDollarSign className="text-green-600 text-2xl" />
//             <div>
//               <h3 className="text-sm font-medium">Total Revenue</h3>
//               <div className="text-2xl font-bold">$54,321</div>
//               <p className="text-xs text-gray-500">+15.2% from last month</p>
//             </div>
//           </div>
//           <div className="bg-white p-4 rounded-md shadow-md flex items-center gap-4">
//             <AiOutlineMedicineBox className="text-yellow-600 text-2xl" />
//             <div>
//               <h3 className="text-sm font-medium">Active Patients</h3>
//               <div className="text-2xl font-bold">3,456</div>
//               <p className="text-xs text-gray-500">+5.2% from last month</p>
//             </div>
//           </div>
//           <div className="bg-white p-4 rounded-md shadow-md flex items-center gap-4">
//             <FaClipboardList className="text-purple-600 text-2xl" />
//             <div>
//               <h3 className="text-sm font-medium">Inventory Items</h3>
//               <div className="text-2xl font-bold">789</div>
//               <p className="text-xs text-gray-500">+2.5% from last month</p>  
//             </div>
//           </div>
//         </section>

//         {/* Charts Section */}
//         <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           <div className="bg-white p-6 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//               <AiOutlineLineChart className="text-blue-600" /> Monthly Revenue
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={revenueData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="revenue" fill="#50E3C2" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white p-6 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//               <FaCalendarCheck className="text-blue-600" /> Appointment Status
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={appointmentData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={80}
//                   fill="#4A90E2"
//                   dataKey="value"
//                 >
//                   {appointmentData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </section>

//         {/* Recent Appointments Table */}
//         <section className="bg-white p-6 rounded-md shadow-md mb-6">
//           <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <FaClipboardList className="text-blue-600" /> Recent Appointments
//           </h3>
//           <div className="overflow-auto">
//             <table className="min-w-full text-left">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4">Patient</th>
//                   <th className="py-2 px-4">Doctor</th>
//                   <th className="py-2 px-4">Date</th>
//                   <th className="py-2 px-4">Time</th>
//                   <th className="py-2 px-4">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentAppointments.map((appointment) => (
//                   <tr key={appointment.id} className="odd:bg-gray-100">
//                     <td className="py-2 px-4">{appointment.patient}</td>
//                     <td className="py-2 px-4">{appointment.doctor}</td>
//                     <td className="py-2 px-4">{appointment.date}</td>
//                     <td className="py-2 px-4">{appointment.time}</td>
//                     <td className="py-2 px-4">
//                       {appointment.status === "Completed" ? (
//                         <AiOutlineCheck className="text-green-600" />
//                       ) : appointment.status === "Cancelled" ? (
//                         <AiOutlineClose className="text-red-600" />
//                       ) : (
//                         <AiOutlineQuestion className="text-yellow-600" />
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
