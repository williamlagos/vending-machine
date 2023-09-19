import type { Express, Request, Response } from 'express'
import type { VerifiedCallback } from 'passport-jwt'

import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaClient } from '@prisma/client'

import passport from 'passport'
import express from 'express'
import dotenv from 'dotenv'

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
    .then((user) => done(null, user))
    .catch((err) => done(err, false))
}))

app.get('/', (req: Request, res: Response) => {
  res.send({ health: 'OK' })
})

app.get('/users', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
  prisma.user.findMany()
    .then((users) => res.send(users))
    .catch((err) => res.send(err))
})

app.post('/users', (req: Request, res: Response) => {
  const { username, password, role } = req.body
  prisma.user.create({
    data: {
      deposit: 0,
      username,
      password,
      role
    }
  }).then((user) => res.send(user))
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

export default app
