import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import Navbar from '../../Components/Patient/Navbar';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function PatientProfile() {
  const { patientId } = useParams(); // Get patientId from URL params
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`/api/patient/${patientId}`); // Adjust the URL as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }
        const data = await response.json();
        setPatientData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]); // Use patientId as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen pt-6 md:pt-12 lg:pt-16 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container mx-auto space-y-10 xl:space-y-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white text-center">
            Patient Profile
          </h1>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-10">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-black">Personal Information:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <FaUser className="text-2xl text-indigo-600 mr-3" />
                <div>
                  <p className="text-gray-700 font-medium">Name:</p>
                  <p className="text-gray-900">{patientData.name}</p>
                </div>
              </div>

              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="text-2xl text-indigo-600 mr-3">Age</p>
                <div>
                  <p className="text-gray-700 font-medium">Age:</p>
                  <p className="text-gray-900">{patientData.age}</p>
                </div>
              </div>

              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <FaPhone className="text-2xl text-indigo-600 mr-3" />
                <div>
                  <p className="text-gray-700 font-medium">Phone:</p>
                  <p className="text-gray-900">{patientData.phone}</p>
                </div>
              </div>

              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <FaEnvelope className="text-2xl text-indigo-600 mr-3" />
                <div>
                  <p className="text-gray-700 font-medium">Email:</p>
                  <p className="text-gray-900">{patientData.email}</p>
                </div>
              </div>

              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm col-span-2">
                <FaMapMarkerAlt className="text-2xl text-indigo-600 mr-3" />
                <div>
                  <p className="text-gray-700 font-medium">Address:</p>
                  <p className="text-gray-900">{patientData.address}</p>
                </div>
              </div>

              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="text-2xl text-indigo-600 mr-3">{patientData.gender}</p>
                <div>
                  <p className="text-gray-700 font-medium">Gender:</p>
                  <p className="text-gray-900">{patientData.gender}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PatientProfile;
