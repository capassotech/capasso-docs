const INEE_BRANCH_CONVENTIONS = [
  { prefix: "feature/", format: "feature/[id_ticket]-[descripcion]", use: "Nuevas funcionalidades", origin: "develop" },
  { prefix: "fix/", format: "fix/[id_ticket]-[descripcion]", use: "Bugs no urgentes, van a develop", origin: "develop" },
  { prefix: "hotfix/", format: "hotfix/[id_ticket]-[descripcion]", use: "Bugs urgentes en producción, van directo a main", origin: "main" },
];

const INEE_COMMIT_FLOW = [
  { step: "1", action: "Crear rama", detail: "Desde develop (o main para hotfix). Usar la convención de nombres." },
  { step: "2", action: "Desarrollar", detail: "Hacer commits atómicos con mensajes descriptivos." },
  { step: "3", action: "Push + PR", detail: "Abrir Pull Request hacia develop (o main para hotfix)." },
  { step: "4", action: "Review", detail: "Al menos un review aprobado antes de mergear." },
  { step: "5", action: "Merge a develop", detail: "Triggeriza deploy automático a QA vía GitHub Actions." },
  { step: "6", action: "Merge a main", detail: "Triggeriza deploy automático a Producción vía GitHub Actions." },
];

const FIREBASE_HOSTING_CHECKLIST = [
  "Verificar que las GitHub Secrets (_QA y _PROD) estén actualizadas",
  "Confirmar que el build local pasa sin errores antes de pushear",
  "Revisar el tab Actions en GitHub para confirmar que el workflow terminó OK",
  "Verificar la URL del entorno correspondiente después del deploy",
];

const RENDER_DEPLOY_CHECKLIST = [
  "Confirmar que las variables de entorno en el dashboard de Render estén correctas",
  "Verificar que el build log no tenga errores de TypeScript",
  "Revisar los logs del servicio en Render después del deploy",
  "Testear el endpoint /health o cualquier ruta pública para confirmar que levantó",
];

const INEE_SHARED_PLATFORMS = [
  {
    category: "Gestión del proyecto",
    links: [
      {
        label: "Jira — gestión integral",
        url: "https://capassotech.atlassian.net/jira/software/projects/INEE/boards/38",
        desc: "Gestión integral, tableros, sprints, cronogramas y mas",
      },
      {
        label: "Trello — tablero INEE",
        url: "https://trello.com/b/y6BhOHjP/inee",
        desc: "Tickets y seguimiento de tareas del equipo",
      },
    ],
  },
];

const INEE_BACKEND_PLATFORMS = [
  {
    category: "Repositorio",
    links: [
      {
        label: "INEE-backend",
        url: "https://github.com/capassotech/INEE-backend",
        desc: "Código fuente del API REST en GitHub",
      },
    ],
  },
  {
    category: "Deploy",
    links: [
      {
        label: "Render Dashboard",
        url: "https://dashboard.render.com/",
        desc: "Web service del backend (QA y producción)",
      },
    ],
  },
  {
    category: "Firebase (Admin SDK)",
    links: [
      {
        label: "Firebase — QA (inee-qa)",
        url: "https://console.firebase.google.com/u/0/project/inee-qa/overview",
        desc: "Firestore, Auth y Storage usados por el backend en QA",
      },
      {
        label: "Firebase — Prod (inee-admin)",
        url: "https://console.firebase.google.com/u/0/project/inee-admin/overview",
        desc: "Firestore, Auth y Storage usados por el backend en producción",
      },
    ],
  },
  {
    category: "Servicios externos",
    links: [
      {
        label: "Resend",
        url: "https://resend.com/login",
        desc: "Emails transaccionales (compras, recordatorios, contacto)",
      },
    ],
  },
];

const INEE_ADMIN_PLATFORMS = [
  {
    category: "Repositorio",
    links: [
      {
        label: "INEE-admin",
        url: "https://github.com/capassotech/INEE-admin",
        desc: "Código fuente del panel de administración",
      },
    ],
  },
  {
    category: "Firebase (DB, Storage y Hosting)",
    links: [
      {
        label: "Firebase — QA (inee-qa)",
        url: "https://console.firebase.google.com/u/0/project/inee-qa/overview",
        desc: "Proyecto Firebase del admin en QA",
      },
      {
        label: "Firebase — Prod (inee-admin)",
        url: "https://console.firebase.google.com/u/0/project/inee-admin/overview",
        desc: "Proyecto Firebase del admin en producción",
      },
    ],
  },
];

const INEE_TIENDA_PLATFORMS = [
  {
    category: "Repositorio",
    links: [
      {
        label: "INEE-tienda",
        url: "https://github.com/capassotech/INEE-tienda",
        desc: "Código fuente de la tienda pública",
      },
    ],
  },
  {
    category: "Firebase (DB, Storage y Hosting)",
    links: [
      {
        label: "Firebase — QA (inee-tienda-qa)",
        url: "https://console.firebase.google.com/u/0/project/inee-tienda-qa/overview",
        desc: "Proyecto Firebase de la tienda en QA",
      },
      {
        label: "Firebase — Prod (inee-tienda-qa)",
        url: "https://console.firebase.google.com/u/0/project/inee-tienda-qa/overview",
        desc: "Proyecto Firebase de la tienda en producción",
      },
    ],
  },
];

const INEE_CURSOS_PLATFORMS = [
  {
    category: "Repositorio",
    links: [
      {
        label: "INEE-estudiante",
        url: "https://github.com/capassotech/INEE-estudiante",
        desc: "Código fuente del portal del estudiante",
      },
    ],
  },
  {
    category: "Firebase (DB, Storage y Hosting)",
    links: [
      {
        label: "Firebase — QA (inee-estudiante-qa)",
        url: "https://console.firebase.google.com/u/0/project/inee-estudiante-qa/overview",
        desc: "Proyecto Firebase del portal en QA",
      },
      {
        label: "Firebase — Prod (inee-plataforma)",
        url: "https://console.firebase.google.com/u/0/project/inee-plataforma/overview",
        desc: "Proyecto Firebase del portal en producción",
      },
    ],
  },
];

