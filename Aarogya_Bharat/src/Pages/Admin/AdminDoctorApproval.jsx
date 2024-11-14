import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Patient/Navbar';
import Sidebar from '../../Components/Admin/Sidebar';
import axios from 'axios';

export default function AdminDoctorApproval() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState(''); // Status filter
    const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering by name

    const navigate = useNavigate();

    // Fetch doctors from the backend API
    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/getdoctors`);
                setAppointments(response.data); // Set the fetched doctors
                setFilteredAppointments(response.data); // Set filtered appointments
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleFilter = () => {
        let filtered = [...appointments];

        // Filter by verified status
        if (statusFilter === 'verified') {
            filtered = filtered.filter(appointment => appointment.verified === true);
        } else if (statusFilter === 'unverified') {
            filtered = filtered.filter(appointment => appointment.verified === false);
        }

        // Filter by search term (name)
        if (searchTerm) {
            filtered = filtered.filter(appointment =>
                appointment.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredAppointments(filtered);
    };

    // Trigger the filter whenever statusFilter or searchTerm changes
    useEffect(() => {
        handleFilter();
    }, [statusFilter, searchTerm, appointments]); // Added appointments to dependencies

    const handleViewDetails = (id) => {
        navigate(`/admin/doctordetails/${id}`);
    };

    if (loading) return <p className="text-white">Loading appointments...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                <section className="min-h-screen py-12 md:py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-gray-700 text-center">
                            {statusFilter === 'verified' ? 'Verified Doctors' : statusFilter === 'unverified' ? 'Unverified Doctors' : 'All Doctors'}
                        </h1>

                        {/* Search Bar */}
                        <div className="flex justify-center my-6">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex gap-2 mb-8 flex-wrap justify-center">
                            <button
                                onClick={() => setStatusFilter('')}
                                className={`px-4 sm:px-6 py-2 rounded ${statusFilter === '' ? 'bg-[#189AB4] text-black' : 'bg-[#F0F4F8] border-[#7B6E58] text-[#0d6270] border'}`}
                            >
                                All Doctors
                            </button>
                            {/* <button
                                onClick={() => setStatusFilter('verified')}
                                className={`px-4 sm:px-6 py-2 rounded ${statusFilter === 'verified' ? 'bg-[#189AB4] text-black' : 'bg-[#F0F4F8] border-[#7B6E58] text-[#0d6270] border'}`}
                            >
                                Verified Doctors
                            </button>
                            <button
                                onClick={() => setStatusFilter('unverified')}
                                className={`px-4 sm:px-6 py-2 rounded ${statusFilter === 'unverified' ? 'bg-[#189AB4] text-black' : 'bg-[#F0F4F8] border-[#7B6E58] text-[#0d6270] border'}`}
                            >
                                Unverified Doctors
                            </button> */}
                        </div>

                        {/* Table for Doctors */}
                        <div className="overflow-x-auto text-black shadow-lg rounded-lg">
                            <table className="min-w-full table-auto text-sm">
                                <thead>
                                    <tr className="bg-white/30">
                                        <th className="px-6 py-4 text-left">Profile Picture</th>
                                        <th className="px-6 py-4 text-left">Doctor</th>
                                        <th className="px-6 py-4 text-left">Degrees</th>
                                        <th className="px-6 py-4 text-left">Specializations</th>
                                        {/* <th className="px-6 py-4 text-left">Verified</th> */}
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
                                                <td className="px-6 py-4">{appointment.medicalDegrees}</td>
                                                <td className="px-6 py-4">{appointment.specializations}</td>
                                                {/* <td className="px-6 py-4">{appointment.verified == true ? 'Verified' : 'Unverified'}</td> */}
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleViewDetails(appointment._id)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center">No doctors found</td>
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
