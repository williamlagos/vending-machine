import type { Request, Response } from 'express'

import jwt from 'jsonwebtoken'

import { prisma } from '../utils'

export const authenticate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        username,
        password
      }
    })
    const token = jwt.sign(
      { id: user.id },
      process.env.API_SECRET ?? ''
      /* TODO: replace this access token with a refresh token mechanism,
       * and adding expiry time for security reasons
      {
        expiresIn: '1h'
      } */
    )
    res.status(200).json({ token })
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}
