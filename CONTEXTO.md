# Contexto — estado al 13 de noviembre de 2026

Subí este archivo al proyecto junto con `index.html`, `manifest.webmanifest`, `sw.js`, los íconos, `Code.gs`, `SPEC.md`, `LEEME.md` y `pruebas.zip`. El detalle técnico está en `SPEC.md`; la instalación y el uso, en `LEEME.md`.

## Dónde está cada cosa

- **Planilla:** de Tati, en su Drive. [completar el link cuando exista]
- **API (/exec):** [completar cuando esté implementada; la clave no va acá]
- **Página:** https://github.com/dseptem777/mispax (GitHub Pages: https://dseptem777.github.io/mispax/).
- **Apps Script:** en la cuenta de Ariel (no en la de Tati). Desde el 17/11 Claude lo sube con `clasp`, que está vinculado en `.apps-script-remoto/`. La implementación web es la versión 2.
- **Quién sube qué:** Claude sube ramas y hace `clasp push` sin preguntar. El merge a `main` y la nueva implementación de Apps Script (lo que llega a Tati) necesitan el OK de Ariel cada vez.
- **Mockups:** artifact "ConTemplo PAX — mockups" en claude.ai (privado de Ariel).

## Estado

- v1 entregada el 5 de noviembre de 2026: `Code.gs`, `index.html`, `LEEME.md`, `SPEC.md`, pruebas.
- Pasó 14 pruebas del backend y 30 de la página contra una planilla simulada.
- 13/11: **vista para compu** (solo `index.html`, solo CSS). Pasó además 38 chequeos de `compu.test.py`. `Code.gs` no cambió.
- 17/11: al crear una persona se elige viaje y grupo; se puede borrar una persona (no si tiene pagos o pases a agencia); la ficha de una persona con un solo viaje muestra todo lo del viaje ahí mismo (con varios: tarjetas con chips y "Ver ficha ›"); los botones muestran que están guardando. `Code.gs` cambió (acción `borrarPersona`): **hay que pegarlo de nuevo y hacer una implementación nueva**.
- 17/11: el Apps Script real tiene el mismo `Code.gs` que este proyecto (verificado con `clasp`). **No probada todavía** en el celular de Tati.
- 17/11: **compartir contacto construido** (`index.html`, `manifest.webmanifest`, `sw.js`, íconos provisorios; `Code.gs` no cambió) y "Sumar a otro viaje" ahora pregunta el grupo. Pasó `compartir.test.py` en Chromium y lo probó Ariel en su Android el 17/11 (anda todo). En producción desde el 17/11. El ícono es provisorio (el loto de Nepal) hasta que Ariel elija otro.
- La planilla vieja de Tati no se importa (el primer viaje es nuevo: India · Holi en Rishikesh, marzo 2027). **Cambio 17/11:** la carga inicial de pax se va a hacer compartiendo contactos desde el celu (ver abajo). Entran a un viaje como interesados.

## Compartir contacto (en producción desde el 17/11)

Para que Tati cargue pax nuevos sin tipear: agenda el número, abre Contactos → el contacto → ⋮ → Compartir → ConTemplo PAX, y la app abre una confirmación.
- **WhatsApp no comparte contactos para afuera:** se hace desde la app Contactos. Instagram queda afuera; se sigue cargando a mano.
- **Prueba hecha el 17/11 en el Android de Ariel** (Chrome 157, app instalada con "Instalar app"): llega un `.vcf` `text/x-vcard`, vCard 2.1, `N:apellido;nombre;;;`, `TEL;PREF` o `TEL;CELL`. Las tildes vienen en QUOTED-PRINTABLE. Varios contactos llegan en un solo archivo. Puede venir sin teléfono. `window.close()` cierra la app. La prueba se borró del repo; los archivos quedaron en `prueba-compartir/`.
- **Mockup:** artifact "Compartir contacto PAX" en claude.ai. Nombre y apellido editables tal cual vienen; viaje (en curso y borradores) sin elegir y grupo en **Interesados por defecto**, que se puede cambiar (excepción a la regla 3 decidida por Ariel el 17/11; vale para toda pantalla que suma a alguien a un viaje). Guardar recién cuando hay viaje. Si el número ya existe (últimos 8 dígitos), muestra la ficha y deja sumarla a otro viaje eligiendo el grupo. Varios contactos van en cadena ("2 de 3", con "Saltear"). Al terminar dice "Listo" y se cierra.
- **Cambio aparte:** sumar desde la ficha a otro viaje pregunta el grupo (hoy entra como interesada).
- **Técnica:** Web Share Target. Se agregan `manifest.webmanifest` y `sw.js` al repo. `Code.gs` no cambia. Tati tiene que instalar una vez con "Instalar app": el acceso directo de "Agregar a pantalla de inicio" no aparece al compartir. La conexión no se pierde.
- **Varios contactos juntos** se pueden compartir siempre que Tati quiera, no solo en la carga inicial: van en cadena.
- **Tutorial:** solo para pax nuevos. Si ya viajó, ya está cargado y no se comparte. Se pueden compartir varios juntos.

