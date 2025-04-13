import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Bell, Search, Mail, Phone, MapPin, Award, Calendar, Briefcase, Stethoscope, Clock, Building } from 'lucide-react';
import Navbar from '../../Components/Doctor/Navbar';

export default function DoctorProfile() {
  const doctorId = useSelector((state) => state.auth.userId);
  const [doctorData, setDoctorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get today's date for the header
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-md">
          <h3 className="text-red-600 font-semibold text-lg mb-2">Error Loading Profile</h3>
          <p className="text-slate-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="ml-20 flex-1 p-8">
        {/* Header with search and profile */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative">
            {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" /> */}
            <input
              type="text"
              placeholder="Aarogya Bharat"
              readOnly
              className="pl-10 pr-4 py-2 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-72 shadow-sm"
            />
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full bg-white shadow-sm mr-4 relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium mr-2">
                DL
              </div>
              <div className="relative">
                <button className="flex items-center">
                  <span className="font-medium text-slate-800">Dr Luke</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 ml-1 text-slate-500"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1 text-slate-800">
            Doctor Profile
          </h1>
          <p className="text-slate-500">{today}</p>
        </div>
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-indigo-100 flex-shrink-0 border-4 border-white shadow-sm">
              {doctorData.profilePicture ? (
                <img src={doctorData.profilePicture} alt={doctorData.fullName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-500 text-white text-2xl font-bold">
                  {doctorData.fullName.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800">{doctorData.fullName}</h2>
              <p className="text-indigo-600 font-medium mt-1">{doctorData.specializations}</p>
              <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {doctorData.yearsOfExperience} Years Experience
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Reg. No: {doctorData.registrationNumber}
                </span>
              </div>
            </div>
            <div className="ml-auto mt-4 md:mt-0">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-sm font-medium">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <ProfileSection title="Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem 
                  icon={<Calendar className="h-5 w-5 text-indigo-500" />}
                  label="Date of Birth"
                  value={doctorData.dateOfBirth}
                />
                <InfoItem 
                  icon={<Phone className="h-5 w-5 text-indigo-500" />}
                  label="Phone"
                  value={doctorData.phoneNumber}
                />
                <InfoItem 
                  icon={<Mail className="h-5 w-5 text-indigo-500" />}
                  label="Email"
                  value={doctorData.email}
                />
                <InfoItem 
                  icon={<MapPin className="h-5 w-5 text-indigo-500" />}
                  label="Address"
                  value={doctorData.address}
                />
              </div>
            </ProfileSection>
            
            {/* Professional Qualification */}
            <ProfileSection title="Professional Qualification">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem 
                  icon={<Award className="h-5 w-5 text-indigo-500" />}
                  label="Medical Degrees"
                  value={doctorData.medicalDegrees}
                />
                <InfoItem 
                  icon={<Stethoscope className="h-5 w-5 text-indigo-500" />}
                  label="Specializations"
                  value={doctorData.specializations}
                />
              </div>
            </ProfileSection>
            
            {/* Experience */}
            <ProfileSection title="Experience">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem 
                  icon={<Calendar className="h-5 w-5 text-indigo-500" />}
                  label="Years of Experience"
                  value={`${doctorData.yearsOfExperience} years`}
                />
                <InfoItem 
                  icon={<Briefcase className="h-5 w-5 text-indigo-500" />}
                  label="Work History"
                  value={doctorData.workHistory}
                />
                <InfoItem 
                  icon={<Award className="h-5 w-5 text-indigo-500" />}
                  label="Special Skills"
                  value={doctorData.specialSkills}
                />
              </div>
            </ProfileSection>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Clinic Details */}
            <ProfileSection title="Clinic Details">
              <InfoItem 
                icon={<Building className="h-5 w-5 text-indigo-500" />}
                label="Clinic Name"
                value={doctorData.clinicName}
              />
              <div className="mt-4">
                <InfoItem 
                  icon={<MapPin className="h-5 w-5 text-indigo-500" />}
                  label="Clinic Address"
                  value={doctorData.clinicAddress}
                />
              </div>
              <div className="mt-4">
                <InfoItem 
                  icon={<Phone className="h-5 w-5 text-indigo-500" />}
                  label="Clinic Contact"
                  value={doctorData.clinicContact}
                />
              </div>
              <div className="mt-4">
                <InfoItem 
                  icon={<Clock className="h-5 w-5 text-indigo-500" />}
                  label="Consultation Timings"
                  value={doctorData.consultationTimings}
                />
              </div>
            </ProfileSection>
            
            {/* Actions Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-lg font-medium text-slate-800">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-4">
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Appointments
                </button>
                <button className="w-full px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Manage Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const ProfileSection = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-100">
      <h3 className="text-lg font-medium text-slate-800">{title}</h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-0.5">
      {icon}
    </div>
    <div className="ml-3">
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <div className="mt-1 text-slate-800">{value}</div>
    </div>
  </div>
);