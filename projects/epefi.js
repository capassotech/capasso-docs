const EPEFI_BRANCH_CONVENTIONS = [
  { prefix: "feature/", format: "feature/[id_ticket]-[descripcion]", use: "Nuevas funcionalidades" },
  { prefix: "fix/", format: "fix/[id_ticket]-[descripcion]", use: "Bugs no urgentes, van a develop" },
  { prefix: "hotfix/", format: "hotfix/[id_ticket]-[descripcion]", use: "Bugs urgentes en producción, van directo a main" },
];

const EPEFI_COMMIT_FLOW = [
  { step: "1", action: "Crear rama", detail: "Desde develop (o main para hotfix). Usar la convención de nombres." },
  { step: "2", action: "Desarrollar", detail: "Hacer commits atómicos con mensajes descriptivos." },
  { step: "3", action: "Push + PR", detail: "Abrir Pull Request hacia develop (o main para hotfix)." },
  { step: "4", action: "Review", detail: "Al menos un review aprobado antes de mergear." },
  { step: "5", action: "Merge a develop", detail: "Triggeriza deploy automático a QA vía GitHub Actions." },
  { step: "6", action: "Merge a main", detail: "Triggeriza deploy automático a Producción vía GitHub Actions." },
];

const EPEFI_FIREBASE_HOSTING_CHECKLIST = [
  "Verificar que las GitHub Secrets (_QA y _PROD) estén actualizadas",
  "Confirmar que el build local pasa sin errores antes de pushear",
  "Revisar el tab Actions en GitHub para confirmar que el workflow terminó OK",
  "Verificar la URL del entorno correspondiente después del deploy",
];

const EPEFI_RENDER_CHECKLIST = [
  "Confirmar que las variables de entorno en el dashboard de Render estén correctas",
  "Verificar que el build log no tenga errores de TypeScript",
  "Revisar los logs del servicio en Render después del deploy",
  "Testear el endpoint /health o cualquier ruta pública para confirmar que levantó",
];

const EPEFI_BACKEND_ENV_QA = [
  { key: "PORT", value: "3000", desc: "Puerto del servidor" },
  { key: "NODE_ENV", value: "development", desc: "Entorno de ejecución" },
  { key: "FIREBASE_PROJECT_ID", value: "epefi-admin-qa", desc: "Proyecto Firebase (QA)" },
  { key: "FIREBASE_CLIENT_EMAIL", value: "firebase-adminsdk-fbsvc@epefi-admin-qa.iam.gserviceaccount.com", desc: "Service account de Firebase Admin (QA)" },
  { key: "FIREBASE_PRIVATE_KEY", value: "-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----", desc: "Clave privada del service account QA (escapar saltos de línea)" },
  { key: "FIREBASE_WEB_API_KEY", value: "AIzaSyAhDWPumrJLU7C8lkDlQtzrsqVrzwUmVWw", desc: "API key del proyecto Firebase QA" },
  { key: "FRONTEND_URL", value: "http://localhost:5173", desc: "URL del frontend (CORS)" },
];

const EPEFI_BACKEND_ENV_PROD = [
  { key: "PORT", value: "3000", desc: "Puerto del servidor" },
  { key: "NODE_ENV", value: "production", desc: "Entorno de ejecución" },
  { key: "FIREBASE_PROJECT_ID", value: "epefi-admin", desc: "Proyecto Firebase (Producción)" },
  { key: "FIREBASE_CLIENT_EMAIL", value: "firebase-adminsdk-fbsvc@epefi-admin.iam.gserviceaccount.com", desc: "Service account de Firebase Admin (prod)" },
  { key: "FIREBASE_PRIVATE_KEY", value: "-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----", desc: "Clave privada del service account prod" },
  { key: "FIREBASE_WEB_API_KEY", value: "AIzaSyDmUUc9pf94sLVD0RRPW-t0j0zjYmfud7o", desc: "API key del proyecto Firebase prod" },
  { key: "FRONTEND_URL", value: "https://escuelaepefi.com", desc: "URL del frontend prod" },
];

