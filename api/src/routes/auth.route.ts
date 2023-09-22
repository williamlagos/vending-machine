import type { RequestHandler } from 'express'

import express from 'express'

import { authenticate } from '../controllers/auth.controller'

const router = express.Router()

router.post('/', authenticate as RequestHandler)

export default router
