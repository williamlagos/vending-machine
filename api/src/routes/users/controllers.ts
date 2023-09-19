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

export const getUsersById = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findUniqueOrThrow({
      where: {
        id: req.params.userId
      }
    })
    res.status(200).json(users)
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, role } = req.body

  try {
    const user = await prisma.user.create({
      data: {
        deposit: 0,
        username,
        password,
        role
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
    res.status(400).json({ msg: error.message })
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
    res.status(400).json({ msg: error.message })
  }
}
