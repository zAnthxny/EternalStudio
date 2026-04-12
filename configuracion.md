# Configuracion

Esta pagina documenta los archivos configurables, el sistema interno del plugin, integraciones, base de datos, placeholders y recomendaciones de optimizacion.

## Archivos de configuracion

| Archivo | Tipo | Descripcion |
| --- | --- | --- |
| `plugins/NovaRestore/config.yml` | Obligatorio | Configuracion principal del plugin |
| `plugins/NovaRestore/lang/es.yml` | Editable | Mensajes en espanol |
| `plugins/NovaRestore/lang/en.yml` | Editable | Mensajes en ingles |

## `config.yml por defecto`

```yml
lang: "es"

server:
  name: "Survival-01"

database:
  type: "SQLITE"
  table-prefix: "invrestore_"

  sqlite:
    file: "database/invrestore.db"

  mysql:
    host: "127.0.0.1"
    port: 3306
    database: "invrestore"
    username: "root"
    password: "change-me"
    parameters: "useSSL=false&characterEncoding=utf8&autoReconnect=true"

    pool:
      maximum-pool-size: 10
      minimum-idle: 2
      connection-timeout-ms: 10000
      maximum-lifetime-ms: 1800000
      keepalive-time-ms: 0

discord:
  bot-token: "TOKEN_EN_STARTUP_ARGUMENTS"
  log-channel-id: "123456789012345678"
  admin-role-ids:
    - "123456789012345678"
  thumbnail-url-template: "https://mc-heads.net/avatar/%uuid%/128"
  audit-webhook-url: ""
  audit-webhook-username: "NovaRestore Audit"
  audit-webhook-avatar-url: ""

notifications:
  notify-target-player: true

requests:
  quick-reasons:
    - "bug"
    - "lag"
    - "pvp"
    - "error-admin"
    - "desync"
  staff-request-cooldown-seconds: 10
  max-pending-per-player: 3
  timeout-minutes: 0

protections:
  require-empty-sections-before-restore: false
  create-backup-before-restore: true
  save-combat-logout-snapshots: true
  combat-logout-window-seconds: 15

storage:
  retention:
    max-snapshots-per-player: 100
    max-snapshot-age-days: 45

  filters:
    enabled: false
    blocked-worlds: []
    blocked-gamemodes: []
```

## `Explicacion completa de config.yml`

### Idioma general

| Ruta | Default | Descripcion | Nota |
| --- | --- | --- | --- |
| `lang` | `es` | Idioma global del plugin | Solo `es` y `en` estan soportados por el codigo; valores no validos vuelven a `es` |

### Identidad del servidor

| Ruta | Default | Descripcion | Recomendacion |
| --- | --- | --- | --- |
| `server.name` | `Survival-01` | Nombre visible en snapshots, auditoria y embeds de Discord | Usa el nombre real de tu modalidad o nodo |

Si este valor se deja vacio, el plugin intenta usar el nombre del servidor reportado por Bukkit.

### Base de datos

| Ruta | Default | Descripcion |
| --- | --- | --- |
| `database.type` | `SQLITE` | Motor de almacenamiento. Valores soportados: `SQLITE`, `MYSQL` |
| `database.table-prefix` | `invrestore_` | Prefijo de tablas |
| `database.sqlite.file` | `database/invrestore.db` | Ruta relativa del archivo SQLite |
| `database.mysql.host` | `127.0.0.1` | Host de MySQL |
| `database.mysql.port` | `3306` | Puerto de MySQL |
| `database.mysql.database` | `invrestore` | Nombre de la base |
| `database.mysql.username` | `root` | Usuario |
| `database.mysql.password` | `change-me` | Password |
| `database.mysql.parameters` | `useSSL=false&characterEncoding=utf8&autoReconnect=true` | Parametros extra JDBC |
| `database.mysql.pool.maximum-pool-size` | `10` | Tamano maximo del pool |
| `database.mysql.pool.minimum-idle` | `2` | Conexiones ociosas minimas |
| `database.mysql.pool.connection-timeout-ms` | `10000` | Timeout de conexion |
| `database.mysql.pool.maximum-lifetime-ms` | `1800000` | Vida maxima de conexion |
| `database.mysql.pool.keepalive-time-ms` | `0` | Keepalive opcional |

Notas tecnicas:

- Si `table-prefix` queda vacio, el plugin vuelve a `invrestore_`.
- En `SQLite`, el pool se reduce internamente a una sola conexion activa.
- En `MySQL`, el plugin usa HikariCP.

### Discord

