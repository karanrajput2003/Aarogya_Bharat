"use client"

import { useState } from "react"
import axios from "axios"
import moment from "moment"
import { useSelector } from "react-redux"
import { Calendar, Clock, Plus, X } from "lucide-react"
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white text-center">Add Available Slots</h1>
        <br />
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                label="Select Date"
                icon={<Calendar className="h-5 w-5" />}
                input={
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={today}
                    max={maxDate}
                    className="mt-1 block w-full rounded-md bg-white/20 border border-white/30 text-white placeholder-white/50 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                  />
                }
              />
              <FormField
                label="Start Time"
                icon={<Clock className="h-5 w-5" />}
                input={
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-white/20 border border-white/30 text-white placeholder-white/50 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                  />
                }
              />
              <FormField
                label="End Time"
                icon={<Clock className="h-5 w-5" />}
                input={
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-white/20 border border-white/30 text-white placeholder-white/50 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                  />
                }
              />
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Breaks</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  label="Break Start"
                  icon={<Clock className="h-5 w-5" />}
                  input={
                    <input
                      type="time"
                      value={breakStart}
                      onChange={(e) => setBreakStart(e.target.value)}
                      className="mt-1 block w-full rounded-md bg-white/20 border border-white/30 text-white placeholder-white/50 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                    />
                  }
                />
                <FormField
                  label="Break End"
                  icon={<Clock className="h-5 w-5" />}
                  input={
                    <input
                      type="time"
                      value={breakEnd}
                      onChange={(e) => setBreakEnd(e.target.value)}
                      className="mt-1 block w-full rounded-md bg-white/20 border border-white/30 text-white placeholder-white/50 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                    />
                  }
                />
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={addBreak}
                    className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300 flex items-center justify-center"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Break
                  </button>
                </div>
              </div>
            </div>

            {breaks.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-white mb-2">Current Breaks</h3>
                <div className="space-y-2">
                  {breaks.map((breakPeriod, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/20 rounded-md p-2">
                      <span className="text-white">
                        {breakPeriod.start} - {breakPeriod.end}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeBreak(index)}
                        className="text-red-400 hover:text-red-300 transition duration-300"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <button
                type="button"
                onClick={submitSlots}
                disabled={isSubmitting}
                className={`w-full bg-green-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-600 transition duration-300 ${
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
    <label className="block text-sm font-medium text-white mb-1">
      <div className="flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </div>
    </label>
    {input}
  </div>
)

export default DoctorAddSlots