## Pantallas

1. **Viajes:** en curso, borradores y terminados. Nuevo viaje. Al pie: cambiar conexión y la firma de AM Digital.
2. **Tablero del viaje:** PAX contra cupo, cobrado, falta cobrar y falta pasar a la agencia. Grupos en pestañas que bajan de renglón, buscador y "+ Cargar persona" (la anota en el grupo que se está mirando).
3. **Ficha (persona en un viaje):** grupo con un toque, WhatsApp y mail, la cuenta, aéreo (con Tati / por su cuenta / a definir), seña, visa, pagos, agencia. Borrar en dos toques.
4. **Registrar pago:** seña, cuota, aéreo u otro. Viene con lo que falta y muestra cómo queda.
5. **Pase a agencia:** viene con lo que falta pasar.
6. **Personas:** todas, con filtros (todas / ya viajaron / nunca viajaron) y buscador. La ficha de una persona muestra sus viajes y permite sumarla como interesada a otro viaje.

## Decisiones tomadas (y por qué)

- **Personas e inscripciones separadas:** una persona se carga una sola vez y puede estar en varios viajes. Así queda el historial y la lista de interesados para viajes futuros.
- **"Falta" no se guarda, se calcula:** terrestre + aéreo (si es con Tati) − pagos.
- **El costo no se congela por inscripción:** Ariel dijo que los precios de un viaje no cambian en el medio. Si eso cambia, hay que congelarlo (lo que pasó con las cuotas en Tai Chi).
- **"Aéreo pago" sale de los pagos marcados como aéreo.** Si alguien paga aéreo y cuota juntos, se carga como dos pagos.
- **Sin cola sin señal** (Tai Chi la tiene): sin conexión se ven los últimos datos, pero no se guarda.
- **Vista para compu (13/11):** pedida por Ariel "como en el panel de Tai Chi", adaptada a PAX. Igual que en Tai Chi: solo CSS desde 900 px, menú a la izquierda y listas en columnas, en vez de dos paneles lado a lado (más riesgo). Propio de PAX: los 4 números del tablero en una fila; los formularios no tienen menú (en el celu tampoco) y no se agregó para no cambiar comportamiento; la ficha queda angosta (es larga: si en la compu molesta, se puede partir en dos columnas). No se sabe si Tati usa compu.
- **Apps Script en la cuenta de Ariel** (corregido el 17/11; antes decía la de Tati). "Ejecutar como: Yo" corre como esa cuenta, así que Ariel tiene que poder editar la planilla.

## Pendiente / ideas sin hacer

- Instalar y probar con Tati una semana antes de agregar cosas.
- Confirmar si Tati quiere que "a pasar a la agencia" cuente también a los reservados (hoy cuenta reservados y PAX).
- **Fuera de alcance por ahora:** pagos en pesos, editar un pago (se borra y se carga de nuevo), descuentos por pax, tutorial dentro de la app, importar la planilla vieja.
- **Ojo con Tai Chi:** en sus notas quedó escrito que su script corre con la cuenta de Ariel. Ariel dice que corre en la de Héctor. Sin verificar: se ve en Administrar implementaciones.
