import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Navbar from "../../Components/Patient/Navbar";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import QRCode from "react-qr-code";

function PatientProfile() {
  const { patientId } = useParams(); // Get patientId from URL params
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const value = `https://aarogya-bharat-qr.vercel.app/${patientId}`;
  
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `https://aarogya-bharat-backend.vercel.app/patient/${patientId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }
        const data = await response.json();
        setPatientData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen pt-6 md:pt-12 lg:pt-16 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container mx-auto space-y-10 xl:space-y-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white text-center">
            Patient Profile
          </h1>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-10">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-black">
              Personal Information:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patientData && (
                <>
                  <CardItem icon={<FaUser />} label="Name:" value={patientData.username} />
                  <CardItem icon={<span className="text-2xl text-indigo-600 mr-3">🗓️</span>} label="Age:" value={patientData.age} />
                  <CardItem icon={<FaPhone />} label="Phone:" value={patientData.phone} />
                  <CardItem icon={<FaEnvelope />} label="Email:" value={patientData.email} />
                  <CardItem icon={<FaMapMarkerAlt />} label="Address:" value={patientData.Address} />
                  <CardItem icon={<span className="text-2xl text-indigo-600 mr-3">{patientData.gender}</span>} label="Gender:" value={patientData.gender} />

                  <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm col-span-2">
                    <h3 className="text-gray-700 font-medium mb-2">QR Code:</h3>
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
                      <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={value}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const CardItem = ({ icon, label, value }) => (
  <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
    {icon}
    <div>
      <p className="text-gray-700 font-medium">{label}</p>
      <p className="text-gray-900">{value}</p>
    </div>
  </div>
);

export default PatientProfile;
