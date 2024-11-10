import React from 'react'
import { useParams } from 'react-router-dom'
import { User, Phone, Mail, MapPin, Award, Briefcase, Star, Clock, Check } from 'lucide-react'


// Dummy doctor data
const dummyDoctor = {
  id: '1',
  fullName: 'Dr. Rajesh Kumar',
  dateOfBirth: '1980-05-15',
  phoneNumber: '+91 98765 43210',
  email: 'dr.rajesh@example.com',
  address: '123 Medical Lane, Mumbai, Maharashtra 400001',
  medicalDegrees: 'MBBS, MD (Internal Medicine)',
  specializations: 'Cardiology',
  registrationNumber: 'MCI12345',
  yearsOfExperience: 15,
  workHistory: 'Senior Cardiologist at City Hospital (2010-Present)',
  specialSkills: 'Echocardiography, Angioplasty',
  clinicName: 'Kumar Heart Clinic',
  clinicAddress: '456 Health Street, Mumbai, Maharashtra 400002',
  clinicContact: '+91 22 2222 3333',
  consultationTimings: 'Mon-Fri: 9AM-5PM, Sat: 9AM-1PM',
  profilePicture: '/placeholder.svg?height=128&width=128',
  verified: true,
}
import Sidebar from '../../Components/Admin/Sidebar'

export default function AdminDoctorDetails() {
      const { id } = useParams();
  const doctor = dummyDoctor // In a real app, you'd fetch the doctor data based on the ID

  const handleVerify = () => {
    // In a real app, you'd call an API to verify the doctor
    console.log('Verifying doctor:', id)
  }
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
           <div className="container mx-auto px-4 py-8">
       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
         <div className="md:flex">
           <div className="md:flex-shrink-0">
             <img className="h-48 w-full object-cover md:w-48" src={doctor.profilePicture} alt={doctor.fullName} />
           </div>
           <div className="p-8">
             <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{doctor.specializations}</div>
             <h1 className="mt-1 text-4xl font-bold text-gray-900">{doctor.fullName}</h1>
             <p className="mt-2 text-gray-600">{doctor.medicalDegrees}</p>
             {!doctor.verified && (
              <button
                onClick={handleVerify}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Verify Doctor
              </button>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <User className="mr-2 h-5 w-5" /> Date of Birth
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doctor.dateOfBirth}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Phone className="mr-2 h-5 w-5" /> Phone Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doctor.phoneNumber}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Mail className="mr-2 h-5 w-5" /> Email
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doctor.email}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <MapPin className="mr-2 h-5 w-5" /> Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doctor.address}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Award className="mr-2 h-5 w-5" /> Registration Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doctor.registrationNumber}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Briefcase className="mr-2 h-5 w-5" /> Years of Experience
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doctor.yearsOfExperience} years</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Star className="mr-2 h-5 w-5" /> Special Skills
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doctor.specialSkills}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Clinic Information</h3>
          <div className="mt-5 border-t border-gray-200">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Clinic Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doctor.clinicName}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Clinic Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doctor.clinicAddress}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Clinic Contact</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doctor.clinicContact}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Clock className="mr-2 h-5 w-5" /> Consultation Timings
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doctor.consultationTimings}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
      </main>
    </div>
  )
}


