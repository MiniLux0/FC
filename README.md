# FC-UNI — Plataforma Estudiantil de la Facultad de Ciencias, UNI

> **Plataforma independiente creada por y para estudiantes** de la Facultad de Ciencias de la Universidad Nacional de Ingeniería (UNI), Lima, Perú. Información académica, guías prácticas, recursos comunitarios y directorio de escuelas profesionales — todo verificado contra fuentes oficiales (DIRCE, AERA, SUNEDU, OCRI, portal fc.uni.edu.pe).

---

## 📖 Descripción del Proyecto

**FC-UNI** es un sitio web estático (HTML/CSS/JS vanilla) que centraliza información clave para estudiantes de la Facultad de Ciencias:

| Sección | Contenido |
|---------|-----------|
| **Inicio** (`index.html`) | Hero con branding FC-UNI, *sobre la facultad*, **Tabla Periódica de las 5 Escuelas**, científicos egresados destacados, y accesos rápidos a guías/trámites. |
| **Escuelas** (`escuelas/`) | Página índice + 5 páginas de detalle (Física, Matemática, Química, Computación, Ingeniería Física) generadas desde `data/escuelas.json` mediante template Handlebars (`escuelas/_template.html`). Cada escuela incluye: perfil de egreso, líneas de investigación, malla curricular por ciclos, director y contactos. |
| **Guía Estudiantil** (`guia/`) | Primer ciclo, instalaciones FC (biblioteca AlphaCloud, UNI-KOHA), trámites (créditos, matrícula, tutorías), consejos académicos, científicos FC. |
| **Comunidad** (`comunidad/`) | Recursos compartidos (drives de exámenes, guías de lab, software científico), grupos estudiantiles (CEFC, ACECOM, AEDICI), FAQ. |
| **Design System** (`design-system/fc-uni/MASTER.md`) | Tokens de diseño (colores, tipografía, espaciado, sombras), specs de componentes (botones, cards, inputs, modales), anti-patrones, checklist de accesibilidad. |

---

## 🏗️ Arquitectura y Stack

| Capa | Tecnología |
|------|------------|
| **Markup** | HTML5 semántico (ES) |
| **Estilos** | CSS Vanilla + Custom Properties (CSS Variables) — *sin frameworks* |
| **JS** | Vanilla ES6+ (progressive enhancement) — 87 líneas |
| **Fuentes** | Google Fonts: **Cormorant Garamond** (serif, headings) + **Inter** (sans, body) |
| **Imágenes** | `sharp` (devDependency) para optimización en build/local |
| **Datos** | JSON estáticos (`data/escuelas.json`, `data/recursos.json`) |
| **Templating** | Handlebars-style template (`escuelas/_template.html`) → genera 5 páginas HTML estáticas |
| **Despliegue** | Cualquier hosting estático (GitHub Pages, Netlify, Vercel, Cloudflare Pages, VPS + nginx) |

---

## 📁 Estructura del Repositorio

```
FC/
├── index.html                    # Landing page principal
├── css/
│   └── styles.css               # Design system + componentes (1334 líneas)
├── js/
│   └── main.js                  # Nav mobile, dropdowns, scroll-reveal, active link (87 líneas)
├── assets/
│   ├── logos/                   # logo-fc.png, favicon.ico, favicon.png
│   └── images/                  # campus-uni.jpg, laboratorio-fc.jpg, campus-panorama.jpg, científicos
├── data/
│   ├── escuelas.json            # Fuente única de verdad: 5 escuelas con todos sus datos
│   └── recursos.json            # Drives, software, links útiles
├── escuelas/
│   ├── _template.html           # Template Handlebars para generar páginas de escuela
│   ├── index.html               # Índice "Tabla Periódica" con grid CSS Grid 6-cols
│   ├── fisica.html
│   ├── matematica.html
│   ├── quimica.html
│   ├── computacion.html
│   └── ingenieria-fisica.html
├── guia/                        # Páginas de guía estudiantil
│   ├── index.html
│   ├── primer-ciclo.html
│   ├── campus.html
│   ├── tramites.html
│   ├── consejos.html
│   └── cientificos.html
├── comunidad/                   # Recursos, grupos, FAQ
│   ├── recursos.html
│   ├── grupos.html
│   └── faq.html
├── design-system/
│   └── fc-uni/
│       └── MASTER.md            # Design tokens, componentes, reglas, checklist a11y
├── package.json                 # devDependencies: sharp@^0.35.3
└── README.md
```

