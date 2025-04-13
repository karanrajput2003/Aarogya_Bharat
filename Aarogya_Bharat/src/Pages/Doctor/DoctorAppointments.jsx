  import React, { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import Navbar from '../../Components/Doctor/Navbar';
  import { useSelector } from 'react-redux';
  import { Calendar, Clock, Search, Filter, ChevronRight, FileText, Bell, User, ChevronLeft } from 'lucide-react';

  function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState('scheduled');
    const doctorId = useSelector((state) => state.auth.userId);

    const navigate = useNavigate();

    useEffect(() => {
      setLoading(true);
      const fetchAppointments = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND}/appointments?doctorid=${doctorId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch appointments');
          }
          const data = await response.json();
          setAppointments(data);
          setFilteredAppointments(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAppointments();
    }, [doctorId]);

    useEffect(() => {
      handleFilter();
    }, [statusFilter, searchTerm]);

    const handleFilter = () => {
      let filtered = appointments;

      if (statusFilter) {
        filtered = filtered.filter(appointment => appointment.status === statusFilter);
      }

      if (searchTerm) {
        filtered = filtered.filter(appointment => 
          appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.patient.symptoms.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (doctorId) {
        filtered = filtered.filter(appointment => appointment.doctorid === doctorId);
      }

      setFilteredAppointments(filtered);
    };

    const displayedAppointments = filteredAppointments.filter(appointment =>
      view === 'scheduled'
        ? appointment.status === 'Scheduled'
        : view === 'completed'
        ? appointment.status === 'Completed'
        : appointment.status === 'Unscheduled'
    );

    const handleViewDetails = (id) => {
      navigate(`/doctor/appointmentdetails/${id}`);
    };

    const handleScheduleAppointment = (id) => {
      const updatedAppointments = appointments.map(appointment =>
        appointment._id === id ? { ...appointment, status: 'Scheduled' } : appointment
      );
      setAppointments(updatedAppointments);
      fetch(`${import.meta.env.VITE_BACKEND}/appointments/${id}/schedule`, { method: 'PUT' })
        .then((response) => response.json())
        .then(() => {
          alert('Appointment scheduled!');
        })
        .catch((error) => {
          alert('Failed to schedule appointment');
        });
    };

    // Get today's date for the header
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const statusBadgeColor = {
      Scheduled: "bg-green-500 text-white",
      Completed: "bg-blue-500 text-white",
      Unscheduled: "bg-amber-500 text-white",
      Cancelled: "bg-red-500 text-white"
    };

    if (loading) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600">Loading appointments...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-md">
            <h3 className="text-red-600 font-semibold text-lg mb-2">Error Loading Appointments</h3>
            <p className="text-slate-700">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex min-h-screen bg-slate-50 font-sans">
        {/* Sidebar */}
        <Navbar />
        
        {/* Main Content */}
        <main className="ml-20 flex-1 p-8">
          {/* Header with welcome message and date */}
          <header className="flex items-center justify-between mb-8">
            <div className="relative">
              {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" /> */}
              <input
                type="text"
                placeholder="Aarogya Bharat"
                readOnly
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-72 shadow-sm"
              />
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full bg-white shadow-sm mr-4 relative">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium mr-2">
                  DL
                </div>
                <div className="relative">
                  <button className="flex items-center">
                    <span className="font-medium text-slate-800">Dr Luke</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 ml-1 text-slate-500"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1 text-slate-800">
              Appointment Management
            </h1>
            <p className="text-slate-500">{today}</p>
          </div>
          
          {/* Filter Tabs */}
          <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setView('scheduled')}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  view === 'scheduled' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Calendar className={`h-4 w-4 ${view === 'scheduled' ? 'text-white' : 'text-slate-500'} mr-2`} />
                Scheduled
              </button>
              
              <button
                onClick={() => setView('completed')}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  view === 'completed' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FileText className={`h-4 w-4 ${view === 'completed' ? 'text-white' : 'text-slate-500'} mr-2`} />
                Completed
              </button>
              
              <button
                onClick={() => setView('unscheduled')}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  view === 'unscheduled' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Clock className={`h-4 w-4 ${view === 'unscheduled' ? 'text-white' : 'text-slate-500'} mr-2`} />
                Unscheduled
              </button>
            </div>
            
            <div className="flex items-center">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors">
                <Calendar className="h-4 w-4" />
                <span>View Calendar</span>
              </button>
            </div>
          </div>
          
          {/* Appointment Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Contact Information
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Medical History
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Symptoms
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Insurance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Preferred Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {displayedAppointments.length > 0 ? (
                    displayedAppointments.map((appointment, index) => (
                      <tr key={appointment._id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <span className="text-indigo-600 font-medium">
                                {appointment.patient.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-slate-900">{appointment.patient.name}</div>
                              <div className="text-sm text-slate-500">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeColor[appointment.status]}`}>
                                  {appointment.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{appointment.patient.phone}</div>
                          <div className="text-sm text-slate-500">{appointment.patient.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-700 max-w-xs overflow-hidden text-ellipsis">
                            {appointment.patient.medicalHistory || 'No history provided'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-700 max-w-xs overflow-hidden text-ellipsis">
                            {appointment.patient.symptoms}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            appointment.patient.insuranceDetails ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                          }`}>
                            {appointment.patient.insuranceDetails ? 'Available' : 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">
                            {new Date(appointment.consultationDetails.preferredDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-slate-500">
                            {appointment.consultationDetails.preferredTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleViewDetails(appointment._id)}
                            className="px-3 py-1 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 mr-2"
                          >
                            View Details
                          </button>
                          {appointment.status === 'Unscheduled' && (
                            <button
                              onClick={() => handleScheduleAppointment(appointment._id)}
                              className="px-3 py-1 rounded-md bg-green-50 text-green-600 hover:bg-green-100"
                            >
                              Schedule
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-10 text-center">
                        <div className="flex flex-col items-center">
                          <Calendar className="h-16 w-16 text-slate-300 mb-4" />
                          <p className="text-slate-600 text-lg font-medium">No {view} appointments available</p>
                          <p className="text-slate-400 mt-2">Check back later or change your filter settings</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination */}
          {displayedAppointments.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-slate-500">
                Showing <span className="font-medium">{displayedAppointments.length}</span> {view} appointments
              </div>
              <div className="flex gap-1">
                <button className="px-3 py-2 border border-slate-200 rounded-md text-slate-600 bg-white hover:bg-slate-50 flex items-center">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
                <button className="px-3 py-2 border border-slate-200 rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  1
                </button>
                <button className="px-3 py-2 border border-slate-200 rounded-md text-slate-600 bg-white hover:bg-slate-50">
                  2
                </button>
                <button className="px-3 py-2 border border-slate-200 rounded-md text-slate-600 bg-white hover:bg-slate-50">
                  3
                </button>
                <button className="px-3 py-2 border border-slate-200 rounded-md text-slate-600 bg-white hover:bg-slate-50 flex items-center">
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  export default DoctorAppointments;