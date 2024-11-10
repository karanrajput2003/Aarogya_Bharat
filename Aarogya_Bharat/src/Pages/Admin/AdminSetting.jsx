import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, Save } from 'lucide-react'
import Sidebar from '../../Components/Admin/Sidebar'


const AdminSetting = () => {
  const [adminProfile, setAdminProfile] = useState({
    id: '',
    name: '',
    email: '',
    phone: ''
  })
  const [editing, setEditing] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  // Dummy data for admin profile (replace with actual data from your API)
  const dummyProfile = {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1234567890'
  }

  useEffect(() => {
    // Fetch the admin profile (replace with actual API call)
    setAdminProfile(dummyProfile)
  }, [])

  const handleEditClick = () => {
    setEditing(true)
  }

  const handleSaveClick = () => {
    // Save changes to the backend (e.g., update name, email, phone, etc.)
    setEditing(false)
    // Update the profile using API
    alert('Profile updated successfully!')
  }

  const handlePasswordChange = () => {
    // Handle password change logic (check if passwords match)
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    alert('Password changed successfully!')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
      <section className="min-h-screen py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="mb-8 md:mb-10 lg:mb-12">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-gray-700 text-center">
              Admin Profile
              </h1>
          <p className="mt-2 text-gray-600 text-center">View and edit your admin profile details</p>
            </div>

            {/* Table for Doctors */}
            <div className="overflow-x-auto text-black shadow-lg rounded-lg">
            <div className="p-8">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-lg font-medium text-gray-900">Profile Information</div>
              {!editing && (
                <button
                  onClick={handleEditClick}
                  className="text-indigo-500 flex items-center space-x-2"
                >
                  <Pencil size={16} />
                  <span>Edit</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="text-sm font-medium text-gray-500">Name</div>
                {editing ? (
                  <input
                    type="text"
                    value={adminProfile.name}
                    onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
                    className="p-2 border rounded-md"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{adminProfile.name}</div>
                )}
              </div>

              <div className="flex justify-between">
                <div className="text-sm font-medium text-gray-500">Email</div>
                {editing ? (
                  <input
                    type="email"
                    value={adminProfile.email}
                    onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                    className="p-2 border rounded-md"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{adminProfile.email}</div>
                )}
              </div>

              <div className="flex justify-between">
                <div className="text-sm font-medium text-gray-500">Phone</div>
                {editing ? (
                  <input
                    type="tel"
                    value={adminProfile.phone}
                    onChange={(e) => setAdminProfile({ ...adminProfile, phone: e.target.value })}
                    className="p-2 border rounded-md"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{adminProfile.phone}</div>
                )}
              </div>
            </div>

            {editing && (
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={handleSaveClick}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>

          <div className="mt-12">
            <div className="text-lg font-medium text-gray-900">Change Password</div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="text-sm font-medium text-gray-500">New Password</div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>

              <div className="flex justify-between">
                <div className="text-sm font-medium text-gray-500">Confirm Password</div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handlePasswordChange}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
            </div>
          </div>
        </section>
    </main>
    </div>
  )
}

export default AdminSetting;