import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaMicrophone, FaMicrophoneSlash, FaStop, FaPaperPlane, FaVolumeMute } from 'react-icons/fa';
import Img from '../../assets/Nirog.svg';

export default function ProfessionalChatbot() {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [messages, setMessages] = useState([]);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    fetchInitialQuestion();
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => setRecordedChunks((prev) => [...prev, e.data]);
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const saveRecording = async () => {
    const blob = new Blob(recordedChunks, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audio", blob, "recording.wav");

    try {
      const response = await axios.post("http://localhost:8000/uploadquestion", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const userResponseText = response.data.hello;
      setMessages((prevMessages) => [...prevMessages, { type: "user", content: userResponseText }]);
      fetchNextQuestion(userResponseText);
    } catch (error) {
      console.error("Error saving recording:", error);
    }

    setRecordedChunks([]);
  };

  const fetchInitialQuestion = async () => {
    try {
      const initialQuestion = "Hello! I am your Aarogya Bharat medical recommendation chatbot. ";
      const healthConcernQuestion = "What health concerns would you like to discuss today?";
      setMessages((prevMessages) => [...prevMessages, { type: "bot", content: initialQuestion + healthConcernQuestion }]);
      speakResponse(initialQuestion + healthConcernQuestion);
    } catch (err) {
      console.error("Error fetching initial question:", err);
    }
  };

  const fetchNextQuestion = async (userResponse) => {
    try {
      const res = await axios.get("http://localhost:8000/api/question", {
        params: {
          question: userResponse + ".Just return the answer and nothing filler only four line answer." + "give text response without * ** ``` bullet points",
        },
      });

      const nextQuestion = res.data.text;
      setMessages((prevMessages) => [...prevMessages, { type: "bot", content: nextQuestion }]);
      speakResponse(nextQuestion);
    } catch (err) {
      console.error("Error fetching next question:", err);
    }
  };

  const speakResponse = (text) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang = "en-IN";
    synth.speak(utterThis);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-cyan-700 p-4 flex items-center">
          <img src={Img} alt="Aarogya Bharat Logo" className="h-8 w-auto mr-3" />
          <h1 className="text-xl font-semibold text-white">Aarogya Bharat Assistant</h1>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="p-4">
            <div 
              ref={chatWindowRef}
              className="chat-window overflow-y-auto h-80 p-4 border border-gray-300 rounded-lg bg-gray-50"
            >
              {messages.map((msg, index) => (
                <div key={index} className={`mb-4 ${msg.type === 'user' ? 'text-right' : ''}`}>
                  <div
                    className={`inline-block rounded-lg p-3 text-sm ${
                      msg.type === 'user'
                        ? 'bg-cyan-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 flex justify-center space-x-4">
            <button
              onClick={startRecording}
              disabled={recording}
              className={`flex items-center justify-center w-12 h-12 rounded-full shadow-md transition-colors duration-300 ${
                recording ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
              } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              aria-label={recording ? "Recording in progress" : "Start recording"}
            >
              {recording ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
            </button>
            <button
              onClick={stopRecording}
              disabled={!recording}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 text-white shadow-md transition-colors duration-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              aria-label="Stop recording"
            >
              <FaStop size={20} />
            </button>
            <button
              onClick={saveRecording}
              disabled={recordedChunks.length === 0}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-600 text-white shadow-md transition-colors duration-300 hover:bg-cyan-700 disabled:bg-cyan-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              aria-label="Send recording"
            >
              <FaPaperPlane size={20} />
            </button>
            <button
              onClick={stopSpeech}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white shadow-md transition-colors duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label="Stop speech"
            >
              <FaVolumeMute size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}