const INEE_BACKEND_FIREBASE_PRIVATE_KEY_QA =
  "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDZRSlx8K8KP1xU\\nioQzXr50r9BYPo0nPZs1JDw/clBZr48x2fCkjE00CzHFupXeorPOBzCak6i2XCZa\\nyYHbJVLfa5jzQH2QwgZUujEOBDqGT3vWjkibqh0CQVo0oBSLAF6EzGIYxp9EUoij\\na+AjLRm+GGdwycQKA/fVnbXjLoLCQXb3iEiWHRloEaHcTdZYuNICjCWxwHYeDrru\\nRA22KuVEWbSb+OARWPNvZs5IrnTDZ+I7HuDhUssVqlpbmitpdcNb3jYmsBaauWzX\\nM8h6xQzFpnAtM+dJW4lT5wYyj69XEZJlVnaYY0GkT5VJDvnhHuVxvqJ1y66q7SCZ\\nqBt7vsElAgMBAAECggEAE17yMgFmacB6Z+MtpDLXQioGpkd1aEE63EMNyA5WEZjw\\naF5o8RK9M12oI1veTsosw7qqX624hgGzPbbnh/VM7TR3n4BpcYWK8PTkuL4xxZXC\\nkb9/w7kn+vJ+q2B2VGpFAwwB1vmma338Rq2wfxJfUC520nx6qPXvm7EC7W1RJSZs\\n4X4P2nvPzCGdnpPlFNwfqccLMxB6nSFrHqyLGblAw7AaSWkRyFRRvaE7D/gUKJo1\\neWqlbmAfAY4HMxeTsCkPDTBfN+IX9q9FxTkSldN9xwxNLDxfR9VOczLPoa9E4yO0\\nMAg1WOa+Tno66nLZOXo2omznRr50JavuHrDP+lAbpQKBgQD8Vs7+n+NBGu22CnrN\\nmKiqnkrEBomB/FUOoKv3kX+zBGDzR9BFB8BN+tBCFR5HpX87zWK5ai7noM8VWZ0V\\nPywyqolghMcJQF6Zfau33g/h2Ry+fGGgGt+Mzx7DVQ7vGHQS1MPjwZQrNllD2Jxr\\nazNvHUpsutRY6j6XoZXyuNRvPwKBgQDcbBtT1vVD3XFOWMo+IBeqtC7v7NxcuxHb\\nngGCvoZfNGkuRPvR9i6/OEI4ja4599GwTZIk4STKt10CzQdCx0fkGh0hVJEJ0FVJ\\nApHBiK6Gg3h3Q6i4eSjyueqHziw13WlvGkKCqtEM0yWeeg2Jq7P9a+oJUb0n6y1W\\n3QqM3m0amwKBgCQEF+NL2tnOCCO1dzWlFl3T3gQAktvUsic2U5UwVTOt6lCO7XEM\\n3CvFIrhr3ziGrJRSikbAmxVAZI49jigcLijFInp+ORJe96GcyEekEExB+tJNWnnJ\\nnCKy5Ucn+suxh8+wQo1dcdKBHViLsDe8w0iWu6qtN+XA+VIXJBnSu69tAoGAK21h\\nNPN0/xnx6O21augHwaoeVUblY5+3tP08bvX6o2dAEc2lj4hhTWtYIKxJV0JsHcAq\\nuvlgtk/KE3MxqwZ4M4ixlI+Ew9o381p+PRMgz3+3jEfYRgAZATl/66HDNBmbXDhg\\nQj5FUbGIB+EkKauamqNYSN3B1suO8z45heeMt2ECgYEA14q9JC3PaypHA1sH+ii/\\n/qCHX9wTjesWCLS6UYfWxwGhDgX0hQD0MT2KtkoDj2nOu3Fhof5B4PM/WBZIn9xS\\nmfg2F0MGQhO5T0nDnGyqrLYYO/zeFkmLBbDNO70XxZQlID6cTIeiI85Iax58F9Sy\\nmOnsWseD36GcrHUh5SQrUws=\\n-----END PRIVATE KEY-----\\n";

const INEE_BACKEND_FIREBASE_PRIVATE_KEY_PROD =
  "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDVsdipuzEOkE6O\\nh6PkeSZjOzZSzOXl1j6HKoIp7ZnRvNUF6EQpvoqc1HiYqSobqEuDS3fGtNj4g3Sa\\nTdrstXUvPX29vSyzPYRGEGUxbHmYTU+rBMLFni5nI2U4tEKb2TEVlFWmG7sV3zmn\\nKiBjml40rPbzsJemDLTOkwmGMGlRFG+bYnruyLvtPS4O4i/QfjjGbH1pDQti6Lm2\\nXKcDQIypuiqRZB18oQkaPzhR57gD1ZRztWHdHqZP8Az+05deo2ig7AXKdBCLum9t\\npKZlRmxic+mEaSuTOPuXuMcvO2chk+eSgIyzNbSuENxSUNN2nH9hcFgUmr2k5BBI\\nxacFn7u7AgMBAAECggEAJhA/KQCEXPU8YOvtOAGSYmOGKhqAKr/ONHJQbBp75x2N\\nDjfQiGT9uLCp6HtdWj7QcIsNQzIsYZu8tc1/XOF3hZoc3yKmpyiien5qH/MT95px\\nweMftGaYGlv2KDMHmE4IDbF1zhgra1pvIQUCbutss1JJzJ9ca8HgpNkQ/bt6zuuS\\n3YFjaIEb3t5VJZp4rW1xB+aB42H7VF6DIFx+Jq7T89ToApPcY8yWOXFexGBeOTDH\\nHwW0fpL3viFZBetNi5xEIHu+kJxCKMs25SNaj85uU83MWjU3dUgWGnsqvwUdEcIp\\ns/dvli3OmZox26Ttua1X9rKRdbEoEjI+SFMaynmNpQKBgQD9Oh0ZScwMwo1oku/N\\n44hqRp60ukbFHl0+MTPmKlzT5uQ9HTa3OTEX7L1ThnVVTnW3cg66b3Ou4dX/7lzg\\niNhW7Ymr46LaBFbYvpMuEAr/FJiADiACDU7tGoSaBBgf0orcrpbrXk5IFIpNdm5a\\nuYTIM9JIW4iIGFCzzSmmrWPXzwKBgQDYCOjRFY2tYUQVcUDaWHVf2tWg53HLoJ8Z\\nV55wwUV4xtoZBKTllefVPP+2axVYZm0oMqhMZAqYqxkdmsqFQNZ3sRWYVu1l6yEl\\nwiy/IWaVEa2pm3HWtyVsdSvnYhNYLPvf2YwyO1Bi18R6chO35Q7+yizShYLYz3G+\\nNmPH/masVQKBgQCgZrRR9W38UyxRpmmiSFN7xjn3jtsPN7mmkHIohIMCcwn2MFAd\\nZWvUlNAkXVJrc+SbC/OKYtirWUA9+pX4YJZxEcwYBnx8jy0X5DfEgMMGatximQ/r\\nXNS22gpOqPNDDRGK0kik1LrPa7tjb/ZdH5CdZD36OYjVdFmCWx3cB47r/wKBgFUX\\nvUyN5s5CH6UqhNb8PM9SzQ6h20rPq5s5zeiv2ANooAN2ttTPpQ9zBW3+49t8DMbm\\nnS/pv9q+mhf1How6K7/depoUs1GPufC7eRCXwWY6HmNOHRrr7Mu5o19yXBhBL7zO\\nXdBzWIh2YKeyQ14N1Ug6rkkF2bI4k57OoaLm6945AoGBAPORYssIk7VaYSEtFoiY\\nRBVTLFCHKybfKLa+UUYtjFippffxVAPZ8RlL7tWf+7uFwwtaPawNshQI1YztQnG2\\nMS33VEDx08hyWF1WvKCpSS/mojUi3nbYahKEJFoRbjUrlgIo1vGrHidqrv+eRxtz\\nWHASmGRxqaEHNLvFFYw1/IEx\\n-----END PRIVATE KEY-----";

