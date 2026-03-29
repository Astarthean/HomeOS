import { StatCard } from '@/components/dashboard/stat-card'
import { ExpenseChart } from '@/components/dashboard/expense-chart'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import { mockStats } from '@/lib/mock-data'

export default function DashboardPage() {
  const now = new Date()
  const month = now.toLocaleString('es-ES', { month: 'long' })
  const year = now.getFullYear()

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Buenos días 👋</h1>
        <p className="text-sm mt-1 capitalize" style={{ color: '#475569' }}>
          Resumen financiero · {month} {year}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Saldo total"
          value={`€${mockStats.totalBalance.toLocaleString('es-ES')}`}
          trend={mockStats.balanceTrend}
          accentColor="#10B981"
        />
        <StatCard
          label="Gastos del mes"
          value={`€${mockStats.monthlyExpenses.toLocaleString('es-ES')}`}
          trend={`de €${mockStats.monthlyBudget.toLocaleString('es-ES')} presup.`}
          accentColor="#F59E0B"
        />
        <StatCard
          label="Ingresos del mes"
          value={`€${mockStats.monthlyIncome.toLocaleString('es-ES')}`}
          trend={`${mockStats.accountsCount} cuentas`}
          accentColor="#3B82F6"
        />
      </div>

      {/* Chart + Transactions */}
      <div className="grid grid-cols-5 gap-4" style={{ minHeight: '220px' }}>
        <div className="col-span-3">
          <ExpenseChart />
        </div>
        <div className="col-span-2">
          <RecentTransactions />
        </div>
      </div>
    </div>
  )
}
