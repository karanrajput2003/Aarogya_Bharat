import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../Components/Patient/Navbar';

function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    // Fetch doctor data from the backend
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/doctordetail/${id}`); // Adjust the API URL to your backend endpoint
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctorData();
  }, [id]);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.087 3.341a1 1 0 00.95.69h3.518c.969 0 1.371 1.24.588 1.81l-2.852 2.074a1 1 0 00-.364 1.118l1.087 3.34c.3.922-.755 1.688-1.54 1.118l-2.853-2.074a1 1 0 00-1.176 0l-2.853 2.074c-.785.57-1.838-.196-1.539-1.118l1.087-3.34a1 1 0 00-.364-1.118L2.894 8.768c-.783-.57-.38-1.81.588-1.81h3.518a1 1 0 00.95-.69l1.087-3.341z" />
        </svg>
      );
    }
    return stars;
  };

  // Handle loading state
  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen pt-6 md:pt-12 lg:pt-16 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-10 xl:space-y-16">
          <div className="bg-white backdrop-blur-md rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow">
            <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
              {/* Doctor Image */}
              <img
                src={doctor.profilePicture || Doctor1Img} // fallback to default image
                alt={doctor.fullName}
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 mb-4 lg:mb-0"
              />
              {/* Doctor Info */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{doctor.fullName}</h2>
                <p className="text-gray-600 mb-2">{doctor.specializations}</p>
                <p className="text-gray-700">{doctor.specialSkills}</p>
                <p className="text-gray-700 mt-4">{doctor.workHistory}</p>
                <div className="flex items-center space-x-2 mt-4">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      doctor.verified
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {doctor.verified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Doctor Details */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Clinic Details</h3>
              <p className="text-gray-700 mb-2"><strong>Clinic:</strong> {doctor.clinicName}</p>
              <p className="text-gray-700 mb-2"><strong>Address:</strong> {doctor.clinicAddress}</p>
              <p className="text-gray-700 mb-2"><strong>Contact:</strong> {doctor.clinicContact}</p>
              <p className="text-gray-700 mb-2"><strong>Consultation Timings:</strong> {doctor.consultationTimings}</p>
              <p className="text-gray-700 mb-2"><strong>Years of Experience:</strong> {doctor.yearsOfExperience}</p>
              <p className="text-gray-700 mb-2"><strong>Medical Degrees:</strong> {doctor.medicalDegrees}</p>
              <p className="text-gray-700 mb-2"><strong>Registration Number:</strong> {doctor.registrationNumber}</p>

              {/* Booking Section */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Appointment</h3>
                <Link
                  to={`/patient/booking/${id}`}
                  className="bg-indigo-900 text-white px-4 py-2 rounded-md hover:bg-indigo-800 transition-colors"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DoctorProfile;
