import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1/',
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem('token')

      if (token !== null) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['Product', 'User', 'Coin'],
  endpoints: () => ({})
})
