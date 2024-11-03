import React from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../../Components/Doctor/Navbar';

function DoctorUpdateProfile() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Here you can handle form submission (e.g., send data to an API)
  };

  return (
    <>
    <Navbar />
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] text-white">
      <div className="container space-y-10 xl:space-y-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl text-white">
            Update Your Profile
          </h1>
          <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl text-white">
            Please fill in your details below to complete your profile.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="p-6 rounded-lg shadow-lg border border-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <div className="grid gap-6 mt-4 md:grid-cols-2">
              {[
                { label: 'Name', name: 'name', type: 'text', required: true },
                { label: 'City', name: 'city', type: 'text', required: true },
                { label: 'Gender', name: 'gender', type: 'select', options: ['Select Gender', 'male', 'female', 'other'], required: true },
                { label: 'Years of Experience', name: 'experience', type: 'number', required: true },
                { label: 'Contact Details', name: 'contactDetails', type: 'text', required: true },
              ].map(({ label, name, type, options, required }) => (
                <div key={name}>
                  <label className="block text-sm font-medium">{label}{required && ' *'}</label>
                  {type === 'select' ? (
                    <select {...register(name, { required: `${label} is required` })} className={`w-full p-2 rounded-md border border-black text-black ${errors[name] ? 'border-red-500' : ''}`}>
                      {options.map((option, index) => (
                        <option key={index} value={option === 'Select Gender' ? '' : option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      {...register(name, { required: `${label} is required`, valueAsNumber: type === 'number' })}
                      className={`w-full p-2 rounded-md border border-black text-black ${errors[name] ? 'border-red-500' : ''}`}
                      type={type}
                    />
                  )}
                  {errors[name] && <span className="text-red-500">{errors[name].message}</span>}
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-sm font-medium">About Me</label>
                <textarea
                  {...register('aboutMe')}
                  className="w-full p-2 rounded-md border border-black text-black"
                  rows="4"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">Profile Photo</label>
                <input
                  {...register('profilePhoto')}
                  className="w-full p-2 rounded-md border border-black text-black"
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          {/* Education and Specialization Section */}
          <div className="p-6 rounded-lg shadow-lg border border-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Education and Specialization</h2>
            <div className="grid gap-6 mt-4 md:grid-cols-2">
              {[
                { label: 'Education', name: 'education' },
                { label: 'Specialization', name: 'specialization' },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-sm font-medium">{label}</label>
                  <input
                    {...register(name)}
                    className="w-full p-2 rounded-md border border-black text-black"
                    type="text"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Registration and Documents Section */}
          <div className="p-6 rounded-lg shadow-lg border border-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Registration and Documents</h2>
            <div className="grid gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium">Registration Number</label>
                <input
                  {...register('registrationNumber')}
                  className="w-full p-2 rounded-md border border-black text-black"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Upload Registration Document</label>
                <input
                  {...register('registrationDocument')}
                  className="w-full p-2 rounded-md border border-black text-black"
                  type="file"
                  accept=".pdf, image/*"
                />
              </div>
            </div>
          </div>

          {/* Clinic Details Section */}
          <div className="p-6 rounded-lg shadow-lg border border-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Clinic Details</h2>
            <div className="grid gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium">Clinic Name</label>
                <input
                  {...register('clinicName')}
                  className="w-full p-2 rounded-md border border-black text-black"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Clinic Address</label>
                <textarea
                  {...register('clinicAddress')}
                  className="w-full p-2 rounded-md border border-black text-black"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Awards and Membership Section */}
          <div className="p-6 rounded-lg shadow-lg border border-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Awards and Memberships</h2>
            <div className="grid gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium">Awards</label>
                <input
                  {...register('awards')}
                  className="w-full p-2 rounded-md border border-black text-black"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Memberships</label>
                <input
                  {...register('memberships')}
                  className="w-full p-2 rounded-md border border-black text-black"
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-900 px-6 py-2 text-white font-medium shadow transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-700"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </section>
    </>
  );
}

export default DoctorUpdateProfile;
