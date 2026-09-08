# AI Tech Umbrella — Sitio corporativo

Sitio oficial de **AI Tech Umbrella LLC** → **https://aitechumbrella.com**

Réplica en HTML/CSS/JS estándar del diseño creado en Claude Design
(`AI Tech Umbrella - Sitio.dc.html`). **Sin dependencias, sin build, sin framework.**

---

## Estructura

```
.
├── index.html                  # Página única con las seis vistas
├── vercel.json                 # Cabeceras de seguridad y caché
├── robots.txt · sitemap.xml    # Indexación
├── assets/
│   ├── css/styles.css          # Tokens, componentes y animaciones
│   ├── js/main.js              # Router por hash, hero interactivo, ticker, formulario
│   └── brand/                  # Identidad visual
│       ├── umbrella/           # Logo AI Tech Umbrella (SVG + PNG)
│       ├── auracare/           # Logo AuraCare (SVG + PNG)
│       ├── visuals/            # Ilustraciones de secciones y servicios
│       ├── cartera-plus-icon.png
│       └── cartera-plus-wordmark.png
└── design/                     # Fuente original exportada de Claude Design
```

## Vistas y rutas

Una sola página con navegación por *hash*: cada sección tiene URL propia,
compartible y con botón «atrás» funcional.

| Ruta                  | Sección          |
| --------------------- | ---------------- |
| `#/`                  | Inicio           |
| `#/nosotros`          | Nosotros         |
| `#/como-trabajamos`   | Cómo trabajamos  |
| `#/soluciones`        | Soluciones       |
| `#/servicios`         | Servicios        |
| `#/contacto`          | Contacto         |

## Ejecución local

```bash
python3 -m http.server 8080     # → http://localhost:8080
```

## Despliegue

**Vercel**, conectado a este repositorio. Cada `push` a `main` publica en producción;
cada rama o PR genera una URL de vista previa. No hay comando de build ni directorio
de salida: Vercel sirve los archivos tal cual.

- Equipo Vercel: `AI Tech Umbrella's projects`
- Dominios: `aitechumbrella.com` (apex) y `www.aitechumbrella.com` → redirige al apex
- DNS del dominio: administrado en **Squarespace** (`nsc1–nsc4.squarespacedns.com`)

Los subdominios de producto (`carteraplus`, `auracare`, `financialglowup`) viven en
proyectos Vercel independientes y no se ven afectados por este repositorio.

## Sistema de diseño

| Elemento             | Valor                                                   |
| -------------------- | ------------------------------------------------------- |
| Tinta                | `#071421`                                               |
| Azul de marca        | `#2864E5`                                               |
| Cian de marca        | `#27C7D9`                                               |
| Violeta de apoyo     | `#7467E8`                                               |
| Texto de cuerpo      | `#4A5C6B`                                               |
| Tipografía titulares | Sora (600 / 700)                                        |
| Tipografía cuerpo    | Plus Jakarta Sans (400 / 500 / 600)                     |
| Lenguaje visual      | Neumorfismo claro + superficies de vidrio, fondo animado |

Todos los valores viven como *custom properties* en `:root` dentro de `assets/css/styles.css`.

## Accesibilidad

- Enlace de salto al contenido y foco visible en todos los elementos interactivos.
- Navegación con `aria-current` y nodos del hero operables por teclado.
- `prefers-reduced-motion`: se desactivan animaciones y los detalles de las tarjetas quedan visibles.
- En dispositivos táctiles el contenido que en escritorio aparece al pasar el cursor se muestra siempre.

## Contacto

**AI Tech Umbrella LLC** — San José, Costa Rica · Florida, EE. UU.
communication@AITechUmbrella.com · CR +506 6429 0000 · US +1 (305) 728-8656

---

© 2026 AI Tech Umbrella LLC. Marca, logotipos y contenido son propiedad de la compañía.
