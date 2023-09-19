import type { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

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
  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id: req.params.productId
      }
    })
    res.status(200).json(product)
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { productName, amountAvailable, cost } = req.body

  try {
    // TODO: Extract the payload correctly to assign the proper seller id
    const seller = await prisma.user.findUniqueOrThrow({
      where: {
        id: req.headers.authorization
      }
    })
    const product = await prisma.product.create({
      data: {
        sellerId: seller.id,
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

  try {
    const product = await prisma.product.update({
      where: {
        id: req.params.productId
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
  try {
    await prisma.product.delete({
      where: {
        id: req.params.productId
      }
    })
    res.status(200)
  } catch (error: any) {
    res.status(400).json({ msg: error.message })
  }
}

export const buyProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId
    const requestedAmount = req.body.amount

    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id: productId
      }
    })

    if (requestedAmount <= product.amountAvailable) {
      await prisma.product.update({
        where: {
          id: productId
        },
        data: {
          amountAvailable: product.amountAvailable - requestedAmount
        }
      })

      // TODO: implement coins logic
      res.status(200).json({
        spent: requestedAmount * product.cost,
        products: requestedAmount,
        change: []
      })
    } else {
      res.status(500).json({ msg: 'Insufficient stock to fulfill order' })
    }
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}
