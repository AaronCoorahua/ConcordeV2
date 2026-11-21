# AVT: cómo funciona (fuente para la landing Valoriza)

Revisión: 16/11/2026. Resumen extraído de `VMC-Laptop` (`ahuacchillo/VMC-Laptop@42143d3`):
- `entregas-abraham-2026-10-09/03-contrato-avt-desde-app.md`: contrato relevado de avt-ai.app v3.0 y del ZIP `avt-ai-main` (sin commit; puede no coincidir con lo desplegado).
- `Stage-Docs/Stage_1_UXUI_Mi_Garaje_y_Valorizacion.md`: reglas de producto.
- `mi-garaje-lab/models/avt/engine.js` y `sellingSignal.js`: copia del motor en el lab.

La landing usa solo lo marcado como **público**. Las cifras internas (multiplicadores, factores) no se muestran.

## Recorrido
1. **Vehículo** (público): marca → año (2000 al actual) → km (0–999,999; compara con 15,000 km/año) → modelo (filtrado por año) → versión (solo si hay versiones vigentes; si no, «valuamos a nivel modelo»). Opción «+ Mi modelo no aparece» con precio de lista. Texto de la app: «Estás a 1 minuto de revelar el valor de tu vehículo». Pie: «Basado en datos reales del mercado peruano».
2. **Detalles** (público): 12 opcionales en 4 grupos: Mecánica (transmisión, combustible, tracción), Estado (exterior, interior, neumáticos), Historial (dueños, accidentes, mantenimiento), Equipamiento (color, techo solar, cuero). «Saltar» permitido. Barra de precisión «N de 12 detalles». La mecánica llega prellenada.
3. **Resultado** (público): valor de mercado hoy («Estimación basada en depreciación real, estacionalidad y kilometraje»), proyección a 12 meses (1M · 3M · 6M · 12M), vehículos similares en el mercado, detalles de la valuación y el aviso legal.
4. **Guardar** en Mi Garaje / Mis valorizaciones, con fecha. En Stage 2, Publicar empieza valorizando.

## Cálculo (interno, no publicar cifras)
- Base: VRN de la versión (`getMarketValue`, servidor) o MSRP del modelo con `runAVT` (depreciación diaria por categoría A–G, estacionalidad, km y piso por categoría).
- Detalles: multiplicadores topados entre 0.60 y 1.06. Los que más pesan: accidente mayor, estado exterior/interior malo y mantenimiento sin historial.
- Recompra (×0.80), estimación Subastop (×1.05) y señal de venta se calculan en el navegador. El lab final no los muestra porque la API para terceros no los devuelve.

## Reglas que la landing respeta
- Valor **referencial y con fecha**; nunca precio fijo de venta ni promesa comercial (Stage 1).
- Aviso legal de AVT: «Valuación estimativa… No constituye oferta comercial. Los valores reales pueden variar según condición específica del vehículo, documentación y condiciones del mercado…».
- Lenguaje VMC: «Mi Garaje» y «Valorizar» (AVT dice «Mi Garage» y «Valuar»).

## Pendiente / sin confirmar
- Si guardar exige cuenta (AVT usa Google; VMC por definir).
- Si VMC mostrará recompra, estimación Subastop o señal de venta.
- URL pública final del valorizador en vmcsubastas.com.
