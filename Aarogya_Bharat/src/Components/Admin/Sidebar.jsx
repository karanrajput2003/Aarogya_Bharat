import React, { useState } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CreditCard, 
  Settings,
  Package,
  Menu,
  X,
  Hospital,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const navItems = [
  { icon: LayoutDashboard, text: 'Dashboard', href: '/admin' },
  { icon: Hospital, text: 'Doctors Approval', href: '/admin/doctors-approval' },
  { icon: Calendar, text: 'Appointments', href: '/admin/appointments' },
  { icon: Users, text: 'Patients', href: '/admin/allPatients' },
  { icon: CreditCard, text: 'Patient Record', href: '/admin/patient-record' },
  { icon: Package, text: 'Inventory', href: '/admin/inventory' },
  { icon: CreditCard, text: 'Payments', href: '/admin/payments' },
  { icon: Settings, text: 'Settings', href: '/admin/settings' },
  { icon: Users, text: 'Logout', href: '/' },
]

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="fixed top-4 left-4 z-40 md:hidden bg-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside className={`
        fixed top-0 left-0 z-30 w-64 h-full bg-white shadow-md transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-indigo-600">Aarogya Bharat</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span className="font-medium">{item.text}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
