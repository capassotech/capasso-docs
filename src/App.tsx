import { useState, useEffect } from 'react'
import type { Project, Subproject, StackBadge } from './types'

const BADGE_CLASSES: Record<string, string> = {
  blue:   'bg-(--blue-500) text-white',
  green:  'bg-(--badge-green-bg) text-(--badge-green-fg)',
  amber:  'bg-(--badge-amber-bg) text-(--badge-amber-fg)',
  purple: 'bg-(--badge-purple-bg) text-(--badge-purple-fg)',
  teal:   'bg-(--badge-teal-bg) text-(--badge-teal-fg)',
}

function Badge({ label, color }: StackBadge) {
  const colors = BADGE_CLASSES[color] ?? 'bg-(--blue-100) text-(--blue-600)'
  return (
    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border-none leading-[1.4] ${colors}`}>
      {label}
    </span>
  )
}
import { projects } from './data/projects'
import { TABS, TAB_LABELS } from './constants'
import { getSession, logout } from './auth'
import { LoginPage } from './components/LoginPage'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { OverviewTab } from './components/tabs/OverviewTab'
import { EstructuraTab } from './components/tabs/EstructuraTab'
import { ModulosTab } from './components/tabs/ModulosTab'
import { EntornosTab } from './components/tabs/EntornosTab'
import { VariablesTab } from './components/tabs/VariablesTab'
import { DeployTab } from './components/tabs/DeployTab'
import { PlataformasTab } from './components/tabs/PlataformasTab'

export default function App() {
  const [authed, setAuthed] = useState<string | null>(() => getSession()?.username ?? null)
  const [currentParent, setCurrentParent] = useState<Project>(projects[0])
  const [currentSubproject, setCurrentSubproject] = useState<Subproject>(projects[0].subprojects[0])
  const [currentTab, setCurrentTab] = useState('overview')
  const [currentEnvGroup, setCurrentEnvGroup] = useState('local')
  const [expandedParents, setExpandedParents] = useState<Set<string>>(new Set([projects[0].id]))
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const s = localStorage.getItem('theme')
    return s === 'dark' || s === 'light' ? s : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleParent = (id: string) => {
    setExpandedParents(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  const selectSubproject = (parentId: string, subId: string) => {
    const parent = projects.find(p => p.id === parentId)
    if (!parent) return
    const sub = parent.subprojects.find(s => s.id === subId)
    if (!sub) return
    setCurrentParent(parent)
    setCurrentSubproject(sub)
    setExpandedParents(prev => new Set([...prev, parentId]))
    setCurrentTab('overview')
    setCurrentEnvGroup('local')
  }

  const handleLogout = () => {
    logout()
    setAuthed(null)
  }

  const renderTab = () => {
    switch (currentTab) {
      case 'overview':    return <OverviewTab sub={currentSubproject} />
      case 'estructura':  return <EstructuraTab sub={currentSubproject} />
      case 'módulos':     return <ModulosTab sub={currentSubproject} />
      case 'entornos':    return <EntornosTab sub={currentSubproject} />
      case 'variables':   return <VariablesTab sub={currentSubproject} currentEnvGroup={currentEnvGroup} onSelectEnvGroup={setCurrentEnvGroup} />
      case 'deploy':      return <DeployTab sub={currentSubproject} />
      case 'plataformas': return <PlataformasTab sub={currentSubproject} parent={currentParent} />
      default:            return null
    }
  }

  if (!authed) {
    return <LoginPage onLogin={setAuthed} />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        projects={projects}
        currentParent={currentParent}
        currentSubproject={currentSubproject}
        expandedParents={expandedParents}
        onToggleParent={toggleParent}
        onSelectSubproject={selectSubproject}
      />

      {/* Shell */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          theme={theme}
          onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          onLogout={handleLogout}
        />

        {/* Main */}
        <main className="flex-1 flex flex-col overflow-hidden bg-(--gray-50) p-5 px-6 pb-6 gap-4 transition-[background-color] duration-200">

          {/* Project header */}
          <div className="bg-(--blue-50) border border-(--blue-100) rounded-xl px-6 pt-[22px] shrink-0 transition-[background-color,border-color] duration-200">
            <div className="text-[11px] font-semibold text-(--blue-500) uppercase tracking-[0.05em] mb-1">
              {currentParent.name}
            </div>
            <div className="text-[24px] font-bold text-(--gray-900) tracking-tight mb-1 leading-[1.2]">
              {currentSubproject.name}
            </div>
            <div className="text-[13px] text-(--gray-600) leading-relaxed mb-3.5 max-w-3xl">
              {currentSubproject.description}
            </div>

            {/* Stack badges */}
            <div className="flex flex-wrap gap-2 mb-[18px]">
              {currentSubproject.stack.map((s, i) => (
                <Badge key={i} {...s} />
              ))}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-0.5 border-t border-(--tabs-divider) mt-1">
              {TABS.map(t => (
                <div
                  key={t}
                  onClick={() => setCurrentTab(t)}
                  className={[
                    'px-4 py-3 text-[13px] cursor-pointer border-b-2 -mb-px transition-[color,border-color] duration-150 select-none',
                    t === currentTab
                      ? 'text-(--blue-500) border-(--blue-500) font-semibold'
                      : 'text-(--gray-500) border-transparent font-medium hover:text-(--gray-700)',
                  ].join(' ')}
                >
                  {TAB_LABELS[t]}
                </div>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto bg-(--surface) border border-(--gray-200) rounded-xl px-7 py-6 shadow-(--shadow-card) transition-[background-color,border-color] duration-200 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-(--gray-300) [&::-webkit-scrollbar-thumb]:rounded-full">
            {renderTab()}
          </div>

        </main>
      </div>
    </div>
  )
}
