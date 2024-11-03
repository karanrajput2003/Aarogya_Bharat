import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <>
      <hr />
      <footer className="bg-gradient-to-b from-[#0d6270] to-[#073243] text-white py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between space-y-6 md:space-y-0">
            
            {/* Logo and Description */}
            <div className="w-full md:w-1/2 lg:w-1/4 text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-wide text-yellow-300 hover:text-yellow-400 transition duration-200">Aarogya Bharat</h2>
              <p className="mt-4 text-sm text-gray-300">
                Revolutionizing healthcare in India with telehealth services to make medical care more accessible, secure, and efficient.
              </p>
            </div>

            {/* Quick Links */}
            <div className="w-full md:w-1/2 lg:w-1/4 text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><a href="#" className="hover:underline hover:text-yellow-300 transition duration-200">Home</a></li>
                <li><a href="#" className="hover:underline hover:text-yellow-300 transition duration-200">About Us</a></li>
                <li><a href="#" className="hover:underline hover:text-yellow-300 transition duration-200">Services</a></li>
                <li><a href="#" className="hover:underline hover:text-yellow-300 transition duration-200">FAQs</a></li>
                <li><a href="#" className="hover:underline hover:text-yellow-300 transition duration-200">Contact Us</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="w-full md:w-1/2 lg:w-1/4 text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Our Services</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><a href="#" className="hover:underline hover:text-yellow-300 transition duration-200">Doctor Consultation</a></li>
                <li><a href="#" className="hover:underline hover:text-yellow-300 transition duration-200">E-Prescriptions</a></li>
                <li><a href="#" className="hover:underline hover:text-yellow-300 transition duration-200">Video Chat</a></li>
                <li><a href="#" className="hover:underline hover:text-yellow-300 transition duration-200">Home Remedies Chatbot</a></li>
                <li><a href="#" className="hover:underline hover:text-yellow-300 transition duration-200">Ambulance Info</a></li>
              </ul>
            </div>

            {/* Contact and Social Media */}
            <div className="w-full md:w-1/2 lg:w-1/4 text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Connect With Us</h3>
              <p className="text-sm mb-4 text-gray-300">
                Bandra West, Mumbai, India <br />
                Phone: +91 98765 43210 <br />
                Email: support@aarogyabharat.com
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="text-white hover:text-yellow-300 transition duration-200"><FaFacebook size={20} /></a>
                <a href="#" className="text-white hover:text-yellow-300 transition duration-200"><FaTwitter size={20} /></a>
                <a href="#" className="text-white hover:text-yellow-300 transition duration-200"><FaInstagram size={20} /></a>
                <a href="#" className="text-white hover:text-yellow-300 transition duration-200"><FaLinkedin size={20} /></a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 border-t border-gray-600 pt-4 text-center">
            <p className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} Aarogya Bharat. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
