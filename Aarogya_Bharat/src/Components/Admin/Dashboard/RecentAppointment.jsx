import React from 'react'
const recentAppointments = [
  { id: 1, patient: "John Doe", doctor: "Dr. Smith", date: "2023-06-15", time: "10:00 AM", status: "Completed" },
  { id: 2, patient: "Jane Smith", doctor: "Dr. Johnson", date: "2023-06-15", time: "11:30 AM", status: "Cancelled" },
  { id: 3, patient: "Bob Brown", doctor: "Dr. Lee", date: "2023-06-16", time: "2:00 PM", status: "Upcoming" },
  { id: 4, patient: "Alice Johnson", doctor: "Dr. Garcia", date: "2023-06-16", time: "3:30 PM", status: "Rescheduled" },
  { id: 5, patient: "Charlie Davis", doctor: "Dr. Patel", date: "2023-06-17", time: "9:00 AM", status: "Upcoming" },
]
import {FaClipboardList } from 'react-icons/fa';


function RecentAppointment() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900"><FaClipboardList className='text-blue-600'/> Recent Appointments</h3>
            <p className="text-sm text-gray-500 mb-4">Overview of the latest appointments</p>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
                  {recentAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.patient}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.doctor}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          appointment.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
  )
}

export default RecentAppointment