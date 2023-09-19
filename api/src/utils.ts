import type { Coins } from '@prisma/client'

export const calculateDeposit = (coins: Coins): number => {
  let deposit = 0
  deposit += coins.five * 5
  deposit += coins.ten * 10
  deposit += coins.twenty * 20
  deposit += coins.fifty * 50
  deposit += coins.hundred * 100
  return deposit
}