function epefiFrontendEnv(opts) {
  return [
    { key: "VITE_API_BASE_URL", value: opts.apiUrl, desc: "URL base del backend EPEFI" },
    { key: "VITE_FIREBASE_API_KEY", value: opts.apiKey, desc: "API key del proyecto Firebase" },
    { key: "VITE_FIREBASE_AUTH_DOMAIN", value: opts.authDomain, desc: "Auth domain del proyecto Firebase" },
    { key: "VITE_FIREBASE_PROJECT_ID", value: opts.projectId, desc: "Project ID de Firebase" },
    { key: "VITE_FIREBASE_STORAGE_BUCKET", value: opts.storageBucket, desc: "Bucket de Firebase Storage" },
    { key: "VITE_FIREBASE_MESSAGING_SENDER_ID", value: opts.messagingSenderId, desc: "Messaging sender ID" },
    { key: "VITE_FIREBASE_APP_ID", value: opts.appId, desc: "App ID del proyecto Firebase" },
    { key: "VITE_FIREBASE_MEASUREMENT_ID", value: opts.measurementId, desc: "ID de Google Analytics" },
  ];
}

const EPEFI_QA_FIREBASE = {
  apiKey: "AIzaSyAhDWPumrJLU7C8lkDlQtzrsqVrzwUmVWw",
  authDomain: "epefi-admin-qa.firebaseapp.com",
  projectId: "epefi-admin-qa",
  storageBucket: "epefi-admin-qa.firebasestorage.app",
  messagingSenderId: "376993932832",
  appId: "1:376993932832:web:85ea8bac7288273cac7e45",
  measurementId: "G-1178LF8PC3",
};

const EPEFI_PROD_FIREBASE = {
  apiKey: "AIzaSyDmUUc9pf94sLVD0RRPW-t0j0zjYmfud7o",
  authDomain: "epefi-admin.firebaseapp.com",
  projectId: "epefi-admin",
  storageBucket: "epefi-admin.firebasestorage.app",
  messagingSenderId: "148104863138",
  appId: "1:148104863138:web:a90f184ad83e2b65db66fb",
  measurementId: "G-DJ6V3STCGZ",
};

