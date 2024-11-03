import React from 'react'
import Navbar from '../../Components/Doctor/Navbar'
import MainPage from '../../Components/Doctor/MainPage'
import Benefits from '../../Components/Doctor/Benefits'
import DoctorFeedback from '../../Components/Doctor/DoctorFeedback'
import Contact from '../../Components/Home/Contact'
import Footer from '../../Components/Home/Footer'
import Services from '../../Components/Doctor/Services'

function Home() {
  return (
    <>
        <Navbar />
        <main class="flex-1">
        <MainPage />
        <Services />
        <Benefits />
        <DoctorFeedback />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default Home
