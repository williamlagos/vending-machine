import type { RequestHandler } from 'express'

import express from 'express'

import { authenticate } from './controllers'

const router = express.Router()

router.post('/', authenticate as RequestHandler)

export default router
