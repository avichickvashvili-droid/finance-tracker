import { Router } from 'express'
import * as transactionsController from '../controllers/transactions'

const router = Router()

router.get('/', transactionsController.getTransactions)
router.post('/', transactionsController.createTransaction)
router.put('/:id', transactionsController.updateTransaction)
router.delete('/:id', transactionsController.deleteTransaction)

export default router
