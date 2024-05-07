import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PageGenericValveModel from './pages/PageGenericValveModel'
import PageGenericValveFamilies from './pages/PageGenericValveFamily'
import PageGenericTest from './pages/PageGenericTest'
import PageAddValveFamily from './pages/PageAddValveFamily'
import PageAddValveModel from './pages/PageAddValveModel'
import PageAddValveInstance from './pages/PageAddValveInstance'
import PageValveFamily from './pages/PageValveFamily'
import PageValveModel from './pages/PageValveModel'
import PageValveInstance from './pages/PageValveInstance'
import PageTest from './pages/PageTest'
import PageError404 from './pages/PageError404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageGenericValveFamilies />
  },
  {
    path: '/families',
    element: <PageGenericValveFamilies />
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
    path: '/families/add',
    element: <PageAddValveFamily />
  },
  {
    path: '/families/:familyID',
    element: <PageValveFamily />
  },
  {
    path: '/models/add/:familId?',
    element: <PageAddValveModel />
  },
  {
    path: '/models/:modelID',
    element: <PageValveModel />
  },
  {
    path: '/instances/add/:modelId?',
    element: <PageAddValveInstance />
  },
  {
    path: '/instances/:instanceID',
    element: <PageValveInstance />
  },
  {
    path: '/tests/:testID',
    element: <PageTest />
  },
  {
    path: '*',
    element: <PageError404 />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
