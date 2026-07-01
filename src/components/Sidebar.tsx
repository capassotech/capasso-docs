import type { Project, Subproject } from '../types'

interface Props {
  projects: Project[]
  currentParent: Project
  currentSubproject: Subproject
  expandedParents: Set<string>
  onToggleParent: (id: string) => void
  onSelectSubproject: (parentId: string, subId: string) => void
}

export function Sidebar({
  projects,
  currentParent,
  currentSubproject,
  expandedParents,
  onToggleParent,
  onSelectSubproject,
}: Props) {
  return (
    <aside className="w-[220px] min-w-[220px] bg-(--surface) border-r border-(--gray-200) flex flex-col overflow-y-auto transition-[background-color,border-color] duration-200">

      {/* Header */}
      <div className="px-[18px] pt-5 pb-2">
        <span className="text-[13px] font-semibold text-(--gray-500)">Documentación</span>
      </div>

      {/* Projects label */}
      <div className="text-[11px] font-semibold text-(--gray-400) uppercase tracking-[0.06em] px-[18px] pt-3 pb-1.5">
        Proyectos
      </div>

      {/* Project list */}
      <div className="px-2 pb-4 pt-1">
        {projects.map(parent => {
          const isExpanded = expandedParents.has(parent.id)
          return (
            <div key={parent.id} className="mb-1">

              {/* Parent toggle */}
              <button
                type="button"
                onClick={() => onToggleParent(parent.id)}
                aria-expanded={isExpanded}
                className={[
                  'w-full min-h-9 px-2.5 py-2 border-none cursor-pointer flex items-center gap-2 rounded-lg text-left font-[inherit] appearance-none transition-[background] duration-150',
                  isExpanded ? 'bg-(--blue-50)' : 'bg-transparent hover:bg-(--gray-50)',
                ].join(' ')}
              >
                {/* Chevron */}
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className={`shrink-0 opacity-55 transition-transform duration-150 text-(--gray-600) ${isExpanded ? 'rotate-90' : ''}`}
                  aria-hidden="true"
                >
                  <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {/* Dot + name */}
                <span className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0 block" style={{ background: parent.color }} />
                  <span className="text-[13px] font-semibold text-(--gray-700) leading-none flex-1 min-w-0 truncate">
                    {parent.name}
                  </span>
                </span>

                {/* Count badge */}
                <span className="text-[10px] font-semibold text-(--gray-500) bg-(--gray-100) px-1.5 py-0.5 rounded-full shrink-0 leading-none inline-flex items-center justify-center">
                  {parent.subprojects.length}
                </span>
              </button>

              {/* Subproject list */}
              {isExpanded && (
                <div
                  role="group"
                  aria-label={parent.name}
                  className="ml-2.5 pl-2 border-l border-(--gray-200) pt-0.5 pb-1.5"
                >
                  {parent.subprojects.map(sub => {
                    const isActive = currentParent.id === parent.id && currentSubproject.id === sub.id
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => onSelectSubproject(parent.id, sub.id)}
                        className={[
                          'w-full block px-3.5 py-[7px] mb-px border-none rounded-md cursor-pointer text-left font-[inherit] transition-[background,color] duration-150',
                          isActive ? 'bg-(--blue-50)' : 'bg-transparent hover:bg-(--gray-50)',
                        ].join(' ')}
                      >
                        <span className={[
                          'text-[11px] leading-[1.35]',
                          isActive
                            ? 'font-semibold text-(--blue-500)'
                            : 'font-medium text-(--gray-600)',
                        ].join(' ')}>
                          {sub.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

            </div>
          )
        })}
      </div>

    </aside>
  )
}