---

## 🎨 Design System (Resumen)

### Paleta de Colores (CSS Variables)
| Token | Hex | Uso |
|-------|-----|-----|
| `--accent` | `#5c0d12` | Color principal (bordeaux UNI) |
| `--accent-hover` | `#42070b` | Hover botones/links |
| `--bg` | `#f9f7f4` | Fondo principal |
| `--bg-alt` | `#f0ede8` | Secciones alternas |
| `--text` | `#1a1a1a` | Texto principal |
| `--text-muted` | `#6b6560` | Texto secundario |
| `--border` | `#e0dbd3` | Bordes, divisores |
| `--white` | `#ffffff` | Superficies, cards |

**Colores por escuela (data-discipline):**
- Physics: `#5c0d12` (bordeaux)
- Math: `#1e5631` (verde oscuro)
- Chem: `#8b2d1a` (terracota)
- Comp: `#3d1a5c` (púrpura)
- EngPhys: `#155263` (azul petróleo)

### Tipografía
- **Serif (headings):** `Cormorant Garamond` — weights 400–700, italic
- **Sans (body/UI):** `Inter` — weights 300–700
- **Escala fluida:** `clamp()` para hero (`--step--2` a `--step--1`), fija para body (`--step-2` = 17px)

### Espaciado (Spacing Scale)
| Token | Valor | Uso |
|-------|-------|-----|
| `--space-xs` | 0.5rem (8px) | Gaps internos |
| `--space-sm` | 1rem (16px) | Padding estándar |
| `--space-md` | 2rem (32px) | Secciones, cards |
| `--space-lg` | 3rem (48px) | Gap grid, secciones |
| `--space-xl` | 5rem (80px) | Padding vertical hero |
| `--space-2xl` | 8rem (128px) | Hero grande |

### Componentes Principales (CSS)
| Clase | Descripción |
|-------|-------------|
| `.btn`, `.btn--outline` | Botones primary/outline con hover lift + shadow |
| `.card` | Card blanca con borde, hover lift + scale(1.01) |
| `.escuela-card` | Card escuela con `border-left` color por disciplina |
| `.nav-dropdown` | Dropdown accesible (hover desktop, click mobile) |
| `.reveal-grid` | Grid con stagger animation vía IntersectionObserver |
| `.stage-card` | Tarjeta de etapas (pasos) con header gradient |
| `.stats-grid` | Grid 4-cols para métricas (número grande serif + label) |
| `.table` | Tabla responsive con hover row |

### Accesibilidad (Checklist obligatorio)
- ✅ Sin emojis como íconos (solo SVG inline)
- ✅ `cursor: pointer` en todo elemento clickeable
- ✅ Transiciones 150–300ms, sin layout shift en hover
- ✅ Contraste ≥ 4.5:1 (light mode)
- ✅ Focus visible (`:focus-visible` en botones/links)
- ✅ `prefers-reduced-motion` respetado (CSS + JS)
- ✅ Responsive: 375px, 768px, 1024px, 1440px
- ✅ Sin scroll horizontal en móvil

---

## ⚙️ Instalación y Desarrollo

```bash
# 1. Clonar
git clone <repo-url> && cd FC

# 2. Instalar dependencias de desarrollo (solo sharp para optimizar imágenes)
npm install

# 3. Servir localmente (cualquier servidor estático)
npx serve .          # o: python -m http.server 8000
# abre http://localhost:3000 (o 8000)
```

> **Nota:** No hay build step obligatorio. El sitio es 100% estático. `sharp` solo se usa si quieres optimizar imágenes manualmente (`npx sharp -i assets/images -o assets/images/optimized`).

