import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Login from './Pages/Home/Login.jsx'
import Register from './Pages/Home/Register.jsx'
import Doctorlogin from './Pages/Doctor/Login.jsx'
import DoctorHome from './Pages/Doctor/Home.jsx'
import PatientHome from './Pages/Patient/PatientHome.jsx'

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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
