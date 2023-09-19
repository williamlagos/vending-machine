import type { RequestHandler } from 'express'

import passport from 'passport'
import express from 'express'

import { createProduct, updateProduct, removeProduct, getProductById, getProducts } from './controllers'

const router = express.Router()

// TODO: Manage authentication via roles in these endpoints
router.post('/', passport.authenticate('jwt', { session: true }), createProduct as RequestHandler)
router.put('/:productId', passport.authenticate('jwt', { session: true }), updateProduct as RequestHandler)
router.delete('/:productId', passport.authenticate('jwt', { session: false }), removeProduct as RequestHandler)
router.get('/:productId', passport.authenticate('jwt', { session: false }), getProductById as RequestHandler)
router.get('/', getProducts as RequestHandler)

export default router
