import { mockTransactions } from '@/lib/mock-data'

export function RecentTransactions() {
  return (
    <div
      className="rounded-2xl p-5 border h-full"
      style={{ background: '#111', borderColor: '#1E293B' }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#94A3B8' }}>
        Últimas transacciones
      </p>
      <div className="flex flex-col gap-3">
        {mockTransactions.map(tx => (
          <div key={tx.id} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">{tx.description}</p>
              <p className="text-xs" style={{ color: '#475569' }}>{tx.date}</p>
            </div>
            <span
              className="text-sm font-bold"
              style={{ color: tx.type === 'income' ? '#10B981' : '#F87171' }}
            >
              {tx.type === 'income' ? '+' : ''}€{Math.abs(tx.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
