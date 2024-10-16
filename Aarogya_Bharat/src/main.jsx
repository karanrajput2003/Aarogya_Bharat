import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Login from './Pages/Home/Login.jsx'
import Register from './Pages/Home/Register.jsx'
import Doctorlogin from './Pages/Doctor/Login.jsx'
import DoctorHome from './Pages/Doctor/Home.jsx'

// Patient
import PatientHome from './Pages/Patient/PatientHome.jsx'
import FindDoctor from './Pages/Patient/FindDoctor.jsx'
import MyAppointments from './Pages/Patient/MyAppointments.jsx'
import DoctorProfile from './Pages/Patient/DoctorProfile.jsx'
import PatientProfile from './Pages/Patient/PatientProfile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/doctorlogin',
    element: <Doctorlogin />,
  },
  {
    path: '/doctor',
    element: <DoctorHome />,
  },
    {
    path: '/patient',
    element: <PatientHome />,
  },
  {
    path: '/patient/finddoctor',
    element: <FindDoctor />,
  },
  {
    path: '/patient/myappointments',
    element: <MyAppointments />,
  },
  {
    path: '/patient/doctor/:id',
    element: <DoctorProfile />,
  },
  {
    path: '/patient/profile/:patientId',
    element: <PatientProfile />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
