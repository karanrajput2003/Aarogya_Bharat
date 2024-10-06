import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Login from './Pages/Home/Login.jsx'
import Register from './Pages/Home/Register.jsx'
import Doctorlogin from './Pages/Doctor/Login.jsx'
import DoctorHome from './Pages/Doctor/Home.jsx'

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
    path: '/patient',
    element: <PatientHome />,
  },
  {
    path: '/doctor',
    element: <DoctorHome />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
