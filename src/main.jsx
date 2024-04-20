import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PageGenericValveModel from './pages/PageGenericValveModel'
import PageGenericTest from './pages/PageGenericTest'
import PageValveModel from './pages/PageValveModel'
import PageValveInstance from './pages/PageValveInstance'
import PageTest from './pages/PageTest'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/models',
    element: <PageGenericValveModel />
  },
  {
    path: '/tests',
    element: <PageGenericTest />
  },
  {
    path: '/models/:modelID',
    element: <PageValveModel />
  },
  {
    path: '/instances/:instanceID',
    element: <PageValveInstance />
  },
  {
    path: '/tests/:testID',
    element: <PageTest />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
