import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Patient/Navbar';
import Doctor1Img from '../../assets/Home/virtual_consult.jpg';

// Dummy data for the doctor details
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
      image: Doctor1Img,
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
      image: Doctor1Img,
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
      image: Doctor1Img,
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
      image: Doctor1Img,
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
      image: Doctor1Img,
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
  

function DoctorProfile() {
  const { id } = useParams(); // Get doctor ID from URL params
  const doctor = doctorsList.find((doc) => doc.id === parseInt(id)); // Find doctor by ID

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

  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen pt-6 md:pt-12 lg:pt-16 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-10 xl:space-y-16">
          <div className="bg-white/80 backdrop-blur-md rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow">
            <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
              {/* Doctor Image */}
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 mb-4 lg:mb-0"
              />
              {/* Doctor Info */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{doctor.name}</h2>
                <p className="text-gray-600 mb-2">{doctor.specialization}</p>
                <p className="text-gray-700">{doctor.description}</p>
                <div className="flex items-center space-x-2 mt-4">
                  {/* Stars */}
                  <div className="flex">{renderStars(4.8)}</div>
                  <p className="text-gray-500 text-sm">({doctor.reviews.length} reviews)</p>
                </div>
              </div>
            </div>

            {/* Doctor Details */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Clinic Details</h3>
              <p className="text-gray-700 mb-2"><strong>Clinic:</strong> {doctor.clinicDetails}</p>
              <p className="text-gray-700 mb-2"><strong>Timings:</strong> {doctor.timings}</p>
              <p className="text-gray-700 mb-2"><strong>Education:</strong> {doctor.education}</p>

              {/* Booking Section */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Appointment</h3>
                <p className="text-gray-700 mb-2"><strong>Price:</strong> ₹{doctor.price}</p>
                <button className="bg-indigo-900 text-white px-4 py-2 rounded-md hover:bg-indigo-800 transition-colors">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Patient Reviews */}
          <div className="bg-white/80 backdrop-blur-md rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Patient Reviews</h3>
            <div className="space-y-4">
              {doctor.reviews.slice(0, 3).map((review, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-semibold text-gray-900">{review.user}</div>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.review}</p>
                </div>
              ))}
            </div>
          </div>
          <br />
        </div>
      </section>
    </>
  );
}

export default DoctorProfile;
