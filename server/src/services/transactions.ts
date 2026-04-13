import pool from '../db'
import { Transaction, CreateTransactionInput, UpdateTransactionInput } from '../types'

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const { rows } = await pool.query<Transaction>(
    `SELECT * FROM transactions
     ORDER BY date DESC NULLS LAST, created_at DESC`
  )
  return rows
}

export const createTransaction = async (
  data: CreateTransactionInput
): Promise<Transaction> => {
  const { amount, type, category = null, description = null, date = null } = data
  const { rows } = await pool.query<Transaction>(
    `INSERT INTO transactions (amount, type, category, description, date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [amount, type, category, description, date]
  )
  return rows[0]
}

export const updateTransaction = async (
  id: string,
  data: UpdateTransactionInput
): Promise<Transaction | null> => {
  const { amount, type, category, description, date } = data
  const { rows } = await pool.query<Transaction>(
    `UPDATE transactions
     SET amount      = COALESCE($2, amount),
         type        = COALESCE($3, type),
         category    = COALESCE($4, category),
         description = COALESCE($5, description),
         date        = COALESCE($6, date)
     WHERE id = $1
     RETURNING *`,
    [id, amount ?? null, type ?? null, category ?? null, description ?? null, date ?? null]
  )
  return rows[0] ?? null
}

export const deleteTransaction = async (id: string): Promise<boolean> => {
  const { rowCount } = await pool.query(
    'DELETE FROM transactions WHERE id = $1',
    [id]
  )
  return (rowCount ?? 0) > 0
}
