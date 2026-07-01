import type { Project, Subproject, PlatformGroup } from '../../types'
import { SubsectionTitle, EmptyState } from '../shared'

export function PlataformasTab({ sub, parent }: { sub: Subproject; parent: Project }) {
  const seen = new Set<string>()
  const groups: PlatformGroup[] = []
  for (const g of [...(sub.platforms || []), ...(parent.platforms || [])]) {
    if (seen.has(g.category)) continue
    seen.add(g.category)
    groups.push(g)
  }
  if (!groups.length) return <EmptyState message="No hay plataformas documentadas para este subproyecto." />
  return (
    <div>
      {groups.map(group => {
        if (!group.links.length) return null
        return (
          <div key={group.category}>
            <SubsectionTitle title={group.category} />
            <div className="flex flex-col gap-2.5 mb-2">
              {group.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 px-[18px] py-3.5 bg-(--gray-50) border border-(--gray-200) rounded-[10px] no-underline text-inherit transition-[background,border-color,box-shadow] duration-150 hover:bg-(--blue-50) hover:border-(--blue-100) hover:shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-(--gray-900)">{link.label}</div>
                    {link.desc && (
                      <div className="text-[11px] text-(--gray-500) mt-1 leading-[1.45]">{link.desc}</div>
                    )}
                  </div>
                  <span className="shrink-0 text-[11px] font-semibold text-(--blue-500) bg-(--surface) border border-(--blue-100) rounded-full px-3 py-[5px] whitespace-nowrap group-hover:bg-(--blue-100) group-hover:border-(--blue-400)">
                    Abrir ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
