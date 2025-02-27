//import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
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
    path: `${import.meta.env.BASE_URL}/`,
    element: <PageGenericValveFamilies />
  },
  {
    path: `${import.meta.env.BASE_URL}/families`,
    element: <PageGenericValveFamilies />
  },
  {
    path: `${import.meta.env.BASE_URL}/models`,
    element: <PageGenericValveModel />
  },
  {
    path: `${import.meta.env.BASE_URL}/tests`,
    element: <PageGenericTest />
  },
  {
    path: `${import.meta.env.BASE_URL}/families/add`,
    element: <PageAddValveFamily />
  },
  {
    path: `${import.meta.env.BASE_URL}/families/:familyID`,
    element: <PageValveFamily />
  },
  {
    path: `${import.meta.env.BASE_URL}/models/add/:familId?`,
    element: <PageAddValveModel />
  },
  {
    path: `${import.meta.env.BASE_URL}/models/:modelID`,
    element: <PageValveModel />
  },
  {
    path: `${import.meta.env.BASE_URL}/instances/add/:modelId?`,
    element: <PageAddValveInstance />
  },
  {
    path: `${import.meta.env.BASE_URL}/instances/:instanceID`,
    element: <PageValveInstance />
  },
  {
    path: `${import.meta.env.BASE_URL}/tests/:testID`,
    element: <PageTest />
  },
  {
    path: '*',
    element: <PageError404 />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
