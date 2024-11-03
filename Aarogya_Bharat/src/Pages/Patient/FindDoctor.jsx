import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Patient/Navbar';

import Doctor1Img from '../../assets/Home/virtual_consult.jpg';
import Doctor2Img from '../../assets/Home/virtual_consult.jpg';
import Doctor3Img from '../../assets/Home/virtual_consult.jpg';
import Doctor4Img from '../../assets/Home/virtual_consult.jpg';
import Doctor5Img from '../../assets/Home/virtual_consult.jpg';
import Doctor6Img from '../../assets/Home/virtual_consult.jpg';

const doctorsList = [ 
    {
      id: 1,
      name: 'Dr. Ayesha Malik',
      specialization: 'Cardiologist',
      description: 'An expert in heart-related treatments with 10+ years of experience in the field.',
      image: Doctor1Img,
      clinicDetails: 'Heart Care Clinic, Bandra West, Mumbai',
      timings: 'Mon - Fri: 10 AM - 4 PM',
      education: 'MBBS, MD - Cardiology, FACC',
      price: 1000,
      reviews: [
        { user: 'John D.', review: 'Excellent care, very knowledgeable.', rating: 5 },
        { user: 'Priya R.', review: 'Compassionate doctor, highly recommend.', rating: 4 },
        { user: 'Ravi S.', review: 'Good experience, but wait time was long.', rating: 3 },
      ],
    },
    {
      id: 2,
      name: 'Dr. Ramesh Gupta',
      specialization: 'Dermatologist',
      description: 'Specializes in skin conditions and cosmetic dermatology with a patient-first approach.',
      image: Doctor2Img,
      clinicDetails: 'Skin Care Clinic, Andheri East, Mumbai',
      timings: 'Tue - Sat: 11 AM - 6 PM',
      education: 'MBBS, MD - Dermatology, DNB',
      price: 1000,
      reviews: [
        { user: 'Megha K.', review: 'Helped me with my acne problem, very friendly.', rating: 5 },
        { user: 'Arjun P.', review: 'Effective treatment but pricey.', rating: 4 },
      ],
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      specialization: 'Pediatrician',
      description: 'Focused on providing comprehensive care for infants, children, and adolescents.',
      image: Doctor3Img,
      clinicDetails: 'Child Care Clinic, Juhu, Mumbai',
      timings: 'Mon - Sat: 9 AM - 3 PM',
      education: 'MBBS, MD - Pediatrics',
      price: 1000,
      reviews: [
        { user: 'Anjali T.', review: 'Great with kids, my daughter loves her.', rating: 5 },
        { user: 'Rohit M.', review: 'Very thorough in diagnosis.', rating: 4 },
      ],
    },
    {
      id: 4,
      name: 'Dr. Neha Roy',
      specialization: 'Cardiologist',
      description: 'Highly regarded for her work in heart disease prevention and cardiac surgery.',
      image: Doctor4Img,
      clinicDetails: 'City Heart Hospital, Lower Parel, Mumbai',
      timings: 'Mon - Fri: 10 AM - 5 PM',
      education: 'MBBS, DM - Cardiology',
      price: 1000,
      reviews: [
        { user: 'Sunil V.', review: 'Best doctor for heart care.', rating: 5 },
        { user: 'Vikas J.', review: 'Very professional and caring.', rating: 4 },
      ],
    },
    {
      id: 5,
      name: 'Dr. Amit Singh',
      specialization: 'Dermatologist',
      description: 'Experienced in treating various skin disorders and performing advanced skin care treatments.',
      image: Doctor5Img,
      clinicDetails: 'DermaGlow Clinic, Powai, Mumbai',
      timings: 'Wed - Sun: 12 PM - 7 PM',
      education: 'MBBS, MD - Dermatology',
      price: 1000,
      reviews: [
        { user: 'Rajiv G.', review: 'Solved my skin rash problem quickly.', rating: 4 },
        { user: 'Neha S.', review: 'Good service, highly recommend.', rating: 5 },
      ],
    },
    {
      id: 6,
      name: 'Dr. Sushant Kumar',
      specialization: 'General Physician',
      description: 'A well-rounded doctor handling general medical concerns and offering preventive care advice.',
      image: Doctor6Img,
      clinicDetails: 'HealthPlus Clinic, Vile Parle, Mumbai',
      timings: 'Mon - Sat: 8 AM - 2 PM',
      education: 'MBBS, MD - General Medicine',
      price: 1000,
      reviews: [
        { user: 'Shreya N.', review: 'Very patient and listens carefully.', rating: 5 },
        { user: 'Manish K.', review: 'Great for general check-ups.', rating: 4 },
      ],
    },
  ];
// Function to render stars based on rating
const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.087 3.341a1 1 0 00.95.69h3.518c.969 0 1.371 1.24.588 1.81l-2.852 2.074a1 1 0 00-.364 1.118l1.087 3.34c.3.922-.755 1.688-1.54 1.118l-2.853-2.074a1 1 0 00-1.176 0l-2.853 2.074c-.785.57-1.838-.196-1.539-1.118l1.087-3.34a1 1 0 00-.364-1.118L2.894 8.768c-.783-.57-.38-1.81.588-1.81h3.518a1 1 0 00.95-.69l1.087-3.341z" />
      </svg>
    );
  }
  return stars;
};

function FindDoctor() {
  const [specializationFilter, setSpecializationFilter] = useState('');

  const handleFilterChange = (e) => {
    setSpecializationFilter(e.target.value);
  };

  const filteredDoctors = specializationFilter
    ? doctorsList.filter((doctor) => doctor.specialization === specializationFilter)
    : doctorsList;

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
              <div key={doctor.id} className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-none text-white rounded-lg shadow-lg p-6 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#0d6270]"
                  />
                  <h2 className="text-lg md:text-xl font-semibold mt-4">{doctor.name}</h2>
                  <p className="text-gray-500">{doctor.specialization}</p>
                  <p className="mt-2 text-gray-700 text-sm md:text-base">{doctor.description}</p>
                  <div className="flex items-center mt-2">
                    {renderStars(doctor.reviews.reduce((sum, review) => sum + review.rating, 0) / doctor.reviews.length)}
                  </div>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">{doctor.reviews.length} reviews</p>
                  <Link to={`/patient/doctor/${doctor.id}`} className="mt-4 transition bg-teal-500 hover:bg-teal-600 text-white rounded p-2">
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
}

export default FindDoctor;
