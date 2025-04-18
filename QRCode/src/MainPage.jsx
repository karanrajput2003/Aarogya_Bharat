import { Dialog } from "@headlessui/react";
import { useEffect, useState } from 'react'
import { Search, MapPin, Mail, Calendar, User, FileText } from 'lucide-react'
import { useParams, Link } from "react-router-dom";

export default function Component() {
  const { userId } = useParams();
  const { uniqueId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDocumentId, setOpenDocumentId] = useState(null);

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
  
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`https://aarogya-bharat-qr-backend.vercel.app/api/medicalRecords/${userId}/${uniqueId}`);
        if (response.status === 403) {
          setError('Access to medical records has expired');
          return;
        }
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
  
    fetchUserData();
    fetchDocuments();
  }, [userId, uniqueId]);
  

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 to-teal-700 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Patient Profile</h1>
        
        <div className="bg-teal-800/30 border-none text-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold border-b pb-2">Personal Information:</h2>
          <div className="space-y-4 mt-4">
            <InfoItem icon={<User className="text-blue-300" />} label="Name" value={userData?.username} />
            <InfoItem icon={<Calendar className="text-red-300" />} label="Age" value={userData?.age} />
            <InfoItem icon={<Mail className="text-red-300" />} label="Email" value={userData?.email} />
            <InfoItem icon={<MapPin className="text-orange-300" />} label="Address" value={userData?.Address} />
            <InfoItem icon={<FileText className="text-purple-300" />} label="Aadhar No" value={userData?.aadhar_no || "N/A"} />
          </div>
        </div>

        <div className="bg-teal-800/30 border-none text-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold border-b pb-2">Uploaded Documents:</h2>

          <div className="relative mt-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-9 bg-teal-800/30 border-none text-white placeholder-gray-400 rounded-lg p-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-4 mt-4">
            {filteredDocuments.map((doc) => (
              <div key={doc._id} className="bg-teal-800/30 border border-teal-700 rounded-lg p-4 cursor-pointer hover:bg-teal-800/50 transition-colors">
                <div onClick={() => setOpenDocumentId(doc._id)}>
                  <h3 className="font-semibold text-lg">{doc.title}</h3>
                  <p className="text-sm text-gray-300">Doctor Name: {doc.doctorName}</p>
                  <Link to={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:underline mt-2 inline-block">
                    Download Document
                  </Link>
                </div>

                <Dialog open={openDocumentId === doc._id} onClose={() => setOpenDocumentId(null)} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl">
                    <h2 className="text-xl font-semibold mb-4">{doc.title}</h2>
                    <img
                      src={doc.fileUrl}
                      alt={doc.title}
                      className="w-full h-auto rounded-lg"
                    />
                    <button onClick={() => setOpenDocumentId(null)} className="mt-4 text-red-500">
                      Close
                    </button>
                  </div>
                </Dialog>
              </div>
            ))}
            {filteredDocuments.length === 0 && (
              <p className="text-white/50 text-center">No records found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-2 bg-teal-800/30 p-4 rounded-lg">
      {icon}
      <div>
        <div className="text-sm text-gray-300">{label}:</div>
        <div>{value || "N/A"}</div>
      </div>
    </div>
  )
}
