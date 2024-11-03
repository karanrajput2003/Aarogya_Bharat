import React, { useState } from 'react';
import Navbar from '../../Components/Home/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice'; // Adjust path as necessary

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const navigate = useNavigate(); // Navigation
  const dispatch = useDispatch(); // Initialize dispatch
  // console.log(import.meta.env.VITE_BACKEND);

  const onSubmit = async (data) => {
    setIsLoading(true); // Start loading
    setErrorMessage(''); // Reset any previous error messages
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/auth/signin`, {
        email: data.email,
        password: data.password,
      });

      // Log the response for debugging
      console.log(response.data);

      // Assuming the response contains user ID and roles
      const userId = response.data.id; // Adjust based on your API response

      // Dispatch login action to store user ID
      dispatch(login({ userId }));

      // Redirect based on role
      if (response.data.roles[0] === "ROLE_USER") {
        toast.success("Login Successfully", {
          position: "top-right"
        });
        setTimeout(() => {
          navigate("/patient");
        }, 1000); // Delay navigation for user experience
      } else if (response.data.roles[0] === "ROLE_MODERATOR") {
        toast.success("Login Successfully", {
          position: "top-right"
        });
        setTimeout(() => {
          navigate("/doctor");
        }, 1000); // Delay navigation for user experience
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Incorrect Username or Password"); // Set error message
      toast.error("Incorrect Username or Password", {
        position: "top-right"
      });  
    } finally {
      setIsLoading(false); // Stop loading
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
      <section className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container flex justify-center items-center">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-[#073243] mb-6">Login to Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#073243]" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#095d7e] transition duration-150 ${errors.email ? 'border-red-500' : ''}`}
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#073243]" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className={`mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#095d7e] transition duration-150 ${errors.password ? 'border-red-500' : ''}`}
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className="text-sm text-[#073243] ml-2">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-sm text-[#095d7e] hover:underline">Forgot password?</Link>
              </div>

              {/* Error message */}
              {errorMessage && (
                <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-10 bg-[#095d7e] text-white font-medium rounded-md transition-colors duration-200 hover:bg-[#0a7580]"
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-[#073243]">
                Don’t have an account?{' '}
                <Link to="/register" className="text-[#095d7e] hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
