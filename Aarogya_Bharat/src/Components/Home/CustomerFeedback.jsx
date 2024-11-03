import React from 'react';

function CustomerFeedback() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0b1c29]">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="inline-block rounded-lg bg-[#095d7e] px-3 py-1 text-sm text-white">Testimonials</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              What Our Patients Say
            </h2>
            <p className="mt-4 max-w-[600px] text-gray-400 md:text-xl lg:text-base xl:text-xl">
              Hear from our satisfied patients about their experience with our telehealth services.
            </p>
          </div>
          <div className="space-y-4">
            <div
              className="rounded-lg border-2 border-transparent bg-transparent p-6 shadow-lg transition-all duration-300 
              hover:shadow-xl hover:bg-[#095d7e] hover:bg-opacity-10"
              data-v0-t="card"
            >
              <p className="text-[#095d7e] italic">
                "I was hesitant to try telehealth at first, but the process was so easy and convenient. The provider was knowledgeable and really listened to my concerns."
              </p>
              <div className="flex items-center mt-4">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#095d7e]">
                  {/* Placeholder for user avatar */}
                </span>
                <div className="ml-2">
                  <span className="text-[#095d7e] font-semibold">Aman</span>
                  <p className="text-gray-500 text-sm">Satisfied Patient</p>
                </div>
              </div>
            </div>
          </div>
          {/* Add more testimonials as needed */}
          <div className="space-y-4">
            <div
              className="rounded-lg border-2 border-transparent bg-transparent p-6 shadow-lg transition-all duration-300 
              hover:shadow-xl hover:bg-[#095d7e] hover:bg-opacity-10"
              data-v0-t="card"
            >
              <p className="text-[#095d7e] italic">
                "Telehealth has been a game changer for me. I can get the care I need without the hassle of traveling."
              </p>
              <div className="flex items-center mt-4">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#095d7e]">
                  {/* Placeholder for user avatar */}
                </span>
                <div className="ml-2">
                  <span className="text-[#095d7e] font-semibold">Zane</span>
                  <p className="text-gray-500 text-sm">Satisfied Patient</p>
                </div>
              </div>
            </div>
          </div>
          {/* Add more testimonials as needed */}
        </div>
      </div>
    </section>
  );
}

export default CustomerFeedback;
