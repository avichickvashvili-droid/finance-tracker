import { Request, Response } from 'express'
import * as transactionService from '../services/transactions'
import { CreateTransactionInput, UpdateTransactionInput } from '../types'

export const getTransactions = async (_req: Request, res: Response): Promise<void> => {
  const transactions = await transactionService.getAllTransactions()
  res.json(transactions)
}

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  const transaction = await transactionService.createTransaction(
    req.body as CreateTransactionInput
  )
  res.status(201).json(transaction)
}

export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string
  const transaction = await transactionService.updateTransaction(
    id,
    req.body as UpdateTransactionInput
  )
  if (!transaction) {
    res.status(404).json({ error: 'Transaction not found' })
    return
  }
  res.json(transaction)
}

export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string
  const deleted = await transactionService.deleteTransaction(id)
  if (!deleted) {
    res.status(404).json({ error: 'Transaction not found' })
    return
  }
  res.status(204).send()
}
