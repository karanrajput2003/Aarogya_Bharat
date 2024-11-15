import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaClipboardList } from "react-icons/fa";

function RecentAppointment() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch recent appointments from the backend
    axios
      .get(`${import.meta.env.VITE_BACKEND}/api/recent-appointments`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the appointments!", error);
      });
  }, []); // Empty array means this runs only once when the component mounts

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        <FaClipboardList className="text-blue-600" /> Recent Appointments
      </h3>
      <p className="text-sm text-gray-500 mb-4">Overview of the latest appointments</p>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="px-6 py-4 text-center whitespace-nowrap">{appointment.patientName}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{appointment.doctorName}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{appointment.preferredDate}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{appointment.preferredTime}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === "Scheduled"
                        ? "bg-yellow-100 text-yellow-800"
                        : appointment.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentAppointment;
