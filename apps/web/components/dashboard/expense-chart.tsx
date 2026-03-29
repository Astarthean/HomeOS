import { mockExpenseCategories } from '@/lib/mock-data'

export function ExpenseChart() {
  return (
    <div
      className="rounded-2xl p-5 border h-full"
      style={{ background: '#111', borderColor: '#1E293B' }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#94A3B8' }}>
        Gastos por categoría
      </p>
      <div className="flex items-end gap-3 h-24">
        {mockExpenseCategories.map(cat => (
          <div key={cat.name} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full rounded-t-md"
              style={{
                height: `${cat.percentage}%`,
                background: `linear-gradient(to top, ${cat.color}, ${cat.color}99)`,
                minHeight: '8px',
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-3">
        {mockExpenseCategories.map(cat => (
          <div key={cat.name} className="flex-1 text-center">
            <p className="text-xs" style={{ color: '#475569' }}>{cat.name}</p>
            <p className="text-xs font-semibold" style={{ color: cat.color }}>€{cat.amount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
