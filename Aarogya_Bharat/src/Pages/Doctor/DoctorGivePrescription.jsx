"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Search, Calendar, ChevronRight, Clock, Plus, Trash2 } from 'lucide-react'
import Navbar from '../../Components/Doctor/Navbar';

export default function DoctorPrescriptionForm() {
  const params = useParams();
  const patientId = params.patientId
  const appointmentId = params.appointmentId;
  console.log(patientId);
  console.log(appointmentId)
  
  // States for patient selection
  const [patients, setPatients] = useState(patientId)
  const [selectedPatient, setSelectedPatient] = useState(patientId)
  const [patientSearchQuery, setPatientSearchQuery] = useState("")
  const [showPatientDropdown, setShowPatientDropdown] = useState(false)

  // States for medicine search and suggestion
  const [medicineSearchQuery, setMedicineSearchQuery] = useState("")
  const [suggestedMedicines, setSuggestedMedicines] = useState([])
  const [showMedicineDropdown, setShowMedicineDropdown] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState(null)

  // States for medicine form
  const [medicineForm, setMedicineForm] = useState({
    dosage: "",
    morning: false,
    afternoon: false,
    night: false,
    duration: "",
    notes: "",
  })

  // States for prescription
  const [prescriptionMedicines, setPrescriptionMedicines] = useState([])

  // States for UI
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (medicineSearchQuery.length > 2) {
      searchMedicines(medicineSearchQuery)
    } else {
      setSuggestedMedicines([])
      setShowMedicineDropdown(false)
    }
  }, [medicineSearchQuery])

  const searchMedicines = async (query) => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}` +`/medicines/suggest?query=${query}`)
      setSuggestedMedicines(response.data)
      setShowMedicineDropdown(true)
    } catch (err) {
      setError("Failed to search medicines. Please try again.")
    }
  }

  const handlePatientSearch = (e) => {
    const query = e.target.value
    setPatientSearchQuery(query)
    setShowPatientDropdown(query.length > 0)
  }

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient)
    setPatientSearchQuery(`${patient.name} (Appointment: ${patient.appointmentId})`)
    setShowPatientDropdown(false)
  }

  const handleMedicineSearch = (e) => {
    setMedicineSearchQuery(e.target.value)
  }

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicine(medicine)
    setMedicineSearchQuery(medicine.name)
    setShowMedicineDropdown(false)

    // Pre-fill dosage with default instructions
    setMedicineForm((prev) => ({
      ...prev,
      dosage: medicine.defaultInstructions,
    }))
  }

  const handleMedicineFormChange = (e) => {
    const { name, value, type } = e.target
    const checked = (e.target).checked

    setMedicineForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleAddMedicine = () => {
    if (!selectedMedicine) {
      setError("Please select a medicine first")
      return
    }

    if (!medicineForm.dosage) {
      setError("Please specify dosage")
      return
    }

    if (!medicineForm.duration) {
      setError("Please specify duration")
      return
    }

    if (!medicineForm.morning && !medicineForm.afternoon && !medicineForm.night) {
      setError("Please select at least one time of day")
      return
    }

    const newMedicine = {
      id: Date.now().toString(),
      name: selectedMedicine.name,
      dosage: medicineForm.dosage,
      morning: medicineForm.morning,
      afternoon: medicineForm.afternoon,
      night: medicineForm.night,
      duration: medicineForm.duration,
      notes: medicineForm.notes,
    }

    setPrescriptionMedicines((prev) => [...prev, newMedicine])

    // Reset form
    setSelectedMedicine(null)
    setMedicineSearchQuery("")
    setMedicineForm({
      dosage: "",
      morning: false,
      afternoon: false,
      night: false,
      duration: "",
      notes: "",
    })

    setError(null)
  }

  const handleRemoveMedicine = (id) => {
    setPrescriptionMedicines((prev) => prev.filter((med) => med.id !== id))
  }

  const handleGeneratePrescription = async () => {
    console.log("djsdjjd")

    if (!selectedPatient) {
      setError("Please select a patient first")
      return
    }
    console.log("djsdjjd")

    if (prescriptionMedicines.length === 0) {
      setError("Please add at least one medicine to the prescription")
      return
    }

    setLoading(true)

    try {
      // Replace with your actual API endpoint
      console.log("djsdjjd")
      await axios.post(`${import.meta.env.VITE_BACKEND}` +"/prescriptions", {
        patientId: patientId,
        appointmentId: appointmentId,
        medicines: prescriptionMedicines.map((med) => ({
          name: med.name,
          dosage: med.dosage,
          instructions: `${med.morning ? "Morning " : ""}${med.afternoon ? "Afternoon " : ""}${med.night ? "Night " : ""}`,
          duration: med.duration,
          notes: med.notes,
        })),
      })

      setSuccess("Prescription generated and sent to patient successfully!")

      // Reset form
      setPrescriptionMedicines([])

      setLoading(false)

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(null)
      }, 5000)
    } catch (err) {
      setError("Failed to generate prescription. Please try again.")
      setLoading(false)
    }
  }

  const getTimingText = (med) => {
    const times = []
    if (med.morning) times.push("Morning")
    if (med.afternoon) times.push("Afternoon")
    if (med.night) times.push("Night")
    return times.join(", ")
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Navbar />

      {/* Main Content */}
      <main className="ml-20 flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Aarogya Bharat"
              readOnly
              className="pl-10 pr-4 py-2 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-72 shadow-sm"
            />
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full bg-white shadow-sm mr-4 relative">
              <Calendar className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium mr-2">
                DL
              </div>
              <div className="relative">
                <button className="flex items-center">
                  <span className="font-medium text-slate-800">Dr Luke</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 ml-1 text-slate-500"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1 text-slate-800">
            Write a Prescription
          </h1>
          <p className="text-slate-500">Create medication prescriptions for your patients</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-sm" role="alert">
            <div className="flex">
              <div className="py-1">
                <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
                </svg>
              </div>
              <div>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg shadow-sm" role="alert">
            <div className="flex">
              <div className="py-1">
                <svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
              </div>
              <div>
                <p>{success}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Left side - 4/7 */}
          <div className="lg:col-span-4 space-y-6">
            {/* Add Medicine */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Add Medicine</h2>
              
              <div className="relative mb-6">
                <label htmlFor="medicineSearch" className="block text-sm font-medium text-slate-600 mb-1">
                  Search Medicine
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    id="medicineSearch"
                    value={medicineSearchQuery}
                    onChange={handleMedicineSearch}
                    className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    placeholder="Type medicine name"
                  />
                </div>

                {showMedicineDropdown && suggestedMedicines.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-slate-200 max-h-60 overflow-auto">
                    {suggestedMedicines.map((medicine) => (
                      <div
                        key={medicine._id}
                        className="px-4 py-3 hover:bg-indigo-50 cursor-pointer border-b border-slate-100 last:border-b-0"
                        onClick={() => handleMedicineSelect(medicine)}
                      >
                        <div className="font-medium text-slate-800">
                          {medicine.name} ({medicine.type})
                        </div>
                        <div className="text-xs text-slate-500">
                          {medicine.dosageUnit} - {medicine.defaultInstructions}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedMedicine && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dosage" className="block text-sm font-medium text-slate-600 mb-1">
                      Dosage
                    </label>
                    <input
                      type="text"
                      id="dosage"
                      name="dosage"
                      value={medicineForm.dosage}
                      onChange={handleMedicineFormChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                      placeholder="e.g., 1 tablet"
                    />
                  </div>

                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-slate-600 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={medicineForm.duration}
                      onChange={handleMedicineFormChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                      placeholder="e.g., 5 days"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-600 mb-2">Timing</label>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center bg-slate-50 px-4 py-2 rounded-lg">
                        <input
                          type="checkbox"
                          id="morning"
                          name="morning"
                          checked={medicineForm.morning}
                          onChange={handleMedicineFormChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 text-black border-slate-300 rounded"
                        />
                        <label htmlFor="morning" className="ml-2 text-sm text-slate-700">
                          Morning
                        </label>
                      </div>

                      <div className="flex items-center bg-slate-50 px-4 py-2 rounded-lg">
                        <input
                          type="checkbox"
                          id="afternoon"
                          name="afternoon"
                          checked={medicineForm.afternoon}
                          onChange={handleMedicineFormChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 text-black border-slate-300 rounded"
                        />
                        <label htmlFor="afternoon" className="ml-2 text-sm text-slate-700">
                          Afternoon
                        </label>
                      </div>

                      <div className="flex items-center bg-slate-50 px-4 py-2 rounded-lg">
                        <input
                          type="checkbox"
                          id="night"
                          name="night"
                          checked={medicineForm.night}
                          onChange={handleMedicineFormChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 text-black border-slate-300 rounded"
                        />
                        <label htmlFor="night" className="ml-2 text-sm text-slate-700">
                          Night
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-slate-600 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={medicineForm.notes}
                      onChange={handleMedicineFormChange}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                      placeholder="e.g., Take after meals, Avoid alcohol"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={handleAddMedicine}
                      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Prescription
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Prescription Preview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Prescription Preview</h2>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  {prescriptionMedicines.length} medicines
                </span>
              </div>

              {prescriptionMedicines.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-lg">
                  <Clock className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No medicines added to prescription yet.</p>
                  <p className="text-xs text-slate-400 mt-1">Search and add medicines above</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Medicine
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Dosage
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Timing
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {prescriptionMedicines.map((medicine) => (
                        <tr key={medicine.id} className="hover:bg-slate-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="font-medium text-slate-700">{medicine.name}</div>
                            <div className="text-xs text-slate-500">{medicine.notes || "No additional notes"}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{medicine.dosage}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{getTimingText(medicine)}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{medicine.duration}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => handleRemoveMedicine(medicine.id)}
                              className="flex items-center text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right side - 3/7 */}
          <div className="lg:col-span-3 space-y-6">
            {/* Submit Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-4">
                <button
                  type="button"
                  className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors font-medium"
                  onClick={handleGeneratePrescription}
                  disabled={loading || prescriptionMedicines.length === 0}
                >
                  {loading ? "Generating..." : "Generate Prescription"}
                </button>
                
                <button
                  type="button"
                  className="w-full px-4 py-3 border border-slate-200 bg-white text-slate-700 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors font-medium"
                >
                  Download as PDF
                </button>
                
                <button
                  type="button"
                  className="w-full px-4 py-3 border border-slate-200 bg-white text-slate-700 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors font-medium"
                >
                  Share with Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
