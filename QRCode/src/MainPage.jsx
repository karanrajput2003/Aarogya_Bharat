import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MainPage() {
  const { userId } = useParams();  // Extract userId from URL
  const [userData, setUserData] = useState(null);  // State to hold fetched user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data from backend using userId
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://aarogya-bharat-qr-backend.vercel.app/api/users/${userId}`);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      <section className="w-full min-h-screen pt-6 md:pt-12 lg:pt-16 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container mx-auto space-y-10 xl:space-y-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white text-center">
            User Profile
          </h1>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-10">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-black">Personal Information:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name Section */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <div>
                  <p className="text-gray-700 font-medium">Name:</p>
                  <p className="text-gray-900">{userData?.username}</p>
                </div>
              </div>

              {/* Age Section */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <div>
                  <p className="text-gray-700 font-medium">Age:</p>
                  <p className="text-gray-900">{userData?.age}</p>
                </div>
              </div>

              {/* Phone Section */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <div>
                  <p className="text-gray-700 font-medium">Phone:</p>
                  <p className="text-gray-900">{userData?.phone}</p>
                </div>
              </div>

              {/* Email Section */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <div>
                  <p className="text-gray-700 font-medium">Email:</p>
                  <p className="text-gray-900">{userData?.email}</p>
                </div>
              </div>

              {/* Address Section */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm col-span-2">
                <div>
                  <p className="text-gray-700 font-medium">Address:</p>
                  <p className="text-gray-900">{userData?.Address}</p>
                </div>
              </div>

              {/* Aadhar Section */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <div>
                  <p className="text-gray-700 font-medium">Aadhar No:</p>
                  <p className="text-gray-900">{userData?.aadhar_no}</p>
                </div>
              </div>

              {/* Roles Section */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <div>
                  <p className="text-gray-700 font-medium">Roles:</p>
                  <p className="text-gray-900">{userData?.roles?.join(', ') || 'No roles assigned'}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainPage;
