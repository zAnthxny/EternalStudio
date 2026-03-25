# Configuracion

## Vision general

El proyecto actual usa un unico archivo de configuracion principal:

- `config.yml`

No existen actualmente archivos separados para mensajes, menus, base de datos, placeholders o idiomas.

## Archivo principal: `config.yml`

```yaml
# InvRestore configuration

server:
  name: ""

discord:
  # Recommended: provide the token as a JVM argument with -Ddiscord.token=YOUR_TOKEN
  bot-token: "TOKEN_EN_STARTUP_ARGUMENTS"
  log-channel-id: "123456789012345678"
  admin-role-id: "123456789012345678"
  require-admin-role: true
  thumbnail-url-template: "https://mc-heads.net/avatar/%uuid%/128"
  audit-webhook-url: ""
  audit-webhook-username: "InvRestore Audit"
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

storage:
  max-snapshots-per-player: 100
  max-snapshot-age-days: 45
  enable-save-filters: false
  blocked-worlds: []
  blocked-gamemodes: []
```

## Explicacion por secciones

## `server`

| Clave | Tipo | Defecto | Funcion |
| --- | --- | --- | --- |
| `server.name` | string | `""` | Nombre visible del servidor en snapshots y embeds |

## `discord`

| Clave | Tipo | Defecto | Funcion |
| --- | --- | --- | --- |
| `bot-token` | string | placeholder | Token del bot si no se usa propiedad JVM |
| `log-channel-id` | string | ejemplo | Canal donde se publican solicitudes |
| `admin-role-id` | string | ejemplo | Rol requerido para moderar en Discord |
| `require-admin-role` | boolean | `true` | Exige el rol configurado |
| `thumbnail-url-template` | string | `https://mc-heads.net/avatar/%uuid%/128` | Miniatura del jugador |
| `audit-webhook-url` | string | `""` | Webhook opcional para auditoria |
| `audit-webhook-username` | string | `InvRestore Audit` | Nombre del webhook |
| `audit-webhook-avatar-url` | string | `""` | Avatar del webhook |

Variables soportadas en `thumbnail-url-template`:

- `%uuid%`
- `%player%`

## `notifications`

| Clave | Tipo | Defecto | Funcion |
| --- | --- | --- | --- |
| `notify-target-player` | boolean | `true` | Notifica al jugador cuando cambia el estado de su caso |

## `requests`

| Clave | Tipo | Defecto | Funcion |
| --- | --- | --- | --- |
| `quick-reasons` | lista | ver config | Motivos rapidos mostrados al staff |
| `staff-request-cooldown-seconds` | int | `10` | Cooldown entre solicitudes del staff |
| `max-pending-per-player` | int | `3` | Limite de solicitudes activas por jugador |
| `timeout-minutes` | int | `0` | Si es mayor que 0, expira solicitudes pendientes |

## `protections`

| Clave | Tipo | Defecto | Funcion |
| --- | --- | --- | --- |
| `require-empty-sections-before-restore` | boolean | `false` | Exige secciones vacias antes del restore |
| `create-backup-before-restore` | boolean | `true` | Crea backup antes de restaurar |

## `storage`

| Clave | Tipo | Defecto | Funcion |
| --- | --- | --- | --- |
| `max-snapshots-per-player` | int | `100` | Maximo de snapshots por jugador |
| `max-snapshot-age-days` | int | `45` | Retencion maxima por antiguedad |
| `enable-save-filters` | boolean | `false` | Activa filtros de guardado |
| `blocked-worlds` | lista | `[]` | Mundos donde no se guardan muertes |
| `blocked-gamemodes` | lista | `[]` | GameModes excluidos del guardado |

## Configuraciones recomendadas

### Survival general

```yaml
requests:
  staff-request-cooldown-seconds: 10
  max-pending-per-player: 3
  timeout-minutes: 30

protections:
  require-empty-sections-before-restore: false
  create-backup-before-restore: true
```

### Entorno estricto

```yaml
protections:
  require-empty-sections-before-restore: true
  create-backup-before-restore: true
```

### Network con mundos irrelevantes

```yaml
storage:
  enable-save-filters: true
  blocked-worlds:
    - "lobby"
  blocked-gamemodes:
    - "creative"
    - "spectator"
```

## Buenas practicas

- no expongas el token del bot
- usa `server.name` si tienes mas de un nodo
- mantén backups activados en produccion
- filtra mundos sin valor administrativo
