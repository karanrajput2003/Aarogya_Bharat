import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';  

import Login from './Pages/Home/Login.jsx';
import Register from './Pages/Home/Register.jsx';
import Doctorlogin from './Pages/Doctor/Login.jsx';
import DoctorHome from './Pages/Doctor/Home.jsx';

// Patient
import PatientHome from './Pages/Patient/PatientHome.jsx';
import FindDoctor from './Pages/Patient/FindDoctor.jsx';
import MyAppointments from './Pages/Patient/MyAppointments.jsx';
import DoctorProfile from './Pages/Patient/DoctorProfile.jsx';
import PatientProfile from './Pages/Patient/PatientProfile.jsx';
import DoctorProfilePage from './Pages/Doctor/DoctorProfile.jsx';
import DoctorUpdateProfile from './Pages/Doctor/DoctorUpdateProfile.jsx';
import PatientAddRecord from './Pages/Patient/PatientAddRecord.jsx';
import PatientUploadedRecords from './Pages/Patient/PatientUploadedRecords.jsx';

// Create the router
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
    path: '/doctorregister',
    element: <DoctorUpdateProfile />,
  },
  {
    path: '/doctor',
    element: <DoctorHome />,
  },
  {
    path: '/doctor/updateprofile',
    element: <DoctorUpdateProfile />,
  },
  {
    path: '/doctor/profile',
    element: <DoctorProfilePage />,
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
  {
    path: 'patient/addrecords',
    element: <PatientAddRecord />,
  },
  {
    path: 'patient/documents',
    element: <PatientUploadedRecords />,
  },
]);

// Render the app
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} /> {/* Wrap the app with RouterProvider */}
  </Provider>
);
