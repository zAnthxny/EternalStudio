# Configuration

This page documents configurable files, the plugin's internal system, integrations, database, placeholders, and optimization recommendations.

## Configuration files

| File | Type | Description |
| --- | --- | --- |
| `plugins/NovaRestore/config.yml` | Required | Main plugin configuration |
| `plugins/NovaRestore/lang/es.yml` | Editable | Spanish messages |
| `plugins/NovaRestore/lang/en.yml` | Editable | English messages |

## Default `config.yml`

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

## Full explanation of `config.yml`

### General language

| Path | Default | Description | Note |
| --- | --- | --- | --- |
| `lang` | `es` | Global plugin language | Only `es` and `en` are supported by the code; invalid values fall back to `es` |

### Server identity

| Path | Default | Description | Recommendation |
| --- | --- | --- | --- |
| `server.name` | `Survival-01` | Visible name in snapshots, audits, and Discord embeds | Use the real name of your mode or node |

If this value is left empty, the plugin tries to use the server name reported by Bukkit.

### Database

| Path | Default | Description |
| --- | --- | --- |
| `database.type` | `SQLITE` | Storage engine. Supported values: `SQLITE`, `MYSQL` |
| `database.table-prefix` | `invrestore_` | Table prefix |
| `database.sqlite.file` | `database/invrestore.db` | Relative path to the SQLite file |
| `database.mysql.host` | `127.0.0.1` | MySQL host |
| `database.mysql.port` | `3306` | MySQL port |
| `database.mysql.database` | `invrestore` | Database name |
| `database.mysql.username` | `root` | User |
| `database.mysql.password` | `change-me` | Password |
| `database.mysql.parameters` | `useSSL=false&characterEncoding=utf8&autoReconnect=true` | Extra JDBC parameters |
| `database.mysql.pool.maximum-pool-size` | `10` | Max pool size |
| `database.mysql.pool.minimum-idle` | `2` | Minimum idle connections |
| `database.mysql.pool.connection-timeout-ms` | `10000` | Connection timeout |
| `database.mysql.pool.maximum-lifetime-ms` | `1800000` | Maximum connection lifetime |
| `database.mysql.pool.keepalive-time-ms` | `0` | Optional keepalive |

Technical notes:

- If `table-prefix` is empty, the plugin falls back to `invrestore_`.
- In `SQLite`, the pool is internally reduced to a single active connection.
- In `MySQL`, the plugin uses HikariCP.

### Discord

| Path | Default | Description |
| --- | --- | --- |
| `discord.bot-token` | `TOKEN_EN_STARTUP_ARGUMENTS` | Marker or documentation. Do not place the real token here; use `-Ddiscord.token=YOUR_TOKEN` at server startup |
| `discord.log-channel-id` | `123456789012345678` | Channel where rollback requests will be sent |
| `discord.admin-role-ids` | list | Role IDs authorized to approve or deny |
| `discord.thumbnail-url-template` | `https://mc-heads.net/avatar/%uuid%/128` | Player thumbnail URL |
| `discord.audit-webhook-url` | empty | Optional webhook to duplicate audit logs |
| `discord.audit-webhook-username` | `NovaRestore Audit` | Webhook name |
| `discord.audit-webhook-avatar-url` | empty | Webhook avatar |

Production security rule:

- do not store the real bot token in `config.yml`
- define the token at server startup with `-Ddiscord.token=YOUR_TOKEN`
- check [Instalation.md](instalacion.md) for `start.sh`, `start.bat`, and hosting deployment examples

Options supported by code even if they do not appear in the default file:

| Extra path | Effective default | Use |
| --- | --- | --- |
| `discord.require-admin-role` | `true` | If set to `false`, the plugin does not require a Discord role for handling actions |
| `discord.admin-role-id` | empty | Legacy path supported for a single ID |
| `bot-token` | empty | Legacy compatibility path |
| `log-channel-id` | empty | Legacy compatibility path |
| `admin-role-id` | empty | Legacy compatibility path |

### Player notifications

| Path | Default | Description |
| --- | --- | --- |
| `notifications.notify-target-player` | `true` | Notifies the player when their request changes status |

### Requests

