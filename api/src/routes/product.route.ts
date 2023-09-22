import type { RequestHandler } from 'express'

import passport from 'passport'
import express from 'express'

import {
  createProduct,
  updateProduct,
  removeProduct,
  getProductById,
  getProducts,
  buyProducts
} from '../controllers/product.controller'
import { elevateBuyerRole, elevateSellerRole } from '../middlewares'

const router = express.Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  elevateSellerRole as RequestHandler,
  createProduct as RequestHandler
)
router.post(
  '/:productId/buy',
  passport.authenticate('jwt', { session: false }),
  elevateBuyerRole as RequestHandler,
  buyProducts as RequestHandler
)
router.put(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  elevateSellerRole as RequestHandler,
  updateProduct as RequestHandler
)
router.delete(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  elevateSellerRole as RequestHandler,
  removeProduct as RequestHandler
)
router.get(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  elevateSellerRole as RequestHandler,
  getProductById as RequestHandler
)
router.get('/', getProducts as RequestHandler)

export default router
