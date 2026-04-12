---
slug: /
title: Introducción
---

# NovaRestore

NovaRestore es un plugin profesional para Paper que guarda snapshots de muerte, permite revisarlos desde una GUI clara, y gestiona restauraciones con aprobacion desde Discord para mantener control, trazabilidad y seguridad operativa.

## Resumen rapido

| Dato | Valor |
| --- | --- |
| Plugin | `NovaRestore` |
| Version documentada | `1.1.0` |
| Autor | `zAnthxny_` |
| Categoria | Administracion, rollback de inventario, auditoria |
| Minecraft objetivo | `Paper 1.21.4 - 1.21.11` |
| API declarada | `1.21` |
| Java requerido | `21` |
| Base de datos | `SQLite` o `MySQL` |
| Dependencias externas de plugins | Ninguna |
| Integracion principal | Discord mediante bot JDA |
| Idiomas incluidos | `es`, `en` |
| Discord de soporte | [NovaStudios](https://discord.gg/zeSHUQXPuz) |

## Mapa de la wiki

Esta documentacion se compacto en seis paginas para que sea facil de mantener y publicar en GitHub:

| Pagina | Contenido |
| --- | --- |
| [Introducción](/) | Presentacion general, beneficios, compatibilidad, mapa de navegacion y enfoque comercial |
| [Instalacion](instalacion.md) | Requisitos, despliegue, primera ejecucion, archivos generados y errores comunes de arranque |
| [Configuracion](configuracion.md) | `config.yml`, idiomas, integraciones, placeholders, base de datos, sistema interno y optimizacion |
| [Comandos](comandos.md) | Comandos, GUI, filtros, ejemplos practicos y flujo operativo |
| [Permisos](permisos.md) | Permisos completos, perfiles sugeridos y ejemplos con LuckPerms |
| [FAQ](faq.md) | Solucion de problemas, FAQ, soporte, licencia y plantilla de changelog |

## Que hace NovaRestore

NovaRestore resuelve un problema muy concreto en servidores serios: recuperar inventarios perdidos sin convertir el proceso en algo improvisado, opaco o inseguro.

En lugar de depender de restauraciones manuales, evidencia incompleta o decisiones tomadas en caliente, el plugin registra cada muerte con informacion util para soporte:

- inventario principal
- armadura
- offhand
- Ender Chest
- experiencia
- servidor y ubicacion
- fecha exacta
- razon visible de la muerte
- resumen estadistico de items valiosos

Sobre ese registro, el staff puede inspeccionar la perdida, solicitar aprobacion a Discord, y aplicar una restauracion completa, parcial o mucho mas precisa segun el caso.

## Problemas que resuelve

- Reduce restauraciones impulsivas sin contexto.
- Aporta evidencia clara para tickets, apelaciones y revisiones internas.
- Evita restauraciones duplicadas gracias al bloqueo de snapshots ya consumidos.
- Permite aprobacion remota desde Discord sin obligar al responsable a estar dentro del servidor.
- Mantiene trazabilidad con auditoria exportable en `yml` o `json`.
- Da opciones para servidores pequenos con `SQLite` y para redes serias con `MySQL`.

## Caracteristicas principales

### 1. Captura automatica de muertes

Cada `PlayerDeathEvent` puede generar un snapshot completo del jugador. Si no hay items ni contenido util que guardar, el plugin evita crear ruido innecesario.

### 2. Snapshot de seguridad por desconexion en combate

Si `protections.save-combat-logout-snapshots` esta activo, el plugin detecta actividad de combate reciente y guarda un snapshot extra si el jugador sale o es expulsado dentro de la ventana configurada.

### 3. GUI de exploracion para staff

El staff puede abrir una GUI paginada con filtros por estado y busqueda por:

- ID de muerte
- fecha
- mundo
- coordenadas
- motivo
- estado
- categoria

### 4. Vista de inspeccion real

La pantalla de inspeccion no es solo una lista textual. Muestra el inventario perdido, armadura, offhand, estado actual, historico rapido, ubicacion y acciones directas como teleport o solicitud de rollback.

### 5. Flujo de aprobacion por Discord

La solicitud se inicia desde Minecraft, pero la aprobacion o rechazo se gestiona en Discord. El plugin genera un embed con informacion del caso y una vista previa visual del inventario para que la revision sea mucho mas rapida.

Ademas de las opciones generales, el embed incluye el menu `Otros`, pensado para restauraciones finas cuando el staff no quiere devolver una seccion completa.

### 6. Restauraciones parciales o completas

Segun el snapshot, Discord puede aprobar:

- restauracion completa
- solo inventario
- solo armadura
- solo offhand
- solo experiencia
- solo Ender Chest
- una o varias piezas/herramientas especificas desde `Otros`

Si una seccion no existe en ese snapshot, la opcion simplemente no aparece.

Dentro de `Otros`, el staff puede seleccionar una o varias opciones en la misma aprobacion, por ejemplo:

- espada
- pico
- hacha
- pala
- casco
- pechera
- pantalon
- botas
- offhand

Eso permite aprobar devoluciones mucho mas quirurgicas, como devolver solo una espada y un pico, o una pechera junto con el offhand, sin restaurar todo el inventario o toda la armadura.

### 7. Cola para jugadores offline

Si un rollback se aprueba cuando el jugador esta desconectado, el plugin lo deja en estado `QUEUED` y lo entrega automaticamente en su siguiente conexion.

### 8. Protecciones operativas

El sistema incluye varias capas de seguridad:

- backup automatico antes de restaurar
- opcion para exigir que las secciones objetivo esten vacias
- bloqueo de snapshots ya restaurados
- reapertura manual de solicitudes rechazadas
- desbloqueo manual de snapshots restaurados si el staff decide permitir una nueva restauracion

### 9. Auditoria real

Cada accion importante puede quedar registrada:

- solicitud
- aprobacion en cola
- restauracion aplicada
- entrega automatica
- rechazo
- cancelacion
- reapertura
- desbloqueo
- expiracion por timeout

Ademas, la auditoria puede exportarse desde comando.

## Compatibilidad y alcance verificado

| Elemento | Estado |
| --- | --- |
| Paper 1.21.4 - 1.21.11 | Verificado por README del proyecto |
| API Paper 1.21 | Declarada en `plugin.yml` |
| Java 21 | Requerido por `pom.xml` |
| SQLite | Soportado de forma nativa |
| MySQL | Soportado de forma nativa |
| Discord bot | Soportado de forma nativa |
| PlaceholderAPI | No hay soporte publico verificado |
| Vault | No detectado |
| Citizens | No detectado |
| DecentHolograms | No detectado |
| Folia | Pendiente de confirmacion |
| Spigot/Purpur/Pufferfish | Pendiente de validacion oficial |

## Para que tipo de servidor sirve

NovaRestore encaja especialmente bien en:

- survival con economia y staff activo
- servidores PvP o factions con disputas frecuentes
- modalidades donde una muerte por bug, lag o error administrativo debe revisarse con evidencia
- redes con varios miembros de staff que necesitan trazabilidad
- proyectos premium que quieren dar soporte serio y no improvisado

## Casos de uso rapidos

| Escenario | Como ayuda NovaRestore |
| --- | --- |
| Muerte por lag en survival | El staff revisa la perdida, solicita rollback y lo aprueba con evidencia |
| Jugador desconectado tras un PvP | Se guarda snapshot de seguridad por combate reciente |
| Jugador offline al momento de aprobar | La restauracion queda en cola y se entrega al entrar |
| Devolucion parcial muy especifica | Discord permite aprobar varias herramientas o piezas concretas en una sola accion |
| Auditoria interna de decisiones de staff | Se consultan logs y se exportan a archivo |
| Servidor grande con alta actividad | Se usa `MySQL` con retencion controlada e indices ya preparados |

## Por que destaca como producto premium

- No depende de comandos toscos ni restauraciones ciegas.
- Da un flujo completo, desde la captura hasta la auditoria final.
- Tiene una presentacion fuerte en Discord gracias al embed y la preview visual.
- Permite restauraciones finas desde Discord con seleccion multiple de herramientas y piezas concretas.
- Permite controlar riesgos con backup, bloqueo y validaciones.
- Se adapta tanto a un servidor pequeño como a una red mas exigente.

### Soporte

- Discord: [NovaStudios](https://discord.gg/zeSHUQXPuz)

## NOTA

> NovaRestore profesionaliza el proceso de rollback de inventarios en Paper. Guarda cada muerte con contexto real, permite revisarla desde una GUI clara, envia solicitudes con aprobacion por Discord, soporta restauraciones completas, parciales o especificas por herramienta/pieza, y deja auditoria exportable para un staff serio. Ideal para servidores que quieren soporte premium, control operativo y confianza para sus jugadores.

Se recomienda usarlo primero en un servidor de prueba (TestServer) para configuración del plugin.
