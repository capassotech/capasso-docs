interface Props {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onLogout: () => void
}

export function Topbar({ onToggleTheme, onLogout }: Props) {
  return (
    <header className="flex items-center gap-3.5 h-14 px-6 bg-(--surface) border-b border-(--gray-200) shrink-0 transition-[background-color,border-color] duration-200">

      {/* Brand */}
      <div className="flex items-center shrink-0 leading-none">
        <img
          src="https://tracker.capasso.tech/logo.png"
          alt="Capasso Tech"
          className="block h-[60px] w-auto max-w-[160px] object-contain"
        />
      </div>

      <span className="w-px h-5 bg-(--gray-200)" aria-hidden="true" />
      <span className="text-[13px] font-medium text-(--gray-500)">Documentación de proyectos</span>

      <div className="flex-1" />

      {/* Logout */}
      <button
        type="button"
        onClick={onLogout}
        title="Cerrar sesión"
        className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium font-[inherit] text-(--gray-500) bg-transparent border border-(--gray-200) rounded-[10px] cursor-pointer mr-0.5 transition-[color,border-color,background] duration-150 hover:text-(--gray-700) hover:border-(--gray-300) hover:bg-(--gray-100)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span>Salir</span>
      </button>

      {/* Theme toggle */}
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label="Cambiar tema"
        title="Cambiar tema"
        className="w-9 h-9 rounded-lg border border-(--gray-200) bg-(--gray-50) text-(--gray-600) cursor-pointer flex items-center justify-center shrink-0 transition-[background,border-color,color] duration-150 hover:bg-(--blue-50) hover:border-(--blue-100) hover:text-(--blue-500) font-[inherit]"
      >
        {/* Sun: visible only in dark mode */}
        <span className="hidden dark:flex items-center justify-center" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            />
          </svg>
        </span>
        {/* Moon: visible in light mode / default */}
        <span className="flex dark:hidden items-center justify-center" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

    </header>
  )
}
