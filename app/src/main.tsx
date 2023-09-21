import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import App from './App.tsx'
import './index.css'
import { vendingApi } from './store/vendingApi.ts'

const rootElement = document.getElementById('root')

if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ApiProvider api={vendingApi}>
          <App />
        </ApiProvider>
      </LocalizationProvider>
    </React.StrictMode>
  )
}
