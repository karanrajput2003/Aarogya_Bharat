import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Doctor/Navbar';

function DoctorAppointments() {
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
      patient: 'John Doe',
      contactInfo: 'john.doe@example.com, 123-456-7890',
      medicalHistory: 'Hypertension, ongoing blood pressure medication',
      symptoms: 'High blood pressure, fatigue',
      insuranceInfo: 'Insurance Company: HealthFirst, Policy #12345',
      preferredDateTime: '2024-10-20T10:30:00',
      preferredMedium: 'Video',
      timeZone: 'GMT+5:30',
      status: 'Upcoming Teleconsultation',
      consultationType: 'Video',
      preConsultationInfo: 'Patient has a history of hypertension. Looking for advice on managing blood pressure.',
    },
    {
      _id: '2',
      patient: 'Jane Doe',
      contactInfo: 'jane.doe@example.com, 987-654-3210',
      medicalHistory: 'No known medical conditions',
      symptoms: 'Rash on arms and face',
      insuranceInfo: '',
      preferredDateTime: '2024-10-15T14:00:00',
      preferredMedium: 'Chat',
      timeZone: 'GMT-4:00',
      status: 'Completed (Telehealth)',
      consultationType: 'Chat',
      preConsultationInfo: 'Patient reports a rash on the arms and face.',
    },
    {
      _id: '3',
      patient: 'Emily White',
      contactInfo: 'emily.white@example.com, 555-123-4567',
      medicalHistory: 'Asthma',
      symptoms: 'Cough, mild fever',
      insuranceInfo: 'Insurance Company: MediCare, Policy #67890',
      preferredDateTime: '2024-10-18T09:00:00',
      preferredMedium: 'Video',
      timeZone: 'GMT+5:30',
      status: 'Upcoming Teleconsultation',
      consultationType: 'Video',
      preConsultationInfo: 'Patient is a 5-year-old child with a cough and mild fever.',
    },
    {
      _id: '4',
      patient: 'Alan Brown',
      contactInfo: 'alan.brown@example.com, 444-567-8901',
      medicalHistory: '',
      symptoms: '',
      insuranceInfo: '',
      preferredDateTime: '2024-10-22T11:00:00',
      preferredMedium: 'Video',
      timeZone: 'GMT+0:00',
      status: 'Unapproved',
      consultationType: 'Video',
      preConsultationInfo: 'No pre-consultation information available.',
    },
    {
      _id: '5',
      patient: 'Mary Johnson',
      contactInfo: 'mary.johnson@example.com, 333-456-7890',
      medicalHistory: 'Knee injury',
      symptoms: 'Pain and swelling in the knee',
      insuranceInfo: '',
      preferredDateTime: '2024-10-12T16:00:00',
      preferredMedium: 'Chat',
      timeZone: 'GMT-7:00',
      status: 'Completed (Telehealth)',
      consultationType: 'Chat',
      preConsultationInfo: 'Patient is seeking advice on knee pain after an injury.',
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
      ? new Date(appointment.preferredDateTime) >= currentDate
      : view === 'completed'
      ? new Date(appointment.preferredDateTime) < currentDate && appointment.status.includes('Completed')
      : appointment.status === 'Unapproved'
  );

  const handleViewDetails = (id) => {
    navigate(`/doctor/appointmentdetails/${id}`);
  };

  const handleConfirmAppointment = (id) => {
    // Handle appointment confirmation logic
    const updatedAppointments = appointments.map(appointment =>
      appointment._id === id ? { ...appointment, status: 'Confirmed' } : appointment
    );
    setAppointments(updatedAppointments);
    alert('Appointment confirmed!');
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
          <div className="flex gap-2 mb-8 flex-wrap justify-center">
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
                  <th className="px-6 py-4 text-left">Preferred Medium</th>
                  <th className="px-6 py-4 text-left">Time Zone</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedAppointments.length > 0 ? (
                  displayedAppointments.map((appointment) => (
                    <tr key={appointment._id} className="border-b bg-white hover:bg-white">
                      <td className="px-6 py-4">{appointment.patient}</td>
                      <td className="px-6 py-4">{appointment.contactInfo}</td>
                      <td className="px-6 py-4">{appointment.medicalHistory}</td>
                      <td className="px-6 py-4">{appointment.symptoms}</td>
                      <td className="px-6 py-4">{appointment.insuranceInfo || 'N/A'}</td>
                      <td className="px-6 py-4">{new Date(appointment.preferredDateTime).toLocaleString()}</td>
                      <td className="px-6 py-4">{appointment.preferredMedium}</td>
                      <td className="px-6 py-4">{appointment.timeZone}</td>
                      <td className="px-6 py-4">
                        {appointment.status === 'Unapproved' ? (
                          <button
                            onClick={() => handleConfirmAppointment(appointment._id)}
                            className="px-4 py-2 bg-[#189AB4] text-white rounded hover:bg-[#0a4c59]"
                          >
                            Confirm Appointment
                          </button>
                        ) : (
                          <span className="text-[#189AB4]">{appointment.status}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewDetails(appointment._id)}
                          className="text-[#189AB4] hover:text-[#0a4c59]"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
                      No appointments available.
                    </td>
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
