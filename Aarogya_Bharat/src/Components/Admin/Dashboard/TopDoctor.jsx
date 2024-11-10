import React from 'react'
import {   TrendingUp} from 'lucide-react'
const topDoctors = [
  { id: 1, name: "Dr. Emily Smith", specialty: "Cardiology", rating: 4.9, consultations: 120 },
  { id: 2, name: "Dr. Michael Johnson", specialty: "Pediatrics", rating: 4.8, consultations: 110 },
  { id: 3, name: "Dr. Sarah Lee", specialty: "Dermatology", rating: 4.7, consultations: 95 },
  { id: 4, name: "Dr. David Chen", specialty: "Orthopedics", rating: 4.9, consultations: 105 },
  { id: 5, name: "Dr. Maria Rodriguez", specialty: "Neurology", rating: 4.8, consultations: 100 },
]
function TopDoctor() {
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
                    <tr key={doctor.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{doctor.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{doctor.specialty}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {doctor.rating}
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
  )
}

export default TopDoctor