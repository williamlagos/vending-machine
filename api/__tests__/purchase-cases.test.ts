import { calculatePurchase } from '../src/utils'

describe('purchase calculation testing', () => {
  test('it should receive a proper change', () => {
    const result = calculatePurchase(
      {
        id: 'id',
        hundred: 0,
        fifty: 3,
        twenty: 2,
        ten: 5,
        five: 10,
        buyerId: 'id'
      },
      55
    )
    expect(result.remainingCost).toBe(0)
  })
})

describe('purchase calculation testing', () => {
  test('it should receive a proper change', () => {
    const result = calculatePurchase(
      {
        id: 'id',
        hundred: 5,
        fifty: 3,
        twenty: 0,
        ten: 5,
        five: 10,
        buyerId: 'id'
      },
      655
    )
    expect(result.remainingCost).toBe(0)
  })
})

describe('purchase calculation testing', () => {
  test('it should receive a proper change', () => {
    const result = calculatePurchase(
      {
        id: 'id',
        hundred: 5,
        fifty: 3,
        twenty: 2,
        ten: 5,
        five: 10,
        buyerId: 'id'
      },
      15
    )
    expect(result.remainingCost).toBe(0)
  })
})

describe('purchase calculation testing', () => {
  test('it should not receive a proper change, since it is an invalid price', () => {
    const result = calculatePurchase(
      {
        id: 'id',
        hundred: 5,
        fifty: 3,
        twenty: 2,
        ten: 0,
        five: 10,
        buyerId: 'id'
      },
      338
    )
    expect(result.remainingCost).toBe(3)
  })
})

describe('purchase calculation testing', () => {
  test('it should not receive a proper change, since the funds are not sufficient', () => {
    const result = calculatePurchase(
      {
        id: 'id',
        hundred: 5,
        fifty: 3,
        twenty: 2,
        ten: 5,
        five: 0,
        buyerId: 'id'
      },
      1005
    )
    expect(result.remainingCost).toBe(265)
  })
})
