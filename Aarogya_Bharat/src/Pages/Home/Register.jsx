import React, { useState } from 'react';
import Navbar from '../../Components/Home/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Import axios

function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log(data)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/auth/signup`, {
        username: data.fullName,
        email: data.email,
        age: data.age,
        aadhar_no: data.aadhar,
        Address: data.address,
        roles: ["user"],
        password: data.password,
      });
      console.log(response);
      alert("User Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrorMessage("Username or Email already exists");
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch('password');

  return (
    <>
      <Navbar />
      <section className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container md:px-8 lg:px-16 flex justify-center items-center">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-[#073243] mb-6">Create Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name & Email in one row */}
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-[#073243]" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                    className={`mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#095d7e] transition duration-150 ${
                      errors.fullName ? 'border-red-500' : ''
                    }`}
                    {...register('fullName', { required: 'Full Name is required' })}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium text-[#073243]" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter your email"
                    className={`mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#095d7e] transition duration-150 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Age & Aadhar in one row */}
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-[#073243]" htmlFor="age">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    placeholder="Enter your age"
                    className={`mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#095d7e] transition duration-150 ${
                      errors.age ? 'border-red-500' : ''
                    }`}
                    {...register('age', { required: 'Age is required', min: { value: 18, message: 'You must be at least 18 years old' } })}
                  />
                  {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium text-[#073243]" htmlFor="aadhar">
                    Aadhar Number
                  </label>
                  <input
                    type="text"
                    id="aadhar"
                    placeholder="Enter your Aadhar number"
                    className={`mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#095d7e] transition duration-150 ${
                      errors.aadhar ? 'border-red-500' : ''
                    }`}
                    {...register('aadhar', { required: 'Aadhar number is required', minLength: { value: 12, message: 'Aadhar must be 12 digits' }, maxLength: { value: 12, message: 'Aadhar must be 12 digits' } })}
                  />
                  {errors.aadhar && <p className="text-red-500 text-sm mt-1">{errors.aadhar.message}</p>}
                </div>
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#073243]" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter your address"
                  className={`mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#095d7e] transition duration-150 ${
                    errors.address ? 'border-red-500' : ''
                  }`}
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>

              {/* Password & Confirm Password in one row */}
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-[#073243]" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className={`mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#095d7e] transition duration-150 ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium text-[#073243]" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    className={`mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#095d7e] transition duration-150 ${
                      errors.confirmPassword ? 'border-red-500' : ''
                    }`}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              {/* Error message */}
              {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-10 bg-[#095d7e] text-white font-medium rounded-md transition-colors duration-200 hover:bg-[#0a7580]"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-[#073243]">
                Already have an account?{' '}
                <Link to="/login" className="text-[#095d7e] hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