const INEE_BACKEND_ENV_QA = [
  { key: "PORT", value: "3000", desc: "Puerto del servidor" },
  { key: "NODE_ENV", value: "development", desc: "Entorno de ejecución" },
  { key: "FIREBASE_PROJECT_ID", value: "inee-qa", desc: "Proyecto Firebase (QA)" },
  { key: "FIREBASE_CLIENT_EMAIL", value: "firebase-adminsdk-fbsvc@inee-qa.iam.gserviceaccount.com", desc: "Service account de Firebase Admin" },
  { key: "FIREBASE_PRIVATE_KEY", value: INEE_BACKEND_FIREBASE_PRIVATE_KEY_QA, desc: "Clave privada del service account (escapar saltos de línea)" },
  { key: "FIREBASE_API_KEY", value: "AIzaSyC0mx89rSeedrdTtpyqrlhS7FAIejCrIWM", desc: "API key del proyecto Firebase" },
  { key: "FIREBASE_AUTH_DOMAIN", value: "inee-qa.firebaseapp.com", desc: "Auth domain" },
  { key: "FIREBASE_STORAGE_BUCKET", value: "inee-qa.firebasestorage.app", desc: "Bucket de Storage" },
  { key: "FIREBASE_APP_ID", value: "1:405703677594:web:6928b7d21f233ad7b67123", desc: "App ID del proyecto Firebase" },
  { key: "FIREBASE_MESSAGING_SENDER_ID", value: "405703677594", desc: "Messaging sender ID (Firebase console)" },
  { key: "FIREBASE_MEASUREMENT_ID", value: "G-2YGRGW2HJX", desc: "ID de Google Analytics" },
  { key: "RESEND_API_KEY", value: "re_f9s8qbGE_K9FoSWnGdLQSFsN5bfXiHyVJ", desc: "API key de Resend" },
  { key: "MERCADO_PAGO_ACCESS_TOKEN", value: "APP_USR-4020518669006684-012017-f2278c29fec228edd4621944f1cd7b71-2696959305", desc: "Token MercadoPago — cuenta principal" },
  { key: "MERCADO_PAGO_PUBLIC_KEY", value: "APP_USR-5ac84a43-3a18-45f1-a9f9-c867db495df9", desc: "Public key MercadoPago — cuenta principal" },
  { key: "MERCADO_PAGO_ACCESS_TOKEN_ROCIO", value: "APP_USR-4856636080662894-031917-1d02b5756353c99b1621a74fd8f50b9e-232705255", desc: "Token MercadoPago — cuenta Rocío" },
  { key: "MERCADO_PAGO_PUBLIC_KEY_ROCIO", value: "APP_USR-7d01d3c3-02ec-4414-afd4-bcd2086619c2", desc: "Public key MercadoPago — cuenta Rocío" },
  { key: "JWT_SECRET", value: "mi_clave_secreta_super_larga_y_segura_para_jwt_tokens_2024", desc: "Secreto para firmar JWT propios" },
  { key: "FRONTEND_URL", value: "http://localhost:5173", desc: "URL del frontend (CORS y redirecciones)" },
  { key: "VITE_API_URL", value: "https://inee-backend.onrender.com", desc: "URL del backend (referencia compartida con frontends)" },
  { key: "VITE_FIREBASE_MESSAGING_SENDER_ID", value: "955253b4ffd3d1e815b3c832b3777283", desc: "Messaging sender ID (hash de referencia)" },
];

const INEE_BACKEND_ENV_PROD = [
  { key: "PORT", value: "3000", desc: "Puerto del servidor" },
  { key: "NODE_ENV", value: "production", desc: "Entorno de ejecución" },
  { key: "FIREBASE_PROJECT_ID", value: "inee-admin", desc: "Proyecto Firebase (Producción)" },
  { key: "FIREBASE_CLIENT_EMAIL", value: "firebase-adminsdk-fbsvc@inee-admin.iam.gserviceaccount.com", desc: "Service account de Firebase Admin (prod)" },
  { key: "FIREBASE_PRIVATE_KEY", value: INEE_BACKEND_FIREBASE_PRIVATE_KEY_PROD, desc: "Clave privada del service account prod" },
  { key: "FIREBASE_API_KEY", value: "AIzaSyAZDT5DM68-9qYH23HdKAsOTaV_qCAPEiw", desc: "API key del proyecto Firebase prod" },
  { key: "FIREBASE_AUTH_DOMAIN", value: "inee-admin.firebaseapp.com", desc: "Auth domain prod" },
  { key: "FIREBASE_STORAGE_BUCKET", value: "inee-admin.appspot.com", desc: "Bucket de Storage prod" },
  { key: "FIREBASE_APP_ID", value: "1:746757753608:web:c63f0a8d2d60f10fefbabd", desc: "App ID del proyecto Firebase prod" },
  { key: "FIREBASE_MESSAGING_SENDER_ID", value: "746757753608", desc: "Messaging sender ID (Firebase console) prod" },
  { key: "FIREBASE_MEASUREMENT_ID", value: "G-2YGRGW2HJX", desc: "ID de Google Analytics (mismo que QA)" },
  { key: "RESEND_API_KEY", value: "re_f9s8qbGE_K9FoSWnGdLQSFsN5bfXiHyVJ", desc: "API key de Resend (misma que QA)" },
  { key: "MERCADO_PAGO_ACCESS_TOKEN", value: "APP_USR-4020518669006684-012017-f2278c29fec228edd4621944f1cd7b71-2696959305", desc: "Token MercadoPago — cuenta principal (misma que QA)" },
  { key: "MERCADO_PAGO_PUBLIC_KEY", value: "APP_USR-5ac84a43-3a18-45f1-a9f9-c867db495df9", desc: "Public key MercadoPago — cuenta principal (misma que QA)" },
  { key: "MERCADO_PAGO_ACCESS_TOKEN_ROCIO", value: "APP_USR-4856636080662894-031917-1d02b5756353c99b1621a74fd8f50b9e-232705255", desc: "Token MercadoPago — cuenta Rocío (misma que QA)" },
  { key: "MERCADO_PAGO_PUBLIC_KEY_ROCIO", value: "APP_USR-7d01d3c3-02ec-4414-afd4-bcd2086619c2", desc: "Public key MercadoPago — cuenta Rocío (misma que QA)" },
  { key: "JWT_SECRET", value: "mi_clave_secreta_super_larga_y_segura_para_jwt_tokens_2024", desc: "Secreto JWT (mismo que QA)" },
  { key: "FRONTEND_URL", value: "http://localhost:5173", desc: "URL del frontend (CORS y redirecciones)" },
  { key: "VITE_API_URL", value: "https://inee-backend.onrender.com", desc: "URL del backend (referencia compartida con frontends, misma que QA)" },
  { key: "VITE_FIREBASE_MESSAGING_SENDER_ID", value: "955253b4ffd3d1e815b3c832b3777283", desc: "Messaging sender ID (hash de referencia, misma que QA)" },
];

