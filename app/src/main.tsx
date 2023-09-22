import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import { App, Entrance, Registry } from './pages'
import { vendingApi } from './store/vendingApi.ts'
import { AuthProvider } from './providers'

const rootElement = document.getElementById('root')

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/entrance',
    element: <Entrance />
  },
  {
    path: '/registry',
    element: <Registry />
  }
])

if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <ApiProvider api={vendingApi}>
          <RouterProvider router={router} />
        </ApiProvider>
      </AuthProvider>
    </React.StrictMode>
  )
}
