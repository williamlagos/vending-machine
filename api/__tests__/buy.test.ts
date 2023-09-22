import request from 'supertest'

import app from '../src/'

const API_PREFIX = '/api/v1'

describe('Test /buy endpoint', () => {
  test('POST /buy route', async () => {
    const productId = '650c799e0387d6166e51b5d2'
    const res = await request(app)
      .post(`${API_PREFIX}/products/${productId}/buy`)
      .send({ amount: 1 })
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    expect(res.status).toBe(200)
  })
})
