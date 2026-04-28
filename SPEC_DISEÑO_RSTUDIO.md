# SPEC & DISEÑO — RStudio (Design Studio)
> Documento de referencia de identidad visual y sistema de diseño para RStudio / CLIENDER Studio.
> Hereda de `SPEC_DISEÑO_CLIENDEROSV1.md` y define overrides específicos de esta app.
> Última revisión: 2026-04-28

---

## 1. IDENTIDAD DE APP

| Campo | Valor |
|-------|-------|
| Nombre en navbar | **CLIENDER** |
| Subtítulo | `studio` |
| Rol en el OS | Canvas de contenido social — generador de calendarios IA |
| Acento secundario primario | Verde `oklch(55% 0.18 155)` — imágenes generadas, éxito |
| Acento secundario especial | Cyan `#00e5ff` / `oklch(88% 0.09 200)` — IA activa, referencias |
| Fuente principal | **Plus Jakarta Sans** 300/400/500/700/800 |
| Fuente monoespaciada | **IBM Plex Mono** 400/500 |

> **Nota de migración:** La versión actual usa Syne + JetBrains Mono. La spec objetivo es Plus Jakarta Sans + IBM Plex Mono para alinearse con el Design Studio en el OS. Mientras se migra, JetBrains Mono es aceptable en posición mono.

---

## 2. PALETA ESPECÍFICA DE RSTUDIO

Hereda todo de `SPEC_DISEÑO_CLIENDEROSV1.md §2` y añade:

```css
:root {
  /* Fondos — sistema correcto (override de los tokens actuales) */
  --bg-base:    #0f1117;   /* base de pantalla — NUNCA #03050a */
  --bg-raised:  #161b27;   /* sidebar, toolbar sub */
  --bg-card:    #1c2232;   /* cards de posts, clientes */
  --bg-hover:   #222840;   /* hover de cards */
  --bg-border:  #2a3347;   /* bordes, separadores */

  /* Acento principal — AZUL (no violeta) */
  --accent:       #4f8ef7;
  --accent-light: #7aaeff;
  --accent-dark:  #2d6dd4;

  /* Violeta — SOLO para logo y gradientes de CTA */
  --violet:      #6952d4;
  --violet-mid:  #8b72ee;
  --violet-light: #a892f8;
  --accent-violet: #a855f7;  /* logo glow */

  /* Cyan — IA activa, referencias visuales, Prompt Studio */
  --cyan: #00e5ff;
  --cyan-dim: rgba(0,229,255,.1);

  /* Verde — éxito, imágenes generadas, estado "done" */
  --green: #00e676;
  --green-dim: rgba(0,230,118,.1);

  /* Semánticos */
  --ok:  #00e676;
  --wn:  #ffab00;
  --er:  #ff5252;

  /* Texto */
  --text:       #d4d0ea;   /* texto principal — NO #ffffff */
  --text-muted: #47556a;   /* texto secundario */
  --text-faint: #1a2636;   /* texto muy apagado, hints */

  /* Timing */
  --t-fast:    150ms;
  --t-normal:  250ms;
  --t-slow:    400ms;
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);

  /* Radios */
  --r:   12px;  /* card estándar */
  --rs:  7px;   /* elemento pequeño */
}
```

### Mapa de uso de colores por feature

| Feature / UI | Color dominante | Uso |
|---|---|---|
| Prompt Studio | Cyan `--cyan` | Labels, bordes de sección activa |
| Referencias visuales | Cyan | Barra de selección, botones activos |
| IA generando (loading) | Violeta → Cyan | Gradiente de progreso |
| Imagen generada | Verde `--green` | Dot de estado, toast |
| Error | Rojo `--er` | Badges de error, bordes |
| Calendarios / Clientes | Azul `--accent` | CTAs primarios, nav activo |
| Motor IA especial (Mystic, Imagen3) | Cyan border | `.tbtn.sp` — separado visualmente |

---

## 3. TIPOGRAFÍA

### Fuentes objetivo

| Uso | Fuente | Pesos |
|-----|--------|-------|
| Texto general | **Plus Jakarta Sans** | 300, 400, 500, 700, 800 |
| Código, datos, prompts, IDs, horas | **IBM Plex Mono** | 400, 500 |

