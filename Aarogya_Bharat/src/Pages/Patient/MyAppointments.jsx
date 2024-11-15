import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Patient/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';  // You need axios to make HTTP requests

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState(''); // Scheduled, Completed, Unscheduled
  const [view, setView] = useState('scheduled'); // scheduled, completed, unscheduled
  const userId = useSelector((state) => state.auth.userId); // Get user ID from Redux
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/myappointments?userId=${userId}`);  // Fetch from backend
        console.log(response)
        setAppointments(response.data); // Set appointments from backend response
        setFilteredAppointments(response.data); // Initially show all appointments
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  const handleFilter = () => {
    let filtered = appointments;

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }

    setFilteredAppointments(filtered);
  };

  // Current Date to compare for upcoming and completed
  const currentDate = new Date();

  // Filter appointments based on view (scheduled, completed, unscheduled)
  const displayedAppointments = filteredAppointments.filter(appointment =>
    view === 'scheduled'
      ? appointment.status === 'Scheduled' // 'Scheduled' appointments
      : view === 'completed'
      ? appointment.status === 'Completed' // 'Completed' appointments
      : appointment.status === 'Unscheduled' // 'Unscheduled' appointments
  );

  const handleViewDetails = (id) => {
    navigate(`/patient/appointmentdetails/${id}`);
  };

  if (loading) {
    return <p className="text-white">Loading appointments...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8 md:mb-10 lg:mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white text-center">
              {view === 'scheduled' ? 'Scheduled Appointments' : view === 'completed' ? 'Completed Appointments' : 'Unscheduled Appointments'}
            </h1>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8 flex-wrap">
            <button
              onClick={() => setView('scheduled')}
              className={`px-4 sm:px-6 py-2 rounded ${view === 'scheduled' ? 'bg-[#189AB4] text-white' : 'bg-[#F0F4F8] border-[#7B6E58] text-[#0d6270] border'}`}
            >
              Scheduled Appointments
            </button>

            <button
              onClick={() => setView('completed')}
              className={`px-4 sm:px-6 py-2 rounded ${view === 'completed' ? 'bg-[#189AB4] text-white' : 'bg-[#F0F4F8] border-[#7B6E58] text-[#0d6270] border'}`}
            >
              Completed Appointments
            </button>

            <button
              onClick={() => setView('unscheduled')}
              className={`px-4 sm:px-6 py-2 rounded ${view === 'unscheduled' ? 'bg-[#189AB4] text-white' : 'bg-[#F0F4F8] border-[#7B6E58] text-[#0d6270] border'}`}
            >
              Unscheduled Appointments
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {displayedAppointments.length > 0 ? (
              displayedAppointments.map((appointment) => (
                <div key={appointment._id} className="rounded-lg border bg-[#F0F4F8] text-[#05445E] shadow-sm">
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-[#0d6270]">Doctor id:{appointment.consultationDetails.doctorid}</h3>
                    <p className="mt-2 text-[#189AB4]">{appointment.specialization}</p>
                    <p className="mt-1 text-[#189AB4]">
                    {new Date(appointment.consultationDetails.preferredDate).toLocaleDateString()} at {appointment.consultationDetails.preferredTime}
                    </p>
                    <span className="mt-4 bg-[#75E6DA] px-2 py-1 rounded-md text-xs font-medium text-[#05445E]">
                      {appointment.status}
                    </span>
                    {appointment.status === 'Scheduled' && (
                      <button
                        onClick={() => handleViewDetails(appointment._id)}
                        className="mt-4 w-full px-4 py-2 bg-[#0a4c59] text-white rounded hover:bg-[#073243]"
                      >
                        Start Telehealth Session
                      </button>
                    )}
                    <button
                      onClick={() => handleViewDetails(appointment._id)}
                      className="mt-2 w-full px-4 py-2 bg-[#189AB4] text-white rounded hover:bg-[#0a4c59]"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">No appointments found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default MyAppointments;
