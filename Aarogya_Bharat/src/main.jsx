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
import DoctorProfilePage from './Pages/Doctor/DoctorProfile.jsx';
import DoctorUpdateProfile from './Pages/Doctor/DoctorUpdateProfile.jsx';
import DoctorDashboard from './Pages/Doctor/DoctorDashboard.jsx';
// Patient
import PatientHome from './Pages/Patient/PatientHome.jsx';
import FindDoctor from './Pages/Patient/FindDoctor.jsx';
import MyAppointments from './Pages/Patient/MyAppointments.jsx';
import DoctorProfile from './Pages/Patient/DoctorProfile.jsx';
import PatientProfile from './Pages/Patient/PatientProfile.jsx';
import PatientAddRecord from './Pages/Patient/PatientAddRecord.jsx';
import PatientUploadedRecords from './Pages/Patient/PatientUploadedRecords.jsx';
import DoctorAppointments from './Pages/Doctor/DoctorAppointments.jsx';

//Admin
import AdminHome from './Pages/Admin/AdminHome.jsx';
import AdminDoctorApproval from './Pages/Admin/AdminDoctorApproval.jsx';
import AdminDoctorDetails from './Pages/Admin/AdminDoctorDetails.jsx';
import AdminAllPatients from './Pages/Admin/AdminAllPatients.jsx';
import AdminAppointments from './Pages/Admin/AdminAppointments.jsx';
import AdminAppointmentDetails from './Pages/Admin/AdminAppointmentDetail.jsx';
import AdminPayment from './Pages/Admin/AdminPayment.jsx';
import AdminPatientRecord from './Pages/Admin/AdminPatientRecord.jsx';
import AdminInventory from './Pages/Admin/AdminInventory.jsx';
import AdminSetting from './Pages/Admin/AdminSetting.jsx';

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
    path: '/doctor/dashboard',
    element: <DoctorDashboard />,
  },
  {
    path: '/doctor/appointments',
    element: <DoctorAppointments />,
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
    path: '/patient/addrecords',
    element: <PatientAddRecord />,
  },
  {
    path: '/patient/documents',
    element: <PatientUploadedRecords />,
  },
  {
    path: '/admin',
    element: <AdminHome />,
  },
  {
    path: '/admin/doctors-approval',
    element: <AdminDoctorApproval />,
  },
  {
    path: '/admin/doctordetails/:id',
    element: <AdminDoctorDetails />,
  },
  {
    path: '/admin/allPatients',
    element: <AdminAllPatients />,
  },  
  {
    path: '/admin/appointments',
    element: <AdminAppointments />,
  },
  {
    path: '/admin/appointmentrdetails/:id',
    element: <AdminAppointmentDetails />,
  },
  {
    path: '/admin/payments',
    element: <AdminPayment />,
  },
  {
    path: '/admin/patient-record',
    element: <AdminPatientRecord />,
  },
  {
    path: '/admin/inventory',
    element: <AdminInventory />,
  },
  {
    path: '/admin/settings',
    element: <AdminSetting />,
  },

]);

// Render the app
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} /> {/* Wrap the app with RouterProvider */}
  </Provider>
);
