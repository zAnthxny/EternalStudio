# Comandos

NovaRestore centraliza casi toda su operacion en el comando base `invrollback`, con alias `invrestore`.

## Resumen general

| Comando | Descripcion | Uso | Permiso | Alias | Consola |
| --- | --- | --- | --- | --- | --- |
| `/invrollback &lt;jugador&gt; [pagina] [filtro] [busqueda]` | Abre la GUI de muertes del jugador | `/invrollback Steve 1 open` | `rollback.view` | `/invrestore` | No |
| `/invrollback reload` | Recarga configuracion e intenta reconectar servicios | `/invrollback reload` | `rollback.reload` | `/invrestore reload` | Si |
| `/invrollback cancel &lt;ID&gt; &lt;razon&gt;` | Cancela una solicitud pendiente o en cola | `/invrollback cancel 1711412345678 razon` | `rollback.manage.cancel` | `/invrestore cancel` | Si |
| `/invrollback reopen &lt;ID&gt;` | Reabre una solicitud rechazada | `/invrollback reopen 1711412345678` | `rollback.manage.reopen` | `/invrestore reopen` | Si |
| `/invrollback unlock &lt;ID&gt;` | Desbloquea una muerte restaurada para permitir nueva solicitud | `/invrollback unlock 1711412345678` | `rollback.manage.unlock` | `/invrestore unlock` | Si |
| `/invrollback info &lt;jugador&gt;` | Muestra resumen estadistico del jugador | `/invrollback info Steve` | `rollback.info` | `/invrestore info` | Si |
| `/invrollback stats &lt;jugador&gt;` | Alias funcional de `info` | `/invrollback stats Steve` | `rollback.info` | `/invrestore stats` | Si |
| `/invrollback history &lt;jugador&gt; [filtro] [busqueda]` | Muestra historial resumido de muertes | `/invrollback history Steve restored` | `rollback.info` | `/invrestore history` | Si |
| `/invrollback logs &lt;jugador&gt;` | Muestra auditoria reciente del jugador | `/invrollback logs Steve` | `rollback.logs` | `/invrestore logs` | Si |
| `/invrollback export &lt;yml|json&gt; [jugador]` | Exporta auditoria global o de un jugador | `/invrollback export json Steve` | `rollback.export` | `/invrestore export` | Si |

## Filtros disponibles

Los filtros soportados por comando y GUI son:

| Filtro | Descripcion |
| --- | --- |
| `all` | Todas las muertes |
| `open` | Snapshots abiertos |
| `pending` | Solicitudes pendientes |
| `queued` | Restauraciones aprobadas en cola |
| `restored` | Restauraciones aplicadas |
| `denied` | Solicitudes rechazadas |

## Comportamientos especiales por comando

### `/invrollback &lt;jugador&gt; [pagina] [filtro] [busqueda]`

- Solo puede abrirlo un jugador dentro del servidor.
- Carga hasta `45` snapshots por pagina.
- La busqueda puede coincidir con:
  - nombre de jugador
  - `death_id`
  - fecha
  - mundo
  - coordenadas
  - categoria
  - motivo
  - estado

Ejemplos:

