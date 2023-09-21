import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1/' }),
  endpoints: () => ({})
})