| Path | Default | Description |
| --- | --- | --- |
| `requests.quick-reasons` | `bug, lag, pvp, error-admin, desync` | Quick reasons for chat prompts |
| `requests.staff-request-cooldown-seconds` | `10` | Cooldown per staff member between requests |
| `requests.max-pending-per-player` | `3` | Maximum active requests per player |
| `requests.timeout-minutes` | `0` | Minutes before automatically expiring a pending request. `0` disables it |

Technical notes:

- The effective minimum for `max-pending-per-player` is `1`.
- If timeout is enabled, the plugin reopens the snapshot and marks the Discord message as expired.

### Protections

| Path | Default | Description |
| --- | --- | --- |
| `protections.require-empty-sections-before-restore` | `false` | Requires inventory, armor, offhand, XP, or Ender Chest to be empty before restoring |
| `protections.create-backup-before-restore` | `true` | Creates a backup snapshot before applying a restoration |
| `protections.save-combat-logout-snapshots` | `true` | Saves a safety snapshot if a player leaves shortly after entering combat |
| `protections.combat-logout-window-seconds` | `15` | Combat window used for logout snapshots |

### Retention

| Path | Default | Description |
| --- | --- | --- |
| `storage.retention.max-snapshots-per-player` | `100` | Maximum number of snapshots per player |
| `storage.retention.max-snapshot-age-days` | `45` | Maximum age in days |

The plugin automatically removes:

- snapshots older than the day limit
- snapshots exceeding the max per player

### Save filters

| Path | Default | Description |
| --- | --- | --- |
| `storage.filters.enabled` | `false` | Enables world and gamemode filters |
| `storage.filters.blocked-worlds` | `[]` | Excluded worlds |
| `storage.filters.blocked-gamemodes` | `[]` | Excluded gamemodes |

## Recommended configurations by server type

### Profile 1: small or medium server

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

### Profile 2: large server or network

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

### Profile 3: strict restore policy

```yml
protections:
  require-empty-sections-before-restore: true
  create-backup-before-restore: true
  save-combat-logout-snapshots: true
  combat-logout-window-seconds: 15
```

### Profile 4: exclusions by world or gamemode

```yml
storage:
  filters:
    enabled: true
    blocked-worlds:
      - "lobby"
      - "events"
    blocked-gamemodes:
      - "creative"
      - "spectator"
```

## Database configuration

### SQLite

Advantages:

- simple
- local
- no extra services

Recommended use:

- single-instance servers
- staging
- small or medium projects

Example:

```yml
database:
  type: "SQLITE"
  table-prefix: "invrestore_"
  sqlite:
    file: "database/invrestore.db"
```

### MySQL

Advantages:

- better for high volume
- easier to back up and monitor externally
- better option for networks or professional infrastructure

Example:

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

## Main tables

With the default prefix, the plugin creates:

| Table | Function |
| --- | --- |
| `invrestore_snapshots` | Death snapshots and backups |
| `invrestore_audit_log` | Action audit trail |

### Important snapshot data

- player and UUID
- `death_id`
- date and timestamp
- category `DEATH` or `BACKUP`
- reason and message
- location and server
- serialized inventory, armor, offhand, Ender Chest, and XP
- state `OPEN`, `PENDING`, `QUEUED`, `RESTORED`, `DENIED`
- request info and Discord message
- last actor, last note, and restore type
- item stats: total items, enchanted items, totems, netherite, shulkers

### Important audit log data

- entry ID
- action
- actor
- affected player
- `death_id`
- snapshot date
- status
- note
- location
- server

## Messages and customization

### Language files

The plugin generates:

- `lang/es.yml`
- `lang/en.yml`

Main groups inside those files:

| Group | Content |
| --- | --- |
| `general` | Prefix, general texts, and confirmation word |
| `state` | Snapshot states |
| `filter` | Filter labels |
| `rollback` | Visible restore type names |
| `command` | Command, GUI, and inspection messages |
| `request_prompt` | Chat reason prompt flow |
| `result` | Discord, audit, death, and restore results |
| `notify` | Messages to the affected player |
| `discord` | Embeds, modal, listener, and visual preview |

### Supported color format

The current implementation uses `ChatColor.translateAlternateColorCodes('&', ...)`.

That means:

- native support for legacy `&` color codes
- no MiniMessage parser
- no dedicated HEX support in the current code

Valid example:

```yml
general:
  prefix: "&6[NovaRestore] &f"
```

### Recommended customization

