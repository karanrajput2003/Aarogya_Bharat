import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// const Component = () => {
//   const userId = useSelector((state) => state.auth.userId);

//   return <div>User ID: {userId}</div>;
// };

function Navbar() {
  const userId = useSelector((state) => state.auth.userId);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-[#073243] z-50">
        <Link className="flex items-center justify-center" to="./">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"></path>
          </svg>
          <span>-Aarogya Bharat-</span>
        </Link>

        {/* Hamburger menu button for mobile */}
        <button
          onClick={toggleMenu}
          className="block lg:hidden p-2 focus:outline-none"
          aria-label="Menu"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-4 sm:gap-6 ml-auto">
          <Link
            to="/patient"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            to="/patient/finddoctor"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Find a Doctor
          </Link>
          <Link
            to="/patient/myappointments"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            My Appoiments
          </Link>
          <Link
            to={`/patient/documents`}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Medical Records
          </Link>
          <Link
            to={`/patient/profile/${userId}`}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Profile
          </Link>
          <Link
            to="/"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Logout
          </Link>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="lg:hidden absolute top-14 left-0 w-full shadow-lg bg-[#073243] z-50">
            <ul className="flex flex-col items-center gap-4 p-4">
              <li>
                <Link
                  to="/patient"
                  className="text-sm font-medium hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/patient/finddoctor"
                  className="text-sm font-medium hover:underline"
                >
                  Find a Doctor
                </Link>
              </li>
              <li>
                <Link
                  to="/patient/myappointments"
                  className="text-sm font-medium hover:underline"
                >
                  My Appoiments
                </Link>
              </li>
              <li>
                <Link
                  to={`/patient/documents`}
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  Medical Records
                </Link>
              </li>
              <li>
                <Link
                  to={`/patient/profile/${userId}`}
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}

export default Navbar;
