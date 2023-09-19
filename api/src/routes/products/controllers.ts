import type { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

import type { TokenProfile } from '../../types'
import { calculateDeposit } from '../../utils'

const prisma = new PrismaClient()

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany()
    res.status(200).json(products)
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.user as TokenProfile

  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id: req.params.productId,
        sellerId: id
      }
    })
    res.status(200).json(product)
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { productName, amountAvailable, cost } = req.body
  const { id } = req.user as TokenProfile

  try {
    const product = await prisma.product.create({
      data: {
        sellerId: id,
        amountAvailable,
        productName,
        cost
      }
    })
    res.status(201).json(product)
  } catch (error: any) {
    res.status(400).json({ msg: error.message })
  }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { productName, amountAvailable, cost } = req.body
  const { id } = req.user as TokenProfile

  try {
    const product = await prisma.product.update({
      where: {
        id: req.params.productId,
        sellerId: id
      },
      data: {
        productName,
        amountAvailable,
        cost
      }
    })
    res.status(200).json(product)
  } catch (error: any) {
    res.status(400).json({ msg: error.message })
  }
}

export const removeProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.user as TokenProfile

  try {
    await prisma.product.delete({
      where: {
        id: req.params.productId,
        sellerId: id
      }
    })
    res.status(200)
  } catch (error: any) {
    res.status(400).json({ msg: error.message })
  }
}

export const buyProducts = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.user as TokenProfile

  try {
    const productId = req.params.productId
    const requestedAmount = req.body.amount

    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id: productId
      }
    })

    if (requestedAmount <= product.amountAvailable) {
      const coins = await prisma.coins.findUniqueOrThrow({
        where: {
          buyerId: id
        }
      })

      const totalCost = requestedAmount * product.cost
      const availableDeposit = calculateDeposit(coins)

      if (availableDeposit >= totalCost) {
        await prisma.product.update({
          where: {
            id: productId
          },
          data: {
            amountAvailable: product.amountAvailable - requestedAmount
          }
        })

        // TODO: Solve logic for coins exchange

        res.status(200).json({
          spent: totalCost,
          products: requestedAmount,
          change: []
        })
      } else {
        res.status(500).json({ msg: 'Insufficient funds to fulfill order' })
      }
    } else {
      res.status(500).json({ msg: 'Insufficient stock to fulfill order' })
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}