function ineeFrontendEnv(opts) {
  const vars = [
    { key: "VITE_FIREBASE_API_KEY", value: opts.apiKey || "AIzaSyC0mx89rSeedrdTtpyqrlhS7FAIejCrIWM", desc: "API key del proyecto Firebase" },
    { key: "VITE_FIREBASE_AUTH_DOMAIN", value: opts.authDomain, desc: "Auth domain del proyecto Firebase" },
    { key: "VITE_FIREBASE_PROJECT_ID", value: opts.projectId, desc: "Project ID de Firebase" },
    { key: "VITE_FIREBASE_STORAGE_BUCKET", value: opts.storageBucket, desc: "Bucket de Firebase Storage" },
    { key: "VITE_FIREBASE_MESSAGING_SENDER_ID", value: opts.messagingSenderId || "123456789012", desc: "Messaging sender ID (Firebase console)" },
    { key: "VITE_FIREBASE_APP_ID", value: opts.appId || "1:123456789012:web:abcdef1234567890", desc: "App ID del proyecto Firebase" },
    { key: "VITE_FIREBASE_MEASUREMENT_ID", value: opts.measurementId || "G-XXXXXXXXXX", desc: "ID de Google Analytics" },
    { key: "VITE_API_URL", value: opts.apiUrl, desc: "URL del backend INEE" },
    { key: "VITE_FRONTEND_URL", value: opts.frontendUrl, desc: "URL de este frontend" },
  ];
  if (opts.mercadoPago) {
    vars.push({
      key: "VITE_MERCADOPAGO_PUBLIC_KEY",
      value: opts.mercadoPagoPublicKey || "APP_USR-xxxx",
      desc: "Public key de MercadoPago para el SDK cliente",
    });
  }
  return vars;
}

