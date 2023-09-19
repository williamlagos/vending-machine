import type { Request, Response, NextFunction } from 'express'

import { PrismaClient, Role } from '@prisma/client'
import jwt from 'jsonwebtoken'

import type { TokenProfile } from '../types'

const prisma = new PrismaClient()

const extractTokenProfile = async (token: string): Promise<TokenProfile> => {
  const apiSecret = process.env.API_SECRET ?? ''
  const bearerToken = token.substring(7, token.length)
  const { id }: any = jwt.verify(bearerToken, apiSecret)
  const user = await prisma.user.findUniqueOrThrow({ where: { id } })
  return { id: user.id, role: user.role }
}

export const elevateSellerRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const tokenProfile = await extractTokenProfile(req.headers.authorization ?? '')
  if (tokenProfile.role === Role.SELLER) {
    req.user = tokenProfile
    next()
  } else {
    res.status(403).json({ msg: 'You need to be a seller to operate this endpoint' })
  }
}

export const elevateBuyerRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const tokenProfile = await extractTokenProfile(req.headers.authorization ?? '')
  if (tokenProfile.role === Role.BUYER) {
    req.user = tokenProfile
    next()
  } else {
    res.status(403).json({ msg: 'You need to be a buyer to operate this endpoint' })
  }
}
