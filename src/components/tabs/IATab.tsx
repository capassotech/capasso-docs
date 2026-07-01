import { useState } from 'react'
import type { Subproject } from '../../types'
import { SubsectionTitle } from '../shared'

const PROMPT_FIELDS = [
  { field: 'Stack/contexto', what: 'Tecnología + proyecto', example: '"React + TS + Tailwind, proyecto INEE"' },
  { field: 'Objetivo', what: 'Qué querés lograr, en 1 frase', example: '"Componente de input de teléfono internacional"' },
  { field: 'Restricciones', what: 'Qué debe respetar', example: '"Usar libphonenumber-js, formato E.164"' },
  { field: 'Formato de salida', what: 'Qué esperás recibir', example: '"Componente completo .tsx, sin explicación extra"' },
]

const REVIEW_ITEMS = [
  { label: '¿Existe lo que usa?', desc: 'Funciones, props o librerías que la IA puede inventar (alucinación de APIs)' },
  { label: '¿Sigue las convenciones del proyecto?', desc: 'Nombres, estructura de carpetas, patrones ya establecidos' },
  { label: '¿Hay algo sensible?', desc: 'Credenciales, URLs hardcodeadas, datos que no deberían estar en el código' },
  { label: '¿El manejo de errores es real o placeholder?', desc: 'La IA suele dejar catch vacíos o console.log como manejo de error' },
  { label: '¿Se entiende sin la IA al lado?', desc: 'Si no podés explicar esa línea en un code review, no va' },
]