```text
/invrollback Steve
/invrollback Steve 2
/invrollback Steve 1 pending
/invrollback Steve 1 all nether
/invrollback Steve 1 restored 2026-03

/invrollback reload

Recarga:

config.yml
idioma activo
conexion de base de datos

Ademas intenta reiniciar el bot solo si hace falta. Si el token cambio durante un reload, el propio codigo advierte que el reinicio completo del servidor es la via mas segura.

/invrollback cancel &lt;ID&gt; &lt;razon&gt;
Requiere una razon obligatoria.
Solo funciona sobre snapshots PENDING o QUEUED.
Reabre el snapshot a OPEN.
Actualiza Discord y auditoria.

Ejemplo:

/invrollback cancel 1711412345678 Ticket cerrado por evidencia insuficiente
/invrollback reopen &lt;ID&gt;
Solo funciona sobre snapshots DENIED.
Devuelve el snapshot a OPEN.
Permite que vuelva a solicitarse.
/invrollback unlock &lt;ID&gt;
Solo funciona sobre snapshots RESTORED.
Quita el bloqueo operativo y permite una nueva solicitud.
Debe usarse con mucho cuidado.
/invrollback info &lt;jugador&gt; y /invrollback stats &lt;jugador&gt;

Muestran:

muertes totales
abiertas
pendientes
en cola
restauradas
rechazadas
solicitudes auditadas
restores auditados
tasa de rechazo
fecha de la ultima muerte
/invrollback history &lt;jugador&gt; [filtro] [busqueda]
Devuelve hasta 12 entradas.
Sirve para una revision rapida por chat sin abrir la GUI.

Ejemplos:

/invrollback history Steve
/invrollback history Steve open
/invrollback history Steve all pvp
/invrollback logs &lt;jugador&gt;
Devuelve hasta 12 eventos auditados recientes.
Muestra actor, estado actual y servidor.
/invrollback export &lt;yml|json&gt; [jugador]
Si no indicas jugador, exporta toda la auditoria.
Si indicas jugador, exporta solo su historial.
Los archivos se guardan en plugins/NovaRestore/exports/.

Ejemplos:

/invrollback export yml
/invrollback export json
/invrollback export yml Steve
/invrollback export json Steve
Flujo operativo desde la GUI
Menu principal

Desde /invrollback &lt;jugador&gt; el staff puede:

cambiar de pagina
rotar filtros
ver cantidad total y visible
abrir un snapshot concreto
Menu de inspeccion

Al abrir un snapshot se habilitan estas acciones:

Accion	Descripcion
Volver	Regresa a la lista anterior
Ver detalles	Fecha, estado, categoria, servidor y ubicacion
Ver historial rapido	Solicitante, razon, ultima accion, nota y tipo aplicado
Teleport	Lleva al staff al lugar registrado de la muerte
Mostrar ID	Envía el death_id al chat
Solicitar rollback	Inicia el prompt de razon por chat y luego el envio a Discord
Flujo de solicitud
El staff abre la muerte desde la GUI.
Pulsa Solicitar rollback.
El plugin cierra el inventario y pide una razon en chat.
El staff escribe un texto libre o el numero de una razon rapida.
El plugin envia la solicitud a Discord.

Motivos rapidos por defecto:

bug
lag
pvp
error-admin
desync

Tambien se puede cancelar el prompt escribiendo cancelar o cancel.

Flujo desde Discord

Cuando la solicitud llega a Discord:

se crea un embed con datos del caso
se adjunta una preview visual del inventario si fue posible generarla
aparece un selector con tipos de restauracion validos y opcion de rechazo

Si el moderador aprueba:

con jugador online: el rollback se aplica al momento
con jugador offline: queda QUEUED y se entrega en el siguiente login

Si el moderador rechaza:

el snapshot pasa a DENIED
el jugador puede ser notificado si la opcion de notificaciones esta activa
Ejemplos practicos listos para copiar
Caso 1: survival con muerte por lag
/invrollback Steve
/invrollback info Steve

Proceso sugerido:

abre la muerte
revisa items y ubicacion
solicita rollback con razon lag
aprueba en Discord
Caso 2: jugador offline al momento de aprobar

No requiere comando especial. El flujo normal es:

solicitud enviada
aprobacion en Discord
snapshot marcado QUEUED
restauracion automatica al volver a entrar
Caso 3: apelacion despues de rechazo
/invrollback reopen 1711412345678
Caso 4: liberar una muerte ya restaurada para un nuevo analisis
/invrollback unlock 1711412345678
Caso 5: auditoria para revision interna
/invrollback logs Steve
/invrollback export json Steve
Sugerencias de uso por tipo de servidor
Tipo de servidor	Uso recomendado
Survival	Revisar muertes por lag, bugs o errores administrativos
PvP / factions	Investigar disputas y desconexiones en combate
Skyblock	Revisar perdidas por vacio o fallos de movilidad [pendiente de validacion especifica del entorno]
Prison / RPG	Mantener auditoria seria de restores realizados por staff
Autocompletado

El comando incluye tab completion para:

subcomandos disponibles segun permisos
jugadores conocidos
death_id pendientes, rechazados o restaurados
formatos yml y json
filtros soportados

La referencia de permisos esta en permisos.md
.


Después de pegar eso, guarda, haz commit y vuelve a correr el build. Si sale otro error, te doy el siguiente archivo ya corregido completo.
pero asi no puedo copiar y pegar, mete todo dentro del recuadro
Pensado durante un par de segundos

Sí, te lo dejo todo dentro de un solo recuadro para copiar y pegar completo en docs/comandos.md:

# Comandos

NovaRestore centraliza casi toda su operacion en el comando base `invrollback`, con alias `invrestore`.

## Resumen general

| Comando | Descripcion | Uso | Permiso | Alias | Consola |
| --- | --- | --- | --- | --- | --- |
| `/invrollback &lt;jugador&gt; [pagina] [filtro] [busqueda]` | Abre la GUI de muertes del jugador | `/invrollback Steve 1 open` | `rollback.view` | `/invrestore` | No |
| `/invrollback reload` | Recarga configuracion e intenta reconectar servicios | `/invrollback reload` | `rollback.reload` | `/invrestore reload` | Si |
| `/invrollback cancel &lt;ID&gt; &lt;razon&gt;` | Cancela una solicitud pendiente o en cola | `/invrollback cancel 1711412345678 razon` | `rollback.manage.cancel` | `/invrestore cancel` | Si |
| `/invrollback reopen &lt;ID&gt;` | Reabre una solicitud rechazada | `/invrollback reopen 1711412345678` | `rollback.manage.reopen` | `/invrestore reopen` | Si |
| `/invrollback unlock &lt;ID&gt;` | Desbloquea una muerte restaurada para permitir nueva solicitud | `/invrollback unlock 1711412345678` | `rollback.manage.unlock` | `/invrestore unlock` | Si |
| `/invrollback info &lt;jugador&gt;` | Muestra resumen estadistico del jugador | `/invrollback info Steve` | `rollback.info` | `/invrestore info` | Si |
| `/invrollback stats &lt;jugador&gt;` | Alias funcional de `info` | `/invrollback stats Steve` | `rollback.info` | `/invrestore stats` | Si |
| `/invrollback history &lt;jugador&gt; [filtro] [busqueda]` | Muestra historial resumido de muertes | `/invrollback history Steve restored` | `rollback.info` | `/invrestore history` | Si |
| `/invrollback logs &lt;jugador&gt;` | Muestra auditoria reciente del jugador | `/invrollback logs Steve` | `rollback.logs` | `/invrestore logs` | Si |
| `/invrollback export &lt;yml\|json&gt; [jugador]` | Exporta auditoria global o de un jugador | `/invrollback export json Steve` | `rollback.export` | `/invrestore export` | Si |

## Filtros disponibles

Los filtros soportados por comando y GUI son:

| Filtro | Descripcion |
| --- | --- |
| `all` | Todas las muertes |
| `open` | Snapshots abiertos |
| `pending` | Solicitudes pendientes |
| `queued` | Restauraciones aprobadas en cola |
| `restored` | Restauraciones aplicadas |
| `denied` | Solicitudes rechazadas |

## Comportamientos especiales por comando

### `/invrollback &lt;jugador&gt; [pagina] [filtro] [busqueda]`

- Solo puede abrirlo un jugador dentro del servidor.
- Carga hasta `45` snapshots por pagina.
- La busqueda puede coincidir con:
  - nombre de jugador
  - `death_id`
  - fecha
  - mundo
  - coordenadas
  - categoria
  - motivo
  - estado

Ejemplos:

```text
/invrollback Steve
/invrollback Steve 2
/invrollback Steve 1 pending
/invrollback Steve 1 all nether
/invrollback Steve 1 restored 2026-03
/invrollback reload

