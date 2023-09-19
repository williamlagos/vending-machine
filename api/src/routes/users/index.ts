import type { RequestHandler } from 'express'

import passport from 'passport'
import express from 'express'

import { createUser, updateUser, removeUser, getUsersById, getUsers, depositCoins, resetCoins } from './controllers'
import { elevateBuyerRole } from '../../middlewares'

const router = express.Router()

router.post('/', createUser as RequestHandler)
router.put('/:userId', passport.authenticate('jwt', { session: true }), updateUser as RequestHandler)
router.delete('/:userId', passport.authenticate('jwt', { session: false }), removeUser as RequestHandler)
router.post('/:userId/deposit', passport.authenticate('jwt', { session: false }), elevateBuyerRole as RequestHandler, depositCoins as RequestHandler)
router.post('/:userId/reset', passport.authenticate('jwt', { session: false }), elevateBuyerRole as RequestHandler, resetCoins as RequestHandler)
router.get('/:userId', passport.authenticate('jwt', { session: false }), getUsersById as RequestHandler)
router.get('/', passport.authenticate('jwt', { session: false }), getUsers as RequestHandler)

export default router
