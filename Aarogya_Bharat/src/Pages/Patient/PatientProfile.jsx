import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCode } from "react-qr-code";
import { Shield, Calendar, Mail, MapPin, Fingerprint } from "lucide-react";
import Navbar from "../../Components/Patient/Navbar";

function generateUniqueId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
export default function Component() {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND}/patient/${patientId}`
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
    return <div className="text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] p-6 flex items-center justify-center">
        <div
          id="profile-container"
          className="w-full max-w-3xl bg-white/90 shadow-lg overflow-hidden relative"
        >
          {/* Security Watermark */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute text-blue-200 transform -rotate-45 text-9xl font-bold opacity-10"
                style={{
                  top: `${i * 20}%`,
                  left: `${i * 20}%`,
                }}
              >
                SECURE
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] p-6 relative">
            <div className="absolute top-4 right-4 text-gray-200 text-sm">
              ID: {patientData?._id || "XXXX"}
            </div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Shield className="h-8 w-8" />
              Patient Profile
            </h1>
            <div className="text-gray-200 mt-1">Aarogya Bharat</div>
          </div>

          {/* Main Content */}
          <div className="p-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Section */}
              <div className="space-y-6 bg-white/10 backdrop-blur-md">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
                  Personal Information
                </h2>

                <div className="space-y-4">
                  <InfoItem
                    icon={<Fingerprint className="h-5 w-5 text-blue-500" />}
                    label="Full Name"
                    value={patientData?.username || "N/A"}
                  />
                  <InfoItem
                    icon={<Calendar className="h-5 w-5 text-blue-500" />}
                    label="Age"
                    value={
                      patientData?.age ? `${patientData.age} Years` : "N/A"
                    }
                  />
                  <InfoItem
                    icon={<Mail className="h-5 w-5 text-blue-500" />}
                    label="Email Address"
                    value={patientData?.email || "N/A"}
                  />
                  <InfoItem
                    icon={<MapPin className="h-5 w-5 text-blue-500" />}
                    label="Residential Address"
                    value={patientData?.Address || "N/A"}
                  />
                </div>

                <div className="mt-6">
                  <div className="text-sm text-gray-700">Aadhar Number</div>
                  <div className="text-gray-900 font-mono text-lg mt-1">
                    {patientData?.aadhar_no || "N/A"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg border border-gray-300">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-700">
                    Scan for Documents
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Official Medical Card
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md relative">
                  <QRCode
                    value={`https://aarogya-bharat-qr.vercel.app/${patientId}/${generateUniqueId()}`}
                    size={180}
                    className="relative z-10"
                  />
                </div>

                <div className="mt-4 text-center">
                  <div className="text-xs text-gray-500">Security Code</div>
                  <div className="font-mono text-gray-900 mt-1">
                    {patientData?._id || "XXXX"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-300 p-4 text-center text-sm text-gray-700">
            <p className="text-xs mt-1 text-gray-500">
              Issued by Aarogya Bharat © 2024
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="bg-blue-100 p-2 rounded">{icon}</div>
    <div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-gray-900 font-semibold">{value}</div>
    </div>
  </div>
);
