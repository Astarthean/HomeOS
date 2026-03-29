interface StatCardProps {
  label: string
  value: string
  trend?: string
  accentColor: string
}

export function StatCard({ label, value, trend, accentColor }: StatCardProps) {
  return (
    <div
      className="rounded-2xl p-5 border"
      style={{ background: '#111', borderColor: '#1E293B' }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#64748B' }}>
        {label}
      </p>
      <p className="text-2xl font-extrabold" style={{ color: accentColor }}>
        {value}
      </p>
      {trend && (
        <p className="text-xs mt-2" style={{ color: '#334155' }}>
          {trend}
        </p>
      )}
    </div>
  )
}
