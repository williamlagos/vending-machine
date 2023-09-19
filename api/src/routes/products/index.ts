import type { RequestHandler } from 'express'

import passport from 'passport'
import express from 'express'

import { createProduct, updateProduct, removeProduct, getProductById, getProducts } from './controllers'
import { elevateSellerRole } from '../../middlewares'

const router = express.Router()

// TODO: Manage authentication via roles in these endpoints
router.post('/', passport.authenticate('jwt', { session: false }), elevateSellerRole as RequestHandler, createProduct as RequestHandler)
router.put('/:productId', passport.authenticate('jwt', { session: false }), elevateSellerRole as RequestHandler, updateProduct as RequestHandler)
router.delete('/:productId', passport.authenticate('jwt', { session: false }), elevateSellerRole as RequestHandler, removeProduct as RequestHandler)
router.get('/:productId', passport.authenticate('jwt', { session: false }), elevateSellerRole as RequestHandler, getProductById as RequestHandler)
router.get('/', getProducts as RequestHandler)

export default router