| Ruta | Default | Descripcion |
| --- | --- | --- |
| `discord.bot-token` | `TOKEN_EN_STARTUP_ARGUMENTS` | Marcador o documentacion. No pongas aqui el token real; usa `-Ddiscord.token=TU_TOKEN` en el arranque del servidor |
| `discord.log-channel-id` | `123456789012345678` | Canal donde se enviaran solicitudes de rollback |
| `discord.admin-role-ids` | lista | IDs de roles autorizados para aprobar o rechazar |
| `discord.thumbnail-url-template` | `https://mc-heads.net/avatar/%uuid%/128` | URL de miniatura por jugador |
| `discord.audit-webhook-url` | vacio | Webhook opcional para duplicar auditoria |
| `discord.audit-webhook-username` | `NovaRestore Audit` | Nombre del webhook |
| `discord.audit-webhook-avatar-url` | vacio | Avatar del webhook |

Regla de seguridad para produccion:

- no guardes el token real del bot en `config.yml`
- define el token en el arranque del servidor con `-Ddiscord.token=TU_TOKEN`
- revisa [instalacion.md](instalacion.md) para ejemplos de `start.sh`, `start.bat` y despliegue en hosting

Opciones soportadas por codigo aunque no aparezcan en el archivo por defecto:

| Ruta adicional | Default efectivo | Uso |
| --- | --- | --- |
| `discord.require-admin-role` | `true` | Si lo pones en `false`, el plugin no exige rol para gestionar acciones en Discord |
| `discord.admin-role-id` | vacio | Ruta legacy soportada como compatibilidad con una sola ID |
| `bot-token` | vacio | Ruta legacy soportada como compatibilidad |
| `log-channel-id` | vacio | Ruta legacy soportada como compatibilidad |
| `admin-role-id` | vacio | Ruta legacy soportada como compatibilidad |

### Notificaciones al jugador

| Ruta | Default | Descripcion |
| --- | --- | --- |
| `notifications.notify-target-player` | `true` | Notifica al jugador cuando su solicitud cambia de estado |

### Solicitudes

| Ruta | Default | Descripcion |
| --- | --- | --- |
| `requests.quick-reasons` | `bug, lag, pvp, error-admin, desync` | Motivos rapidos para usar en chat |
| `requests.staff-request-cooldown-seconds` | `10` | Cooldown por staff entre solicitudes |
| `requests.max-pending-per-player` | `3` | Maximo de solicitudes activas por jugador |
| `requests.timeout-minutes` | `0` | Minutos hasta expirar automaticamente una solicitud pendiente. `0` la desactiva |

Notas tecnicas:

- El limite minimo efectivo de `max-pending-per-player` es `1`.
- Si activas timeout, el plugin reabre el snapshot y marca el mensaje de Discord como expirado.

### Protecciones

| Ruta | Default | Descripcion |
| --- | --- | --- |
| `protections.require-empty-sections-before-restore` | `false` | Exige que inventario, armadura, offhand, XP o Ender Chest esten vacios antes de restaurar |
| `protections.create-backup-before-restore` | `true` | Crea un snapshot de respaldo antes de aplicar una restauracion |
| `protections.save-combat-logout-snapshots` | `true` | Guarda snapshot de seguridad si un jugador sale poco despues de entrar en combate |
| `protections.combat-logout-window-seconds` | `15` | Ventana de combate usada para el snapshot por desconexion |

### Retencion

| Ruta | Default | Descripcion |
| --- | --- | --- |
| `storage.retention.max-snapshots-per-player` | `100` | Numero maximo de snapshots por jugador |
| `storage.retention.max-snapshot-age-days` | `45` | Antiguedad maxima en dias |

El plugin elimina automaticamente:

- snapshots mas viejos que el limite de dias
- snapshots que excedan el maximo por jugador

### Filtros de guardado

| Ruta | Default | Descripcion |
| --- | --- | --- |
| `storage.filters.enabled` | `false` | Activa filtros por mundo y gamemode |
| `storage.filters.blocked-worlds` | `[]` | Mundos excluidos |
| `storage.filters.blocked-gamemodes` | `[]` | Modos de juego excluidos |

## Configuraciones recomendadas por tipo de servidor

### Perfil 1: servidor pequeno o mediano

```yml
database:
  type: "SQLITE"

requests:
  timeout-minutes: 0

storage:
  retention:
    max-snapshots-per-player: 60
    max-snapshot-age-days: 30
```

### Perfil 2: servidor grande o network

```yml
database:
  type: "MYSQL"
  table-prefix: "invrollback_"

requests:
  max-pending-per-player: 2
  timeout-minutes: 30

storage:
  retention:
    max-snapshots-per-player: 150
    max-snapshot-age-days: 60
```

