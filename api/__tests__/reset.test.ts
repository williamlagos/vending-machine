import request from 'supertest'

import app from '../src/app'

const API_PREFIX = '/api/v1'

describe('Test /deposit endpoint', () => {
  test('POST /deposit route', async () => {
    const userId = '6509e7ecd0a36b0100b3b609'
    const res = await request(app)
      .post(`${API_PREFIX}/users/${userId}/reset`)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    expect(res.status).toBe(200)
  })
})
