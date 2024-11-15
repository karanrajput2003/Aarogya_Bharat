import React, { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import axios from 'axios';

function TopDoctor() {
  const [topDoctors, setTopDoctors] = useState([]);

  useEffect(() => {
    // Fetch the top 5 doctors from the backend, assuming it returns sorted data
    axios
      .get(`${import.meta.env.VITE_BACKEND}/api/topdoctors`) // Adjust this URL based on your API endpoint
      .then((response) => {
        setTopDoctors(response.data); // Expecting the response to be an array of top 5 doctors
      })
      .catch((error) => {
        console.error('Error fetching top doctors:', error);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Top Performing Doctors</h3>
      <p className="text-sm text-gray-500 mb-4">Doctors with the highest ratings and consultations</p>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Specialty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Consultations</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
            {topDoctors.map((doctor) => (
              <tr key={doctor._id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{doctor.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.specializations}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {doctor.rating} {/* Assuming you have a rating field in your doctor model */}
                    <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.consultations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopDoctor;
