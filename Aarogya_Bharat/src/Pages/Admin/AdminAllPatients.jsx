import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Components/Admin/Sidebar';
import { Search } from 'lucide-react'

export default function AdminAllPatients() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term

    // Sample doctor data for telehealth
    const sampleAppointments = [
        {
            "_id": "1",  // Added _id for appointment for uniqueness
            "fullName": "Sarah Thompson",
            "dateOfBirth": "1980-05-14",
            "phoneno": 9384848944,
            "feedback": "Nidldl",
            "profilePicture": "/uploads/profilePic123.png",
            "verified": true,
        },
        {
            "_id": "2",  // Added _id for appointment for uniqueness
            "fullName": "John Doe",
            "dateOfBirth": "1975-09-23",
            "phoneno": 9911272638,
            "feedback": "hjc ioscnjn",
            "profilePicture": "/uploads/profilePic456.png",
            "verified": false,
        },
    ];

    useEffect(() => {
        setLoading(true);
        try {
            // Use sample data directly instead of fetching from API
            setAppointments(sampleAppointments);
            setFilteredAppointments(sampleAppointments);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Filter appointments based on search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = appointments.filter(appointment =>
                appointment.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                appointment.phoneno.toString().includes(searchTerm) // Add more fields if necessary
            );
            setFilteredAppointments(filtered);
        } else {
            setFilteredAppointments(appointments);
        }
    }, [searchTerm, appointments]);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <section className="min-h-screen py-12 md:py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                        <div className="mb-8 md:mb-10 lg:mb-12">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-gray-700 text-center">
                                All Patients
                            </h1>
                        </div>

                        {/* Search Input */}
                        
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Search by name or phone number"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                            />
                        </div>

                        {/* Table for Doctors */}
                        <div className="overflow-x-auto text-black shadow-lg rounded-lg">
                            <table className="min-w-full table-auto text-sm">
                                <thead>
                                    <tr className="bg-white/30">
                                        <th className="px-6 py-4 text-left">Profile Picture</th>
                                        <th className="px-6 py-4 text-left">Patient</th>
                                        <th className="px-6 py-4 text-left">Phone No</th>
                                        <th className="px-6 py-4 text-left">Feedback</th>
                                        <th className="px-6 py-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments.length > 0 ? (
                                        filteredAppointments.map((appointment) => (
                                            <tr key={appointment._id} className="border-b bg-white hover:bg-white">
                                                <td className="px-6 py-4">
                                                    <img src={appointment.profilePicture} alt={appointment.fullName} className="w-12 h-12 rounded-full" />
                                                </td>
                                                <td className="px-6 py-4">{appointment.fullName}</td>
                                                <td className="px-6 py-4">{appointment.phoneno}</td>
                                                <td className="px-6 py-4">{appointment.feedback}</td>
                                                <td className="px-6 py-4">
                                                    <Link
                                                        to={`/admin/doctordetails/${appointment._id}`}
                                                        className="text-[#189AB4] hover:text-[#0a4c59] ml-2"
                                                    >
                                                        View Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
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
}
