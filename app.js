const TABS = [
  "overview",
  "estructura",
  "módulos",
  "entornos",
  "variables",
  "deploy",
];

const TAB_LABELS = {
  overview: "Overview",
  estructura: "Estructura",
  módulos: "Módulos",
  entornos: "Entornos",
  variables: "Variables",
  deploy: "Deploy",
};

const BACKEND_MODULE_STEPS = [
  "Crear carpeta src/modules/[nombre]/",
  "Crear controller.ts con la lógica de cada endpoint",
  "Crear routes.ts con las rutas Express y aplicar middlewares necesarios",
  "Registrar el router en src/index.ts con app.use('/api/[nombre]', router)",
  "Agregar los tipos necesarios en src/types/[nombre].ts",
];

const FRONTEND_MODULE_STEPS = [
  "Crear el componente o página en src/components/ o src/pages/",
  "Crear el servicio en src/services/[nombre]Service.ts con las llamadas al backend",
  "Agregar los tipos en src/types/types.ts",
  "Registrar la ruta en App.tsx si es una página nueva",
  "Conectar con el contexto o estado global si es necesario",
];

let currentParent = projects[0];
let currentSubproject = projects[0].subprojects[0];
let currentTab = "overview";
let currentEnvGroup = "local";
let expandedParents = new Set([projects[0].id]);

function getSubprojects(project) {
  return project.subprojects || [];
}

function isSubprojectActive(parentId, subId) {
  return currentParent.id === parentId && currentSubproject.id === subId;
}

