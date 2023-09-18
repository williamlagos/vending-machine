import request from 'supertest'

import app from '../src/'

describe('Test app', () => {
  test('Catch-all route', async () => {
    const res = await request(app).get('/')
    expect(res.body).toEqual({ health: 'OK' })
  })
})