- Adjust the `prefix` so it matches your brand.
- Change `server.name` so embeds show your actual mode.
- Review `request_prompt.quick-reasons` so staff uses your internal vocabulary.
- Customize `notify` texts if you want a more formal or more friendly tone.

## Placeholders

### Public PlaceholderAPI placeholders

No public PlaceholderAPI expansion or placeholders were detected in this plugin version.

### Supported internal variables

| Place | Verified variables | Use |
| --- | --- | --- |
| `discord.thumbnail-url-template` | `%uuid%`, `%player%` | Builds the player thumbnail |
| Language files | `%player%`, `%id%`, `%value%`, `%reason%`, `%filter%`, `%page%`, `%pages%`, `%type%`, `%message%`, `%word%`, `%server%`, `%location%`, `%error%` and others depending on the key | Internal plugin replacements |

Important:

- These variables are not public placeholders for scoreboards or external menus.
- They are internal replacements used by the plugin itself.

## Integrations

| Integration | Status | Detail |
| --- | --- | --- |
| Discord bot | Native | Handles approvals, denials, and restores from Discord |
| Discord audit webhook | Optional | Mirrors audited events outside the main channel |
| SQLite | Native | Local storage |
| MySQL | Native | Remote/production storage |
| PlaceholderAPI | Not verified | No public integration detected |
| Vault | Not detected | Not required |
| Citizens | Not detected | Not required |

## Internal system and behavior

### General snapshot flow

```text
Player death
  -> snapshot OPEN
  -> inspection from GUI
  -> request from Minecraft with chat reason
  -> Discord receives the case

From there:
  PENDING -> DENIED
  PENDING -> RESTORED
  PENDING -> QUEUED -> RESTORED on reconnect
  PENDING -> OPEN by cancellation
  PENDING -> OPEN by timeout
  DENIED -> OPEN by reopen
  RESTORED -> OPEN by unlock
```

### How a snapshot is created

The plugin captures:

- main inventory
- armor
- offhand
- Ender Chest
- experience
- date and timestamp
- location
- server
- visible death reason
- summary of relevant items

If there are no items or useful contents to save, the snapshot is not persisted.

### Snapshot types

| Category | How it is generated |
| --- | --- |
| `DEATH` | Normal death or combat logout snapshot |
| `BACKUP` | Automatic backup before restore, if enabled |

### Queued delivery

If the player is offline when a moderator approves a request in Discord:

- the snapshot becomes `QUEUED`
- it is recorded in audit
- the Discord message is updated
- the plugin tries to apply it on the next `PlayerJoinEvent`

### Internal GUI

The main GUI shows up to `45` snapshots per page and reserves the bottom row for navigation and actions.

The inspection GUI includes:

- lost inventory view
- separate armor
- offhand
- case data
- quick history
- teleport to the location
- show ID
- request rollback

## Production file structure

| Path | Description | Should be backed up |
| --- | --- | --- |
| `plugins/NovaRestore/config.yml` | Main configuration | Yes |
| `plugins/NovaRestore/lang/es.yml` | Translation/customization | Yes |
| `plugins/NovaRestore/lang/en.yml` | Alternative translation | Yes |
| `plugins/NovaRestore/database/invrestore.db` | SQLite database | Yes, if using SQLite |
| `plugins/NovaRestore/exports/` | Manual exports | Recommended |

## Performance and optimization

### Expected impact

Based on the current implementation, the plugin already includes several healthy design choices:

- asynchronous snapshot writes with a dedicated executor
- HikariCP pool for database access
- SQL indexes for common queries
- automatic retention to prevent unlimited growth

### Practical recommendations

- Use `MySQL` if staff query volume is high.
- Reduce `max-snapshots-per-player` if your server has a huge number of daily deaths.
- Enable world or gamemode filters if there are zones you do not care to record.
- Keep `create-backup-before-restore: true` in serious production use.
- Enable `require-empty-sections-before-restore` if you want to minimize accidental overwrites.

### What to avoid

- Leaving a placeholder token in a production environment.
- Using `SQLite` for a large network without retention control.
- Disabling all protections and then approving restores over occupied inventories.
- Changing many critical options and trusting only `/invrollback reload` when the Discord token also changed.

### Good operational practices

- Back up the database before major changes.
- Test a full flow in staging.
- Internally document who can approve in Discord and who can only request.
- Adjust `quick-reasons` to your actual staff language.

The operational command reference is in [Commands](comandos.md).
