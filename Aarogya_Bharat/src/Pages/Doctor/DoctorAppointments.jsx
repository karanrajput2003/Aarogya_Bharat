import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Doctor/Navbar';
import { useSelector } from 'react-redux';

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
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
        setAppointments(data); // Assuming the response is an array of appointments
        setFilteredAppointments(data); // Set filtered appointments to the initial fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleFilter = () => {
    let filtered = appointments;

    if (statusFilter) {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }

    if (doctorId) {
      filtered = filtered.filter(appointment => appointment.doctorid === doctorId);
    }

    setFilteredAppointments(filtered);
  };

  const currentDate = new Date();

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
    // Handle scheduling appointment logic
    const updatedAppointments = appointments.map(appointment =>
      appointment._id === id ? { ...appointment, status: 'Scheduled' } : appointment
    );
    setAppointments(updatedAppointments);
    // Call backend to update the status
    fetch(`${import.meta.env.VITE_BACKEND}/appointments/${id}/schedule`, { method: 'PUT' })
      .then((response) => response.json())
      .then(() => {
        alert('Appointment scheduled!');
      })
      .catch((error) => {
        alert('Failed to schedule appointment');
      });
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
              {view === 'scheduled' ? 'Scheduled Telehealth Appointments' : view === 'completed' ? 'Completed Telehealth Appointments' : 'Unscheduled Appointments'}
            </h1>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8 flex-wrap justify-center">
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

          {/* Table for Appointments */}
          <div className="overflow-x-auto text-black shadow-lg rounded-lg">
            <table className="min-w-full table-auto text-sm">
              <thead>
                <tr className="bg-white/30">
                  <th className="px-6 py-4 text-left">Patient</th>
                  <th className="px-6 py-4 text-left">Contact Info</th>
                  <th className="px-6 py-4 text-left">Medical History</th>
                  <th className="px-6 py-4 text-left">Symptoms</th>
                  <th className="px-6 py-4 text-left">Insurance Info</th>
                  <th className="px-6 py-4 text-left">Preferred Date & Time</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedAppointments.length > 0 ? (
                  displayedAppointments.map((appointment) => (
                    <tr key={appointment._id} className="border-b bg-white hover:bg-white">
                      <td className="px-6 py-4">{appointment.patient.name}</td>
                      <td className="px-6 py-4">{appointment.patient.phone} <br /> {appointment.patient.email}</td>
                      <td className="px-6 py-4">{appointment.patient.medicalHistory}</td>
                      <td className="px-6 py-4">{appointment.patient.symptoms}</td>
                      <td className="px-6 py-4">{appointment.patient.insuranceDetails ? 'Available' : 'N/A'}</td>
                      <td className="px-6 py-4">
                        {new Date(appointment.consultationDetails.preferredDate).toLocaleDateString()} {' '}
                        {appointment.consultationDetails.preferredTime}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewDetails(appointment._id)}
                          className="text-[#189AB4] hover:underline"
                        >
                          View Details
                        </button>
                        {appointment.status === 'Unscheduled' && (
                          <button
                            onClick={() => handleScheduleAppointment(appointment._id)}
                            className="ml-4 text-[#189AB4] hover:underline"
                          >
                            Schedule Appointment
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">No appointments available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default DoctorAppointments;
