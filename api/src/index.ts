import type { Express, Request, Response } from 'express'
import type { VerifiedCallback } from 'passport-jwt'

import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaClient } from '@prisma/client'

import passport from 'passport'
import express from 'express'
import dotenv from 'dotenv'

import users from './routes/users'
import products from './routes/products'

dotenv.config()

const app: Express = express()
const prisma = new PrismaClient()
const port = process.env.PORT

app.use(express.json())

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.API_SECRET
}, (payload: any, done: VerifiedCallback) => {
  prisma.user.findUniqueOrThrow({ where: { id: payload.id } })
    .then((user) => { done(null, user) })
    .catch((err) => { done(err, false) })
}))

app.get('/', (req: Request, res: Response) => {
  res.send({ health: 'OK' })
})

app.use('/users', users)
app.use('/products', products)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

export default app