const epefi = {
  id: "epefi",
  name: "EPEFI",
  color: "#F97316",
  description: "Plataforma educativa para la Escuela de Fitness online. Portal de cursos, panel de administración y backend API.",
  subprojects: [
    {
      id: "epefi-backend",
      name: "EPEFI-backend",
      description: "API REST central de EPEFI. Gestiona autenticación, cursos, materias, módulos, exámenes y progreso de alumnos.",
      stack: [
        { label: "Node.js", color: "green" },
        { label: "Express 5", color: "green" },
        { label: "TypeScript", color: "blue" },
        { label: "Firebase Admin", color: "amber" },
        { label: "Firestore", color: "amber" },
        { label: "Resend", color: "purple" },
        { label: "MercadoPago", color: "teal" },
      ],
      overview: {
        about: "API REST construida con Express 5 y TypeScript que centraliza toda la lógica de negocio de EPEFI. Sirve tanto al portal de cursos como al panel de administración. Gestiona la estructura de formaciones (cursos → materias → módulos), el progreso de alumnos, los exámenes con corrección automática y la autenticación mediante Firebase Admin.",
        objective: "Proveer una API robusta y modular que desacople completamente el backend de los frontends, facilitando el mantenimiento y la extensión de la plataforma.",
        keyPoints: [
          "Arquitectura modular: cada entidad tiene su propio controller + routes",
          "Estructura educativa jerárquica: cursos → materias → módulos → contenidos",
          "Exámenes con corrección automática (examenScoring.ts)",
          "Tracking de progreso por formación (formacionProgress.ts)",
          "Autenticación via Firebase Admin con middleware reutilizable",
          "Tests unitarios para lógica crítica (examenScoring, passwordValidator)",
        ],
        meta: [
          { label: "Repo", value: "epefi-backend" },
          { label: "Tipo", value: "Backend / API REST" },
          { label: "Runtime", value: "Node.js >= 18" },
          { label: "Entry point", value: "src/index.ts" },
          { label: "Build", value: "tsc → dist/" },
        ],
      },
      folderStructure: [
        { path: "src/modules/auth/", desc: "Autenticación y validación de tokens Firebase. Incluye validation.ts con reglas de password." },
        { path: "src/modules/cursos/", desc: "ABM de cursos (formaciones). Entidad raíz de la jerarquía educativa." },
        { path: "src/modules/materia/", desc: "ABM de materias. Cada curso contiene múltiples materias." },
        { path: "src/modules/modulos/", desc: "ABM de módulos de contenido dentro de cada materia." },
        { path: "src/modules/examenes/", desc: "ABM de exámenes y lógica de evaluación. studentController.ts para el flujo del alumno." },
        { path: "src/modules/examenes-realizados/", desc: "Registro de exámenes completados por alumnos con sus resultados." },
        { path: "src/modules/users/", desc: "CRUD de usuarios, roles y datos de perfil." },
        { path: "src/middleware/", desc: "authMiddleware, validation, zodValidation para protección de rutas." },
        { path: "src/utils/", desc: "examenScoring.ts (corrección automática), formacionProgress.ts (% avance), passwordValidator.ts." },
        { path: "src/types/", desc: "schemas.ts (Zod), user.ts — tipos compartidos del dominio." },
        { path: "src/config/", desc: "firebase.ts — inicialización de Firebase Admin SDK." },
      ],
      modules: [
        { name: "auth", tag: "Firebase Admin", desc: "Verificación de tokens Firebase. Middleware de autenticación reutilizable para todas las rutas protegidas. Validación de fortaleza de contraseña." },
        { name: "users", tag: "Firestore", desc: "CRUD de usuarios. Gestión de perfil, roles (admin/alumno) y datos personales." },
        { name: "cursos", tag: "Firestore", desc: "ABM de formaciones/cursos. Entidad raíz. Contiene la metadata general de cada formación educativa." },
        { name: "materia", tag: "Firestore", desc: "ABM de materias dentro de un curso. Cada materia agrupa un conjunto de módulos temáticos." },
        { name: "modulos", tag: "Firestore", desc: "ABM de módulos de contenido (clases, videos, PDFs, teoría). Unidad mínima de aprendizaje." },
        { name: "examenes", tag: "Firestore", desc: "ABM de exámenes con preguntas y respuestas. Incluye studentController.ts con el flujo de rendición para alumnos." },
        { name: "examenes-realizados", tag: "Firestore", desc: "Registro persistente de exámenes completados. Guarda respuestas, puntaje y fecha de cada intento." },
      ],
      environments: [
        { name: "Local", type: "dev", url: "http://localhost:3000", branch: "cualquiera", hosting: "local" },
        { name: "QA", type: "qa", url: "https://epefi-backend-qa.onrender.com", branch: "develop", hosting: "Render" },
        { name: "Producción", type: "prod", url: "https://epefi-backend.onrender.com", branch: "main", hosting: "Render" },
      ],
      branchConventions: EPEFI_BRANCH_CONVENTIONS,
      commitFlow: EPEFI_COMMIT_FLOW,
      envGroups: [
        {
          name: "local",
          label: "Local (DEV)",
          vars: EPEFI_BACKEND_ENV_QA,
        },
        {
          name: "qa",
          label: "QA",
          vars: EPEFI_BACKEND_ENV_QA,
        },
        {
          name: "prod",
          label: "Producción",
          vars: EPEFI_BACKEND_ENV_PROD,
        },
      ],
      deploys: [
        {
          title: "Render — Web Service",
          rows: [
            { key: "Trigger", value: "Push a main / develop (auto-deploy)" },
            { key: "Build cmd", value: "npm run build (tsc)" },
            { key: "Start cmd", value: "node dist/index.js" },
            { key: "Variables", value: "Dashboard de Render (por entorno)" },
            { key: "Node version", value: ">= 18.0.0" },
          ],
          checklist: EPEFI_RENDER_CHECKLIST,
        },
      ],
    },

    {
      id: "epefi-cursos",
      name: "EPEFI-cursos",
      description: "Portal del alumno. Acceso a formaciones, reproducción de módulos, exámenes y perfil de usuario.",
      stack: [
        { label: "React 18", color: "blue" },
        { label: "TypeScript", color: "blue" },
        { label: "Vite", color: "purple" },
        { label: "TailwindCSS", color: "teal" },
        { label: "shadcn/ui", color: "teal" },
        { label: "Firebase", color: "amber" },
      ],
      overview: {
        about: "Portal privado del alumno construido con React + Vite. Permite acceder a las formaciones adquiridas, navegar por materias y módulos, reproducir videos embebidos desde YouTube, completar exámenes y gestionar el perfil. Comparte el proyecto Firebase con el panel de administración.",
        objective: "Ofrecer al alumno de EPEFI una experiencia de aprendizaje fluida, accesible desde cualquier dispositivo, con acceso solo al contenido que le corresponde.",
        keyPoints: [
          "Acceso condicionado por cursos asignados al usuario en Firestore",
          "Reproducción de videos via YouTube embed (youtubeEmbed.ts)",
          "Visualización de módulos con navegación jerárquica",
          "Exámenes con flujo de rendición integrado",
          "Diseño responsive con bottom navigation para mobile",
          "Comparte proyecto Firebase con epefi-admin",
        ],
        meta: [
          { label: "Repo", value: "epefi-cursos" },
          { label: "Tipo", value: "Frontend — portal del alumno" },
          { label: "Build tool", value: "Vite + SWC" },
          { label: "UI library", value: "shadcn/ui + Radix UI" },
          { label: "Estado global", value: "React Context (Auth)" },
        ],
      },
      folderStructure: [
        { path: "src/pages/", desc: "Index (mis cursos), Curso (detalle), Login, Register, ForgotPassword, Profile, Search, Admin." },
        { path: "src/components/", desc: "AuthForm (controller/view), Header, Layout, BottomNavigation, ProtectedRoute, module-view.tsx, video-modal.tsx." },
        { path: "src/contexts/", desc: "AuthContext con Firebase Auth (email/password)." },
        { path: "src/services/", desc: "authService.ts, coursesService.ts — llamadas al backend." },
        { path: "src/lib/", desc: "utils.ts, youtubeEmbed.ts — convierte URLs de YouTube a embed." },
        { path: "src/data/", desc: "courses.ts — mock de cursos para desarrollo." },
        { path: "src/types/", desc: "types.ts con todas las interfaces del dominio." },
        { path: "config/", desc: "firebase-client.ts — inicialización de Firebase SDK cliente." },
      ],
      modules: [
        { name: "Auth", tag: "Firebase", desc: "Login y registro con email/password. Recuperación de contraseña. Validación de requisitos de contraseña. Sin Google OAuth (a diferencia de INEE)." },
        { name: "Mis formaciones", tag: "API", desc: "Listado de cursos asignados al usuario. Acceso condicionado: solo muestra los cursos que el alumno tiene habilitados." },
        { name: "Reproductor de curso", tag: "Frontend", desc: "Navegación por materias y módulos. Visualización de contenido: videos (YouTube embed), texto teórico. Componente module-view.tsx." },
        { name: "Exámenes", tag: "API", desc: "Flujo de rendición de exámenes por módulo. Muestra resultado al finalizar. Integración con examenes-realizados del backend." },
        { name: "Búsqueda", tag: "Frontend", desc: "Búsqueda de formaciones disponibles." },
        { name: "Perfil", tag: "Firebase", desc: "Datos del usuario, cambio de contraseña." },
        { name: "Admin inline", tag: "Firebase", desc: "Página Admin.tsx con ruta protegida por rol. Acceso rápido a funciones administrativas básicas desde el portal del alumno." },
      ],
      environments: [
        { name: "Local", type: "dev", url: "http://localhost:5173", branch: "cualquiera", hosting: "local" },
        { name: "QA", type: "qa", url: "https://epefi-cursos-qa.web.app", branch: "develop", hosting: "Firebase Hosting" },
        { name: "Producción", type: "prod", url: "https://epefi-cursos.web.app", branch: "main", hosting: "Firebase Hosting" },
      ],
      branchConventions: EPEFI_BRANCH_CONVENTIONS,
      commitFlow: EPEFI_COMMIT_FLOW,
      envGroups: [
        {
          name: "local",
          label: "Local (DEV)",
          vars: epefiFrontendEnv({ apiUrl: "http://localhost:3000", ...EPEFI_QA_FIREBASE }),
        },
        {
          name: "qa",
          label: "QA",
          vars: epefiFrontendEnv({ apiUrl: "https://epefi-backend-qa.onrender.com", ...EPEFI_QA_FIREBASE }),
        },
        {
          name: "prod",
          label: "Producción",
          vars: epefiFrontendEnv({ apiUrl: "https://epefi-backend.onrender.com", ...EPEFI_PROD_FIREBASE }),
        },
      ],
      deploys: [
        {
          title: "Firebase Hosting — GitHub Actions",
          rows: [
            { key: "Trigger QA", value: "Push a branch develop" },
            { key: "Trigger Prod", value: "Push a branch main" },
            { key: "Build cmd QA", value: "npm run build:qa" },
            { key: "Build cmd Prod", value: "npm run build:production" },
            { key: "Proyecto QA", value: "epefi-cursos-qa (Firebase)" },
            { key: "Proyecto Prod", value: "epefi-cursos (Firebase)" },
            { key: "Secrets", value: "VITE_API_BASE_URL, VITE_FIREBASE_* (_QA/_PROD), FIREBASE_SERVICE_ACCOUNT_QA/PROD" },
            { key: "Node version", value: "20" },
          ],
          checklist: EPEFI_FIREBASE_HOSTING_CHECKLIST,
        },
      ],
    },

    {
      id: "epefi-admin",
      name: "EPEFI-admin",
      description: "Panel de administración interno. Gestión de formaciones, materias, módulos, alumnos, exámenes y estadísticas.",
      stack: [
        { label: "React 19", color: "blue" },
        { label: "TypeScript", color: "blue" },
        { label: "Vite", color: "purple" },
        { label: "TailwindCSS 4", color: "teal" },
        { label: "shadcn/ui", color: "teal" },
        { label: "Firebase", color: "amber" },
        { label: "recharts", color: "green" },
      ],
      overview: {
        about: "Backoffice interno de EPEFI construido con React 19 y TailwindCSS 4. Permite al equipo gestionar toda la estructura educativa de la plataforma: crear formaciones con sus materias y módulos, administrar alumnos, asignar cursos, configurar exámenes y visualizar estadísticas. Incluye un tour guiado (driver.js) para onboarding de nuevos administradores.",
        objective: "Darle al equipo de EPEFI control total sobre el contenido educativo y la gestión de alumnos sin necesidad de tocar código o la consola de Firebase.",
        keyPoints: [
          "Estructura educativa completa: Formaciones → Materias → Módulos",
          "Asignación masiva de cursos a alumnos (BulkAssignCoursesModal)",
          "Tour guiado de onboarding para nuevos admins (driver.js)",
          "Dashboard con métricas y estadísticas (recharts)",
          "Validación de formularios con Zod + react-hook-form",
          "React 19 + TailwindCSS 4 (versión más actualizada del stack)",
        ],
        meta: [
          { label: "Repo", value: "epefi-admin" },
          { label: "Tipo", value: "Frontend — backoffice" },
          { label: "Build tool", value: "Vite + SWC" },
          { label: "UI library", value: "shadcn/ui + Radix UI" },
          { label: "Estado global", value: "React Context (Auth)" },
        ],
      },
      folderStructure: [
        { path: "src/pages/", desc: "Dashboard, Products, ProductDetail, EditProduct, CreateProduct, Students, StudentDetail, Subjects, SubjectDetail, CreateModule, Exams, CreateExam, Profile, Login, ForgotPassword, CreateFirstAdmin." },
        { path: "src/components/admin/", desc: "AdminComponent, DashboardStats, Sidebar, SearchAndFilter, MobileMenuButton." },
        { path: "src/components/product/", desc: "ProductCard, ProductList, GeneralInfoForm, ContenidoFormRow, SubjectCreation, ConfirmDeleteModal." },
        { path: "src/components/students/", desc: "StudentsList, CreateUserModal, CoursesAsignStudentModal, BulkAssignCoursesModal." },
        { path: "src/components/subject/", desc: "SubjectCard, SubjectList, SubjectForm, SubjectModal, ModulesList, ModulesModal." },
        { path: "src/components/tour/", desc: "TourButton — tour guiado con driver.js para onboarding de admins." },
        { path: "src/service/", desc: "authService.ts, courses.ts, exams.ts, students.ts — llamadas al backend." },
        { path: "src/schemas/", desc: "product-schema.ts — validación Zod de formularios de productos." },
        { path: "src/utils/", desc: "auth.ts, courseDates.ts, currency.ts, pagination.ts, studentDates.ts, storage.ts, errorMessages.ts." },
        { path: "src/config/", desc: "tourSteps.ts — pasos del tour de onboarding." },
        { path: "config/", desc: "firebase-client.ts — inicialización Firebase SDK cliente." },
      ],
      modules: [
        { name: "Dashboard", tag: "Frontend", desc: "Estadísticas generales de la plataforma: alumnos activos, formaciones, exámenes completados. Visualización con recharts." },
        { name: "Formaciones", tag: "API", desc: "ABM de formaciones (cursos). Creación con GeneralInfoForm y gestión de contenido con SubjectCreation." },
        { name: "Materias", tag: "API", desc: "ABM de materias dentro de cada formación. Gestión vía SubjectForm y SubjectModal." },
        { name: "Módulos", tag: "API", desc: "ABM de módulos de contenido (clases). Creación con CreateModule page y gestión vía ModulesModal." },
        { name: "Alumnos", tag: "API", desc: "Listado con búsqueda y paginación. Creación de usuarios (CreateUserModal). Asignación individual y masiva de cursos." },
        { name: "Exámenes", tag: "API", desc: "ABM de exámenes por módulo. CreateExam page para configurar preguntas y respuestas correctas." },
        { name: "Tour de onboarding", tag: "driver.js", desc: "Tour guiado interactivo para nuevos administradores. Pasos configurados en tourSteps.ts." },
        { name: "Auth", tag: "Firebase", desc: "Login, recuperación de contraseña. CreateFirstAdmin page para el setup inicial del primer usuario administrador." },
      ],
      environments: [
        { name: "Local", type: "dev", url: "http://localhost:5173", branch: "cualquiera", hosting: "local" },
        { name: "QA", type: "qa", url: "https://epefi-admin-qa.web.app", branch: "develop", hosting: "Firebase Hosting" },
        { name: "Producción", type: "prod", url: "https://epefi-admin.web.app", branch: "main", hosting: "Firebase Hosting" },
      ],
      branchConventions: EPEFI_BRANCH_CONVENTIONS,
      commitFlow: EPEFI_COMMIT_FLOW,
      envGroups: [
        {
          name: "local",
          label: "Local (DEV)",
          vars: epefiFrontendEnv({ apiUrl: "http://localhost:3000", ...EPEFI_QA_FIREBASE }),
        },
        {
          name: "qa",
          label: "QA",
          vars: epefiFrontendEnv({ apiUrl: "https://epefi-backend-qa.onrender.com", ...EPEFI_QA_FIREBASE }),
        },
        {
          name: "prod",
          label: "Producción",
          vars: epefiFrontendEnv({ apiUrl: "https://epefi-backend.onrender.com", ...EPEFI_PROD_FIREBASE }),
        },
      ],
      deploys: [
        {
          title: "Firebase Hosting — GitHub Actions",
          rows: [
            { key: "Trigger QA", value: "Push a branch develop" },
            { key: "Trigger Prod", value: "Push a branch main" },
            { key: "Build cmd QA", value: "npm run build:qa" },
            { key: "Build cmd Prod", value: "npm run build:production" },
            { key: "Proyecto QA", value: "epefi-admin-qa (Firebase)" },
            { key: "Proyecto Prod", value: "epefi-admin (Firebase)" },
            { key: "Secrets", value: "VITE_API_BASE_URL, VITE_FIREBASE_* (_QA/_PROD), FIREBASE_SERVICE_ACCOUNT_QA/PROD" },
            { key: "Node version", value: "20" },
          ],
          checklist: EPEFI_FIREBASE_HOSTING_CHECKLIST,
        },
      ],
    },
  ],
};