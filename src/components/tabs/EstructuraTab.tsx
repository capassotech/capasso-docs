import type { Subproject } from '../../types'
import { SubsectionTitle, EmptyState } from '../shared'

const BACKEND_STEPS = [
  'Crear carpeta src/modules/[nombre]/',
  'Crear controller.ts con la lógica de cada endpoint',
  'Crear routes.ts con las rutas Express y aplicar middlewares necesarios',
  "Registrar el router en src/index.ts con app.use('/api/[nombre]', router)",
  'Agregar los tipos necesarios en src/types/[nombre].ts',
]

const FRONTEND_STEPS = [
  'Crear el componente o página en src/components/ o src/pages/',
  'Crear el servicio en src/services/[nombre]Service.ts con las llamadas al backend',
  'Agregar los tipos en src/types/types.ts',
  'Registrar la ruta en App.tsx si es una página nueva',
  'Conectar con el contexto o estado global si es necesario',
]

export function EstructuraTab({ sub }: { sub: Subproject }) {
  const folders = sub.folderStructure || []
  const steps = sub.id.includes('backend') ? BACKEND_STEPS : FRONTEND_STEPS
  return (
    <div>
      <SubsectionTitle title="Carpetas" />
      {folders.length ? (
        <div className="flex flex-col gap-3">
          {folders.map((f, i) => (
            <div key={i} className="bg-(--gray-50) border border-(--gray-200) rounded-[10px] px-5 py-4 transition-[background-color,border-color] duration-200">
              <code className="block text-[13px] font-semibold text-(--blue-600) font-mono mb-1.5">{f.path}</code>
              <p className="text-[14px] text-(--gray-600) leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      ) : <EmptyState message="No hay estructura de carpetas documentada." />}

      <SubsectionTitle title="Cómo agregar un módulo" />
      <ol className="list-none flex flex-col gap-2.5 mt-1">
        {steps.map((s, i) => (
          <li key={i} className="flex items-start gap-3.5 px-4 py-3 bg-(--gray-50) border border-(--gray-200) rounded-[10px] text-[13px] text-(--gray-700) leading-[1.55]">
            <span className="w-6 h-6 rounded-full bg-(--blue-500) text-white text-[11px] font-bold flex items-center justify-center shrink-0">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  )
}
