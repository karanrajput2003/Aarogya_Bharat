import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function DoctorProfilePage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const userId = useSelector((state) => state.auth.userId);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // You can add API call to save data
  };

  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] text-white">
      <div className="container space-y-10 xl:space-y-16">
        <h2 className="text-3xl font-bold text-center">Doctor Profile Setup</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Personal Information</h3>
            
            <div>
              <label>Name</label>
              <input {...register('name', { required: true })} className="w-full px-4 py-2 mt-2 bg-white text-black" />
              {errors.name && <p className="text-red-500">Name is required</p>}
            </div>

            <div>
              <label>Gender</label>
              <select {...register('gender', { required: true })} className="w-full px-4 py-2 mt-2 bg-white text-black">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500">Gender is required</p>}
            </div>

            <div>
              <label>City</label>
              <input {...register('city', { required: true })} className="w-full px-4 py-2 mt-2 bg-white text-black" />
              {errors.city && <p className="text-red-500">City is required</p>}
            </div>

            <div>
              <label>Years of Experience</label>
              <input type="number" {...register('experience', { required: true })} className="w-full px-4 py-2 mt-2 bg-white text-black" />
              {errors.experience && <p className="text-red-500">Experience is required</p>}
            </div>

            <div>
              <label>About Me</label>
              <textarea {...register('about', { required: true })} className="w-full px-4 py-2 mt-2 bg-white text-black" />
              {errors.about && <p className="text-red-500">About Me is required</p>}
            </div>

            <div>
              <label>Profile Photo</label>
              <input type="file" {...register('profilePhoto')} className="w-full px-4 py-2 mt-2 bg-white text-black" />
            </div>

            <div>
              <label>Contact Details</label>
              <input {...register('contact', { required: true })} className="w-full px-4 py-2 mt-2 bg-white text-black" />
              {errors.contact && <p className="text-red-500">Contact Details are required</p>}
            </div>
          </div>

          {/* Education and Specialization */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Education & Specialization</h3>

            <div>
              <label>Education</label>
              <textarea {...register('education', { required: true })} className="w-full px-4 py-2 mt-2 bg-white text-black" />
              {errors.education && <p className="text-red-500">Education is required</p>}
            </div>

            <div>
              <label>Specialization</label>
              <textarea {...register('specialization', { required: true })} className="w-full px-4 py-2 mt-2 bg-white text-black" />
              {errors.specialization && <p className="text-red-500">Specialization is required</p>}
            </div>
          </div>

          {/* Registration and Documents */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Registration & Documents</h3>

            <div>
              <label>Registration Details</label>
              <textarea {...register('registration', { required: true })} className="w-full px-4 py-2 mt-2 bg-white text-black" />
              {errors.registration && <p className="text-red-500">Registration Details are required</p>}
            </div>

            <div>
              <label>Upload Documents</label>
              <input type="file" {...register('documents')} multiple className="w-full px-4 py-2 mt-2 bg-white text-black" />
            </div>
          </div>

          {/* Clinics Details */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Clinics Details</h3>

            <div>
              <label>Clinic Name</label>
              <input {...register('clinicName', { required: true })} className="w-full px-4 py-2 mt-2 bg-white text-black" />
              {errors.clinicName && <p className="text-red-500">Clinic Name is required</p>}
            </div>

            <div>
              <label>Clinic Address</label>
              <textarea {...register('clinicAddress', { required: true })} className="w-full px-4 py-2 mt-2 bg-white text-black" />
              {errors.clinicAddress && <p className="text-red-500">Clinic Address is required</p>}
            </div>
          </div>

          {/* Awards and Membership */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Awards & Membership</h3>

            <div>
              <label>Awards</label>
              <textarea {...register('awards')} className="w-full px-4 py-2 mt-2 bg-white text-black" />
            </div>

            <div>
              <label>Memberships</label>
              <textarea {...register('memberships')} className="w-full px-4 py-2 mt-2 bg-white text-black" />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="mt-6 bg-indigo-900 px-6 py-2 text-white rounded-lg hover:bg-indigo-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default DoctorProfilePage;
