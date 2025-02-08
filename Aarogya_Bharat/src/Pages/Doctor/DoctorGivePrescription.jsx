import { useState } from "react";

const DoctorPrescriptionForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    diagnosis: "",
    medications: [{ name: "", dosage: "", frequency: "" }],
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMedicationChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedMedications = [...prev.medications];
      updatedMedications[index][name] = value;
      return { ...prev, medications: updatedMedications };
    });
  };

  const addMedication = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [...prev.medications, { name: "", dosage: "", frequency: "" }],
    }));
  };

  const removeMedication = (index) => {
    setFormData((prev) => {
      const updatedMedications = prev.medications.filter((_, i) => i !== index);
      return { ...prev, medications: updatedMedications };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Prescription Data:", formData);
    alert("Prescription submitted successfully!");
    setFormData({
      patientName: "",
      age: "",
      diagnosis: "",
      medications: [{ name: "", dosage: "", frequency: "" }],
      instructions: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Doctor Prescription</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Diagnosis</label>
            <textarea
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Medications</label>
            {formData.medications.map((med, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Medicine Name"
                  value={med.name}
                  onChange={(e) => handleMedicationChange(index, e)}
                  required
                  className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="dosage"
                  placeholder="Dosage"
                  value={med.dosage}
                  onChange={(e) => handleMedicationChange(index, e)}
                  required
                  className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="frequency"
                  placeholder="Frequency"
                  value={med.frequency}
                  onChange={(e) => handleMedicationChange(index, e)}
                  required
                  className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => removeMedication(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addMedication}
              className="mt-2 text-blue-600 hover:underline"
            >
              + Add Medication
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Additional Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Submit Prescription
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorPrescriptionForm;
