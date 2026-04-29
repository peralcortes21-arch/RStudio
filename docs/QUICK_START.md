# Quick Start — RStudio

## 1️⃣ Abrir la app

Simplemente abre `index.html` en tu navegador. Eso es todo. No necesita servidor.

## 2️⃣ Primeros pasos

### Opción A: Demo instantáneo
- La app ya viene con un cliente de demo: **Dental Premium Madrid**
- Ve a **Calendarios** → **Prompt Studio**
- Verás el formulario prefilled con el cliente
- Click **✦ CREAR CALENDARIO CON IA** para ver todo en acción

### Opción B: Crear tu propio cliente

1. **Clientes** tab
2. Click **"+ Nuevo cliente"**
3. Rellena:
   - Nombre de la marca
   - Sector
   - Descripción del negocio
   - Público objetivo
   - Tono (serio, juvenil, atrevido, etc.)
   - 2 colores de marca
   - Keywords de estilo visual
4. Click **Guardar cliente**

## 3️⃣ Crear calendario con IA

Con tu cliente seleccionado:

1. **Calendarios** tab
2. Click **"✦ Prompt Studio"** (primera subtab)
3. Selector de cliente: click en tu cliente
4. **Prompt principal**: describe lo que quieres
   - Ejemplo: "Posts para LinkedIn sobre productividad, serio pero cercano, colores azul y blanco, formato profesional"
5. **Ángulos**: selecciona qué tipos de posts (SALES 01-05 vienen por defecto)
6. **Estilo de imágenes**: elige uno de 6 presets o describe el tuyo
7. **Opciones**: marca si quieres que genere prompts y/o imágenes automáticamente
8. Click **✦ CREAR CALENDARIO CON IA**

**Lo que ocurre:**
- ⏳ Fase 1: Claude genera 3 posts por ángulo seleccionado
- ⏳ Fase 2 (si marcado): crea prompts para Freepik
- ⏳ Fase 3 (si marcado): genera todas las imágenes
- ✅ Listo: ve directo al calendario generado

## 4️⃣ Editar y refinar

En el **Generador** tab:

- Haz click en cualquier post para ver/editar
- **"✦ Prompt IA"**: regenera el prompt de Freepik para ese post
- **"⬡ Crear imagen"**: genera la imagen
- **"↓ PNG compuesto"**: descarga imagen + texto superpuesto
- **"↓ Solo fondo"**: descarga solo la imagen

## 5️⃣ Referencias visuales (opcional pero poderoso)

1. **Referencias** tab
2. Arrastra imágenes de estilo/inspiración
3. Claude las analiza y etiqueta automáticamente
4. Click para seleccionar cuáles usar
5. Se incorporarán en:
   - Generación de prompts
   - Generación de imágenes (especialmente Mystic)

## API Keys

Necesitas 2 keys que introduces en la app (quedan en tu navegador):

1. **Claude API** → https://console.anthropic.com
   - Para generar posts, analizar documentos, crear prompts

2. **Freepik API** → https://www.freepik.com/api
   - Para generar imágenes

Ambas keys se guardan en localStorage (tu navegador), nunca se suben a servidor.

## Atajos útiles

**En Generador:**
- **"✦ Todos los prompts"** → genera Freepik prompts de todos los posts visibles
- **"⬡ Todas las imágenes"** → genera todas las imágenes (auto-genera prompts que falten)

**En Calendarios → Prompt Studio:**
- Botón **"Todo / Nada"** en Ángulos para selectionar rápido
- Style pills con click único (Dark Editorial, Cinematic, Neon, etc.)

## Ejemplos de prompts

### Dental Premium
```
Posts para clínica dental premium en Madrid.
Tono profesional pero cercano. 
Fotos oscuras y modernas con colores azul marino y dorado.
Enfocado en captar pacientes nuevos con miedo al dentista y mostrar resultados.
Incluir tecnología (Invisalign, implantes).
```

### E-commerce Fashion
```
Instagram posts para tienda online de ropa sostenible.
Público: mujeres 25-40, conscientes, presupuesto medio-alto.
Tono: inspirador, educativo, accesible.
Estilo: minimalista, fotografía natural con texturas, colores tierra.
Enfoque: storytelling de proceso de producción, sostenibilidad, empoderamiento.
```

### SaaS B2B
```
LinkedIn posts para plataforma de automatización de marketing.
Tono: experto, directo, datos-driven.
Público: marketing managers y founders.
Estilo: cinematográfico, gráficos 3D, datos visuales, dark mode premium.
Ángulos: problema/solución, ROI, casos de éxito, tips educativos.
```

---

**¿Preguntas?** Revisa README.md para documentación completa.

**¿Encontraste bug?** GitHub Issues en el repo.
