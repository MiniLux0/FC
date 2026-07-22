// =============================================================================
// ⚠️  ADVERTENCIA: NO CORRER SOBRE LAS ESCUELAS EXISTENTES
// =============================================================================
// Este script genera páginas de escuelas a partir de la plantilla
// `escuelas/_template.html` y los datos de `data/escuelas.json`.
//
// Las siguientes 5 escuelas YA TIENEN contenido real hardcodeado en sus
// archivos HTML y NO deben regenerarse con este script bajo ninguna
// circunstancia, ya que se sobreescribiría información crítica:
//
//   - fisica.html      → incluye diagrama Mermaid de malla curricular,
//                        egresados destacados, laboratorios y sección
//                        de vida estudiantil personalizados a mano.
//   - matematica.html  → contiene contenido curado específico de la escuela.
//   - quimica.html     → contiene contenido curado específico de la escuela.
//   - computacion.html → contiene contenido curado específico de la escuela.
//   - ingenieria-fisica.html → contiene contenido curado específico.
//
// USO VÁLIDO: Solo debe usarse como punto de partida al agregar una escuela
// completamente NUEVA desde cero (una que aún no tenga página en escuelas/).
// En ese caso, genera el archivo nuevo y luego edítalo manualmente.
// =============================================================================

const fs = require('fs');
const path = require('path');

// ─── Config ────────────────────────────────────────────────────────
const DATA_FILE = path.join(__dirname, '..', 'data', 'escuelas.json');
const TEMPLATE_FILE = path.join(__dirname, '..', 'escuelas', '_template.html');
const OUTPUT_DIR = path.join(__dirname, '..', 'escuelas');

// ─── Helpers ───────────────────────────────────────────────────────
function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function readTemplate(file) {
  return fs.readFileSync(file, 'utf8');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

function renderTemplate(template, data) {
  let output = template;

  // 1) Handle {{#each arr}}...{{/each}} FIRST (before simple vars)
  output = output.replace(/\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, arrName, block) => {
    const arr = data[arrName] || [];
    return arr.map(item => {
      if (typeof item !== 'object' || item === null) {
        // primitive array - replace {{this}}
        return block.replace(/\{\{this\}\}/g, escapeHtml(item))
                    .replace(/\{\{(\w+)\}\}/g, '');
      }
      // object array - replace {{key}}
      return block.replace(/\{\{(\w+)\}\}/g, (m, k) => item[k] !== undefined ? escapeHtml(item[k]) : '');
    }).join('');
  });

  // 2) Handle {{#if var}}...{{else}}...{{/if}} and {{#if var}}...{{/if}}
  const ifRegex = /\{\{#if\s+(\w+)\}\}([\s\S]*?)(?:\{\{else\}\}([\s\S]*?))?\{\{\/if\}\}/g;
  output = output.replace(ifRegex, (match, key, ifBlock, elseBlock) => {
    const value = data[key];
    const isTruthy = value && (typeof value !== 'string' || value.trim() !== '');
    if (isTruthy) {
      return ifBlock || '';
    }
    return elseBlock || '';
  });

  // 3) Simple {{var}} replacements - distinguish pre-built HTML from text
  output = output.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = data[key];
    if (value === undefined) return '';
    if (Array.isArray(value)) return escapeHtml(value.join(' '));
    // Pre-built HTML keys (suffix Html) are inserted raw, others escaped
    if (key.endsWith('Html')) return value;
    return escapeHtml(value);
  });

  // 4) Clean up any remaining {{...}}
  output = output.replace(/\{\{[\s\S]*?\}\}/g, '');

  return output;
}

// ─── Main ──────────────────────────────────────────────────────────
function main() {
  console.log('🔧 Generando páginas de escuelas...\n');

  const data = readJSON(DATA_FILE);
  const template = readTemplate(TEMPLATE_FILE);

  data.escuelas.forEach((escuela) => {
    // Pre-compute malla curricular link (pre-built HTML, key ends with 'Html')
    const hasMallaUrl = escuela.mallaCurricularUrl && escuela.mallaCurricularUrl.trim() !== '';
    escuela.mallaLinkHtml = hasMallaUrl
      ? `<p style="margin-top: var(--space-md);"><a href="${escapeHtml(escuela.mallaCurricularUrl)}" target="_blank" rel="noopener noreferrer">Ver malla curricular oficial (PDF) →</a></p>`
      : `<p style="margin-top: var(--space-md);"><a href="${escapeHtml(escuela.web)}" target="_blank" rel="noopener noreferrer">Consultar malla curricular en la página oficial de la escuela →</a></p>`;

    const html = renderTemplate(template, {
      ...escuela,
      pathPrefix: '../'
    });
    const filename = `${escuela.slug}.html`;
    const outputPath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`  ✓ ${filename} (${escuela.nombre})`);
  });

  console.log(`\n✅ ${data.escuelas.length} páginas generadas en ${OUTPUT_DIR}`);
}

main();