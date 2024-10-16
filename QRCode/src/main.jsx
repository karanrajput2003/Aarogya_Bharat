import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainPage from './MainPage'
import './index.css'
import App from './App'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/:userId',
    element: <MainPage />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
