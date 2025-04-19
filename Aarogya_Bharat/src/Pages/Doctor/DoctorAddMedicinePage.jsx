"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  BellRing,
  ChevronRight,
  ChevronLeft,
  Pill,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import Navbar from "../../Components/Doctor/Navbar";

const DoctorAddMedicinePage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMedicine, setEditingMedicine] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "Tablet",
    dosageUnit: "",
    description: "",
    defaultInstructions: "",
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}` + "/medicine");
      setMedicines(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch medicines. Please try again.");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editingMedicine) {
        // Update existing medicine
        await axios.put(`${import.meta.env.VITE_BACKEND}`+`/medicine/${editingMedicine._id}`, formData);

        // Update local state
        setMedicines((prev) =>
          prev.map((med) => (med._id === editingMedicine._id ? { ...formData, _id: editingMedicine._id } : med)),
        );

        setEditingMedicine(null);
      } else {
        // Add new medicine
        const response = await axios.post(`${import.meta.env.VITE_BACKEND}` +"/medicine", formData);
        const newMedicine = response.data;

        setMedicines((prev) => [...prev, newMedicine]);
      }

      // Reset form
      setFormData({
        name: "",
        type: "Tablet",
        dosageUnit: "",
        description: "",
        defaultInstructions: "",
      });

      setLoading(false);
    } catch (err) {
      setError("Failed to save medicine. Please try again.");
      setLoading(false);
    }
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      name: medicine.name,
      type: medicine.type,
      dosageUnit: medicine.dosageUnit,
      description: medicine.description,
      defaultInstructions: medicine.defaultInstructions,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this medicine?")) return;

    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_BACKEND}` +`/medicine/${id}`);

      // Update local state
      setMedicines((prev) => prev.filter((med) => med._id !== id));
      setLoading(false);
    } catch (err) {
      setError("Failed to delete medicine. Please try again.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingMedicine(null);
    setFormData({
      name: "",
      type: "Tablet",
      dosageUnit: "",
      description: "",
      defaultInstructions: "",
    });
  };

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
              className="pl-10 pr-4 py-2 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black w-72 shadow-sm text-black"
            />
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full bg-white shadow-sm mr-4 relative">
              <BellRing className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-500 text-black rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-500 text-black flex items-center justify-center text-white font-medium mr-2">
                DL
              </div>
              <div className="relative">
                <button className="flex items-center">
                  <span className="font-medium text-slate-800">Dr Rajesh</span>
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
            Manage Medicines
          </h1>
          <p className="text-slate-500">Add or edit commonly prescribed medicines</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6" role="alert">
            <div className="flex">
              <div className="py-1">
                <svg className="h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p>{error}</p>
              </div>
              <button 
                className="ml-auto pl-3" 
                onClick={() => setError(null)}
              >
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Left side - 4/7 */}
          <div className="lg:col-span-4 space-y-8">
            {/* Medicine Form Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">{editingMedicine ? "Edit Medicine" : "Add New Medicine"}</h2>
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Pill className="h-6 w-6 text-indigo-600" />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      Medicine Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                      placeholder="e.g., Paracetamol"
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">
                      Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    >
                      <option value="Tablet">Tablet</option>
                      <option value="Syrup">Syrup</option>
                      <option value="Injection">Injection</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Ointment">Ointment</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="dosageUnit" className="block text-sm font-medium text-slate-700 mb-1">
                      Dosage Unit
                    </label>
                    <input
                      type="text"
                      id="dosageUnit"
                      name="dosageUnit"
                      value={formData.dosageUnit}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                      placeholder="e.g., 250mg, 5ml"
                    />
                  </div>

                  <div>
                    <label htmlFor="defaultInstructions" className="block text-sm font-medium text-slate-700 mb-1">
                      Default Dosage Instructions
                    </label>
                    <input
                      type="text"
                      id="defaultInstructions"
                      name="defaultInstructions"
                      value={formData.defaultInstructions}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                      placeholder="e.g., 1 tablet after meals"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                      placeholder="Brief description of the medicine"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end space-x-3">
                  {editingMedicine && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {loading ? "Saving..." : editingMedicine ? "Update Medicine" : "Save Medicine"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right side - 3/7 */}
          <div className="lg:col-span-3 space-y-6">
            {/* Medicine List Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Medicine List</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Search medicines..." 
                    className="pl-9 pr-4 py-1.5 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black w-48"
                  />
                </div>
              </div>

              {loading && !medicines.length ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                </div>
              ) : medicines.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
                  <Pill className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 mb-2">No medicines added yet</p>
                  <p className="text-slate-400 text-sm mb-4">Add your first medicine using the form</p>
                  <button 
                    type="button"
                    onClick={() => {}} 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Medicine
                  </button>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  {medicines.map((medicine, index) => (
                    <div 
                      key={medicine._id} 
                      className={`p-4 ${index !== medicines.length - 1 ? 'border-b border-slate-200' : ''} hover:bg-slate-50`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-slate-800">{medicine.name}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full px-2 py-0.5">
                              {medicine.type}
                            </span>
                            <span className="mx-2 text-slate-300">•</span>
                            <span className="text-sm text-slate-500">{medicine.dosageUnit}</span>
                          </div>
                          {medicine.defaultInstructions && (
                            <p className="text-sm text-slate-600 mt-1">
                              <span className="text-slate-400">Instructions:</span> {medicine.defaultInstructions}
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEdit(medicine)} 
                            className="p-1.5 rounded-full hover:bg-indigo-100 text-slate-500 hover:text-indigo-600"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(medicine._id)} 
                            className="p-1.5 rounded-full hover:bg-red-100 text-slate-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination (if needed) */}
              {medicines.length > 0 && (
                <div className="flex justify-between items-center mt-4 text-sm text-slate-500">
                  <span>Showing {medicines.length} medicines</span>
                  <div className="flex space-x-1">
                    <button className="p-1 rounded-md hover:bg-slate-100 disabled:opacity-50" disabled>
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-slate-100 disabled:opacity-50" disabled>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Tips Card */}
            <div className="bg-indigo-50 rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-indigo-800 mb-3">Tips for Managing Medicines</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-indigo-200 text-indigo-600 flex items-center justify-center mr-2 mt-0.5 text-xs">1</span>
                  <span className="text-sm text-indigo-700">Use full medicine names to avoid confusion</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-indigo-200 text-indigo-600 flex items-center justify-center mr-2 mt-0.5 text-xs">2</span>
                  <span className="text-sm text-indigo-700">Include detailed dosage instructions for clarity</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-indigo-200 text-indigo-600 flex items-center justify-center mr-2 mt-0.5 text-xs">3</span>
                  <span className="text-sm text-indigo-700">Add important side effects in the description</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorAddMedicinePage;