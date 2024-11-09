import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Doctor/Navbar';

// Define the endpoint for fetching the doctor data
const API_URL = 'http://localhost:5000/api/doctor/profile/'; // Update with your actual URL if different

export default function DoctorProfile() {
  const [doctorData, setDoctorData] = useState(null); // State to store doctor data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Assuming the doctor ID is hardcoded or passed via route params (can be done via React Router)
  const doctorId = '672f3aa9f5a7043d2fda6269'; // Replace with actual doctor ID from URL or user session

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/doctor/profile/${doctorId}`);
        if (!response.ok) {
          throw new Error('Error fetching doctor data');
        }
        const data = await response.json();
        setDoctorData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  // If loading, show a loading spinner or message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If error occurs, display error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <section className="w-full py-12 md:py-24 lg:py-16 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] text-white">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-8 border border-gray-600 text-white rounded-lg shadow-md">
            <header className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-500">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img src={doctorData.profilePicture} alt={doctorData.fullName} width={128} height={128} className="object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold">{doctorData.fullName}</h1>
                <p className="text-xl mt-1">{doctorData.specializations}</p>
                <span className="inline-block mt-2 bg-gray-800 text-white py-1 px-3 rounded-full text-sm">Reg. No: {doctorData.registrationNumber}</span>
              </div>
            </header>
            <main className="grid gap-6 mt-6">
              <Section title="Personal Information">
                <InfoItem label="Date of Birth" value={doctorData.dateOfBirth} />
                <InfoItem label="Phone" value={doctorData.phoneNumber} />
                <InfoItem label="Email" value={doctorData.email} />
                <InfoItem label="Address" value={doctorData.address} />
              </Section>

              <Section title="Professional Qualification">
                <InfoItem label="Medical Degrees" value={doctorData.medicalDegrees} />
                <InfoItem label="Specializations" value={doctorData.specializations} />
              </Section>

              <Section title="Experience">
                <InfoItem label="Years of Experience" value={`${doctorData.yearsOfExperience} years`} />
                <InfoItem label="Work History" value={doctorData.workHistory} />
                <InfoItem label="Special Skills" value={doctorData.specialSkills} />
              </Section>

              <Section title="Clinic Details">
                <InfoItem label="Clinic Name" value={doctorData.clinicName} />
                <InfoItem label="Clinic Address" value={doctorData.clinicAddress} />
                <InfoItem label="Clinic Contact" value={doctorData.clinicContact} />
                <InfoItem label="Consultation Timings" value={doctorData.consultationTimings} />
              </Section>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-2">{children}</div>
      <hr className="mt-4 border-gray-600" />
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <dt className="font-medium text-gray-300">{label}:</dt>
      <dd className="sm:col-span-2">{value}</dd>
    </div>
  );
}
