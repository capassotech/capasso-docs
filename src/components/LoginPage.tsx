import { useState, type FormEvent } from 'react'
import { login } from '../auth'
import { Eye, EyeOff } from 'lucide-react'

interface LoginPageProps {
  onLogin: (username: string) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!username.trim() || !password) {
      setError('Completá todos los campos.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const session = login(username, password)
      if (session) {
        onLogin(session.username)
      } else {
        setError('Usuario o contraseña incorrectos.')
        setLoading(false)
      }
    }, 300)
  }

  const inputBase = [
    'w-full px-3.5 py-2.5 text-[13px] font-[inherit]',
    'text-(--gray-900) bg-(--gray-50)',
    'border border-(--gray-200) rounded-[10px] outline-none',
    'placeholder:text-(--gray-400)',
    'transition-[border-color,box-shadow,background] duration-150',
    'focus:border-(--blue-400) focus:shadow-[0_0_0_3px_var(--blue-50)] focus:bg-(--surface)',
  ].join(' ')

  const labelClass = 'block text-[11px] font-semibold text-(--gray-600) uppercase tracking-[0.05em] mb-[7px]'

  return (
    <div className="flex items-center justify-center min-h-screen bg-(--gray-50)">
      <div className="bg-(--surface) border border-(--gray-200) rounded-xl px-11 py-10 w-full max-w-[400px] shadow-[0_4px_24px_rgba(0,0,0,0.07)]">

        {/* Logo */}
        <div className="flex justify-center mb-7">
          <img src="https://tracker.capasso.tech/logo.png" alt="Capasso" width="40" height="40" />
        </div>

        {/* Heading */}
        <h1 className="text-[22px] font-bold text-(--gray-900) text-center tracking-tight mb-1.5">
          Capasso Docs
        </h1>
        <p className="text-[13px] text-(--gray-500) text-center mb-7 leading-relaxed">
          Ingresá tus credenciales para continuar
        </p>

        <form onSubmit={handleSubmit} noValidate>

          {/* Usuario */}
          <div className="mb-4">
            <label className={labelClass} htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              className={inputBase}
              placeholder="admin@capassotech.com"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
            />
          </div>

          {/* Contraseña */}
          <div className="mb-4">
            <label className={labelClass} htmlFor="password">Contraseña</label>
            <div className={[
              'flex items-center gap-2 px-3.5',
              'bg-(--gray-50) border border-(--gray-200) rounded-[10px]',
              'transition-[border-color,box-shadow,background] duration-150',
              'focus-within:border-(--blue-400) focus-within:shadow-[0_0_0_3px_var(--blue-50)] focus-within:bg-(--surface)',
            ].join(' ')}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="flex-1 py-2.5 text-[13px] font-[inherit] text-(--gray-900) bg-transparent border-none outline-none placeholder:text-(--gray-400)"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {showPassword ? (
                <EyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  size={15}
                  className="text-(--gray-400) shrink-0 cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(!showPassword)}
                  size={15}
                  className="text-(--gray-400) shrink-0 cursor-pointer"
                />
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 px-4 py-[11px] text-[13px] font-semibold font-[inherit] tracking-[0.01em] text-white bg-(--blue-500) rounded-[10px] cursor-pointer border-none transition-[background,opacity] duration-150 hover:bg-(--blue-600) disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 mt-3.5 px-3.5 py-2.5 text-[11px] leading-relaxed text-red-600 bg-red-50 border border-red-200 rounded-[10px] dark:text-red-300 dark:bg-red-950/30 dark:border-red-900">
              {error}
            </div>
          )}

        </form>
      </div>
    </div>
  )
}
