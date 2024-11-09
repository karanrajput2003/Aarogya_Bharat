import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Patient/Navbar';

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [specializationFilter, setSpecializationFilter] = useState('');

  useEffect(() => {
    // Fetching doctors from the backend API with only required fields
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/getdoctors`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleFilterChange = (e) => {
    setSpecializationFilter(e.target.value);
  };

  const filteredDoctors = specializationFilter
    ? doctors.filter((doctor) => doctor.specializations === specializationFilter)
    : doctors;

  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen pt-6 md:pt-12 lg:pt-16 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container mx-auto space-y-10 xl:space-y-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white text-center">
            Find Your Doctor
          </h1>

          <p className="mt-4 max-w-[700px] text-white md:text-xl text-center mx-auto">
            Filter by specialization to find the best healthcare provider for your needs.
          </p>

          {/* Filter Dropdown */}
          <div className="flex flex-col md:flex-row justify-center mt-6">
            <label htmlFor="specialization" className="text-white font-medium mb-2 md:mb-0 md:mr-4">
              Filter by Specialization:
            </label>
            <select
              id="specialization"
              className="bg-white text-black rounded-md px-4 py-2 shadow-sm"
              value={specializationFilter}
              onChange={handleFilterChange}
            >
              <option value="">All Specializations</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="General Physician">General Physician</option>
            </select>
          </div>

          {/* Doctor Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <div key={doctor._id} className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-none text-white rounded-lg shadow-lg p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center">
                  <img
                    src={doctor.profilePicture}
                    alt={doctor.fullName}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#0d6270]"
                  />
                  <h2 className="text-lg md:text-xl font-semibold mt-4">{doctor.fullName}</h2>
                  <p className="text-gray-500">{doctor.specializations}</p>
                  <p className="mt-2 text-gray-700 text-sm md:text-base">{doctor.medicalDegrees}</p>
                  <Link to={`/patient/doctor/${doctor._id}`} className="mt-4 transition bg-teal-500 hover:bg-teal-600 text-white rounded p-2">
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FindDoctor;
