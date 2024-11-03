import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa'; // Importing Icons
import virtual_consult from '../../assets/Home/virtual_consult.jpg';
import online_pre from '../../assets/Home/online_pre.jpg';
import Data_security from '../../assets/Home/Data_security.jpg';

function Services() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0b1c29]">
      <div className="container px-4 md:px-6">
        
        {/* TeleHealth Services Section */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="inline-block rounded-lg bg-[#095d7e] px-3 py-1 text-sm text-white">Steps</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Portal Registration Process
            </h2>
            <p className="mt-4 max-w-[600px] text-gray-400 md:text-xl lg:text-base xl:text-xl">
              Start Your Practice Now.
            </p>
          </div>
          
          {/* TeleHealth Services Cards */}
          <div
            className="rounded-lg border-2 border-transparent bg-transparent p-6 shadow-lg transition-all duration-300 
            hover:shadow-xl hover:bg-[#095d7e] hover:bg-opacity-10"
            data-v0-t="card"
          >
            <div
            className="rounded-lg border-2 border-transparent bg-transparent p-6 shadow-lg transition-all duration-300 
            hover:shadow-xl hover:bg-[#095d7e] hover:bg-opacity-10 text-center"
          >
            <FaUserCircle className="text-5xl text-[#095d7e] mx-auto" />
            <div className="inline-block rounded-lg bg-[#095d7e] px-3 py-1 text-sm text-white mt-4">Step A</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tighter text-white">Profile Details</h2>
            <p className="mt-4 max-w-[300px] mx-auto text-gray-400 md:text-lg">
              Add basic details, medical registration, education qualification, and establishment details.
            </p>
          </div>
          </div>

          <div
            className="rounded-lg border-2 border-transparent bg-transparent p-6 shadow-lg transition-all duration-300 
            hover:shadow-xl hover:bg-[#095d7e] hover:bg-opacity-10"
            data-v0-t="card"
          >
            <div
            className="rounded-lg border-2 border-transparent bg-transparent p-6 shadow-lg transition-all duration-300 
            hover:shadow-xl hover:bg-[#095d7e] hover:bg-opacity-10 text-center"
          >
            <FaCheckCircle className="text-5xl text-[#095d7e] mx-auto" />
            <div className="inline-block rounded-lg bg-[#095d7e] px-3 py-1 text-sm text-white mt-4">Step B</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tighter text-white">Profile Verification</h2>
            <p className="mt-4 max-w-[300px] mx-auto text-gray-400 md:text-lg">
              Upload doctor identity proof, registration proof, and establishment ownership proof.
            </p>
          </div>
          </div>

          <div
            className="rounded-lg border-2 border-transparent bg-transparent p-6 shadow-lg transition-all duration-300 
            hover:shadow-xl hover:bg-[#095d7e] hover:bg-opacity-10"
            data-v0-t="card"
          >
            <div
            className="rounded-lg border-2 border-transparent bg-transparent p-6 shadow-lg transition-all duration-300 
            hover:shadow-xl hover:bg-[#095d7e] hover:bg-opacity-10 text-center"
          >
            <FaMapMarkerAlt className="text-5xl text-[#095d7e] mx-auto" />
            <div className="inline-block rounded-lg bg-[#095d7e] px-3 py-1 text-sm text-white mt-4">Step C</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tighter text-white">Start Getting Patients</h2>
            <p className="mt-4 max-w-[300px] mx-auto text-gray-400 md:text-lg">
              Add your location, timings, and fees to start getting patients.
            </p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
