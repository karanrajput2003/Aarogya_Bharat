"use client"

import { useState } from "react"
import axios from "axios"
import moment from "moment"
import { useSelector } from "react-redux"
import { Calendar, Clock, Plus, X, Bell, Search } from "lucide-react"
import Navbar from "../../Components/Doctor/Navbar"

function DoctorAddSlots() {
  const doctorId = useSelector((state) => state.auth.userId)
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [breaks, setBreaks] = useState([])
  const [breakStart, setBreakStart] = useState("")
  const [breakEnd, setBreakEnd] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addBreak = () => {
    if (breakStart && breakEnd) {
      setBreaks([...breaks, { start: breakStart, end: breakEnd }])
      setBreakStart("")
      setBreakEnd("")
    }
  }

  const removeBreak = (index) => {
    setBreaks(breaks.filter((_, i) => i !== index))
  }

  const submitSlots = async () => {
    setIsSubmitting(true)
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND}/api/doctor/addSlots`, {
        doctorId,
        date,
        startTime,
        endTime,
        breaks,
      })
      alert("Slots added successfully!")
      setDate("")
      setStartTime("")
      setEndTime("")
      setBreaks([])
    } catch (error) {
      console.error("Error adding slots:", error)
      alert("Failed to add slots. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const today = moment().format("YYYY-MM-DD")
  const maxDate = moment().add(7, "days").format("YYYY-MM-DD")
  
  // Get today's date for the header
  const todayFormatted = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="ml-20 flex-1 p-8">
        {/* Header with search and profile */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative">
            {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" /> */}
            <input
              type="text"
              placeholder="Aarogya Bharat"
              readOnly
              className="pl-10 pr-4 py-2 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-72 shadow-sm"
            />
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full bg-white shadow-sm mr-4 relative">
              <Bell className="h-5 w-5 text-slate-600" />
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
            Add Available Slots
          </h1>
          <p className="text-slate-500">{todayFormatted}</p>
        </div>

        {/* Main Form Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                label="Select Date"
                icon={<Calendar className="h-4 w-4 text-indigo-500" />}
                input={
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={today}
                    max={maxDate}
                    className="mt-2 p-3 block w-full rounded-md bg-white border border-slate-200 text-slate-700 placeholder-slate-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                }
              />
              <FormField
                label="Start Time"
                icon={<Clock className="h-4 w-4 text-indigo-500" />}
                input={
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="mt-2 p-3 block w-full rounded-md bg-white border border-slate-200 text-slate-700 placeholder-slate-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                }
              />
              <FormField
                label="End Time"
                icon={<Clock className="h-4 w-4 text-indigo-500" />}
                input={
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="mt-2 p-3 block w-full rounded-md bg-white border border-slate-200 text-slate-700 placeholder-slate-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                }
              />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h2 className="text-lg font-medium text-slate-800 mb-4">Breaks</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  label="Break Start"
                  icon={<Clock className="h-4 w-4 text-indigo-500" />}
                  input={
                    <input
                      type="time"
                      value={breakStart}
                      onChange={(e) => setBreakStart(e.target.value)}
                      className="mt-2 p-3 block w-full rounded-md bg-white border border-slate-200 text-slate-700 placeholder-slate-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                  }
                />
                <FormField
                  label="Break End"
                  icon={<Clock className="h-4 w-4 text-indigo-500" />}
                  input={
                    <input
                      type="time"
                      value={breakEnd}
                      onChange={(e) => setBreakEnd(e.target.value)}
                      className="mt-2 p-3 block w-full rounded-md bg-white border border-slate-200 text-slate-700 placeholder-slate-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                  }
                />
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={addBreak}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Break
                  </button>
                </div>
              </div>
            </div>

            {breaks.length > 0 && (
              <div className="mt-4">
                <h3 className="text-md font-medium text-slate-700 mb-2">Current Breaks</h3>
                <div className="space-y-2">
                  {breaks.map((breakPeriod, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 rounded-md p-2 border border-slate-200">
                      <span className="text-slate-700">
                        {breakPeriod.start} - {breakPeriod.end}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeBreak(index)}
                        className="text-slate-400 hover:text-red-500 transition duration-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={submitSlots}
                disabled={isSubmitting}
                className={`w-full bg-indigo-600 text-white py-3 px-6 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-300 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Slots"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

const FormField = ({ label, icon, input }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      <div className="flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </div>
    </label>
    {input}
  </div>
)

export default DoctorAddSlots