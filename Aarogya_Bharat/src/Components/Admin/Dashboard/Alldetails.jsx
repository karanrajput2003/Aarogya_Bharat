import React from "react";
import { 
    Calendar, 
    Users as UsersIcon,
    DollarSign,
    Package,
  } from 'lucide-react'
  import { AiOutlineLineChart, AiOutlineMedicineBox, AiOutlineCheck, AiOutlineClose, AiOutlineQuestion } from 'react-icons/ai';

  import { FaUserMd, FaCalendarCheck, FaDollarSign, FaClipboardList, FaCog } from 'react-icons/fa';

function Alldetails() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Total Appointments</h3>
                <FaCalendarCheck className="h-4 w-4 text-blue-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-gray-900">2</div>
              <p className="mt-1 text-xs text-gray-500">+20.1% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <FaDollarSign className="h-4 w-4 text-green-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-gray-900">Rs. 800</div>
              <p className="mt-1 text-xs text-gray-500">+15.2% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Active Patients</h3>
                <AiOutlineMedicineBox className="h-4 w-4 text-yellow-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-gray-900">11</div>
              <p className="mt-1 text-xs text-gray-500">+5.2% from last month</p>
            </div>
            {/* <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Inventory Items</h3>
                <FaClipboardList className="h-4 w-4 text-purple-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-gray-900">789</div>
              <p className="mt-1 text-xs text-gray-500">+2.5% from last month</p>
            </div> */}
          </div>
  )
}

export default Alldetails