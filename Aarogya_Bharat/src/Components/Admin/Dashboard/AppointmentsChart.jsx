import React from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FaCalendarCheck } from 'react-icons/fa';

const COLORS = ["#4338ca", "#0891b2", "#c026d3", "#ea580c"]

const appointmentData = [
  { name: 'Completed', value: 400 },
  { name: 'Cancelled', value: 30 },
  { name: 'No-show', value: 50 },
  { name: 'Rescheduled', value: 20 },
]

function AppointmentsChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-900"><FaCalendarCheck className="text-blue-600"/> Appointment Status</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={appointmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {appointmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
  )
}

export default AppointmentsChart