import type { Coins } from '@prisma/client'

import { PrismaClient } from '@prisma/client'

import type { CoinsContainer } from './types'

export const calculateDeposit = (coins: Coins): number => {
  let deposit = 0
  deposit += coins.five * 5
  deposit += coins.ten * 10
  deposit += coins.twenty * 20
  deposit += coins.fifty * 50
  deposit += coins.hundred * 100
  return deposit
}

export const calculatePurchase = (coins: Coins, cost: number): any => {
  let remainingCost = cost
  const usedCoins: CoinsContainer = {}
  const remainingCoins: CoinsContainer = {}

  if (coins.hundred > 0) {
    const neededCoins = Math.floor(remainingCost / 100)
    usedCoins.hundred =
      neededCoins <= coins.hundred ? neededCoins : coins.hundred
    remainingCoins.hundred = coins.hundred - usedCoins.hundred
    remainingCost -= usedCoins.hundred * 100
    if (remainingCost > 0 && coins.fifty > 0) {
      const neededCoins = Math.floor(remainingCost / 50)
      usedCoins.fifty = neededCoins <= coins.fifty ? neededCoins : coins.fifty
      remainingCoins.fifty = coins.fifty - usedCoins.fifty
      remainingCost -= usedCoins.fifty * 50
      if (remainingCost > 0 && coins.twenty > 0) {
        const neededCoins = Math.floor(remainingCost / 20)
        usedCoins.twenty =
          neededCoins <= coins.twenty ? neededCoins : coins.twenty
        remainingCoins.twenty = coins.twenty - usedCoins.twenty
        remainingCost -= usedCoins.twenty * 20
        if (remainingCost > 0 && coins.ten > 0) {
          const neededCoins = Math.floor(remainingCost / 10)
          usedCoins.ten = neededCoins <= coins.ten ? neededCoins : coins.ten
          remainingCoins.ten = coins.ten - usedCoins.ten
          remainingCost -= usedCoins.ten * 10
          if (remainingCost > 0 && coins.five > 0) {
            const neededCoins = Math.floor(remainingCost / 5)
            usedCoins.five =
              neededCoins <= coins.five ? neededCoins : coins.five
            remainingCoins.five = coins.five - usedCoins.five
            remainingCost -= usedCoins.five * 5
          }
        }
      }
    }
  }

  return {
    usedCoins,
    remainingCost,
    remainingCoins
  }
}

export const prisma = new PrismaClient()
