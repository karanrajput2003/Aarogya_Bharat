import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Components/Admin/Sidebar';
import { Search } from 'lucide-react';

export default function AdminAllPatients() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term

    useEffect(() => {
        setLoading(true);
        try {
            // Fetch patients from the backend API
            const fetchPatients = async () => {
                const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/patients`);
                const data = await response.json();
                setPatients(data); // Set the fetched data
                setFilteredPatients(data); // Initially, set all data to filtered
            };
            fetchPatients();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Filter patients based on search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = patients.filter(patient =>
                patient.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.phoneno.toString().includes(searchTerm) // Search by name or phone number
            );
            setFilteredPatients(filtered);
        } else {
            setFilteredPatients(patients);
        }
    }, [searchTerm, patients]);

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

                        {/* Table for Patients */}
                        <div className="overflow-x-auto text-black shadow-lg rounded-lg">
                            <table className="min-w-full table-auto text-sm">
                                <thead>
                                    <tr className="bg-white/30">
                                        <th className="px-6 py-4 text-left">Profile Picture</th>
                                        <th className="px-6 py-4 text-left">Patient Id</th>
                                        <th className="px-6 py-4 text-left">Patient Name</th>
                                        <th className="px-6 py-4 text-left">Aadhar No</th>
                                        <th className="px-6 py-4 text-left">Phone No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                Loading patients...
                                            </td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-red-500">
                                                Error: {error}
                                            </td>
                                        </tr>
                                    ) : filteredPatients.length > 0 ? (
                                        filteredPatients.map((patient) => (
                                            <tr key={patient._id} className="border-b bg-white hover:bg-white">
                                                <td className="px-6 py-4">
                                                    <img src={patient.profilePicture || "/default-profile.png"} alt={patient.username} className="w-12 h-12 rounded-full" />
                                                </td>
                                                <td className="px-6 py-4">{patient._id}</td>
                                                <td className="px-6 py-4">{patient.username}</td>
                                                <td className="px-6 py-4">{patient.aadhar_no}</td>
                                                <td className="px-6 py-4">{patient.phoneno}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                No patients found.
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