Recarga:

config.yml
idioma activo
conexion de base de datos

Ademas intenta reiniciar el bot solo si hace falta. Si el token cambio durante un reload, el propio codigo advierte que el reinicio completo del servidor es la via mas segura.

/invrollback cancel &lt;ID&gt; &lt;razon&gt;
Requiere una razon obligatoria.
Solo funciona sobre snapshots PENDING o QUEUED.
Reabre el snapshot a OPEN.
Actualiza Discord y auditoria.

Ejemplo:

/invrollback cancel 1711412345678 Ticket cerrado por evidencia insuficiente
/invrollback reopen &lt;ID&gt;
Solo funciona sobre snapshots DENIED.
Devuelve el snapshot a OPEN.
Permite que vuelva a solicitarse.
/invrollback unlock &lt;ID&gt;
Solo funciona sobre snapshots RESTORED.
Quita el bloqueo operativo y permite una nueva solicitud.
Debe usarse con mucho cuidado.
/invrollback info &lt;jugador&gt; y /invrollback stats &lt;jugador&gt;

Muestran:

muertes totales
abiertas
pendientes
en cola
restauradas
rechazadas
solicitudes auditadas
restores auditados
tasa de rechazo
fecha de la ultima muerte
/invrollback history &lt;jugador&gt; [filtro] [busqueda]
Devuelve hasta 12 entradas.
Sirve para una revision rapida por chat sin abrir la GUI.

