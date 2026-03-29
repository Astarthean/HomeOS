'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Wallet,
  ShoppingCart,
  LogOut,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard',  label: 'Dashboard', icon: LayoutDashboard },
  { href: '/finanzas',   label: 'Finanzas',  icon: Wallet },
  { href: '/compras',    label: 'Compras',   icon: ShoppingCart },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = 'access_token=; path=/; max-age=0'
    router.push('/login')
  }

  return (
    <aside
      className="w-[220px] flex-shrink-0 flex flex-col h-screen sticky top-0 border-r"
      style={{ background: '#0a0a0a', borderColor: '#1a1a1a' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 mb-2">
        <div
          className="w-7 h-7 rounded-lg flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}
        />
        <span className="font-extrabold text-white text-base">HomeOS</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: active ? '#1E3A5F' : 'transparent',
                color: active ? '#3B82F6' : '#64748B',
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer: logout */}
      <div className="px-3 pb-4 border-t pt-4" style={{ borderColor: '#1a1a1a' }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full transition-colors hover:opacity-80"
          style={{ color: '#64748B' }}
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
