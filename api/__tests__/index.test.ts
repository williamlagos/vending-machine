import request from 'supertest'

import app from '../src/'

const API_PREFIX = '/api/v1'

describe('Test app', () => {
  test('Catch-all route', async () => {
    const res = await request(app).get(`${API_PREFIX}/`)
    expect(res.body).toEqual({ health: 'OK' })
  })
})

describe('Test /deposit endpoint', () => {
  test('POST /deposit route', async () => {
    const userId = '6509a02c607855f89890d034'
    const res = await request(app).post(`${API_PREFIX}/users/${userId}/deposit`)
    console.log(res)
  })
})

describe('Test /buy endpoint', () => {})
