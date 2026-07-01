import type { Subproject } from '../../types'
import { SubsectionTitle, EmptyState } from '../shared'

export function OverviewTab({ sub }: { sub: Subproject }) {
  const ov = sub.overview
  if (!ov) return <EmptyState message="No hay información de overview para este subproyecto." />
  return (
    <div>
      <SubsectionTitle title="Acerca de" />
      <p className="text-[13px] text-(--gray-700) leading-[1.75] mb-1">{ov.about}</p>

      <SubsectionTitle title="Objetivo" />
      <blockquote className="border-l-[3px] border-(--blue-500) pl-[18px] pr-4 py-3.5 bg-(--blue-50) rounded-r-[10px] text-[13px] text-(--gray-700) leading-[1.65] mb-1">
        {ov.objective}
      </blockquote>

      <SubsectionTitle title="Puntos clave" />
      <ul className="list-none flex flex-col gap-2.5 mb-1">
        {ov.keyPoints.map((p, i) => (
          <li key={i} className="text-[13px] text-(--gray-700) flex items-start gap-2.5 leading-[1.55]">
            <span className="text-(--blue-500) font-bold shrink-0" aria-hidden="true">✓</span>
            {p}
          </li>
        ))}
      </ul>

      <SubsectionTitle title="Info técnica" />
      {ov.meta.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3.5">
          {ov.meta.map((m, i) => (
            <div
              key={i}
              className="bg-(--gray-50) border border-(--gray-200) rounded-[10px] p-3.5 px-4 transition-[border-color,box-shadow] duration-150 hover:border-(--blue-100) hover:shadow-[0_0_0_3px_var(--blue-50)]"
            >
              <div className="text-[11px] font-semibold text-(--gray-500) uppercase tracking-[0.05em] mb-1.5">
                {m.label}
              </div>
              <div className="text-[15px] font-semibold text-(--gray-900) leading-[1.4]">
                {m.value}
              </div>
            </div>
          ))}
        </div>
      ) : <EmptyState message="No hay metadata técnica." />}
    </div>
  )
}
