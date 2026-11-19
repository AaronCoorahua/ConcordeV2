---
name: concorde-ui
description: Traer componentes y bloques del design system de Subastop (Concorde) a un proyecto. Úsalo cuando el usuario quiera UI de Subastop, pedir un componente (botón, card de oferta, sala de subasta, etc.) o montar una página. Sabe dónde fetchear el catálogo y cómo instalarlos con el CLI.
---

# Concorde UI — traer componentes de Subastop

Concorde es el design system de Subastop. Cada componente es **un solo archivo
`.tsx` autocontenido** (CSS-in-JS, sin deps salvo React). Tu trabajo: identificar
qué componente/bloque necesita el usuario y traerlo a su proyecto.

## 1. Descubre qué hay

Antes de asumir nombres, fetchea el catálogo vivo:

- Índice: `https://concorde-v2-theta.vercel.app/r/registry.json`
  → `items[]` con `name`, `type` (`registry:component` | `registry:block`), `title`;
  los bloques traen `components[]` (qué componentes usan).
- Guía completa para IA: `https://concorde-v2-theta.vercel.app/llms.txt`

Para ver el código/props de un item: `https://concorde-v2-theta.vercel.app/r/<nombre>.json`
(trae `files[]` con `{ target, content }`). Preview humano: `/handoff/<nombre>` y `/blocks/<id>`.

## 2. Instálalo

Preferido — CLI (copia el/los archivos al proyecto):

    npx github:AaronCoorahua/ConcordeV2#cli add <nombre>

- Instala en `./concorde`: componentes → `concorde/components/<Name>.tsx`, bloques → `concorde/bloques/<Block>/`.
- Imports con alias `@/concorde/...` (el proyecto debe mapear `@/*` a la raíz de `concorde/`).
- Un componente → un archivo. Un bloque → sus secciones + componentes. Flags: `--force`, `--skip`.

Sin terminal: fetchea `<nombre>.json` y escribe cada `files[].content` en un archivo
(los imports entre archivos son relativos `./X`, así que guarda los dependientes juntos).

## 3. Úsalo

- Importa por defecto: `import Button from "./Button"` y usa sus props/variantes.
- No reescribas estilos; ajusta vía props. Edita el archivo solo si necesitas algo custom.

## Catálogo (snapshot — confirma con /r/registry.json)

Componentes: accordion, accountcard, actionlist, actiontile, activitysection, adbanner,
addbutton, amountcomposer, amountoptiongroup, auctionstatus, avatarzone, badgestatus,
bidmessage, bidposition, bidproposal, businessicon, button, cardtitle, cardviewer,
categoryicon, categoryrail, chatbubble, chatcomposer, chatday, chatheader, chatnotice, checkicon,
combobox, conditionpill, countdown, decisionbar, detailcard, dropmodal, eyeicon,
featuredcard, foldertabs, glassbutton, herocarousel, infoicon, input, lightbar,
likebutton, logomarquee, lotgallery, morebutton, notificationbell, notificationbox,
notificationinbox, offercard, offericon, offertypecards, pagination,
pendingtoggle, pricebadge, priceicon, profilebutton, progressbar, projectionchart,
proposalmodal, proposalnotice, proposalthread, publicationbadge, publishfeebanner,
publishswipe, qrcard, qrcode, recommendedlist, republishbar, republishmodal,
responsetimer, riskmeter, roundprogress, salastatus, seasonchart, sectionhead, select,
sendbidicon, servicecentericon, sidepanel, signal, stagetabs, staricon, statpill,
statustag, stepper, table, tabselector, termsselector, timericon, todayicon,
valuationcard, valuehero, vehiclerow, vidrio, vmcahora, walletcard

Deprecados (siguen instalables, pero para algo nuevo usa su reemplazo; solo los usan las
versiones anteriores de los bloques, o ningún bloque):
- activitycard       → activitysection (Mi Garaje)
- userprofilecard    → accountcard (Mi Garaje)
- walletbalancecard  → walletcard (Mi Garaje)
- offertype          → offertypecards (Index)
- offershelf         → lotgallery (Index)
- categorycard       → categoryrail (Index)
- docbutton          → no lo usa ningún bloque

Bloques actuales: index (inicio de VMC; en el catálogo es Homepage «Actual»), mi-garaje
(cuenta del usuario; trae también las pantallas del Detalle actual: propuesta y acuerdo con
SubasChat), valoriza y vendo-mis-cosas (landings; base para landings nuevas, con
landing-shell), sala, login, register, tu-perfil, agregar-subascoins, banners, header,
sidebar. Cada uno instala sus componentes.

Versiones anteriores (siguen instalables): homepage (versión 1 de Homepage, usa index),
zona (versión 1 de Mi Garaje, usa mi-garaje), detalle (versión 1 de Detalle, la ficha de
ejemplo; mi-garaje la reutiliza para la propuesta y el acuerdo).

Para el inicio de VMC usa `index`, no `homepage`. Sus piezas propias: herocarousel
(banner principal), vmcahora (feed en vivo), offertypecards (tipo de oferta),
lotgallery + featuredcard + lightbar (lotes de cada tienda), logomarquee (empresas),
glassbutton (botón de vidrio) y vidrio (íconos).