---

## 🔧 Generar Páginas de Escuelas (desde `data/escuelas.json`)

El template `escuelas/_template.html` usa sintaxis Handlebars (`{{variable}}`, `{{#each}}`, `{{#if}}`). Para regenerar las 5 páginas:

```bash
# Opción A: Script Node rápido (recomendado)
npx handlebars data/escuelas.json escuelas/_template.html -f escuelas/fisica.html    # repetir para cada slug
# O usar un script personalizado que itere el array escuelas[]
```

> **Estado actual:** Las 5 páginas (`fisica.html`, `matematica.html`, `quimica.html`, `computacion.html`, `ingenieria-fisica.html`) ya están generadas y commiteadas. Solo regenera si modificas `data/escuelas.json` o `_template.html`.

---

## 📦 Despliegue

### GitHub Pages (recomendado, gratis)
1. Settings → Pages → Source: **Deploy from a branch** → `main` / `(root)`
2. El sitio estará en `https://<usuario>.github.io/FC/`

### Netlify / Vercel / Cloudflare Pages
- Build command: *vacío* (o `echo "static site"`)
- Output directory: `.` (raíz)
- No framework detection needed.

### VPS + Nginx (ejemplo)
```nginx
server {
    listen 80;
    server_name fc-uni.tu-dominio.pe;
    root /var/www/fc-uni;
    index index.html;
    location / { try_files $uri $uri/ =404; }
    # Cache assets
    location ~* \.(css|js|png|jpg|jpeg|svg|ico|woff2)$ {
        expires 1y; add_header Cache-Control "public, immutable";
    }
}
```

---

## 📋 Checklist de Calidad (Pre-deploy)

- [ ] `npm run lint` (si agregas stylelint) — *opcional*
- [ ] Validar HTML: `npx html-validate index.html escuelas/*.html guia/*.html comunidad/*.html`
- [ ] Lighthouse CI: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90
- [ ] Test manual: móvil (375px), tablet (768px), desktop (1024/1440px)
- [ ] Navegación solo teclado (Tab, Enter, Esc en dropdowns)
- [ ] `prefers-reduced-motion: reduce` desactiva animaciones
- [ ] Imágenes con `loading="lazy"` y `alt` descriptivos
- [ ] Enlaces externos con `rel="noopener noreferrer"`

---

## 🗺️ Roadmap / Ideas Futuras

- [ ] **Buscador client-side** (Pagefind / Lunr) para FAQ, recursos, escuelas
- [ ] **Modo oscuro** (CSS `prefers-color-scheme` + toggle manual)
- [ ] **PWA**: Service Worker + manifest + offline-first para guías
- [ ] **Generador automático** (Node script) que lea `escuelas.json` y escriba las 5 HTML
- [ ] **CMS headless** (Netlify CMS / Decap CMS) para que estudiantes editen `recursos.json` y `faq` sin tocar código
- [ ] **API UNI** proxy para horarios, notas, calendario académico en tiempo real
- [ ] **Internacionalización** (es/en) para científicos y convenios internacionales

---

## 🤝 Contribuir

1. Fork → rama `feat/nueva-seccion` o `fix/accesibilidad-nav`
2. Commits convencionales: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
3. PR con descripción + capturas (mobile/desktop) si toca UI
4. Revisión: accesibilidad, responsive, design tokens consistentes

---

## 📄 Licencia

**MIT License** — Libre uso, modificación y distribución.  
*Datos académicos basados en fuentes públicas oficiales de la UNI (DIRCE, AERA, SUNEDU, OCRI, fc.uni.edu.pe).*

---

## 🙋 Créditos y Contacto

- **Mantenido por:** Estudiantes de la Facultad de Ciencias, UNI
- **Issues / Sugerencias:** GitHub Issues del repo
- **Sitio oficial UNI:** <https://fc.uni.edu.pe>
- **Design System:** Ver `design-system/fc-uni/MASTER.md`

> *Hecho con ❤️ por y para la comunidad FC-UNI. "Ciencia con responsabilidad social."*
