import React from 'react'
import Navbar from '../../Components/Patient/Navbar'
import MainPage from '../../Components/Patient/MainPage'
import Benefits from '../../Components/Home/Benefits'
import CustomerFeedback from '../../Components/Home/CustomerFeedback'
import Contact from '../../Components/Home/Contact'
import Footer from '../../Components/Home/Footer'
import Services from '../../Components/Home/Services'
import ChatBot from "../Patient/ChatBot"; // Import ChatBot

import { useState } from 'react'
function PatientHome() {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Toggle Chatbot visibility
  const toggleChatBot = () => {
    setIsChatBotOpen(!isChatBotOpen);
    setDropdownVisible(false); // Close dropdown when toggling
  };

  // Toggle Dropdown visibility
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
  return (
    <>
    <Navbar />
        <main class="flex-1">
        <MainPage />
        <Services />
        <Benefits />
        <CustomerFeedback />
        <Contact />
        <Footer />
      </main>
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={toggleDropdown}
          className="bg-cyan-600 text-white p-3 rounded-full shadow-lg hover:bg-cyan-700"
        >
          Chat Bot
        </button>

        {/* Dropdown menu for Chatbot */}
        {dropdownVisible && (
          <div className="absolute bottom-16 right-0 w-40 bg-white rounded-lg shadow-md border border-gray-300">
            <button
              onClick={toggleChatBot}
              className="w-full text-left text-black px-4 py-2 hover:bg-gray-100"
            >
              {isChatBotOpen ? "Minimize" : "Open Chat"}
            </button>
            <button
              onClick={() => setDropdownVisible(false)}
              className="w-full text-left text-black px-4 py-2 hover:bg-gray-100"
            >
              Restart Chat
            </button>
            {/* Add other dropdown options as needed */}
          </div>
        )}
      </div>

      {/* Chatbot Component */}
      {isChatBotOpen && (
        <div className="fixed bottom-20 right-5 w-96 h-[32rem] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <ChatBot />
        </div>
      )}
    </>
  )
}

export default PatientHome




// function Home() {
//   const [isChatBotOpen, setIsChatBotOpen] = useState(false);
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   // Toggle Chatbot visibility
//   const toggleChatBot = () => {
//     setIsChatBotOpen(!isChatBotOpen);
//     setDropdownVisible(false); // Close dropdown when toggling
//   };

//   // Toggle Dropdown visibility
//   const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

//   return (
//     <>
//       <Navbar />
//       <main className="flex-1">
//         <MainContent />
//         <UpcomingEvent />
//         <Service />
//         <CustomerFeedback />
//         <ContactUs />
//       </main>

//       {/* Floating Chatbot Button */}
//       <div className="fixed bottom-5 right-5 z-50">
//         <button
//           onClick={toggleDropdown}
//           className="bg-cyan-600 text-white p-3 rounded-full shadow-lg hover:bg-cyan-700"
//         >
//           Chat
//         </button>

//         {/* Dropdown menu for Chatbot */}
//         {dropdownVisible && (
//           <div className="absolute bottom-16 right-0 w-40 bg-white rounded-lg shadow-md border border-gray-300">
//             <button
//               onClick={toggleChatBot}
//               className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             >
//               {isChatBotOpen ? "Minimize" : "Open Chat"}
//             </button>
//             <button
//               onClick={() => setDropdownVisible(false)}
//               className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             >
//               Restart Chat
//             </button>
//             {/* Add other dropdown options as needed */}
//           </div>
//         )}
//       </div>

//       {/* Chatbot Component */}
//       {isChatBotOpen && (
//         <div className="fixed bottom-20 right-5 w-96 h-[32rem] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
//           <ChatBot />
//         </div>
//       )}
//     </>
//   );
// }

// export default Home;