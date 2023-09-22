import request from 'supertest'

import app from '../src/'

const API_PREFIX = '/api/v1'

describe('Test app', () => {
  /** TODO: Build a database seed for these tests */
  test('Catch-all route', async () => {
    const res = await request(app).get(`${API_PREFIX}/`)
    expect(res.body).toEqual({ health: 'OK' })
  })
})
