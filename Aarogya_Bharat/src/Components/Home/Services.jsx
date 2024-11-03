import React from 'react'
import { Link } from 'react-router-dom';
import virtual_consult from '../../assets/Home/virtual_consult.jpg'
import online_pre from '../../assets/Home/online_pre.jpg'
import Data_security from '../../assets/Home/Data_security.jpg'


function Services() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0b1c29]">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="inline-block rounded-lg bg-[#095d7e] px-3 py-1 text-sm text-white">Services</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Our TeleHealth Services
            </h2>
            <p className="mt-4 max-w-[600px] text-gray-400 md:text-xl lg:text-base xl:text-xl">
            Consult the Best Doctors From Anywhere in the World.
            </p>
          </div>
          {/* <div className="space-y-4"> */}
          <div
              className="rounded-lg border-2 border-transparent bg-transparent p-6 shadow-lg transition-all duration-300 
              hover:shadow-xl hover:bg-[#095d7e] hover:bg-opacity-10"
              data-v0-t="card"
            >
              <Link to="/" className="block" prefetch={false}>
                  <img
                    src={virtual_consult}
                    
                    alt="Virtual Consultations"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="mt-4 space-y-1">
                    <h3 className="text-lg font-medium">Virtual Consultations</h3>
                    <p className="text-muted-foreground">Connect with healthcare providers through secure video calls.</p>
                    <Link
                      to="/"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      prefetch={false}
                    >
                      Learn More
                      {/* <ArrowRightIcon className="ml-1 h-4 w-4" /> */}
                    </Link>
                  </div>
                </Link>
            </div>
            <div
              className="rounded-lg border-2 border-transparent bg-transparent p-6 shadow-lg transition-all duration-300 
              hover:shadow-xl hover:bg-[#095d7e] hover:bg-opacity-10"
              data-v0-t="card"
            >
              <Link to="/" className="block" prefetch={false}>
                  <img
                  src={online_pre}
                    
                    alt="Online Prescription Management"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="mt-4 space-y-1">
                    <h3 className="text-lg font-medium">Online Prescription Management</h3>
                    <p className="text-muted-foreground">Refill and manage your prescriptions online.</p>
                    <Link
                      to="/"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      prefetch={false}
                    >
                      Learn More
                      {/* <ArrowRightIcon className="ml-1 h-4 w-4" /> */}
                    </Link>
                  </div>
                </Link>
            </div>
            <div
              className="rounded-lg border-2 border-transparent bg-transparent p-6 shadow-lg transition-all duration-300 
              hover:shadow-xl hover:bg-[#095d7e] hover:bg-opacity-10"
              data-v0-t="card"
            >
              <Link to="/" className="block" prefetch={false}>
                  <img
                  src={Data_security}
                    
                    alt="Secure Data Management"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="mt-4 space-y-1">
                    <h3 className="text-lg font-medium">Secure Data Management</h3>
                    <p className="text-muted-foreground">Your health data is securely stored and managed.</p>
                    <Link
                      to="/"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      prefetch={false}
                    >
                      Learn More
                      {/* <ArrowRightIcon className="ml-1 h-4 w-4" /> */}
                    </Link>
                  </div>
                </Link>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Services