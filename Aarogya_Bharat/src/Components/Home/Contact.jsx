import React from 'react'
import ContactUs from '../../assets/Home/contactus.svg'
import { Link } from 'react-router-dom'

function Contact() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#0d6270] via-[#0d6270] to-[#0d6270]">
    <div className="container px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Get in Touch</h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-4">
            Have questions or need help? Fill out the form and we'll be in touch.
          </p>
          <form className="mt-8 space-y-4">
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="name"
              >
                Name:
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="name"
                placeholder="Enter your name"
                type="text"
              />
            </div>
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="email"
              >
                Email:
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="message"
              >
                Message:
              </label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="message"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background bg-[#ceecee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-[#095d7e] hover:bg-indigo-900 hover:text-white h-10 px-4 py-2 w-full"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <img
          width="600"
          height="400"
          alt="Contact us"
          className="rounded-xl object-cover"
          src={ContactUs}
        />
      </div>
    </div>
  </section>
  )
}

export default Contact