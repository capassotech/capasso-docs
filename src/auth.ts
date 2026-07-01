
const user = "admin@capassotech.com"
const pass = "capassodocs2026"

const SESSION_KEY = 'capasso_docs_session'
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000

interface AuthSession {
  token: string
  username: string
  expiresAt: number
}

export function getSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session: AuthSession = JSON.parse(raw)
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return session
  } catch {
    return null
  }
}

export function login(username: string, password: string): AuthSession | null {
  if (username != user || password != pass) return null

  const session: AuthSession = {
    token: crypto.randomUUID(),
    username: username.toLowerCase().trim(),
    expiresAt: Date.now() + SESSION_DURATION,
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY)
}
