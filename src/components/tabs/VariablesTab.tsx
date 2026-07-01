import { useState } from 'react'
import type { Subproject } from '../../types'
import { SubsectionTitle, EmptyState } from '../shared'

interface Props {
  sub: Subproject
  currentEnvGroup: string
  onSelectEnvGroup: (name: string) => void
}

export function VariablesTab({ sub, currentEnvGroup, onSelectEnvGroup }: Props) {
  const [copied, setCopied] = useState(false)
  const groups = sub.envGroups || []
  if (!groups.length) return <EmptyState message="No hay variables de entorno documentadas." />

  const activeGroup = groups.find(g => g.name === currentEnvGroup) || groups[0]

  const handleCopy = async () => {
    const text = (activeGroup.vars || [])
      .map(v => {
        const str = String(v.value)
        if (/^[A-Za-z0-9_./:@-]+$/.test(str)) return `${v.key}=${str}`
        return `${v.key}="${str.replace(/"/g, '\\"').replace(/\r?\n/g, '\\n')}"`
      })
      .join('\n')
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <SubsectionTitle title="Variables de entorno" />

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {groups.map(g => (
            <button
              key={g.name}
              type="button"
              onClick={() => onSelectEnvGroup(g.name)}
              className={[
                'px-4 py-1.5 rounded-full text-[11px] font-semibold cursor-pointer border font-[inherit] transition-[background,border-color,color] duration-150',
                g.name === activeGroup.name
                  ? 'bg-(--blue-500) text-white border-(--blue-500)'
                  : 'bg-(--surface) text-(--gray-600) border-(--gray-200) hover:bg-(--gray-50) hover:border-(--gray-300)',
              ].join(' ')}
            >
              {g.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          title="Copiar variables del entorno activo como archivo .env"
          className={[
            'px-3.5 py-1.5 rounded-full text-[11px] font-semibold cursor-pointer border font-[inherit] shrink-0 whitespace-nowrap transition-[background,border-color,color] duration-150',
            copied
              ? 'bg-(--env-prod-bg) border-(--env-prod-fg) text-(--env-prod-fg)'
              : 'bg-(--surface) text-(--gray-700) border-(--gray-200) hover:bg-(--gray-50) hover:border-(--gray-300)',
          ].join(' ')}
        >
          {copied ? '¡Copiado!' : 'Copiar .env'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-(--gray-200) rounded-[10px]">
        <table className="w-full border-collapse text-[13px]">
          <thead className="bg-(--blue-50)">
            <tr>
              {['Variable', 'Valor de referencia', 'Descripción'].map(h => (
                <th key={h} className="text-left px-3.5 py-[10px] text-[11px] font-bold text-(--gray-700) uppercase tracking-[0.04em] border-b border-(--blue-100)">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(activeGroup.vars || []).map((v, i) => (
              <tr key={i} className="hover:bg-(--gray-50) last:[&>td]:border-b-0">
                <td className="px-3.5 py-[10px] border-b border-(--gray-200) text-(--gray-700) align-top leading-[1.45]">
                  <code className="font-mono text-[11px] font-semibold text-(--gray-900) bg-(--gray-100) px-1.5 py-0.5 rounded">
                    {v.key}
                  </code>
                </td>
                <td className="px-3.5 py-[10px] border-b border-(--gray-200) text-(--gray-700) align-top leading-[1.45]">
                  <code className="font-mono text-[11px] text-(--blue-600) break-all">
                    {v.value}
                  </code>
                </td>
                <td className="px-3.5 py-[10px] border-b border-(--gray-200) text-(--gray-700) align-top leading-[1.45]">
                  {v.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
