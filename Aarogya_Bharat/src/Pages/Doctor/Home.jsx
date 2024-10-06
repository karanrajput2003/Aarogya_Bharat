import React from 'react'
import Navbar from '../../Components/Home/Navbar'
import MainPage from '../../Components/Home/MainPage'
import Benefits from '../../Components/Home/Benefits'
import CustomerFeedback from '../../Components/Home/CustomerFeedback'
import Contact from '../../Components/Home/Contact'
import Footer from '../../Components/Home/Footer'
import Services from '../../Components/Home/Services'

function Home() {
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

export default Home
