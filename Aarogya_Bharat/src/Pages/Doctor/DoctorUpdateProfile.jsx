import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../../Components/Home/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import 'react-toastify/dist/ReactToastify.css';

export default function DoctorUpdateProfile() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // For navigating after success

  const onSubmit = async (data) => {
    setIsLoading(true); // Show loader when submission starts
    const formData = new FormData();
    
    // Append fields from the form
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    
    // Append the file
    const profilePhoto = data.profilephoto[0]; // Assuming a single file is uploaded
    if (profilePhoto) {
      formData.append('profilephoto', profilePhoto);
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/doctor/register`, {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        // Show success message and navigate to login page
        toast.success('Doctor registered successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        // Redirect to doctor login page
        setTimeout(() => {
        navigate('/doctorlogin');
        }, 1000);
      } else {
        // Show error message
        toast.error(result.message || 'Registration failed. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium">Full Name</label>
                  <input id="fullName" {...register('fullName', { required: 'Full name is required' })} className="w-full border p-2 rounded" />
                  {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium">Date of Birth</label>
                  <input id="dateOfBirth" type="date" {...register('dateOfBirth', { required: 'Date of birth is required' })} className="w-full border p-2 rounded" />
                  {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium">Phone Number</label>
                <input id="phoneNumber" {...register('phoneNumber', { required: 'Phone number is required' })} className="w-full border p-2 rounded" />
                {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input id="email" type="email" {...register('email', { required: 'Email is required' })} className="w-full border p-2 rounded" />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium">Address</label>
                <textarea id="address" {...register('address', { required: 'Address is required' })} className="w-full border p-2 rounded" />
                {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Professional Qualification</h3>
            <div className="grid gap-4">
              <div>
                <label htmlFor="medicalDegrees" className="block text-sm font-medium">Medical Degrees and Certifications</label>
                <textarea id="medicalDegrees" {...register('medicalDegrees', { required: 'Medical degrees are required' })} className="w-full border p-2 rounded" />
                {errors.medicalDegrees && <p className="text-sm text-red-500">{errors.medicalDegrees.message}</p>}
              </div>
              <div>
                <label htmlFor="specializations" className="block text-sm font-medium">Specializations (if applicable)</label>
                <input id="specializations" {...register('specializations')} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label htmlFor="registrationNumber" className="block text-sm font-medium">Registration Number</label>
                <input id="registrationNumber" {...register('registrationNumber', { required: 'Registration number is required' })} className="w-full border p-2 rounded" />
                {errors.registrationNumber && <p className="text-sm text-red-500">{errors.registrationNumber.message}</p>}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Experience Details</h3>
            <div className="grid gap-4">
              <div>
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium">Years of Experience</label>
                <input id="yearsOfExperience" type="number" {...register('yearsOfExperience', { required: 'Years of experience is required', valueAsNumber: true })} className="w-full border p-2 rounded" />
                {errors.yearsOfExperience && <p className="text-sm text-red-500">{errors.yearsOfExperience.message}</p>}
              </div>
              <div>
                <label htmlFor="workHistory" className="block text-sm font-medium">Work History</label>
                <textarea id="workHistory" {...register('workHistory', { required: 'Work history is required' })} className="w-full border p-2 rounded" />
                {errors.workHistory && <p className="text-sm text-red-500">{errors.workHistory.message}</p>}
              </div>
              <div>
                <label htmlFor="specialSkills" className="block text-sm font-medium">Special Skills or Advanced Training</label>
                <textarea id="specialSkills" {...register('specialSkills')} className="w-full border p-2 rounded" />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Clinic or Practice Details</h3>
            <div className="grid gap-4">
              <div>
                <label htmlFor="clinicName" className="block text-sm font-medium">Clinic Name</label>
                <input id="clinicName" {...register('clinicName', { required: 'Clinic name is required' })} className="w-full border p-2 rounded" />
                {errors.clinicName && <p className="text-sm text-red-500">{errors.clinicName.message}</p>}
              </div>
              <div>
                <label htmlFor="clinicAddress" className="block text-sm font-medium">Clinic Address</label>
                <textarea id="clinicAddress" {...register('clinicAddress', { required: 'Clinic address is required' })} className="w-full border p-2 rounded" />
                {errors.clinicAddress && <p className="text-sm text-red-500">{errors.clinicAddress.message}</p>}
              </div>
              <div>
                <label htmlFor="clinicContact" className="block text-sm font-medium">Clinic Contact Information</label>
                <input id="clinicContact" {...register('clinicContact', { required: 'Clinic contact is required' })} className="w-full border p-2 rounded" />
                {errors.clinicContact && <p className="text-sm text-red-500">{errors.clinicContact.message}</p>}
              </div>
              <div>
                <label htmlFor="consultationTimings" className="block text-sm font-medium">Consultation Timings</label>
                <input id="consultationTimings" {...register('consultationTimings')} className="w-full border p-2 rounded" />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency Contact Information</h3>
            <div className="grid gap-4">
              <div>
                <label htmlFor="profilephoto" className="block text-sm font-medium">Profile Photo</label>
                <input id="profilephoto" type="file" accept="image/*,.pdf" {...register('profilephoto', { required: 'Profile photo is required' })} className="w-full" />
                {errors.profilephoto && <p className="text-sm text-red-500">{errors.profilephoto.message}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <input id="password" {...register('password', { required: 'Password is required' })} className="w-full border p-2 rounded" />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section className="w-full md:py-24 lg:py-24 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] text-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">Complete Your Doctor Profile</h1>
            <p className="mt-4 text-xl text-gray-300">Please provide the following information to set up your professional profile.</p>
          </div>
          <div className="w-full max-w-3xl mx-auto p-8 bg-white/10 backdrop-blur-lg border border-gray-600 rounded">
            <div className="text-2xl font-semibold mb-4">Profile Update</div>
            <div>Step {step} of {totalSteps}</div>
            <div className="w-full bg-gray-300 h-2 rounded mt-2">
              <div style={{ width: `${progress}%` }} className="bg-green-500 h-2 rounded"></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderStep()}
              <div className="flex justify-between mt-4">
                <button 
                  type="button" 
                  onClick={() => setStep(prev => Math.max(prev - 1, 1))}
                  disabled={step === 1}
                  className="px-4 py-2 bg-transparent border border-white text-white rounded hover:bg-white/20 disabled:opacity-50"
                >
                  Previous
                </button>
                {step < totalSteps ? (
                  <button 
                    type="button" 
                    onClick={() => setStep(prev => Math.min(prev + 1, totalSteps))}
                    className="px-4 py-2 bg-white text-blue-900 rounded hover:bg-white/90"
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-white text-blue-900 rounded hover:bg-white/90"
                    disabled={isLoading} // Disable submit button while loading
                  >
                    {isLoading ? 'Submitting...' : 'Submit Profile'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
