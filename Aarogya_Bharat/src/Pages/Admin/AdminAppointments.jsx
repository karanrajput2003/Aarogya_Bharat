import Sidebar from "../../Components/Admin/Sidebar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch appointments from backend API
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/getappointments`);
      setAppointments(response.data);
      setFilteredAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Search function
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter((appointment) =>
        appointment.patient.name.toLowerCase().includes(query)
      );
      setFilteredAppointments(filtered);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <section className="min-h-screen py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="mb-8 md:mb-10 lg:mb-12">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-gray-700 text-center">
                All Appointments
              </h1>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search by patient name"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>

            {/* Table for Appointments */}
            <div className="overflow-x-auto text-black shadow-lg rounded-lg">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Patient Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Preferred Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Preferred Time
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {appointment.patient.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(appointment.consultationDetails.preferredDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {appointment.consultationDetails.preferredTime}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {appointment.status === "Scheduled" ? (
                            <span className="text-green-500">{appointment.status}</span>
                          ) : appointment.status === "Completed" ? (
                            <span className="text-blue-500">{appointment.status}</span>
                          ) : (
                            <span className="text-red-500">{appointment.status}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 flex space-x-4">
                          <Link
                            to={`/admin/appointmentrdetails/${appointment._id}`}
                            className="text-[#189AB4] hover:text-[#0a4c59] ml-2"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminAppointment;