### Perfil 3: politica estricta de restauracion

```yml
protections:
  require-empty-sections-before-restore: true
  create-backup-before-restore: true
  save-combat-logout-snapshots: true
  combat-logout-window-seconds: 15
```

### Perfil 4: exclusiones por mundo o gamemode

```yml
storage:
  filters:
    enabled: true
    blocked-worlds:
      - "lobby"
      - "eventos"
    blocked-gamemodes:
      - "creative"
      - "spectator"
```

## Configuracion de base de datos

### SQLite

Ventajas:

- sencilla
- local
- sin servicios extra

Uso recomendado:

- servidores de una sola instancia
- staging
- proyectos pequenos o medianos

Ejemplo:

```yml
database:
  type: "SQLITE"
  table-prefix: "invrestore_"
  sqlite:
    file: "database/invrestore.db"
```

### MySQL

Ventajas:

- mejor para volumen alto
- mas facil de respaldar y monitorear externamente
- mejor opcion para redes o infraestructura profesional

Ejemplo:

```yml
database:
  type: "MYSQL"
  table-prefix: "invrestore_"
  mysql:
    host: "127.0.0.1"
    port: 3306
    database: "invrestore"
    username: "root"
    password: "change-me"
    parameters: "useSSL=false&characterEncoding=utf8&autoReconnect=true"
    pool:
      maximum-pool-size: 10
      minimum-idle: 2
      connection-timeout-ms: 10000
      maximum-lifetime-ms: 1800000
      keepalive-time-ms: 0
```

## Tablas principales

Con el prefijo por defecto, el plugin crea:

| Tabla | Funcion |
| --- | --- |
| `invrestore_snapshots` | Snapshots de muerte y backups |
| `invrestore_audit_log` | Auditoria de acciones |

### Datos importantes en `snapshots`

- jugador y UUID
- `death_id`
- fecha y timestamp
- categoria `DEATH` o `BACKUP`
- motivo y mensaje
- ubicacion y servidor
- inventario, armadura, offhand, Ender Chest y XP serializados
- estado `OPEN`, `PENDING`, `QUEUED`, `RESTORED`, `DENIED`
- informacion de solicitud y mensaje de Discord
- ultimo actor, ultima nota y tipo de restore
- estadisticas de items: totales, encantados, totems, netherite, shulkers

### Datos importantes en `audit_log`

- ID de entrada
- accion
- actor
- jugador afectado
- `death_id`
- fecha del snapshot
- estado
- nota
- ubicacion
- servidor

## Mensajes y personalizacion

### Archivos de idioma

El plugin genera:

- `lang/es.yml`
- `lang/en.yml`

Grupos principales dentro de los archivos:

| Grupo | Contenido |
| --- | --- |
| `general` | Prefijo, textos generales y palabra de confirmacion |
| `state` | Estados de snapshots |
| `filter` | Etiquetas de filtros |
| `rollback` | Nombres visibles de tipos de restore |
| `command` | Mensajes de comando, GUI e inspeccion |
| `request_prompt` | Flujo de razon en chat |
| `result` | Resultados de Discord, auditoria, muertes y restores |
| `notify` | Mensajes al jugador afectado |
| `discord` | Embeds, modal, listener y preview visual |

### Formato de color soportado

La implementacion actual usa `ChatColor.translateAlternateColorCodes('&', ...)`.

Eso significa:

- soporte nativo para colores legacy con `&`
- sin parser MiniMessage
- sin soporte HEX dedicado en el codigo actual

Ejemplo valido:

```yml
general:
  prefix: "&6[NovaRestore] &f"
```

### Personalizacion recomendada

- Ajusta el `prefix` para que combine con tu marca.
- Cambia `server.name` para que el embed muestre tu modalidad real.
- Revisa `request_prompt.quick-reasons` para que el staff use vocabulario interno.
- Personaliza los textos de `notify` si quieres un tono mas formal o mas cercano.

## Placeholders

### Placeholders publicos de PlaceholderAPI

No se detecto expansion publica ni placeholders de PlaceholderAPI en esta version del plugin.

### Variables internas soportadas

| Lugar | Variables verificadas | Uso |
| --- | --- | --- |
| `discord.thumbnail-url-template` | `%uuid%`, `%player%` | Construccion de miniatura del jugador |
| Archivos de idioma | `%player%`, `%id%`, `%value%`, `%reason%`, `%filter%`, `%page%`, `%pages%`, `%type%`, `%message%`, `%word%`, `%server%`, `%location%`, `%error%` y otras segun clave | Reemplazos internos del plugin |

