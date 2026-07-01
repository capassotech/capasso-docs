import type { Subproject } from '../../types'
import { SubsectionTitle, EmptyState, SectionTitle } from '../shared'

export function DeployTab({ sub }: { sub: Subproject }) {
  const deploys = sub.deploys || []
  if (!deploys.length) return <EmptyState message="No hay configuración de deploy documentada." />
  return (
    <>
      <SectionTitle title="Configuración de deploys" />
      {deploys.map((d, i) => (
        <div key={i} className="bg-(--gray-50) border border-(--gray-200) rounded-[10px] px-[18px] py-4 mb-3 last:mb-0 transition-[background-color,border-color] duration-200">
          {/* Title with icon */}
          <div className="text-[13px] font-bold text-(--gray-900) mb-3 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-(--blue-50) flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue-500)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
            {d.title}
          </div>

          {/* Rows */}
          {(d.rows || []).map((r, j) => (
            <div key={j} className="text-[13px] text-(--gray-600) mb-2 flex gap-3 leading-relaxed py-2 border-b border-(--gray-200) last:mb-0 last:border-b-0 last:pb-0">
              <span className="text-(--gray-500) min-w-[120px] shrink-0 text-[11px] font-semibold uppercase tracking-[0.04em]">
                {r.key}
              </span>
              <span className="text-(--gray-900) font-mono text-[11px] break-all">{r.value}</span>
            </div>
          ))}

          {/* Checklist */}
          {(d.checklist?.length ?? 0) > 0 && (
            <>
              <SubsectionTitle title="Checklist pre-deploy" />
              <ul className="list-none flex flex-col gap-2 mt-2 pt-3.5 border-t border-(--gray-200)">
                {d.checklist!.map((item, k) => (
                  <li key={k} className="flex items-start gap-2.5 text-[13px] text-(--gray-700) leading-relaxed">
                    <span className="text-(--blue-500) shrink-0 text-[14px]" aria-hidden="true">☑</span>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </>
  )
}
