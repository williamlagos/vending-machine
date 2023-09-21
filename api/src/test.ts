import { calculatePurchase } from './utils'

describe('purchase calculation testing', () => {
  test('it should receive a proper change', () => {
    const result = calculatePurchase({
      id: 'id',
      hundred: 5,
      fifty: 3,
      twenty: 2,
      ten: 5,
      five: 10,
      buyerId: 'id'
    }, 655)
    console.log(result)
    expect(result.remainingCost).toBe(0)
  })
})
