import React from 'react'
import Navbar from '../../Components/Home/Navbar'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <section className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container flex justify-center items-center">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-[#073243] mb-6">Login to Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#073243]" htmlFor="email">
                  Doctor Email/Username
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#095d7e] transition duration-150 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
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
                  className={`mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#095d7e] transition duration-150 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-[#095d7e] text-white font-medium rounded-md transition-colors duration-200 hover:bg-[#0a7580]"
              >
                Login
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-[#073243]">
                Don’t have an account?{' '}
                <Link to="/doctorregister" className="text-[#095d7e] hover:underline">
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