const inee = {
  id: "inee",
  name: "INEE",
  color: "#8B3740",
  description: "Plataforma educativa con tienda de cursos, portal de estudiantes y panel de administración.",
  platforms: INEE_SHARED_PLATFORMS,
  subprojects: [
    {
      id: "inee-backend",
      name: "INEE-backend",
      description: "API REST central que sirve a todos los frontends de INEE. Maneja autenticación, cursos, pagos, emails, certificados y más.",
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
        about:
          "API REST central construida con Express 5 y TypeScript que sirve como única fuente de datos para todos los frontends de INEE (tienda, cursos y admin). Gestiona autenticación, cursos, pagos, emails transaccionales, generación de certificados PDF y automatizaciones programadas.",
        objective:
          "Centralizar toda la lógica de negocio y acceso a datos en un único servicio escalable, desacoplado de los frontends.",
        keyPoints: [
          "Arquitectura modular: cada entidad tiene su propio controller + routes",
          "Autenticación via Firebase Admin con middleware reutilizable",
          "Integración con MercadoPago para dos cuentas distintas",
          "Generación de certificados PDF con pdf-lib y puppeteer",
          "Scheduler de recordatorios automáticos con node-cron",
        ],
        meta: [
          { label: "Repo", value: "INEE-backend" },
          { label: "Tipo", value: "Backend / API REST" },
          { label: "Runtime", value: "Node.js >= 18" },
          { label: "Entry point", value: "src/index.ts" },
          { label: "Build", value: "tsc → dist/" },
        ],
      },
      folderStructure: [
        { path: "src/modules/", desc: "Cada módulo tiene su propio controller.ts + routes.ts" },
        { path: "src/middleware/", desc: "authMiddleware, cacheHeaders, validation, zodValidation" },
        { path: "src/services/", desc: "Lógica reutilizable entre módulos (assignProductsToUser, discountCodeUsage)" },
        { path: "src/types/", desc: "Interfaces TypeScript por entidad" },
        { path: "src/utils/", desc: "cache, orderEnrichment, paypalProofStorage, etc." },
        { path: "src/config/", desc: "Configuración de Firebase Admin SDK" },
        { path: "scripts/", desc: "Scripts de migración y seed (ts-node)" },
      ],
      modules: [
        { name: "auth", tag: "Firebase Admin", desc: "Verificación de tokens Firebase y creación de usuarios custom. Middleware de autenticación reutilizable." },
        { name: "users", tag: "Firestore", desc: "CRUD de usuarios. Gestión de perfil, roles y datos personales." },
        { name: "courses", tag: "Firestore", desc: "ABM de cursos, módulos y clases. Incluye lógica de ordenamiento drag & drop." },
        { name: "purchases", tag: "MercadoPago", desc: "Procesamiento de compras con MercadoPago Checkout API y soporte 3DS para débito." },
        { name: "payments", tag: "MercadoPago", desc: "Gestión de pagos, cuotas y validación de estado de transacciones." },
        { name: "orders", tag: "Firestore", desc: "Historial de órdenes. Soporte para pago por comprobante PayPal (upload + validación)." },
        { name: "cart", tag: "Firestore", desc: "Carrito persistente por usuario." },
        { name: "emails", tag: "Resend", desc: "Envío transaccional: notificación de compra, recordatorio de comprobante PayPal, recurso disponible." },
        { name: "certificates", tag: "pdf-lib", desc: "Generación de certificados PDF (aprobación y participación) con templates base." },
        { name: "progress", tag: "Firestore", desc: "Seguimiento de progreso del alumno por curso/módulo/clase." },
        { name: "examenes", tag: "Firestore", desc: "ABM de exámenes y preguntas. Módulo examenes-realizados para guardar resultados." },
        { name: "events", tag: "Firestore", desc: "ABM de eventos y gestión de inscripciones (event-registrations)." },
        { name: "ebooks", tag: "Firestore", desc: "ABM de ebooks disponibles para venta o descarga." },
        { name: "membership", tag: "Firestore", desc: "Gestión de membresías de usuarios." },
        { name: "discount-codes", tag: "Firestore", desc: "Creación y validación de códigos de descuento. Tracking de uso por usuario." },
        { name: "avales", tag: "Firestore", desc: "Gestión de avales institucionales asociados a productos." },
        { name: "newsletter", tag: "Resend", desc: "Suscripción y envío de newsletter." },
        { name: "reviews", tag: "Firestore", desc: "Reseñas de cursos por parte de alumnos." },
        { name: "testimonials", tag: "Firestore", desc: "Gestión de testimonios para mostrar en la tienda." },
        { name: "recomendaciones", tag: "Firestore", desc: "Sistema de recomendaciones de cursos." },
        { name: "test-vocacional", tag: "Firestore", desc: "Preguntas, perfiles y cálculo de resultados del test vocacional." },
        { name: "profesors", tag: "Firestore", desc: "ABM de profesores asociados a cursos." },
        { name: "recordatorios", tag: "node-cron", desc: "Scheduler para recordatorios automáticos (ej: comprobante PayPal pendiente)." },
        { name: "back-modules", tag: "Firestore", desc: "Configuración general del backoffice." },
        { name: "contact", tag: "Resend", desc: "Formulario de contacto con envío de email." },
        { name: "mercado-pago-accounts", tag: "MercadoPago", desc: "Gestión de múltiples cuentas MercadoPago (cuenta principal + cuenta Rocío)." },
      ],
      environments: [
        { name: "Local", type: "dev", url: "http://localhost:3000", branch: "cualquiera", hosting: "local" },
        { name: "QA", type: "qa", url: "https://inee-backend-qa.onrender.com", branch: "develop", hosting: "Render" },
        { name: "Producción", type: "prod", url: "https://inee-backend.onrender.com", branch: "main", hosting: "Render" },
      ],
      branchConventions: INEE_BRANCH_CONVENTIONS,
      commitFlow: INEE_COMMIT_FLOW,
      envGroups: [
        { name: "local", label: "Local (DEV)", vars: INEE_BACKEND_ENV_QA },
        { name: "qa", label: "QA", vars: INEE_BACKEND_ENV_QA },
        { name: "prod", label: "Producción", vars: INEE_BACKEND_ENV_PROD },
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
          checklist: RENDER_DEPLOY_CHECKLIST,
        },
      ],
      platforms: INEE_BACKEND_PLATFORMS,
    },

    {
      id: "inee-tienda",
      name: "INEE-tienda",
      description: "Tienda pública de INEE. Landing principal, catálogo de cursos, ebooks, eventos, carrito y checkout con MercadoPago.",
      stack: [
        { label: "React 18", color: "blue" },
        { label: "TypeScript", color: "blue" },
        { label: "Vite", color: "purple" },
        { label: "TailwindCSS", color: "teal" },
        { label: "shadcn/ui", color: "teal" },
        { label: "Firebase", color: "amber" },
        { label: "MercadoPago", color: "green" },
      ],
      overview: {
        about:
          "Frontend público de INEE construido con React + Vite. Es el punto de entrada para los alumnos: pueden explorar el catálogo, leer sobre los pilares formativos, agregar productos al carrito y completar la compra vía MercadoPago o comprobante PayPal.",
        objective:
          "Convertir visitantes en alumnos mediante una experiencia de compra clara, rápida y confiable.",
        keyPoints: [
          "Carrito persistente con Context API",
          "Checkout con MercadoPago Checkout API (tarjeta + 3DS)",
          "Modo de precios ARS/USD switcheable",
          "SEO: sitemap generado automáticamente en cada build",
          "Skeleton loaders y preload de imágenes para mejor UX",
        ],
        meta: [
          { label: "Repo", value: "INEE-tienda" },
          { label: "Tipo", value: "Frontend público" },
          { label: "Build tool", value: "Vite + SWC" },
          { label: "UI library", value: "shadcn/ui + Radix UI" },
          { label: "Estado global", value: "React Context (Auth, Cart, Pricing)" },
        ],
      },
      folderStructure: [
        { path: "src/pages/", desc: "Una página por ruta: checkout, pilares, ebooks, agenda, carrito, etc." },
        { path: "src/components/", desc: "AuthForm, pilares, checkout, skeletons, ui (shadcn)" },
        { path: "src/context/", desc: "AuthContext, CartContext, PricingContext" },
        { path: "src/lib/", desc: "APIs hacia el backend (coursesApi, ebooksApi, eventosApi, etc.) + MercadoPago SDK" },
        { path: "src/services/", desc: "authService, cartService, mercadoPagoService, paypalService" },
        { path: "src/hooks/", desc: "Preloaders de imágenes, scroll animation, formaciones por pilar" },
        { path: "src/utils/", desc: "imagePreloader, normalizeDate" },
        { path: "scripts/", desc: "generate-sitemap.js — se ejecuta en prebuild automáticamente" },
      ],
      modules: [
        { name: "Auth", tag: "Firebase", desc: "Login, registro, Google OAuth, recuperación de contraseña. Modales de linking de providers y completar DNI. AuthCarritoModal para no perder el carrito al autenticar." },
        { name: "Catálogo", tag: "Frontend", desc: "Listado de cursos con filtros y búsqueda. ProductCard con skeleton loaders y preload de imágenes en hover." },
        { name: "Carrito", tag: "Context", desc: "CartContext persiste el carrito. Página /carrito con resumen. Auth modal integrado para usuarios no logueados." },
        { name: "Checkout", tag: "MercadoPago", desc: "Formulario de pago con MercadoPago Checkout API. Soporte para pago por comprobante PayPal. Páginas de éxito/pendiente/fallo." },
        { name: "Ebooks", tag: "Frontend", desc: "Catálogo y detalle de ebooks. Integración con backend para compra." },
        { name: "Eventos / Agenda", tag: "Frontend", desc: "Listado de eventos próximos, detalle e inscripción." },
        { name: "Membresías", tag: "Frontend", desc: "Planes de membresía disponibles." },
        { name: "Test Vocacional", tag: "Frontend", desc: "Modal de test vocacional con rutas de aprendizaje sugeridas." },
        { name: "Pilares", tag: "Frontend", desc: "Secciones de Liderazgo, Emprendimiento y Consultoría Estratégica con componentes propios por pilar." },
        { name: "Pricing", tag: "Context", desc: "PricingContext gestiona modo ARS/USD. Selector de moneda en header." },
        { name: "SEO / Sitemap", tag: "Vite prebuild", desc: "generate-sitemap.js se ejecuta antes de cada build para actualizar sitemap.xml." },
        { name: "Perfil", tag: "Firebase", desc: "Datos del usuario y mis compras." },
      ],
      environments: [
        { name: "Local", type: "dev", url: "http://localhost:5173", branch: "cualquiera", hosting: "local" },
        { name: "QA", type: "qa", url: "https://inee-tienda-qa.web.app", branch: "develop", hosting: "Firebase Hosting" },
        { name: "Producción", type: "prod", url: "https://ineeoficial.com", branch: "main", hosting: "Firebase Hosting" },
      ],
      branchConventions: INEE_BRANCH_CONVENTIONS,
      commitFlow: INEE_COMMIT_FLOW,
      envGroups: [
        {
          name: "local",
          label: "Local (DEV)",
          vars: ineeFrontendEnv({
            authDomain: "inee-qa.firebaseapp.com",
            projectId: "inee-qa",
            storageBucket: "inee-qa.firebasestorage.app",
            messagingSenderId: "405703677594",
            appId: "1:405703677594:web:6928b7d21f233ad7b67123",
            measurementId: "G-2YGRGW2HJX",
            apiUrl: "https://inee-backend-qa.onrender.com",
            frontendUrl: "http://localhost:5173",
            mercadoPago: true,
            mercadoPagoPublicKey: "APP_USR-86a8dfa0-65f5-4be8-85d6-7c3bfdd57a54",
          }),
        },
        {
          name: "qa",
          label: "QA",
          vars: ineeFrontendEnv({
            authDomain: "inee-qa.firebaseapp.com",
            projectId: "inee-qa",
            storageBucket: "inee-qa.firebasestorage.app",
            messagingSenderId: "405703677594",
            appId: "1:405703677594:web:6928b7d21f233ad7b67123",
            measurementId: "G-2YGRGW2HJX",
            apiUrl: "https://inee-backend-qa.onrender.com",
            frontendUrl: "http://localhost:5173",
            mercadoPago: true,
            mercadoPagoPublicKey: "APP_USR-86a8dfa0-65f5-4be8-85d6-7c3bfdd57a54",
          }),
        },
        {
          name: "prod",
          label: "Producción",
          vars: ineeFrontendEnv({
            apiKey: "AIzaSyAZDT5DM68-9qYH23HdKAsOTaV_qCAPEiw",
            authDomain: "inee-admin.firebaseapp.com",
            projectId: "inee-admin",
            storageBucket: "inee-admin.firebasestorage.app",
            messagingSenderId: "746757753608",
            appId: "1:746757753608:web:c63f0a8d2d60f10fefbabd",
            measurementId: "G-PH54SWBE8V",
            apiUrl: "https://inee-backend.onrender.com",
            frontendUrl: "https://ineeoficial.com",
            mercadoPago: true,
            mercadoPagoPublicKey: "APP_USR-86a8dfa0-65f5-4be8-85d6-7c3bfdd57a54",
          }),
        },
      ],
      deploys: [
        {
          title: "Firebase Hosting — GitHub Actions",
          rows: [
            { key: "Trigger QA", value: "Push a branch develop" },
            { key: "Trigger Prod", value: "Push a branch main" },
            { key: "Build cmd", value: "npm run build (prebuild genera sitemap)" },
            { key: "Proyecto QA", value: "inee-tienda-qa (Firebase)" },
            { key: "Proyecto Prod", value: "inee-beta (Firebase)" },
            { key: "Secrets", value: "VITE_FIREBASE_* (_QA/_PROD), FIREBASE_SERVICE_ACCOUNT, VITE_MERCADOPAGO_PUBLIC_KEY" },
            { key: "Node version", value: "20" },
          ],
          checklist: FIREBASE_HOSTING_CHECKLIST,
        },
      ],
      platforms: INEE_TIENDA_PLATFORMS,
    },

    {
      id: "inee-cursos",
      name: "INEE-cursos",
      description: "Portal del estudiante. Acceso a cursos comprados, clases, exámenes, certificados y progreso.",
      stack: [
        { label: "React 18", color: "blue" },
        { label: "TypeScript", color: "blue" },
        { label: "Vite", color: "purple" },
        { label: "TailwindCSS", color: "teal" },
        { label: "shadcn/ui", color: "teal" },
        { label: "Firebase", color: "amber" },
        { label: "react-pdf", color: "green" },
      ],
      overview: {
        about:
          "Portal privado del alumno donde accede a sus cursos comprados. Permite reproducir clases (video, PDF, teoría), trackear progreso, rendir exámenes, descargar certificados y hacer el test vocacional.",
        objective:
          "Ofrecer al alumno una experiencia de aprendizaje fluida y centralizada, con acceso solo a los contenidos que adquirió.",
        keyPoints: [
          "Acceso condicionado por compra verificada en el backend",
          "Progreso por clase sincronizado en tiempo real",
          "Exámenes con corrección automática y historial de intentos",
          "Certificados PDF generados y validables públicamente",
          "Linking de providers Firebase (Google ↔ email/password)",
        ],
        meta: [
          { label: "Repo", value: "INEE-cursos" },
          { label: "Tipo", value: "Frontend — portal del alumno" },
          { label: "Build tool", value: "Vite + SWC" },
          { label: "UI library", value: "shadcn/ui + Radix UI" },
          { label: "Estado global", value: "React Context (Auth)" },
        ],
      },
      folderStructure: [
        { path: "src/pages/", desc: "Curso, ExamenPage, Theory, TheoryDetail, ValidateCertificate, Memberships, TestVocacional, Profile" },
        { path: "src/components/", desc: "CourseCard, CourseDetail, AuthForm (con linking providers), PDFModal, VideoModal, ContentItem" },
        { path: "src/contexts/", desc: "AuthContext con Firebase Auth" },
        { path: "src/services/", desc: "courseService, progressService, examenService, certificateService, authService, etc." },
        { path: "src/hooks/", desc: "dataAdapters.ts (normaliza respuestas del backend), usePaginatedData" },
        { path: "src/lib/", desc: "firebase.ts, utils.ts, coursesMock.tsx" },
        { path: "src/types/", desc: "types.ts con todas las interfaces del dominio" },
      ],
      modules: [
        { name: "Auth", tag: "Firebase", desc: "Login email/password y Google OAuth. Modales de linking de providers, completar DNI, auto-registro con Google." },
        { name: "Mis cursos", tag: "Frontend", desc: "Listado de cursos comprados. Acceso condicionado a la compra." },
        { name: "Reproductor", tag: "Frontend", desc: "Navegación por módulos y clases. Soporte de video, PDF (react-pdf / pdfjs-dist) y contenido teórico con modal de detalle." },
        { name: "Progreso", tag: "API", desc: "Tracking de clases vistas y progreso por módulo. Se actualiza en tiempo real contra el backend." },
        { name: "Exámenes", tag: "API", desc: "Rendir exámenes al finalizar módulos. Visualización de exámenes realizados con modal de respuestas." },
        { name: "Certificados", tag: "API", desc: "Generación y descarga de certificado al aprobar. Página pública de validación." },
        { name: "Test Vocacional", tag: "API", desc: "Test interactivo con cálculo de perfil y rutas de aprendizaje sugeridas." },
        { name: "Membresías", tag: "API", desc: "Visualización de planes disponibles." },
        { name: "Perfil", tag: "Firebase", desc: "Datos del usuario, cambio de contraseña, historial." },
        { name: "Búsqueda", tag: "Frontend", desc: "Búsqueda paginada de cursos. Hook usePaginatedData para lazy loading." },
      ],
      environments: [
        { name: "Local", type: "dev", url: "http://localhost:5173", branch: "cualquiera", hosting: "local" },
        { name: "QA", type: "qa", url: "https://inee-estudiante-qa.web.app", branch: "develop", hosting: "Firebase Hosting" },
        { name: "Producción", type: "prod", url: "https://inee-plataforma.web.app", branch: "main", hosting: "Firebase Hosting" },
      ],
      branchConventions: INEE_BRANCH_CONVENTIONS,
      commitFlow: INEE_COMMIT_FLOW,
      envGroups: [
        {
          name: "local",
          label: "Local (DEV)",
          vars: ineeFrontendEnv({
            authDomain: "inee-qa.firebaseapp.com",
            projectId: "inee-qa",
            storageBucket: "inee-qa.firebasestorage.app",
            messagingSenderId: "405703677594",
            appId: "1:405703677594:web:6928b7d21f233ad7b67123",
            measurementId: "G-2YGRGW2HJX",
            apiUrl: "https://inee-backend-qa.onrender.com",
            frontendUrl: "http://localhost:5173",
          }),
        },
        {
          name: "qa",
          label: "QA",
          vars: ineeFrontendEnv({
            authDomain: "inee-qa.firebaseapp.com",
            projectId: "inee-qa",
            storageBucket: "inee-qa.firebasestorage.app",
            messagingSenderId: "405703677594",
            appId: "1:405703677594:web:6928b7d21f233ad7b67123",
            measurementId: "G-2YGRGW2HJX",
            apiUrl: "https://inee-backend-qa.onrender.com",
            frontendUrl: "http://localhost:5173",
          }),
        },
        {
          name: "prod",
          label: "Producción",
          vars: ineeFrontendEnv({
            apiKey: "AIzaSyAZDT5DM68-9qYH23HdKAsOTaV_qCAPEiw",
            authDomain: "inee-admin.firebaseapp.com",
            projectId: "inee-admin",
            storageBucket: "inee-admin.firebasestorage.app",
            messagingSenderId: "746757753608",
            appId: "1:746757753608:web:c63f0a8d2d60f10fefbabd",
            measurementId: "G-PH54SWBE8V",
            apiUrl: "https://inee-backend.onrender.com",
            frontendUrl: "https://ineeoficial.com",
          }),
        },
      ],
      deploys: [
        {
          title: "Firebase Hosting — GitHub Actions",
          rows: [
            { key: "Trigger QA", value: "Push a branch develop" },
            { key: "Trigger Prod", value: "Push a branch main" },
            { key: "Build cmd", value: "npm run build" },
            { key: "Proyecto QA", value: "inee-estudiante-qa (Firebase)" },
            { key: "Proyecto Prod", value: "inee-plataforma (Firebase)" },
            { key: "Secrets", value: "VITE_FIREBASE_* (_QA/_PROD), FIREBASE_SERVICE_ACCOUNT_QA/PROD" },
            { key: "Node version", value: "20" },
          ],
          checklist: FIREBASE_HOSTING_CHECKLIST,
        },
      ],
      platforms: INEE_CURSOS_PLATFORMS,
    },

    {
      id: "inee-admin",
      name: "INEE-admin",
      description: "Panel de administración interno. Gestión de productos, alumnos, órdenes, eventos, exámenes, membresías y configuración del sistema.",
      stack: [
        { label: "React 18", color: "blue" },
        { label: "TypeScript", color: "blue" },
        { label: "Vite", color: "purple" },
        { label: "TailwindCSS", color: "teal" },
        { label: "shadcn/ui", color: "teal" },
        { label: "Firebase", color: "amber" },
        { label: "dnd-kit", color: "green" },
      ],
      overview: {
        about:
          "Backoffice interno para el equipo de INEE. Permite gestionar la totalidad del contenido y los alumnos: crear y editar cursos con módulos arrastrables, asignar productos manualmente, revisar órdenes, configurar exámenes, descuentos, membresías y mucho más.",
        objective:
          "Darle al equipo de INEE control total sobre el contenido, los alumnos y la operación del negocio sin necesidad de tocar código.",
        keyPoints: [
          "Editor de cursos con módulos ordenables vía drag & drop (dnd-kit)",
          "Crop de imágenes integrado (react-easy-crop)",
          "Editor rich text para descripciones (react-quill)",
          "Validación de formularios con Zod",
          "Dashboard con métricas de alumnos, órdenes e ingresos (recharts)",
        ],
        meta: [
          { label: "Repo", value: "INEE-admin" },
          { label: "Tipo", value: "Frontend — backoffice" },
          { label: "Build tool", value: "Vite + SWC" },
          { label: "UI library", value: "shadcn/ui + Radix UI" },
          { label: "Estado global", value: "React Context (Auth, Users)" },
        ],
      },
      folderStructure: [
        { path: "src/pages/", desc: "Products, Students, Orders, Events, Ebooks, Examenes, Dashboard, Avales, Memberships, DiscountCodes, Teachers, TestVocacional, Recomendaciones, MercadoPago, Profile" },
        { path: "src/components/", desc: "Componentes por dominio: product/edit, students, orders, admin, auth, Event, Ebook, Membership, form" },
        { path: "src/context/", desc: "AuthContext, UsersContext" },
        { path: "src/lib/", desc: "APIs por entidad: avalesApi, ebooksApi, eventosApi, examenes-api, membresiasApi, mercadoPagoApi, profesoresApi, discountCodesApi, cuotas.ts" },
        { path: "src/service/", desc: "authService, ordersService, recomendacionesService, testVocacionalService, userService" },
        { path: "src/schemas/", desc: "Esquemas Zod: product-schema, event-schema, ebook-schema, cuotas-schema" },
        { path: "config/", desc: "firebase-client.ts — inicialización de Firebase en cliente" },
      ],
      modules: [
        { name: "Dashboard", tag: "Frontend", desc: "Stats generales: alumnos, órdenes, ingresos. Gráficos con recharts." },
        { name: "Productos", tag: "API", desc: "ABM de cursos. Editor con módulos ordenables via dnd-kit. Crop de imágenes (react-easy-crop). Rich text (react-quill). Validación con Zod." },
        { name: "Alumnos", tag: "API", desc: "Listado, búsqueda y filtro. Modal de asignación de productos. Vista de detalle." },
        { name: "Órdenes", tag: "API", desc: "Historial de órdenes con detalle y utilidades de cálculo de pago." },
        { name: "Eventos", tag: "API", desc: "ABM de eventos con gestión de inscripciones por evento." },
        { name: "Ebooks", tag: "API", desc: "ABM de ebooks con carga de archivos PDF." },
        { name: "Exámenes", tag: "API", desc: "ABM de exámenes, preguntas y respuestas. Visualización de respuestas por alumno." },
        { name: "Avales", tag: "API", desc: "Gestión de avales institucionales asociados a productos." },
        { name: "Membresías", tag: "API", desc: "Configuración de planes de membresía." },
        { name: "Códigos de descuento", tag: "API", desc: "Creación y gestión de códigos con límite de uso y fechas de vigencia." },
        { name: "Profesores", tag: "API", desc: "ABM de docentes asociados a cursos." },
        { name: "Test Vocacional", tag: "API", desc: "ABM de preguntas, perfiles y respuestas. Configuración de cálculo de resultados." },
        { name: "MercadoPago", tag: "API", desc: "Vista de cuentas y estado de integración." },
        { name: "Recomendaciones", tag: "API", desc: "Gestión del motor de recomendaciones." },
        { name: "Auth", tag: "Firebase", desc: "Login, cambio de contraseña, recuperación. Solo usuarios administradores." },
      ],
      environments: [
        { name: "Local", type: "dev", url: "http://localhost:5173", branch: "cualquiera", hosting: "local" },
        { name: "QA", type: "qa", url: "https://inee-qa.web.app", branch: "develop", hosting: "Firebase Hosting" },
        { name: "Producción", type: "prod", url: "https://admin.ineeoficial.com", branch: "main", hosting: "Firebase Hosting" },
      ],
      branchConventions: INEE_BRANCH_CONVENTIONS,
      commitFlow: INEE_COMMIT_FLOW,
      envGroups: [
        {
          name: "local",
          label: "Local (DEV)",
          vars: ineeFrontendEnv({
            authDomain: "inee-qa.firebaseapp.com",
            projectId: "inee-qa",
            storageBucket: "inee-qa.firebasestorage.app",
            messagingSenderId: "405703677594",
            appId: "1:405703677594:web:6928b7d21f233ad7b67123",
            measurementId: "G-2YGRGW2HJX",
            apiUrl: "https://inee-backend-qa.onrender.com",
            frontendUrl: "http://localhost:5173",
            mercadoPago: true,
            mercadoPagoPublicKey: "APP_USR-86a8dfa0-65f5-4be8-85d6-7c3bfdd57a54",
          }),
        },
        {
          name: "qa",
          label: "QA",
          vars: ineeFrontendEnv({
            authDomain: "inee-qa.firebaseapp.com",
            projectId: "inee-qa",
            storageBucket: "inee-qa.firebasestorage.app",
            messagingSenderId: "405703677594",
            appId: "1:405703677594:web:6928b7d21f233ad7b67123",
            measurementId: "G-2YGRGW2HJX",
            apiUrl: "https://inee-backend-qa.onrender.com",
            frontendUrl: "http://localhost:5173",
            mercadoPago: true,
            mercadoPagoPublicKey: "APP_USR-86a8dfa0-65f5-4be8-85d6-7c3bfdd57a54",
          }),
        },
        {
          name: "prod",
          label: "Producción",
          vars: ineeFrontendEnv({
            apiKey: "AIzaSyAZDT5DM68-9qYH23HdKAsOTaV_qCAPEiw",
            authDomain: "inee-admin.firebaseapp.com",
            projectId: "inee-admin",
            storageBucket: "inee-admin.firebasestorage.app",
            messagingSenderId: "746757753608",
            appId: "1:746757753608:web:c63f0a8d2d60f10fefbabd",
            measurementId: "G-PH54SWBE8V",
            apiUrl: "https://inee-backend.onrender.com",
            frontendUrl: "https://ineeoficial.com",
            mercadoPago: true,
            mercadoPagoPublicKey: "APP_USR-86a8dfa0-65f5-4be8-85d6-7c3bfdd57a54",
          }),
        },
      ],
      deploys: [
        {
          title: "Firebase Hosting — GitHub Actions",
          rows: [
            { key: "Trigger QA", value: "Push a branch develop" },
            { key: "Trigger Prod", value: "Push a branch main" },
            { key: "Build cmd", value: "npm run build" },
            { key: "Proyecto QA", value: "inee-qa (Firebase)" },
            { key: "Proyecto Prod", value: "inee-admin (Firebase)" },
            { key: "Secrets", value: "VITE_FIREBASE_* (_QA/_PROD), FIREBASE_SERVICE_ACCOUNT_QA/PROD" },
            { key: "Node version", value: "20" },
          ],
          checklist: FIREBASE_HOSTING_CHECKLIST,
        },
      ],
      platforms: INEE_ADMIN_PLATFORMS,
    },
  ],
};
