'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Por favor, rellena todos los campos')
      return
    }

    setLoading(true)
    try {
      // TODO: conectar con POST /users/login
      // const res = await fetch(`${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/users/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // })
      // const data = await res.json()
      // if (!res.ok) throw new Error(data.message)
      // document.cookie = `access_token=${data.access_token}; path=/`

      // Mock: simular login exitoso
      document.cookie = 'access_token=mock-token; path=/'
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              boxShadow: '0 0 24px #3B82F640',
            }}
          >
            <Shield className="text-white" size={26} />
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-1">Bienvenido de nuevo</h1>
          <p className="text-sm" style={{ color: '#64748B' }}>Inicia sesión en HomeOS</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-2xl p-6 flex flex-col gap-5 border"
          style={{ background: '#111', borderColor: '#1E293B' }}
        >
          <div className="flex flex-col gap-2">
            <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color: '#94A3B8' }}>
              <Mail size={12} /> Email
            </Label>
            <Input
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="h-11 border text-white placeholder:text-slate-600"
              style={{ background: '#0a0a0a', borderColor: '#1E293B' }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color: '#94A3B8' }}>
              <Lock size={12} /> Contraseña
            </Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="h-11 border text-white placeholder:text-slate-600"
              style={{ background: '#0a0a0a', borderColor: '#1E293B' }}
            />
          </div>

          {error && (
            <p className="text-xs text-center" style={{ color: '#F87171' }}>{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="h-11 font-bold text-white border-0"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)', boxShadow: '0 4px 16px #3B82F640' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          <p className="text-center text-xs" style={{ color: '#64748B' }}>
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="font-bold" style={{ color: '#3B82F6' }}>
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