```html
<!-- Import correcto -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Escala tipográfica aplicada

```
Topbar logo label:       12px / weight 800 / letter-spacing .12em
Nav tabs:                 9px / weight 700
Toolbar labels:           8px / weight normal / mono / UPPERCASE / letter-spacing .14em
Section headers (pttl):  17px / weight 800 / color #fff
Card hook (titular):    11.5px / weight 700
Card meta keys:           8px / mono / color --text-faint
Card meta values:        8.5px / color --text-muted
Badges / chips:          7.5px / mono / weight 500
Toast:                   9.5px / weight 700
Modal title:             14px / weight 800
Modal field label:        8px / mono / UPPERCASE / letter-spacing .1em
Prompt textarea:         11px / sans / line-height 1.55
Empty state title:       14px / weight 700
```

---

## 4. COMPONENTES ESPECÍFICOS DE RSTUDIO

### 4.1 Topbar (50px)

```
- Altura: 50px (target 52px según spec OS — migrar en próxima versión)
- Fondo: rgba(3,5,10,.96) + backdrop-filter blur(30px)
- Logo mark: 26×26px, border-radius 6px, gradiente violeta (SOLO aquí)
- Nav pill: background #0b1018, border 1px solid --bg-border
- Status chips: font mono 8.5px, border 1px
- Glassmorphism: ✓ correcto en este elemento
```

### 4.2 Cards de Post

```css
/* Card de post — estructura correcta */
.card {
  background: rgba(10,14,22,.8);
  border: 1px solid var(--bg-border);    /* NO border-color violeta por defecto */
  border-radius: var(--r);               /* 12px */
  backdrop-filter: none;                 /* ❌ NO glassmorphism en cards de grid */
  transition: border-color 200ms, transform 200ms, box-shadow 200ms;
}
.card:hover {
  border-color: rgba(105,82,212,.44);    /* violeta en hover */
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(105,82,212,.11);
}
```

> **Bug actual:** Las cards tienen `backdrop-filter:blur(16px)` — eliminar. La spec prohíbe glassmorphism en cards de grid.

### 4.3 Stripe de color en cards (top indicator)

```css
/* Stripe superior por tipo psicológico */
.card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
}
.card[data-tipo="Dolor"]::before    { background: #ff5252; }
.card[data-tipo="Miedo"]::before    { background: #ffab00; }
.card[data-tipo="Resultado"]::before{ background: #00e676; }
.card[data-tipo="Prueba"]::before   { background: var(--cyan); }
.card[data-tipo="Deseo"]::before    { background: var(--violet-light); }
```

> **Mejora:** Actualmente no existe este stripe. Añadir para jerarquía visual inmediata.

### 4.4 Prompt Box

```
- Fondo: rgba(3,5,10,.6)
- Border: 1px solid --bg-border
- Header: UPPERCASE mono 7.5px
- Texto generado: mono 8.5px, line-height 1.65
- Estado generando: animación de blink en --violet-light
```

### 4.5 Indicador de estado (dot)

```css
.sdot { width: 5px; height: 5px; border-radius: 50%; }

/* idle */     .si { background: var(--text-faint); }
/* loading */  .sl { background: var(--wn); box-shadow: 0 0 5px var(--wn); animation: blink .8s infinite; }
/* done */     .sd { background: var(--green); box-shadow: 0 0 5px var(--green); }
/* error */    .se { background: var(--er); }
```

### 4.6 Image Area (Preview de post generado)

```
- Aspecto: controlado por formato activo (AF)
- Overlay gradiente: 0% top → 93% bottom (oscuro)
- Texto del hook: font Syne/Plus Jakarta Sans 900, letter-spacing -.03em
- CTA pill: fondo rgba(4,6,12,.86), border violeta/44, backdrop-filter blur(16px)
- Toggle texto: glassmorphism button en esquina superior derecha
- Download row: 2 botones ghost debajo del frame
```

### 4.7 Motor IA toolbar

```
Separación visual entre motores:
- Síncronos (Classic): tbtn normal
- Separador visual: .tsep
- Especiales async (Mystic, Imagen3, Seedream): .tbtn.sp — border cyan
- Hint a la derecha: font mono 7.5px, color --text-faint
```

### 4.8 Prompt Studio

```
Layout: 2 columnas
- Izquierda (flex:1): Config — cliente, prompt, nombre, estilo imagen, refs activas
- Derecha (280px fijo): Ángulos + Opciones + CTA launch
- CTA launch: gradiente violeta, font-size 11px, weight 800, padding 14px, box-shadow glow

Progress section:
- Fondo card estilo: rgba(10,14,22,.8), border violeta/44
- Progress bar: 4px, gradiente violeta→cyan
- Log: mono 8.5px, max-height 160px, scroll
```

### 4.9 Modales

```css
/* Fórmula correcta para modales */
.modal-bg {
  background: rgba(2,4,8,.93);
  backdrop-filter: blur(14px);
}
.modal {
  background: #101520;            /* --s3 — equivale a --bg-card */
  border: 1px solid rgba(105,82,212,.44);
  border-radius: 16px;
  box-shadow: 0 0 55px rgba(105,82,212,.18);
  animation: slideUp 270ms cubic-bezier(0.16, 1, 0.3, 1);  /* spec: slideUp */
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

> **Bug actual:** Los modales usan `cin` (el mismo keyframe que las cards). Separar en `slideUp` explícito.

### 4.10 Toast notifications

```css
/* Posición: bottom center, pill */
/* Tipos: tok (verde), terr (rojo), twrn (ámbar), tinfo (cyan) */
/* Todos: backdrop-filter blur(20px), border 1px, weight 700, 9.5px */
```

---

## 5. ESTADOS Y FLUJOS IA

### Flujo de generación de prompt individual

```
idle → btn click → [dot: wn loading] → API call → [dot: si idle si error / sd done si ok] → prompt en caja
```

### Flujo de batch de prompts

```
Modal abierto → btn iniciar → progress bar visible → loop secuencial posts → log line por post → 100% → botones de cierre/imágenes
```

### Flujo de generación de imagen

```
[sin prompt] → auto-genera prompt primero → API call imagen
[con prompt] → API call directa → 
  Classic (síncrono): base64 directo → showImg
  Async (Flux/Mystic/Imagen3/Seedream): poll cada 3.5s max 45 intentos → progress bar → showImg
```

### Colores de feedback por estado IA

| Estado | Color | Elemento |
|--------|-------|----------|
| Generando | Ámbar + blink | dot |
| Éxito | Verde + glow | dot + toast tok |
| Error | Rojo | dot + .errbox |
| En cola async | Cyan | progress bar labels |

---

## 6. LAYOUT GENERAL

```
┌─────────────────────────────────────────┐
│ TOPBAR (50px, glassmorphism)            │
│ Logo · Nav tabs · Status chips          │
├─────────────────────────────────────────┤
│ TOOLBAR (formato/motor — 32px aprox)    │
├─────────────────────────────────────────┤
│ PANEL AREA (flex:1, overflow hidden)    │
│                                         │
│  Generador:                             │
│    Calbar tabs (overflow-x)             │
│    Cal header (nombre, tags, acciones)  │
│    Filter row (tipo, ángulo)            │
│    Grid (auto-fill 265px min, gap 9px)  │
│    Bottom bar (batch actions)           │
│                                         │
│  Clientes / Calendarios / Referencias:  │
│    sec-panel con pgrid2 o grid especial │
└─────────────────────────────────────────┘
```

### Z-index map (pendiente de implementar)

```
BG canvas:     z-0
Grid cards:    z-10
Topbar:        z-20
Toolbars:      z-20
Modales:       z-50
Toast:         z-9999
Cursor:        z-9999
```

---

## 7. FILTROS Y NAVEGACIÓN

### Sistema de tabs

```
Nivel 1 (topbar nav): Generador · Clientes · Referencias · Calendarios
Nivel 2 (cal subtabs): ✦ Prompt Studio · Todos los calendarios
Nivel 3 (dentro generador): calbar (calendarios como tabs)
```

### Filtros del generador

```
Filtro TIPO:   Todos · Dolor · Miedo · Resultado · Prueba · Deseo
  Cada tipo tiene color semántico asociado (ver §4.3)

Filtro ÁNGULO: Todos · [dinámico según posts del cal activo]
```

---

## 8. FONDO ATMOSFÉRICO (específico de RStudio)

### Canvas animado (actual — mantener)

```javascript
// Grid 55×55px con nodos pulsantes — violeta rgba(105,82,212,.05)
// Líneas de scan horizontales — cyan rgba(0,229,255,.028)
// Orbs blur: violeta top-right, cyan bottom-left, pink/rose center
// Animación: requestAnimationFrame continuo
```

### Orbs de ambiente

```css
.o1 { /* violeta — top right */
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(105,82,212,.18) 0%, transparent 70%);
}
.o2 { /* cyan — bottom left */
  width: 380px; height: 380px;
  background: radial-gradient(circle, rgba(0,229,255,.09) 0%, transparent 70%);
}
.o3 { /* accent warm — center */
  width: 260px; height: 260px;
  background: radial-gradient(circle, rgba(255,107,157,.07) 0%, transparent 70%);
}
```

---

## 9. SEGURIDAD Y DATOS

### API Keys — regla crítica

```
❌ NUNCA hardcodear API keys en el source (actual: FPK hardcodeada línea 816)
✅ SIEMPRE en localStorage, igual que la clave de Claude

Implementación objetivo:
- Modal de configuración de API keys
- localStorage key: 'cliender_keys' separado del data principal
- Validación básica de formato antes de guardar
- Indicador visual de keys presentes/ausentes en topbar
```

### Persistencia localStorage

```javascript
// Storage key: 'cliender_v4'
// Estructura: { clients: [], cals: [], refs: [] }
// Sin servidor, sin sync — 100% client-side
// Límite práctico: ~5MB localStorage → mostrar warning si refs en base64 acumulan
```

---

## 10. ACCIONES DESTRUCTIVAS

### Confirmaciones — regla de UX

```
❌ NO usar confirm() nativo del browser (UX rota en dark mode, no personalizable)
✅ Modal propio con:
  - Título claro del riesgo
  - Descripción de qué se pierde
  - Botón cancelar (izquierda, ghost)
  - Botón confirmar (derecha, fondo rojo/er)
  - Animación slideUp

Aplica a: eliminar post, eliminar calendario, eliminar cliente, eliminar referencia
```

---

## 11. ANIMACIONES ESPECÍFICAS

```css
/* Cards en grid — entrada escalonada */
@keyframes cin {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: none; }
}
/* delay: (index % 12) × 30ms */

/* Cal header — entrada desde arriba */
@keyframes sdown {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: none; }
}

/* Modal — slideUp (pendiente separar de cin) */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: none; }
}

/* Generando (dot, ganim) */
@keyframes bk {
  0%, 100% { opacity: 1; }
  50%       { opacity: .2; }
}

/* Spinner de carga async */
@keyframes rot {
  to { transform: rotate(360deg); }
}
```

---

## 12. ISSUES CONOCIDOS A RESOLVER

| Prioridad | Issue | Fix |
|-----------|-------|-----|
| 🔴 Alta | API key Freepik hardcodeada | Modal de configuración de keys |
| 🔴 Alta | `backdrop-filter` en cards normales | Eliminar de `.card` |
| 🔴 Alta | Tokens CSS desalineados con OS spec | Renombrar a sistema `--bg-*` / `--accent` |
| 🟡 Media | `confirm()` nativo para destructivas | Modal de confirmación propio |
| 🟡 Media | Inline styles masivos en Prompt Studio | Extraer a clases CSS nombradas |
| 🟡 Media | Animación `cin` en modales | Renombrar/separar en `slideUp` |
| 🟡 Media | Stripe de color por tipo en cards | Añadir `::before` por `data-tipo` |
| 🟢 Baja | Topbar 50px vs 52px spec | Ajustar en próxima versión |
| 🟢 Baja | Migración fuente a Plus Jakarta Sans | Fase 2 (no rompe nada hoy) |
| 🟢 Baja | Warning localStorage casi lleno | Añadir monitor de uso |

---

## 13. CHECKLIST ANTES DE CAMBIAR CUALQUIER PANTALLA

- [ ] ¿Está en dark mode? ¿Fondo usa `--bg-base` (#0f1117)?
- [ ] ¿El elemento que cambia es card/grid o elemento flotante? (glassmorphism solo en flotantes)
- [ ] ¿Los bordes son 1px solid `--bg-border` en reposo?
- [ ] ¿El hover cambia solo border-color a violeta/44?
- [ ] ¿Los textos principales usan `--text` (#d4d0ea) y NO #ffffff?
- [ ] ¿Las animaciones usan solo `opacity` y `transform`?
- [ ] ¿Los modales tienen animación `slideUp`?
- [ ] ¿Los toasts reflejan el tipo correcto (ok/err/wrn/info)?
- [ ] ¿Los estados IA usan el dot con colores semánticos?
- [ ] ¿El acento en CTAs principales es violeta gradient (no azul solo)?
- [ ] ¿El cyan se reserva para contextos IA activos / referencias?
- [ ] ¿El verde se reserva para éxito / imagen generada?
- [ ] ¿No hay `confirm()` nativo para acciones destructivas?
- [ ] ¿No hay API keys en el código fuente?
