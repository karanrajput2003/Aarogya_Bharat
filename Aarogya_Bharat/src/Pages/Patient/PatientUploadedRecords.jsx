import { useEffect, useState } from 'react';
import Navbar from '../../Components/Patient/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

export default function PatientUploadedRecords() {
  const userId = useSelector((state) => state.auth.userId);
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openRecordId, setOpenRecordId] = useState(null); // Track which record is open

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/medicalRecords/${userId}`);
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error('Error fetching records:', error);
        toast.error('Failed to load medical records.');
      }
    };

    fetchRecords();
  }, [userId]);

  const filteredRecords = records.filter(
    (record) =>
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRecordPreview = (id) => {
    setOpenRecordId(openRecordId === id ? null : id); // Toggle open/close
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] flex items-center justify-center p-4">
        <div className="w-full bg-white/10 backdrop-blur-md border-none text-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white text-center">
      Your Medical Records
          </h1>
          <Link
            to="/patient/addrecords"
            className="mt-6 w-full bg-teal-500 hover:bg-teal-600 text-white rounded p-2"
          >
            Add Documents
          </Link>
          <input
            type="text"
            placeholder="Search records..."
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
    </>
  );
}
