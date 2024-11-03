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
    <div className='bg-gradient-to-b from-[#e0f7fa] via-[#f0fdfd] to-[#e8f5e9]'>
        <Navbar />
        <main class="flex-1">
        <MainPage />
        <Services />
        <Benefits />
        <CustomerFeedback />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default Home