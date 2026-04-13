import { Router } from 'express'
import transactionRoutes from './transactions'

const router = Router()

router.use('/transactions', transactionRoutes)

export default router
