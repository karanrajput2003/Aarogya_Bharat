import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import Navbar from "../../Components/Doctor/Navbar";

import { useSelector } from 'react-redux';


function DoctorAddSlots() {
  const doctorId = useSelector((state) => state.auth.userId);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [breaks, setBreaks] = useState([]);
  const [breakStart, setBreakStart] = useState("");
  const [breakEnd, setBreakEnd] = useState("");

  const addBreak = () => {
    if (breakStart && breakEnd) {
      setBreaks([...breaks, { start: breakStart, end: breakEnd }]);
      setBreakStart("");
      setBreakEnd("");
    }
  };

  const submitSlots = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND}/create-order`, { doctorId, date, startTime, endTime, breaks });
      alert("Slots added successfully!");
      setDate("");
      setStartTime("");
      setEndTime("");
      setBreaks([]);
    } catch (error) {
      console.error("Error adding slots:", error);
    }
  };

  const today = moment().format("YYYY-MM-DD");
  const maxDate = moment().add(7, "days").format("YYYY-MM-DD");

  return (
    <div>
      <Navbar />
      <section className="w-full py-12 md:py-24 lg:py-16 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270] text-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-10 lg:mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white text-center">
              Add Available Slots
            </h1>
          </div>
          <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-8 border border-gray-600 text-white rounded-lg shadow-md">
            <form>
              <div className="grid gap-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <label className="text-lg font-semibold">
                    Select Date:
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={today}
                      max={maxDate}
                      className="mt-2 p-2 rounded text-black"
                    />
                  </label>
                  <label className="text-lg font-semibold">
                    Start Time:
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="mt-2 p-2 rounded text-black"
                    />
                  </label>
                  <label className="text-lg font-semibold">
                    End Time:
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="mt-2 p-2 rounded text-black"
                    />
                  </label>
                </div>

                <h2 className="text-2xl font-semibold mb-4">Breaks</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="text-lg font-semibold">
                    Break Start:
                    <input
                      type="time"
                      value={breakStart}
                      onChange={(e) => setBreakStart(e.target.value)}
                      className="mt-2 p-2 rounded text-black"
                    />
                  </label>
                  <label className="text-lg font-semibold">
                    Break End:
                    <input
                      type="time"
                      value={breakEnd}
                      onChange={(e) => setBreakEnd(e.target.value)}
                      className="mt-2 p-2 rounded text-black"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={addBreak}
                    className="self-start mt-3 bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Add Break
                  </button>
                </div>

                <h3 className="text-xl font-semibold mt-4">Current Breaks</h3>
                <ul className="list-disc pl-6">
                  {breaks.map((breakPeriod, index) => (
                    <li key={index}>
                      {breakPeriod.start} - {breakPeriod.end}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={submitSlots}
                  className="mt-6 bg-green-500 text-white py-2 px-6 rounded"
                >
                  Submit Slots
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DoctorAddSlots;