Ejemplos:

/invrollback history Steve
/invrollback history Steve open
/invrollback history Steve all pvp
/invrollback logs &lt;jugador&gt;
Devuelve hasta 12 eventos auditados recientes.
Muestra actor, estado actual y servidor.
/invrollback export &lt;yml\|json&gt; [jugador]
Si no indicas jugador, exporta toda la auditoria.
Si indicas jugador, exporta solo su historial.
Los archivos se guardan en plugins/NovaRestore/exports/.

Ejemplos:

/invrollback export yml
/invrollback export json
/invrollback export yml Steve
/invrollback export json Steve
Flujo operativo desde la GUI
Menu principal

Desde /invrollback &lt;jugador&gt; el staff puede:

cambiar de pagina
rotar filtros
ver cantidad total y visible
abrir un snapshot concreto
Menu de inspeccion

Al abrir un snapshot se habilitan estas acciones:

Accion	Descripcion
Volver	Regresa a la lista anterior
Ver detalles	Fecha, estado, categoria, servidor y ubicacion
Ver historial rapido	Solicitante, razon, ultima accion, nota y tipo aplicado
Teleport	Lleva al staff al lugar registrado de la muerte
Mostrar ID	Envía el death_id al chat
Solicitar rollback	Inicia el prompt de razon por chat y luego el envio a Discord
Flujo de solicitud
El staff abre la muerte desde la GUI.
Pulsa Solicitar rollback.
El plugin cierra el inventario y pide una razon en chat.
El staff escribe un texto libre o el numero de una razon rapida.
El plugin envia la solicitud a Discord.

Motivos rapidos por defecto:

bug
lag
pvp
error-admin
desync

Tambien se puede cancelar el prompt escribiendo cancelar o cancel.

Flujo desde Discord

Cuando la solicitud llega a Discord:

se crea un embed con datos del caso
se adjunta una preview visual del inventario si fue posible generarla
aparece un selector con tipos de restauracion validos y opcion de rechazo

Si el moderador aprueba:

con jugador online: el rollback se aplica al momento
con jugador offline: queda QUEUED y se entrega en el siguiente login

Si el moderador rechaza:

el snapshot pasa a DENIED
el jugador puede ser notificado si la opcion de notificaciones esta activa
Ejemplos practicos listos para copiar
Caso 1: survival con muerte por lag
/invrollback Steve
/invrollback info Steve

Proceso sugerido:

abre la muerte
revisa items y ubicacion
solicita rollback con razon lag
aprueba en Discord
Caso 2: jugador offline al momento de aprobar

No requiere comando especial. El flujo normal es:

solicitud enviada
aprobacion en Discord
snapshot marcado QUEUED
restauracion automatica al volver a entrar
Caso 3: apelacion despues de rechazo
/invrollback reopen 1711412345678
Caso 4: liberar una muerte ya restaurada para un nuevo analisis
/invrollback unlock 1711412345678
Caso 5: auditoria para revision interna
/invrollback logs Steve
/invrollback export json Steve
Sugerencias de uso por tipo de servidor
Tipo de servidor	Uso recomendado
Survival	Revisar muertes por lag, bugs o errores administrativos
PvP / factions	Investigar disputas y desconexiones en combate
Skyblock	Revisar perdidas por vacio o fallos de movilidad [pendiente de validacion especifica del entorno]
Prison / RPG	Mantener auditoria seria de restores realizados por staff
Autocompletado

El comando incluye tab completion para:

subcomandos disponibles segun permisos
jugadores conocidos
death_id pendientes, rechazados o restaurados
formatos yml y json
filtros soportados

La referencia de permisos esta en permisos.md
.
