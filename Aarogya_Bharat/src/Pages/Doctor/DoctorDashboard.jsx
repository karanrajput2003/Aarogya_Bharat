import React from 'react';
import { Avatar, Badge } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Navbar from '../../Components/Doctor/Navbar';

// Mock data
const doctorInfo = {
  name: "Dr. Jane Smith",
  specialty: "Cardiologist",
  avatar: "/placeholder.svg?height=128&width=128",
  appointments: 8,
  patients: 11,
  revenue: 11000,
};

const appointmentData = [
  { name: 'Mon', appointments: 6 },
  { name: 'Tue', appointments: 8 },
  { name: 'Wed', appointments: 7 },
  { name: 'Thu', appointments: 9 },
  { name: 'Fri', appointments: 5 },
  { name: 'Sat', appointments: 4 },
  { name: 'Sun', appointments: 3 },
];

const recentPatients = [
  { name: "Karan Rajput", date: "2023-11-16", time: "9:00 AM", status: "Scheduled" },
  { name: "Pritesh Singh", date: "2023-11-16", time: "9:30 AM", status: "Unscheduled" }
];

export default function DoctorDashboard() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] text-gray-900">
        <main className="flex-grow container mx-auto p-6 space-y-8">
          {/* Doctor's Overview Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Appointments', value: doctorInfo.appointments, extraText: 'Today' },
              { label: 'Total Patients', value: doctorInfo.patients, extraText: '+2 from last month' },
              { label: 'Total Revenue', value: `Rs. ${doctorInfo.revenue}`, extraText: '+10% from last month' },
              { label: 'Patient Satisfaction', value: '95%', extraText: 'Excellent', progress: 95 },
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md text-white rounded-lg shadow-lg p-6">
                <h6 className="text-xl font-semibold text-gray-100">{item.label}</h6>
                <div className="mt-4">
                  <h5 className="text-3xl font-bold">{item.value}</h5>
                  <p className="text-sm text-gray-300">{item.extraText}</p>
                  {item.progress && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Appointments & Upcoming Appointments */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Weekly Appointments Chart */}
            <div className="col-span-4 bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6">
              <h6 className="text-xl font-semibold text-gray-100">Weekly Appointments</h6>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={appointmentData} className='text-white'>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="appointments" fill="#00796b" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Upcoming Appointments */}
            <div className="col-span-3 bg-white rounded-lg shadow-lg p-6 bg-white/10 backdrop-blur-md">
              <h6 className="text-xl font-semibold text-gray-100">Upcoming Appointments</h6>
              <p className="text-sm text-gray-200">You have {doctorInfo.appointments} appointments today</p>
              <div className="mt-4 space-y-6">
                {recentPatients.map((patient, index) => (
                  <div key={index} className="flex items-center text-white">
                    <Avatar>{patient.name.split(' ').map(n => n[0]).join('')}</Avatar>
                    <div className="ml-4 space-y-1">
                      <h6 className="font-medium text-black">{patient.name}</h6>
                      <p className="text-sm text-gray-900">{patient.date} at {patient.time}</p>
                    </div>
                    <div className="ml-auto">
                      <Badge variant={patient.status === 'Completed' ? 'outlined' : 'filled'} color={patient.status === 'Completed' ? 'default' : 'primary'}>
                        {patient.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Overview */}
          <div className="bg-white rounded-lg shadow-lg p-6 bg-white/10 backdrop-blur-mds">
            <h6 className="text-xl font-semibold text-white">Patient Overview</h6>
            <div className="grid gap-6 mt-6 md:grid-cols-2">
              {[
                { label: 'New Patients', value: '+12', extraText: '+8% from last month' },
                { label: 'Returning Patients', value: '108', extraText: '+2% from last month' },
              ].map((item, index) => (
                <div key={index} className="bg-white/30 p-6 rounded-lg">
                  <h6 className="text-lg font-semibold text-gray-900">{item.label}</h6>
                  <h5 className="text-3xl font-bold text-white">{item.value}</h5>
                  <p className="text-sm text-gray-700">{item.extraText}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