Importante:

- Estas variables no son placeholders publicos para scoreboards o menus externos.
- Son reemplazos internos del propio sistema de mensajes.

## Integraciones

| Integracion | Estado | Detalle |
| --- | --- | --- |
| Discord bot | Nativa | Gestiona aprobaciones, rechazos y restores desde Discord |
| Discord webhook de auditoria | Opcional | Replica eventos auditados fuera del canal principal |
| SQLite | Nativa | Almacenamiento local |
| MySQL | Nativa | Almacenamiento remoto/produccion |
| PlaceholderAPI | No verificado | No hay integracion publica detectada |
| Vault | No detectado | No requerido |
| Citizens | No detectado | No requerido |

## Sistema interno y funcionamiento

### Flujo general de un snapshot

```text
Muerte del jugador
  -> snapshot OPEN
  -> inspeccion desde GUI
  -> solicitud desde Minecraft con razon en chat
  -> Discord recibe el caso

Desde ahi:
  PENDING -> DENIED
  PENDING -> RESTORED
  PENDING -> QUEUED -> RESTORED al reconectar
  PENDING -> OPEN por cancelacion
  PENDING -> OPEN por timeout
  DENIED -> OPEN por reopen
  RESTORED -> OPEN por unlock
```

### Como se crea un snapshot

El plugin captura:

- inventario principal
- armadura
- mano secundaria
- Ender Chest
- experiencia
- fecha y timestamp
- ubicacion
- servidor
- razon visible de la muerte
- resumen de items relevantes

Si no hay items ni contenido util que guardar, el snapshot no se persiste.

### Tipos de snapshot

| Categoria | Como se genera |
| --- | --- |
| `DEATH` | Muerte normal o snapshot por desconexion en combate |
| `BACKUP` | Respaldo automatico antes de restaurar, si esta activado |

### Entrega en cola

Si el jugador esta offline cuando un moderador aprueba una solicitud en Discord:

- el snapshot pasa a `QUEUED`
- se registra en auditoria
- el mensaje de Discord se actualiza
- el plugin intenta aplicarlo en el siguiente `PlayerJoinEvent`

### GUI interna

La GUI principal muestra hasta `45` snapshots por pagina y deja la fila inferior para navegacion y acciones.

La GUI de inspeccion incluye:

- vista del inventario perdido
- armadura separada
- offhand
- datos del caso
- historial rapido
- teleport al lugar
- mostrar ID
- solicitar rollback

## Estructura de archivos en produccion

| Ruta | Descripcion | Conviene respaldar |
| --- | --- | --- |
| `plugins/NovaRestore/config.yml` | Configuracion principal | Si |
| `plugins/NovaRestore/lang/es.yml` | Traduccion/personalizacion | Si |
| `plugins/NovaRestore/lang/en.yml` | Traduccion alternativa | Si |
| `plugins/NovaRestore/database/invrestore.db` | Base SQLite | Si, si usas SQLite |
| `plugins/NovaRestore/exports/` | Exportaciones manuales | Recomendado |

## Rendimiento y optimizacion

### Impacto esperado

Por la implementacion actual, el plugin ya incluye varias decisiones saludables:

- escritura asincrona de snapshots con un ejecutor dedicado
- pool HikariCP para base de datos
- indices SQL para consultas habituales
- retencion automatica para evitar crecimiento indefinido

### Recomendaciones practicas

- Usa `MySQL` si el volumen de consultas del staff es alto.
- Reduce `max-snapshots-per-player` si tu servidor tiene muchisimas muertes diarias.
- Activa filtros por mundos o gamemodes si hay zonas que no te interesa registrar.
- Mantén `create-backup-before-restore: true` en produccion seria.
- Activa `require-empty-sections-before-restore` si quieres minimizar sobrescrituras accidentales.

### Que evitar

- Dejar un token placeholder en un entorno productivo.
- Usar `SQLite` para una red grande sin control de retencion.
- Desactivar todas las protecciones y luego aceptar restores sobre inventarios ocupados.
- Cambiar muchas opciones criticas y confiar solo en `/invrollback reload` cuando tambien cambie el token de Discord.

### Buenas practicas de operacion

- Respaldar base de datos antes de cambios importantes.
- Probar un flujo completo en staging.
- Documentar internamente quien puede aprobar en Discord y quien solo puede solicitar.
- Ajustar `quick-reasons` al lenguaje real del staff.

La referencia operativa de comandos esta en [comandos.md](comandos.md).

