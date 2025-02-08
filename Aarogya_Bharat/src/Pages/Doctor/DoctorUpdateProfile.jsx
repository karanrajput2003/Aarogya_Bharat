import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Home/Navbar";
import "react-toastify/dist/ReactToastify.css";

export default function DoctorUpdateProfile() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    const profilePhoto = data.profilephoto[0];
    if (profilePhoto) {
      formData.append("profilephoto", profilePhoto);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/doctor/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Doctor registered successfully!");
        setTimeout(() => navigate("/doctorlogin"), 1000);
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                id="address"
                {...register("address", { required: "Address is required" })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Professional Qualification
            </h3>
            <div>
              <label
                htmlFor="medicalDegrees"
                className="block text-sm font-medium text-gray-700"
              >
                Medical Degrees and Certifications
              </label>
              <textarea
                id="medicalDegrees"
                {...register("medicalDegrees", {
                  required: "Medical degrees are required",
                })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
              {errors.medicalDegrees && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.medicalDegrees.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="specializations"
                className="block text-sm font-medium text-gray-700"
              >
                Specializations (if applicable)
              </label>
              <input
                id="specializations"
                {...register("specializations")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
            </div>
            <div>
              <label
                htmlFor="registrationNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Registration Number
              </label>
              <input
                id="registrationNumber"
                {...register("registrationNumber", {
                  required: "Registration number is required",
                })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
              {errors.registrationNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.registrationNumber.message}
                </p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Experience Details
            </h3>
            <div>
              <label
                htmlFor="yearsOfExperience"
                className="block text-sm font-medium text-gray-700"
              >
                Years of Experience
              </label>
              <input
                id="yearsOfExperience"
                type="number"
                {...register("yearsOfExperience", {
                  required: "Years of experience is required",
                  valueAsNumber: true,
                })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
              {errors.yearsOfExperience && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.yearsOfExperience.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="workHistory"
                className="block text-sm font-medium text-gray-700"
              >
                Work History
              </label>
              <textarea
                id="workHistory"
                {...register("workHistory", {
                  required: "Work history is required",
                })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
              {errors.workHistory && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.workHistory.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="specialSkills"
                className="block text-sm font-medium text-gray-700"
              >
                Special Skills or Advanced Training
              </label>
              <textarea
                id="specialSkills"
                {...register("specialSkills")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Clinic or Practice Details
            </h3>
            <div>
              <label
                htmlFor="clinicName"
                className="block text-sm font-medium text-gray-700"
              >
                Clinic Name
              </label>
              <input
                id="clinicName"
                {...register("clinicName", {
                  required: "Clinic name is required",
                })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
              {errors.clinicName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.clinicName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="clinicAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Clinic Address
              </label>
              <textarea
                id="clinicAddress"
                {...register("clinicAddress", {
                  required: "Clinic address is required",
                })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
              {errors.clinicAddress && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.clinicAddress.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="clinicContact"
                className="block text-sm font-medium text-gray-700"
              >
                Clinic Contact Information
              </label>
              <input
                id="clinicContact"
                {...register("clinicContact", {
                  required: "Clinic contact is required",
                })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
              {errors.clinicContact && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.clinicContact.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="consultationTimings"
                className="block text-sm font-medium text-gray-700"
              >
                Consultation Timings
              </label>
              <input
                id="consultationTimings"
                {...register("consultationTimings")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Emergency Contact Information
            </h3>
            <div>
              <label
                htmlFor="profilephoto"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Photo
              </label>
              <input
                id="profilephoto"
                type="file"
                accept="image/*,.pdf"
                {...register("profilephoto", {
                  required: "Profile photo is required",
                })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
              {errors.profilephoto && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.profilephoto.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
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
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
              Complete Your Doctor Profile
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Please provide the following information to set up your
              professional profile.
            </p>
          </div>
          <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-xl">
            <div className="text-2xl font-semibold mb-6 text-gray-800">
              Profile Update
            </div>
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700">
                Step {step} of {totalSteps}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderStep()}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
                  disabled={step === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  Previous
                </button>
                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={() =>
                      setStep((prev) => Math.min(prev + 1, totalSteps))
                    }
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Profile"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
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
      </section>
    </>
  );
}