function isBackendSubproject(sub) {
  return sub.id.includes("backend");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSidebar() {
  const list = document.getElementById("proj-list");
  list.innerHTML = projects
    .map((parent) => {
      const subs = getSubprojects(parent);
      const isExpanded = expandedParents.has(parent.id);
      return `
        <div class="proj-group ${isExpanded ? "expanded" : ""}">
          <button
            type="button"
            class="proj-parent"
            onclick="toggleParent('${parent.id}')"
            aria-expanded="${isExpanded}"
          >
            <span class="proj-chevron" aria-hidden="true"></span>
            <span class="proj-parent-main">
              <span class="proj-dot" style="background:${parent.color}"></span>
              <span class="proj-name">${escapeHtml(parent.name)}</span>
            </span>
            <span class="proj-count">${subs.length}</span>
          </button>
          <div class="proj-sublist" role="group" aria-label="${escapeHtml(parent.name)}">
            ${subs
              .map(
                (sub) => `
              <button
                type="button"
                class="proj-subitem ${isSubprojectActive(parent.id, sub.id) ? "active" : ""}"
                onclick="selectSubproject('${parent.id}', '${sub.id}')"
              >
                <span class="proj-subitem-name">${escapeHtml(sub.name)}</span>
              </button>`
              )
              .join("")}
          </div>
        </div>`;
    })
    .join("");
}

function renderHeader() {
  document.getElementById("proj-parent-label").textContent = currentParent.name;
  document.getElementById("proj-title").textContent = currentSubproject.name;
  document.getElementById("proj-desc").textContent = currentSubproject.description;
  document.getElementById("stack-badges").innerHTML = (currentSubproject.stack || [])
    .map((s) => `<span class="badge ${s.color}">${escapeHtml(s.label)}</span>`)
    .join("");

  document.getElementById("tabs").innerHTML = TABS.map(
    (t) => `
    <div class="tab ${t === currentTab ? "active" : ""}" onclick="selectTab('${t}')">
      ${TAB_LABELS[t]}
    </div>`
  ).join("");
}

function renderEmpty(message) {
  return `<p class="empty-state">${escapeHtml(message)}</p>`;
}

function renderSubsectionTitle(title) {
  return `<h3 class="subsection-title">${escapeHtml(title)}</h3>`;
}

function renderOverview(sub) {
  const ov = sub.overview;
  if (!ov) {
    return renderEmpty("No hay información de overview para este subproyecto.");
  }

  const meta = ov.meta || [];
  return `
    ${renderSubsectionTitle("Acerca de")}
    <p class="overview-about">${escapeHtml(ov.about || "")}</p>
    ${renderSubsectionTitle("Objetivo")}
    <blockquote class="overview-objective">${escapeHtml(ov.objective || "")}</blockquote>
    ${renderSubsectionTitle("Puntos clave")}
    <ul class="overview-keypoints">
      ${(ov.keyPoints || [])
        .map((p) => `<li><span class="check-icon" aria-hidden="true">✓</span>${escapeHtml(p)}</li>`)
        .join("")}
    </ul>
    ${renderSubsectionTitle("Info técnica")}
    ${
      meta.length
        ? `<div class="info-grid">
      ${meta
        .map(
          (m) => `
        <div class="info-card">
          <div class="info-card-label">${escapeHtml(m.label)}</div>
          <div class="info-card-value">${escapeHtml(m.value)}</div>
        </div>`
        )
        .join("")}
    </div>`
        : renderEmpty("No hay metadata técnica.")
    }`;
}

function renderEstructura(sub) {
  const folders = sub.folderStructure || [];
  const steps = isBackendSubproject(sub) ? BACKEND_MODULE_STEPS : FRONTEND_MODULE_STEPS;

  return `
    ${renderSubsectionTitle("Carpetas")}
    ${
      folders.length
        ? `<div class="folder-list folder-list--spacious">
      ${folders
        .map(
          (f) => `
        <div class="folder-row folder-row--spacious">
          <code class="folder-path">${escapeHtml(f.path)}</code>
          <p class="folder-desc">${escapeHtml(f.desc)}</p>
        </div>`
        )
        .join("")}
    </div>`
        : renderEmpty("No hay estructura de carpetas documentada.")
    }
    ${renderSubsectionTitle("Cómo agregar un módulo")}
    <ol class="module-steps">
      ${steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}
    </ol>`;
}

function renderEntornos(sub) {
  const environments = sub.environments || [];
  const conventions = sub.branchConventions || [];
  const flow = sub.commitFlow || [];

  return `
    ${renderSubsectionTitle("Entornos")}
    ${
      environments.length
        ? `<div class="env-list">
      ${environments
        .map(
          (e) => `
        <div class="env-card">
          <div class="env-dot ${escapeHtml(e.type)}"></div>
          <div class="env-info">
            <div class="env-name">${escapeHtml(e.name)} <span class="env-hosting">— ${escapeHtml(e.hosting)}</span></div>
            <div class="env-branch">Branch: ${escapeHtml(e.branch)}</div>
          </div>
          <a class="env-url-btn" href="${escapeHtml(e.url)}" target="_blank" rel="noopener noreferrer">Abrir entorno ↗</a>
        </div>`
        )
        .join("")}
    </div>`
        : renderEmpty("No hay entornos documentados.")
    }
    ${renderSubsectionTitle("Convención de ramas")}
    ${
      conventions.length
        ? `<div class="table-wrap">
      <table class="conventions-table">
        <thead>
          <tr>
            <th>Prefijo</th>
            <th>Formato</th>
            <th>Cuándo usarlo</th>
          </tr>
        </thead>
        <tbody>
          ${conventions
            .map(
              (c) => `
            <tr>
              <td><code>${escapeHtml(c.prefix)}</code></td>
              <td><code>${escapeHtml(c.format)}</code></td>
              <td>${escapeHtml(c.use)}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>`
        : renderEmpty("No hay convenciones de ramas documentadas.")
    }
    ${renderSubsectionTitle("Flujo de commit")}
    ${
      flow.length
        ? `<ol class="commit-flow">
      ${flow
        .map(
          (f) => `
        <li>
          <span class="commit-step-num">${escapeHtml(f.step)}</span>
          <div class="commit-step-body">
            <strong>${escapeHtml(f.action)}</strong>
            <span>${escapeHtml(f.detail)}</span>
          </div>
        </li>`
        )
        .join("")}
    </ol>`
        : renderEmpty("No hay flujo de commit documentado.")
    }`;
}

function formatEnvLine(key, value) {
  const str = String(value);
  if (/^[A-Za-z0-9_./:@-]+$/.test(str)) {
    return `${key}=${str}`;
  }
  const escaped = str.replace(/"/g, '\\"').replace(/\r?\n/g, "\\n");
  return `${key}="${escaped}"`;
}

function getActiveEnvGroup(sub) {
  const groups = sub.envGroups || [];
  return groups.find((g) => g.name === currentEnvGroup) || groups[0];
}

function formatEnvBlock(vars) {
  return (vars || []).map((v) => formatEnvLine(v.key, v.value)).join("\n");
}

async function copyCurrentEnvVars() {
  const activeGroup = getActiveEnvGroup(currentSubproject);
  if (!activeGroup?.vars?.length) return;

  const text = formatEnvBlock(activeGroup.vars);
  const btn = document.getElementById("env-copy-btn");

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }

  if (btn) {
    const original = btn.dataset.defaultLabel || btn.textContent;
    btn.dataset.defaultLabel = original;
    btn.textContent = "¡Copiado!";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove("copied");
    }, 2000);
  }
}

function renderVariables(sub) {
  const groups = sub.envGroups || [];
  if (!groups.length) {
    return renderEmpty("No hay variables de entorno documentadas.");
  }

  const activeGroup = getActiveEnvGroup(sub);

  return `
    ${renderSubsectionTitle("Variables de entorno")}
    <div class="env-vars-toolbar">
      <div class="env-group-pills">
        ${groups
          .map(
            (g) => `
          <button
            type="button"
            class="env-pill ${g.name === activeGroup.name ? "active" : ""}"
            onclick="selectEnvGroup('${g.name}')"
          >${escapeHtml(g.label)}</button>`
          )
          .join("")}
      </div>
      <button
        type="button"
        id="env-copy-btn"
        class="env-copy-btn"
        onclick="copyCurrentEnvVars()"
        title="Copiar variables del entorno activo como archivo .env"
      >Copiar .env</button>
    </div>
    <div class="table-wrap">
      <table class="env-vars-table">
        <thead>
          <tr>
            <th>Variable</th>
            <th>Valor de referencia</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          ${(activeGroup.vars || [])
            .map(
              (v) => `
            <tr>
              <td><code class="env-var-key">${escapeHtml(v.key)}</code></td>
              <td><code class="env-var-value">${escapeHtml(v.value)}</code></td>
              <td>${escapeHtml(v.desc)}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>`;
}

function renderDeploy(sub) {
  const deploys = sub.deploys || [];
  if (!deploys.length) {
    return renderEmpty("No hay configuración de deploy documentada.");
  }

  return `
    <p class="section-title">Configuración de deploys</p>
    ${deploys
      .map((d) => {
        const checklist = d.checklist || [];
        return `
        <div class="deploy-card">
          <div class="deploy-title">${escapeHtml(d.title)}</div>
          ${(d.rows || [])
            .map(
              (r) => `
            <div class="deploy-row">
              <span class="deploy-key">${escapeHtml(r.key)}</span>
              <span>${escapeHtml(r.value)}</span>
            </div>`
            )
            .join("")}
          ${
            checklist.length
              ? `${renderSubsectionTitle("Checklist pre-deploy")}
            <ul class="deploy-checklist">
              ${checklist
                .map(
                  (item) => `
                <li><span class="checklist-icon" aria-hidden="true">☑</span>${escapeHtml(item)}</li>`
                )
                .join("")}
            </ul>`
              : ""
          }
        </div>`;
      })
      .join("")}`;
}

function renderContent() {
  const el = document.getElementById("content");
  const sub = currentSubproject;

  if (currentTab === "overview") {
    el.innerHTML = `<div class="overview-page">${renderOverview(sub)}</div>`;
  } else if (currentTab === "estructura") {
    el.innerHTML = `<div class="estructura-page">${renderEstructura(sub)}</div>`;
  } else if (currentTab === "módulos") {
    const modules = sub.modules || [];
    el.innerHTML = `
      <p class="section-title">Módulos del sistema</p>
      ${
        modules.length
          ? `<div class="module-list">
        ${modules
          .map(
            (m) => `
          <div class="module-card">
            <div class="module-name">${escapeHtml(m.name)} <span class="module-tag">${escapeHtml(m.tag)}</span></div>
            <div class="module-desc">${escapeHtml(m.desc)}</div>
          </div>`
          )
          .join("")}
      </div>`
          : renderEmpty("No hay módulos documentados.")
      }`;
  } else if (currentTab === "entornos") {
    el.innerHTML = `<div class="entornos-page">${renderEntornos(sub)}</div>`;
  } else if (currentTab === "variables") {
    el.innerHTML = `<div class="variables-page">${renderVariables(sub)}</div>`;
  } else if (currentTab === "deploy") {
    el.innerHTML = renderDeploy(sub);
  }
}

function toggleParent(parentId) {
  if (expandedParents.has(parentId)) {
    expandedParents.delete(parentId);
  } else {
    expandedParents.add(parentId);
  }
  renderSidebar();
}

function selectSubproject(parentId, subId) {
  const parent = projects.find((p) => p.id === parentId);
  if (!parent) return;

  const sub = getSubprojects(parent).find((s) => s.id === subId);
  if (!sub) return;

  currentParent = parent;
  currentSubproject = sub;
  expandedParents.add(parentId);
  currentTab = "overview";
  currentEnvGroup = "local";
  renderSidebar();
  renderHeader();
  renderContent();
}

function selectTab(tab) {
  currentTab = tab;
  renderHeader();
  renderContent();
}

function selectEnvGroup(name) {
  currentEnvGroup = name;
  renderContent();
}

function getTheme() {
  return document.documentElement.getAttribute("data-theme") || "light";
}

function toggleTheme() {
  const next = getTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

renderSidebar();
renderHeader();
renderContent();
