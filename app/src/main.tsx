import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApiProvider } from '@reduxjs/toolkit/query/react'

import './index.css'
import { App } from './pages'
import { vendingApi } from './store/vendingApi.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
])

if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ApiProvider api={vendingApi}>
        <RouterProvider router={router} />
      </ApiProvider>
    </React.StrictMode>
  )
}
