import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, X, FilePlus } from "lucide-react";
import Navbar from "../../Components/Doctor/Navbar";

const COMMON_MEDICATIONS = {
  "Pain & Fever": [
    { name: "Paracetamol 500mg", dosage: "1 tablet every 6 hours as needed" },
    { name: "Ibuprofen 400mg", dosage: "1 tablet every 8 hours after food" },
  ],
  "Cold & Flu": [
    { name: "Cetirizine 10mg", dosage: "1 tablet at night" },
    { name: "Dextromethorphan", dosage: "10ml every 6 hours" },
  ],
};

const COMMON_INSTRUCTIONS = [
  "Take medicines after food",
  "Drink plenty of water",
];

const COMMON_DIAGNOSES = [
  "Upper Respiratory Tract Infection",
  "Migraine",
];

const DoctorAppointmentDetails = () => {
  const { id } = useParams();
  const [consultationData, setConsultationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [selectedInstructions, setSelectedInstructions] = useState([]);
  const [customInstruction, setCustomInstruction] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [followUpDays, setFollowUpDays] = useState(7);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/appointments/${id}`);
        if (!response.ok) throw new Error("Failed to fetch appointment details");
        const data = await response.json();
        setConsultationData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointmentDetails();
  }, [id]);

  const handleAddMedication = (medication) => {
    setSelectedMedications((prev) => [...prev, medication]);
  };

  const handleRemoveMedication = (index) => {
    setSelectedMedications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleInstruction = (instruction) => {
    setSelectedInstructions((prev) =>
      prev.includes(instruction) ? prev.filter((i) => i !== instruction) : [...prev, instruction]
    );
  };

  const handlePrescriptionSubmit = async () => {
    try {
      const prescriptionData = {
        appointmentId: id,
        patientId: consultationData.patient.id,
        doctorId: consultationData.consultationDetails.doctorid,
        diagnosis,
        medications: selectedMedications.map((med) => `${med.name} - ${med.dosage}`).join("\n"),
        instructions: selectedInstructions.join("\n"),
        followUpDate: new Date(Date.now() + followUpDays * 24 * 60 * 60 * 1000).toISOString(),
        date: new Date().toISOString(),
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/prescriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prescriptionData),
      });

      if (!response.ok) throw new Error("Failed to save prescription");

      const data = await response.json();
      setConsultationData((prev) => ({ ...prev, prescriptionId: data.id }));
      alert("Prescription saved successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {consultationData?.status === "Completed" && !consultationData.prescriptionId && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Prescription</h2>
            <div>
              <label>Diagnosis</label>
              <div className="flex flex-wrap gap-2">
                {COMMON_DIAGNOSES.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDiagnosis(d)}
                    className={`px-3 py-1 rounded-full ${diagnosis === d ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label>Medications</label>
              {Object.entries(COMMON_MEDICATIONS).map(([category, meds]) => (
                <div key={category}>
                  <h4>{category}</h4>
                  {meds.map((med) => (
                    <button key={med.name} onClick={() => handleAddMedication(med)}>
                      {med.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <button onClick={handlePrescriptionSubmit} className="bg-green-500 text-white p-2 rounded">
              <FilePlus /> Generate Prescription
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorAppointmentDetails;