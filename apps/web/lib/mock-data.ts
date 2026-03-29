export const mockStats = {
  totalBalance: 3240,
  monthlyExpenses: 1180,
  monthlyBudget: 1500,
  monthlyIncome: 1600,
  accountsCount: 2,
  balanceTrend: '+€420 este mes',
}

export const mockExpenseCategories = [
  { name: 'Alim.', amount: 420, color: '#3B82F6', percentage: 75 },
  { name: 'Casa',  amount: 320, color: '#8B5CF6', percentage: 55 },
  { name: 'Transp.', amount: 210, color: '#10B981', percentage: 40 },
  { name: 'Ocio',  amount: 150, color: '#F59E0B', percentage: 30 },
  { name: 'Otros', amount: 80,  color: '#EC4899', percentage: 20 },
]

export type TransactionType = 'income' | 'expense'

export interface MockTransaction {
  id: string
  description: string
  amount: number
  type: TransactionType
  date: string
}

export const mockTransactions: MockTransaction[] = [
  { id: '1', description: 'Mercadona',    amount: -68,  type: 'expense', date: '28 mar' },
  { id: '2', description: 'Nómina',       amount: 800,  type: 'income',  date: '27 mar' },
  { id: '3', description: 'Netflix',      amount: -18,  type: 'expense', date: '25 mar' },
  { id: '4', description: 'Gasolina',     amount: -55,  type: 'expense', date: '24 mar' },
  { id: '5', description: 'Supermercado', amount: -42,  type: 'expense', date: '22 mar' },
]
