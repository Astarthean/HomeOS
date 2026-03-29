export default function FinanzasPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Finanzas</h1>
        <p className="text-sm mt-1" style={{ color: '#475569' }}>
          Cuentas y transacciones
        </p>
      </div>
      <div
        className="rounded-2xl border p-12 flex items-center justify-center"
        style={{ background: '#111', borderColor: '#1E293B', borderStyle: 'dashed' }}
      >
        <p className="text-sm" style={{ color: '#334155' }}>Próximamente</p>
      </div>
    </div>
  )
}
