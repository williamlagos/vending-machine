import type { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: req.params.userId
      }
    })
    const coins = await prisma.coins.findUniqueOrThrow({
      where: {
        buyerId: user.id
      }
    })
    res.status(200).json({ user, coins })
  } catch (error: any) {
    res.status(404).json({ msg: error.message })
  }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, role } = req.body

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
        role
      }
    })
    await prisma.coins.create({
      data: {
        buyerId: user.id
      }
    })
    res.status(201).json(user)
  } catch (error: any) {
    res.status(400).json({ msg: error.message })
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { deposit, username, password, role } = req.body

  try {
    const user = await prisma.user.update({
      where: {
        id: req.params.userId
      },
      data: {
        deposit,
        username,
        password,
        role
      }
    })
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}

export const removeUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.userId
      }
    })
    res.status(200)
  } catch (error: any) {
    res.status(404).json({ msg: error.message })
  }
}

export const depositCoins = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.coins.update({
      where: {
        id: req.params.userId
      },
      data: req.body
    })
    res.status(200)
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}

export const resetCoins = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.coins.update({
      where: {
        buyerId: req.params.userId
      },
      data: {
        five: 0,
        ten: 0,
        twenty: 0,
        fifty: 0,
        hundred: 0
      }
    })
    res.status(200)
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}
