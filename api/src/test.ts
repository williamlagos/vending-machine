import { calculatePurchase } from './utils'

describe('portfolio generation testing', () => {
  test('it should receive a proper distribution', () => {
    const result = calculatePurchase({
      id: 'id',
      hundred: 5,
      fifty: 3,
      twenty: 2,
      ten: 5,
      five: 10,
      buyerId: 'id'
    }, 655)
    // console.log(result)
    expect(result.remainingCost).toBe(0)
  })
})
