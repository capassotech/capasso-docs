import type { Subproject } from '../../types'
import { EmptyState, SectionTitle } from '../shared'

export function ModulosTab({ sub }: { sub: Subproject }) {
  const modules = sub.modules || []
  return (
    <>
      <SectionTitle title="Módulos del sistema" />
      {modules.length ? (
        <div className="flex flex-col gap-3">
          {modules.map((m, i) => (
            <div key={i} className="bg-(--gray-50) border border-(--gray-200) rounded-[10px] px-[18px] py-4 transition-[border-color] duration-150 hover:border-(--blue-100)">
              <div className="text-[15px] font-semibold text-(--gray-900) mb-1.5 flex items-center gap-2.5 flex-wrap">
                {m.name}
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-(--blue-500) text-white">
                  {m.tag}
                </span>
              </div>
              <div className="text-[13px] text-(--gray-600) leading-[1.55]">{m.desc}</div>
            </div>
          ))}
        </div>
      ) : <EmptyState message="No hay módulos documentados." />}
    </>
  )
}
