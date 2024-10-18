import React from 'react';
import { Link } from 'react-router-dom';
import HomeImg from '../../assets/Home/doctor.svg';
import { useSelector } from 'react-redux';

// const Component = () => {
//   const userId = useSelector((state) => state.auth.userId);
  
//   return <div>User ID: {userId}</div>;
// };

function MainPage() {
  const userId = useSelector((state) => state.auth.userId);
  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-gradient-to-b from-[#073243] via-[#0a4c59] to-[#0d6270]">
      {/* <div>User ID: {userId}</div> */}
      <div className="container space-y-10 xl:space-y-16">
        <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
          <div>
            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-white">
              Convenient and Accessible Telehealth Services
            </h1>
            <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl text-white">
              Experience the future of healthcare with our comprehensive telehealth solutions. Connect with
              healthcare providers from the comfort of your home. Enjoy our comprehensive telehealth services at your fingertips.
            </p>
            <div className="mt-6 space-x-4">
              <Link
                to="./finddoctor"
                className="inline-flex h-9 items-center justify-center rounded-md bg-indigo-900 px-4 py-2 text-black font-medium text-white shadow transition-colors hover:bg-indigo-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-700 disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started
              </Link>
              {/* <Link
                to="/"
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm transition-colors hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-700 disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </Link> */}
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <img
              src={HomeImg}
              alt="Telehealth Services"
              className="mx-auto w-full h-auto max-w-[500px] md:max-w-[600px] object-contain"
            />
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

    </section>
  );
}

export default MainPage;
