import type { Subproject } from '../../types'
import { SubsectionTitle, EmptyState } from '../shared'

const ENV_DOT: Record<string, string> = {
  prod: 'bg-(--env-prod-bg) text-(--env-prod-fg)',
  qa:   'bg-(--env-qa-bg) text-(--env-qa-fg)',
  dev:  'bg-(--blue-50) text-(--blue-500)',
}

export function EntornosTab({ sub }: { sub: Subproject }) {
  const environments = sub.environments || []
  const conventions = sub.branchConventions || []
  const flow = sub.commitFlow || []

  return (
    <div>
      <SubsectionTitle title="Entornos" />
      {environments.length ? (
        <div className="flex flex-col gap-3">
          {environments.map((e, i) => (
            <div key={i} className="bg-(--gray-50) border border-(--gray-200) rounded-[10px] px-[18px] py-3.5 flex items-center gap-3.5 flex-wrap transition-[background-color,border-color] duration-200">
              {/* Dot */}
              <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center ${ENV_DOT[e.type] ?? 'bg-(--blue-50) text-(--blue-500)'}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-current" />
              </div>
              {/* Info */}
              <div className="flex-1 min-w-[140px]">
                <div className="text-[13px] font-semibold text-(--gray-900)">
                  {e.name}{' '}
                  <span className="font-normal text-(--gray-500) text-[11px]">— {e.hosting}</span>
                </div>
                <div className="text-[11px] text-(--gray-500) mt-0.5 font-mono">Branch: {e.branch}</div>
              </div>
              {/* Link */}
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-(--blue-500) bg-(--blue-50) border border-(--blue-100) rounded-full px-3 py-[5px] no-underline transition-[background,border-color] duration-150 whitespace-nowrap hover:bg-(--blue-100) hover:border-(--blue-400)"
              >
                Abrir entorno ↗
              </a>
            </div>
          ))}
        </div>
      ) : <EmptyState message="No hay entornos documentados." />}

      <SubsectionTitle title="Convención de ramas" />
      {conventions.length ? (
        <div className="overflow-x-auto border border-(--gray-200) rounded-[10px]">
          <table className="w-full border-collapse text-[13px]">
            <thead className="bg-(--gray-50)">
              <tr>
                {['Prefijo', 'Formato', 'Cuándo usarlo', 'Se saca de'].map(h => (
                  <th key={h} className="text-left px-3.5 py-[9px] text-[11px] font-bold text-(--gray-700) uppercase tracking-[0.04em] border-b border-(--gray-200)">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {conventions.map((c, i) => (
                <tr key={i} className="last:[&>td]:border-b-0">
                  <td className="px-3.5 py-[10px] border-b border-(--gray-200) text-(--gray-700) align-top leading-[1.45]">
                    <code className="font-mono text-[11px] bg-(--gray-100) px-[7px] py-0.5 rounded text-(--gray-900)">{c.prefix}</code>
                  </td>
                  <td className="px-3.5 py-[10px] border-b border-(--gray-200) text-(--gray-700) align-top leading-[1.45]">
                    <code className="font-mono text-[11px] bg-(--gray-100) px-[7px] py-0.5 rounded text-(--gray-900)">{c.format}</code>
                  </td>
                  <td className="px-3.5 py-[10px] border-b border-(--gray-200) text-(--gray-700) align-top leading-[1.45]">{c.use}</td>
                  <td className="px-3.5 py-[10px] border-b border-(--gray-200) text-(--gray-700) align-top leading-[1.45]">
                    <code className="font-mono text-[11px] bg-(--gray-100) px-[7px] py-0.5 rounded text-(--gray-900)">{c.origin ?? ''}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <EmptyState message="No hay convenciones de ramas documentadas." />}

      <SubsectionTitle title="Flujo de commit" />
      {flow.length ? (
        <ol className="list-none flex flex-col gap-2.5 mt-1">
          {flow.map((f, i) => (
            <li key={i} className="flex items-start gap-3.5 px-4 py-3 bg-(--gray-50) border border-(--gray-200) rounded-[10px]">
              <span className="w-[26px] h-[26px] rounded-full bg-(--blue-500) text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                {f.step}
              </span>
              <div className="text-[13px] text-(--gray-600) leading-[1.55] flex flex-col gap-1">
                <strong className="text-(--gray-900) font-bold">{f.action}</strong>
                <span>{f.detail}</span>
              </div>
            </li>
          ))}
        </ol>
      ) : <EmptyState message="No hay flujo de commit documentado." />}
    </div>
  )
}
