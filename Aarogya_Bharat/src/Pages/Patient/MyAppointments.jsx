import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Patient/Navbar';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [view, setView] = useState('upcoming'); // 'upcoming', 'completed', or 'unapproved'

  const navigate = useNavigate();

  // Sample appointment data for telehealth
  const sampleAppointments = [
    {
      _id: '1',
      doctor: 'Dr. John Smith',
      specialization: 'Cardiologist',
      date: '2024-10-20T10:30:00',
      status: 'Upcoming Teleconsultation',
    },
    {
      _id: '2',
      doctor: 'Dr. Jane Doe',
      specialization: 'Dermatologist',
      date: '2024-10-15T14:00:00',
      status: 'Completed (Telehealth)',
    },
    {
      _id: '3',
      doctor: 'Dr. Emily White',
      specialization: 'Pediatrician',
      date: '2024-10-18T09:00:00',
      status: 'Upcoming Teleconsultation',
    },
    {
      _id: '4',
      doctor: 'Dr. Alan Brown',
      specialization: 'General Practitioner',
      date: '2024-10-22T11:00:00',
      status: 'Unapproved',
    },
    {
      _id: '5',
      doctor: 'Dr. Mary Johnson',
      specialization: 'Orthopedist',
      date: '2024-10-12T16:00:00',
      status: 'Completed (Telehealth)',
    },
  ];

  useEffect(() => {
    setLoading(true);
    try {
      // Use sample data directly instead of fetching from API
      setAppointments(sampleAppointments);
      setFilteredAppointments(sampleAppointments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilter = () => {
    let filtered = appointments;

    if (statusFilter) {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }

    setFilteredAppointments(filtered);
  };

  const currentDate = new Date();

  const displayedAppointments = filteredAppointments.filter(appointment =>
    view === 'upcoming'
      ? new Date(appointment.date) >= currentDate
      : view === 'completed'
      ? new Date(appointment.date) < currentDate && appointment.status.includes('Completed')
      : appointment.status === 'Unapproved'
  );

  const handleViewDetails = (id) => {
    navigate(`/user/appointmentdetails/${id}`);
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
          {view === 'upcoming' ? 'Upcoming Telehealth Appointments' : view === 'completed' ? 'Completed Telehealth Appointments' : 'Unapproved Appointments'}
          </h1>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8 flex-wrap">
            <button
              onClick={() => setView('upcoming')}
              className={`px-4 sm:px-6 py-2 rounded ${view === 'upcoming' ? 'bg-[#189AB4] text-white' : 'bg-[#F0F4F8] border-[#7B6E58] text-[#0d6270] border'}`}
            >
              Upcoming Appointments
            </button>

            <button
              onClick={() => setView('completed')}
              className={`px-4 sm:px-6 py-2 rounded ${view === 'completed' ? 'bg-[#189AB4] text-white' : 'bg-[#F0F4F8] border-[#7B6E58] text-[#0d6270] border'}`}
            >
              Completed Appointments
            </button>

            <button
              onClick={() => setView('unapproved')}
              className={`px-4 sm:px-6 py-2 rounded ${view === 'unapproved' ? 'bg-[#189AB4] text-white' : 'bg-[#F0F4F8] border-[#7B6E58] text-[#0d6270] border'}`}
            >
              Unapproved Appointments
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {displayedAppointments.length > 0 ? (
              displayedAppointments.map((appointment) => (
                <div key={appointment._id} className="rounded-lg border bg-[#F0F4F8] text-[#05445E] shadow-sm">
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-[#0d6270]">{appointment.doctor}</h3>
                    <p className="mt-2 text-[#189AB4]">{appointment.specialization}</p>
                    <p className="mt-1 text-[#189AB4]">
                      {new Date(appointment.date).toLocaleDateString()} at {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <span className="mt-4 bg-[#75E6DA] px-2 py-1 rounded-md text-xs font-medium text-[#05445E]">
                      {appointment.status}
                    </span>
                    {appointment.status.includes('Upcoming') && (
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
