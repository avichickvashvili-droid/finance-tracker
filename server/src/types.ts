// ---------------------------------------------------------------
// Domain types shared across routes / controllers / services
// ---------------------------------------------------------------

/** Row returned by the DB. pg returns NUMERIC as string — noted here
 *  so callers know to expect "100.00" not 100. */
export interface Transaction {
  id: number
  amount: string         // pg maps NUMERIC → string; parse in consumers as needed
  type: 'income' | 'expense'
  category: string | null
  description: string | null
  date: Date | null
  created_at: Date
}

export interface CreateTransactionInput {
  amount: number
  type: 'income' | 'expense'
  category?: string
  description?: string
  date?: string          // ISO-8601 string from JSON body
}

export interface UpdateTransactionInput {
  amount?: number
  type?: 'income' | 'expense'
  category?: string
  description?: string
  date?: string
}