export function IATab({ sub }: { sub: Subproject }) {
  const [copied, setCopied] = useState(false)

  const repoUrl = sub.platforms?.find(g => g.category === 'Repositorio')?.links[0]?.url ?? '—'
  const stackStr = sub.stack.map(s => s.label).join(' + ')
  const auth = sub.aiContext?.auth ?? '—'
  const notes = sub.aiContext?.notes ?? '—'

  const contextBlock = `Proyecto: ${sub.name} — ${sub.description}
Stack: ${stackStr}
Repo: ${repoUrl}
Auth: ${auth}
Notas: ${notes}`

  const handleCopy = () => {
    navigator.clipboard.writeText(contextBlock)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>

      {/* ── 1. Cómo armar un buen prompt ── */}
      <SubsectionTitle title="1. Cómo armar un buen prompt" />
      <p className="text-[13px] text-(--gray-700) leading-[1.75] mb-4">
        Un prompt efectivo tiene 4 datos, no más. Si podés borrar una frase sin que cambie el resultado, borrala.
        Más contexto ≠ mejor respuesta; contexto <em>relevante</em> sí.
      </p>

      {/* Table */}
      <div className="border border-(--gray-200) rounded-[10px] overflow-hidden mb-4">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="bg-(--gray-50) border-b border-(--gray-200)">
              <th className="text-left px-4 py-2.5 font-semibold text-(--gray-700) w-[160px]">Campo</th>
              <th className="text-left px-4 py-2.5 font-semibold text-(--gray-700)">Qué va</th>
              <th className="text-left px-4 py-2.5 font-semibold text-(--gray-700)">Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            {PROMPT_FIELDS.map((row, i) => (
              <tr key={i} className="border-b border-(--gray-200) last:border-0">
                <td className="px-4 py-2.5 font-semibold text-(--gray-900)">{row.field}</td>
                <td className="px-4 py-2.5 text-(--gray-600)">{row.what}</td>
                <td className="px-4 py-2.5 text-(--gray-500) italic">{row.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[12px] font-semibold text-(--gray-500) uppercase tracking-wider mb-2">Mini-ejemplo (real)</p>
      <pre className="bg-(--gray-50) border border-(--gray-200) rounded-[10px] px-4 py-3.5 text-[12.5px] text-(--gray-700) font-mono leading-[1.7] overflow-x-auto whitespace-pre-wrap mb-1">{`Stack: React + TS + Tailwind (Vialto)
Objetivo: Input de fecha de vencimiento con warning si la fecha ya pasó
Restricciones: timezone UTC-3, mismo patrón visual que TelefonoInput.tsx
Formato: solo el componente .tsx`}</pre>

      {/* ── 2. Fragmentación ── */}
      <SubsectionTitle title="2. Fragmentación de prompts" />
      <p className="text-[13px] text-(--gray-700) leading-[1.75] mb-3">
        Cuando el prompt te queda largo, es señal de que hay que partirlo. Un prompt grande genera código difícil de revisar y debuggear si algo sale mal.
      </p>

      <ul className="list-none flex flex-col gap-2 mb-4">
        {[
          '1 prompt = 1 responsabilidad (no "hacé el form Y la validación Y el submit Y el estilo")',
          'Pedí primero la estructura/esqueleto, después iterá sobre partes puntuales',
          'Si el resultado depende de código existente, pasalo en fragmentos relevantes, no el archivo entero',
        ].map((item, i) => (
          <li key={i} className="text-[13px] text-(--gray-700) flex items-start gap-2.5 leading-[1.55]">
            <span className="text-(--blue-500) font-bold shrink-0" aria-hidden="true">→</span>
            {item}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2 gap-3 mb-1">
        <div className="bg-(--gray-50) border border-(--gray-200) rounded-[10px] p-3.5">
          <p className="text-[11px] font-semibold text-(--gray-500) uppercase tracking-wider mb-2">❌ Todo junto</p>
          <p className="text-[12.5px] text-(--gray-600) italic leading-[1.6]">
            "Hacé un CRUD de choferes con validación, conexión a la API, manejo de errores, estilos y tests"
          </p>
        </div>
        <div className="bg-(--blue-50) border border-(--blue-100) rounded-[10px] p-3.5">
          <p className="text-[11px] font-semibold text-(--blue-500) uppercase tracking-wider mb-2">✅ Fragmentado</p>
          <ol className="list-none flex flex-col gap-1.5">
            {[
              'Estructura del formulario de chofer, campos: X, Y, Z',
              'Validación del formulario anterior con Zod',
              'Conexión del submit a POST /choferes usando ApiHttpClient',
              'Tests unitarios de la validación',
            ].map((step, i) => (
              <li key={i} className="text-[12.5px] text-(--gray-700) flex items-start gap-2 leading-normal">
                <span className="text-(--blue-500) font-bold shrink-0 text-[11px] mt-px">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── 3. Contexto del proyecto actual ── */}
      <SubsectionTitle title="3. Contexto del proyecto actual" />
      <p className="text-[13px] text-(--gray-700) leading-[1.75] mb-3">
        Bloque listo para pegar al inicio de un chat con IA. Copia y pegalo antes de tu prompt.
      </p>

      <div className="relative bg-(--gray-50) border border-(--gray-200) rounded-[10px] overflow-hidden mb-1">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-(--gray-200)">
          <span className="text-[11px] font-semibold text-(--gray-500) uppercase tracking-wider">
            {sub.name}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-md border border-(--gray-200) bg-(--surface) text-(--gray-600) hover:text-(--blue-500) hover:border-(--blue-200) transition-[color,border-color] duration-150 cursor-pointer font-[inherit]"
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
        <pre className="px-4 py-3.5 text-[12.5px] text-(--gray-700) font-mono leading-[1.8] overflow-x-auto whitespace-pre-wrap">
          {contextBlock}
        </pre>
      </div>

      {/* ── 4. Revisión obligatoria ── */}
      <SubsectionTitle title="4. Revisión obligatoria" />
      <blockquote className="border-l-[3px] border-(--blue-500) pl-[18px] pr-4 py-3.5 bg-(--blue-50) rounded-r-[10px] text-[13px] text-(--gray-700) leading-[1.65] mb-4">
        La IA genera código, no lo aprueba. Regla no negociable: <strong>todo código generado se lee línea por línea antes de commitear</strong>, igual que revisarías el PR de un compañero.
      </blockquote>

      <p className="text-[13px] font-semibold text-(--gray-700) mb-3">Qué mirar puntualmente:</p>
      <ul className="list-none flex flex-col gap-3 mb-1">
        {REVIEW_ITEMS.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-(--blue-500) font-bold shrink-0 mt-0.5" aria-hidden="true">✓</span>
            <div>
              <span className="text-[13px] font-semibold text-(--gray-900)">{item.label}</span>
              <span className="text-[13px] text-(--gray-600)"> — {item.desc}</span>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-[13px] text-(--gray-500) leading-[1.75] mt-4 pt-4 border-t border-(--gray-200)">
        La IA acelera la escritura; el criterio de qué es correcto lo sigue poniendo el programador. Ese es el rol que no se delega.
      </p>

      {/* ── 5. Uso eficiente de tokens ── */}
      <SubsectionTitle title="5. Uso eficiente de tokens" />
      <p className="text-[13px] text-(--gray-700) leading-[1.75] mb-4">
        No todos los modelos sirven para lo mismo. Usar un modelo pesado donde alcanza uno liviano desperdicia tokens y plata. La clave es elegir según la complejidad de la tarea.
      </p>

      {/* Model tiers */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-(--gray-50) border border-(--gray-200) rounded-[10px] p-4">
          <p className="text-[11px] font-semibold text-(--gray-500) uppercase tracking-wider mb-1">Modelos pesados / pensantes</p>
          <ul className="list-none flex flex-col gap-1.5">
            {[
              'Arquitectura inicial de un feature',
              'Decisiones de diseño con trade-offs',
              'Debugging de lógica compleja',
              'Generación de la base de un módulo nuevo',
            ].map((item, i) => (
              <li key={i} className="text-[12.5px] text-(--gray-600) flex items-start gap-2 leading-normal">
                <span className="text-(--gray-400) shrink-0">·</span>{item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-(--blue-50) border border-(--blue-100) rounded-[10px] p-4">
          <p className="text-[11px] font-semibold text-(--blue-500) uppercase tracking-wider mb-1">Modelos eficientes / rápidos</p>
          <ul className="list-none flex flex-col gap-1.5">
            {[
              'Iteraciones sobre código ya generado',
              'Correcciones puntuales (un campo, un estilo)',
              'Renombrar, reformatear, traducir',
              'Preguntas rápidas sobre sintaxis o API',
            ].map((item, i) => (
              <li key={i} className="text-[12.5px] text-(--gray-600) flex items-start gap-2 leading-normal">
                <span className="text-(--blue-400) shrink-0">·</span>{item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key recommendation */}
      <p className="text-[12px] font-semibold text-(--gray-500) uppercase tracking-wider mb-2">Patrón recomendado</p>
      <div className="flex items-stretch gap-0 mb-1 rounded-[10px] overflow-hidden border border-(--gray-200)">
        <div className="flex-1 bg-(--gray-50) px-4 py-3.5">
          <p className="text-[11px] font-semibold text-(--gray-500) uppercase tracking-[0.04em] mb-1.5">Fase 1 — Base inicial</p>
          <p className="text-[13px] font-semibold text-(--gray-900) mb-1">Modelo pesado</p>
          <p className="text-[12.5px] text-(--gray-600) leading-[1.55]">
            Usá todas las técnicas del punto 1 para armar un prompt sólido. Dejá que el modelo piense y genere la estructura base bien hecha desde el arranque.
          </p>
        </div>
        <div className="flex items-center px-3 bg-(--gray-100) shrink-0">
          <span className="text-(--gray-400) text-[18px]">→</span>
        </div>
        <div className="flex-1 bg-(--blue-50) px-4 py-3.5">
          <p className="text-[11px] font-semibold text-(--blue-500) uppercase tracking-[0.04em] mb-1.5">Fase 2 — Iteración</p>
          <p className="text-[13px] font-semibold text-(--gray-900) mb-1">Modelo eficiente</p>
          <p className="text-[12.5px] text-(--gray-600) leading-[1.55]">
            Una vez que la base está, cambiá a un modelo liviano para los ajustes. El gasto de tokens baja drásticamente y la velocidad sube.
          </p>
        </div>
      </div>

    </div>
  )
}
