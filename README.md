# project-docs

Portal de documentación interna de CapassoTech. Página estática que centraliza la info técnica de todos los proyectos.

## Estructura

```
project-docs/
  index.html          ← entrada principal, abrí este en el browser
  style.css           ← estilos del portal
  app.js              ← lógica de renderizado
  projects/
    index.js          ← array con todos los proyectos activos
    inee.js           ← config de INEE
    epefi.js          ← config de EPEFI
```

## Cómo usar

Abrí `index.html` directamente en el browser. No necesita servidor ni build step.

## Agregar un nuevo proyecto

1. Creá un archivo en `projects/nuevo-proyecto.js` con la estructura:

```js
const nombreProyecto = {
  id: "id-unico",
  name: "Nombre",
  color: "#hexcolor",
  description: "Descripción corta.",
  stack: [{ label: "React", color: "blue" }, ...],
  meta: [{ label: "Repo", value: "..." }, ...],
  modules: [{ name: "Auth", tag: "Firebase", desc: "..." }, ...],
  environments: [{ name: "Prod", type: "prod", url: "https://...", branch: "main", hosting: "Firebase Hosting" }, ...],
  deploys: [{ title: "Frontend", rows: [{ key: "Trigger", value: "..." }] }],
};
```

2. Agregá el `<script src="projects/nuevo-proyecto.js">` en `index.html` antes de `index.js`.

3. Agregalo al array en `projects/index.js`.

## Colores disponibles para badges de stack

`blue` · `green` · `amber` · `purple` · `teal`

## Deploy (opcional)

Para publicarlo en GitHub Pages: subí el repo y activá Pages apuntando a la rama `main` / carpeta raíz.
