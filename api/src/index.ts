import type { Express, Request, Response } from 'express'
import type { VerifiedCallback } from 'passport-jwt'

import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaClient } from '@prisma/client'

import passport from 'passport'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import users from './routes/users'
import products from './routes/products'
import specs from '../openapi.json'

dotenv.config()

const app: Express = express()
const prisma = new PrismaClient()
const port = process.env.PORT

const API_PREFIX = '/api/v1'

app.use(express.json())
app.use(cors())

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.API_SECRET
}, (payload: any, done: VerifiedCallback) => {
  prisma.user.findUniqueOrThrow({ where: { id: payload.id } })
    .then((user) => { done(null, user) })
    .catch((err) => { done(err, false) })
}))

app.use(
  `${API_PREFIX}/docs`,
  swaggerUi.serve,
  swaggerUi.setup(specs)
)

app.get(`${API_PREFIX}/openapi.json`, (req: Request, res: Response) => {
  res.send(specs)
})

app.use(`${API_PREFIX}/users`, users)
app.use(`${API_PREFIX}/products`, products)

app.get(`${API_PREFIX}/`, (req: Request, res: Response) => {
  res.send({ health: 'OK' })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

export default app
