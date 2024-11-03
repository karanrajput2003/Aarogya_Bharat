import React from 'react'
import Navbar from '../../Components/Patient/Navbar'
import MainPage from '../../Components/Patient/MainPage'
import Benefits from '../../Components/Home/Benefits'
import CustomerFeedback from '../../Components/Home/CustomerFeedback'
import Contact from '../../Components/Home/Contact'
import Footer from '../../Components/Home/Footer'
import Services from '../../Components/Home/Services'

function PatientHome() {
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
    </>
  )
}

export default PatientHome