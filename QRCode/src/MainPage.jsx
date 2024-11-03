import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { MdCardMembership } from "react-icons/md";

function MainPage() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [openRecordId, setOpenRecordId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://aarogya-bharat-qr-backend.vercel.app/api/users/${userId}`);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    const fetchRecords = async () => {
      try {
        const response = await fetch(`https://aarogya-bharat-qr-backend.vercel.app/api/medicalRecords/${userId}`);
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchUserData();
    fetchRecords();
  }, [userId]);

  const toggleRecordPreview = (id) => {
    setOpenRecordId(openRecordId === id ? null : id);
  };

  // Filter records based on the search term
  const filteredRecords = records.filter((record) =>
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      <section className="w-full min-h-screen pt-6 md:pt-12 lg:pt-16 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
        <div className="container mx-auto space-y-10 xl:space-y-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white text-center">
            Patient Profile
          </h1>

          <div className="bg-white/10 backdrop-blur-md border-none text-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Personal Information:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData && (
                <>
                  <CardItem icon={<FaUser className="text-blue-600" />} label="Name:" value={userData.username} />
                  <CardItem icon={<span className="text-2xl text-indigo-600 mr-3">🗓️</span>} label="Age:" value={userData.age} />
                  <CardItem icon={<FaEnvelope className="text-red-600" />} label="Email:" value={userData.email} />
                  <CardItem icon={<FaMapMarkerAlt className="text-orange-600" />} label="Address:" value={userData.Address} />
                  <CardItem icon={<MdCardMembership className="text-purple-600" />} label="Aadhar No:" value={userData.aadhar_no || "N/A"} />
                </>
              )}
            </div>
          </div>

          {/* Uploaded Documents Section */}
          <div className="bg-white/10 backdrop-blur-md border-none text-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Uploaded Documents:</h2>
            
            {/* Search Bar for Documents */}
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full bg-white/20 border border-white/30 text-white placeholder:text-white/50 rounded p-2 mt-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {filteredRecords.map((record) => (
                <div key={record._id} className="bg-white/10 border border-white/30 rounded p-4 flex flex-col">
                  <h4
                    className="text-xl font-semibold cursor-pointer"
                    onClick={() => toggleRecordPreview(record._id)}
                  >
                    {record.title}
                  </h4>
                  <p className="text-white/80">{record.description}</p>
                  <Link
                    to={record.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:underline mt-2 inline-block"
                  >
                    Download Document
                  </Link>

                  {/* Drop-down preview section */}
                  {openRecordId === record._id && (
                    <div className="mt-4">
                      {record.fileUrl.endsWith('.pdf') ? (
                        <iframe
                          src={record.fileUrl}
                          title={record.title}
                          className="w-full h-60 border border-white rounded"
                          frameBorder="0"
                        ></iframe>
                      ) : (
                        <img
                          src={record.fileUrl}
                          alt={record.title}
                          className="w-full h-60 object-cover border border-white rounded"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
              {filteredRecords.length === 0 && (
                <p className="text-white/50 text-center">No records found.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const CardItem = ({ icon, label, value }) => (
  <div className="flex items-center bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-sm">
    {icon}
    <div>
      <p className="text-gray-300 font-medium">{label}</p>
      <p className="text-gray-200">{value}</p>
    </div>
  </div>
);

export default MainPage;
