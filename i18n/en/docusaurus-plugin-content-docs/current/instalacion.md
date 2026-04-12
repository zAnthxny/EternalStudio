# Installation

This page covers installation from scratch, first plugin startup, and the most common startup issues.

## Prerequisites

| Requirement | Needed | Detail |
| --- | --- | --- |
| Java | Yes | `Java 21` |
| Server | Yes | `Paper 1.21.4 - 1.21.11` |
| Disk access | Yes | The plugin needs to write configuration, languages, database, and exports |
| Discord bot | Recommended | Required for the approval flow through Discord |
| MySQL | Optional | Only if you will use `database.type: MYSQL` |
| Other plugins | No | No mandatory external plugin dependencies were detected |

## Exact compatibility

| Element | Status |
| --- | --- |
| `Paper 1.21.4 - 1.21.11` | Project target |
| `api-version: 1.21` | Declared |
| `SQLite` | Integrated |
| `MySQL` | Integrated |
| `Discord / JDA` | Integrated |
| `PlaceholderAPI` | Not required |
| `Vault` | Not required |
| `Folia` | Pending confirmation |

## Required and optional dependencies

### Required

- A compatible `Paper` server.
- `Java 21`.
- The plugin `.jar` file.

### Optional

- A Discord bot with access to the channel where requests will be approved.
- A `MySQL` server if you do not want to use `SQLite`.
- A Discord webhook if you want to duplicate audit logs outside the main channel.

## Installation from scratch

### Option A: normal production installation

1. Stop the server.
2. Copy the `NovaRestore` `.jar` into the `plugins/` folder.
3. Start the server so the plugin can generate its files.
4. Stop the server again.
5. Edit `plugins/NovaRestore/config.yml`.
6. If you will use Discord, configure:
   - `discord.log-channel-id`
   - `discord.admin-role-ids`
   - keep `discord.bot-token` as a placeholder or documentation, without placing the real token there
7. Define the real token in the server startup using `-Ddiscord.token=YOUR_TOKEN`
8. Start the server again.
9. Verify that no database or Discord errors appear in console.

### Loading the bot token in the server

NovaRestore is designed for production. The real bot token should not be stored in `plugins/NovaRestore/config.yml`.

Recommended operational policy:

- `discord.bot-token` should remain as a placeholder or visual note.
- The real token should be loaded at server startup using the JVM property `discord.token`.
- The argument must be placed before `-jar`.
- Only infrastructure or deployment staff should have access to the script or panel where this startup is defined.

Example on `Linux` with `start.sh`:

```bash
#!/bin/bash
cd /opt/minecraft/survival
java -Xms4G -Xmx4G "-Ddiscord.token=YOUR_REAL_TOKEN" -jar paper-1.21.11.jar nogui
```

Example on `Windows` with `start.bat`:

```bat
@echo off
cd /d "C:\Minecraft\Survival"
java -Xms4G -Xmx4G "-Ddiscord.token=YOUR_REAL_TOKEN" -jar "paper-1.21.11.jar" nogui
pause
```

If your Paper `.jar` has a different name, use the exact filename. For example:

- `paper-1.21.11-123.jar`
- `server.jar`
- `paperclip.jar`

Before editing the script, confirm the real server file name:

On `Linux`:

```bash
ls *.jar
```

On `Windows PowerShell`:

```powershell
Get-ChildItem *.jar
```

If you use a hosting panel, the rule is the same:

- add `-Ddiscord.token=YOUR_REAL_TOKEN` to the server startup command
- place it before `-jar`
- do not paste the token into `config.yml`

Expected NovaRestore behavior:

- if `discord.token` is valid, the bot will try to connect on startup
- if it is missing or invalid, the plugin will load in degraded mode and clearly warn in console
- if it detects a real token inside `config.yml`, it will show a security warning and will not use it as a fallback

Quick production checklist:

- the bot is already invited to the correct Discord server
- `discord.log-channel-id` points to the correct channel
- `discord.admin-role-ids` contains the correct roles
- the token is defined in the startup script or hosting panel
- `discord.bot-token` does not contain the real secret

### Option B: build from this repository

Build command:

```powershell
.\mvnw.cmd -DskipTests package
```

Artifacts observed in this project:

| File | Expected use |
| --- | --- |
| `target/NovaRestore-dev-1.1.0.jar` | Development build |
| `target/NovaRestore.jar` | Final release/obfuscation output in this project |

If you plan to distribute a commercial build, confirm the final public artifact name before publishing the wiki on marketplaces.

## First startup

On first startup, the plugin:

- loads `config.yml`
- initializes the language system
- opens the selected database
- creates required tables if they do not exist
- registers listeners and commands
- tries to connect the Discord bot
- activates the timeout monitor for pending requests

If the Discord token is not configured or still uses the placeholder, the plugin may still load, but the request flow to Discord will not work.

## Generated files and folders

Expected location on a server:

```text
plugins/
  NovaRestore/
    config.yml
    lang/
      es.yml
      en.yml
    database/
      invrestore.db
    exports/
```

Important notes:

- `lang/es.yml` and `lang/en.yml` are generated on first load.
- `database/invrestore.db` is created when you use `SQLite`.
- `exports/` is created the first time you export audits.
- If you switch to `MySQL`, the SQLite file may remain as a local historical backup.

## What each file does

| File or folder | Function |
| --- | --- |
| `config.yml` | Main plugin configuration |
| `lang/es.yml` | Editable Spanish messages |
| `lang/en.yml` | Editable English messages |
| `database/invrestore.db` | Local database when using SQLite |
| `exports/` | Audit exports in `yml` or `json` |

## Recommended quick start

### Small or medium server

Use `SQLite` if:

- the server is a single instance
- death volume is not extreme
- you want fast setup
- you prefer simple administration

### Large server or network

Use `MySQL` if:

- you have several busy worlds
- staff frequently checks history and audits
- you want more stable backups and monitoring
- you prefer separating data from the local game server disk

## Minimal installation checklist

- `Java 21` confirmed
- `Paper 1.21.x` confirmed
- jar placed in `plugins/`
- `config.yml` generated
- language selected
- database configured
- Discord token configured if you will use approvals
- `log-channel-id` correct
- one or more correct `admin-role-ids`

## Common installation issues

### The plugin loads, but Discord does not work

Common cause:

- the token is still `TOKEN_EN_STARTUP_ARGUMENTS`
- the configured channel does not exist
- the bot is not in the Discord server

Solution:

1. configure the real token
2. check `discord.log-channel-id`
3. confirm bot permissions in the channel
4. restart the server

### Console shows a database error

Common causes:

- invalid `MySQL` credentials
- wrong host or port
- SQLite folder without write permissions

Solution:

1. check `database.type`
2. validate host, port, database, user, and password
3. confirm that the server can write to `plugins/NovaRestore/`

### The plugin does not generate snapshots

Possible causes:

- the player died without useful items or contents to save
- saving is filtered by world or gamemode
- the event occurs in an unvalidated environment

Solution:

1. check `storage.filters.enabled`
2. validate `blocked-worlds` and `blocked-gamemodes`
3. run a controlled test with items in inventory

### The plugin loads, but requests fail

Common causes:

- bot not connected
- channel not found
- the snapshot is already pending or restored

Solution:

1. use `/invrollback info <player>`
2. open the GUI and confirm the snapshot state
3. review plugin messages in console

## Recommendations before going to production

- Run a full test of death, request, approval, and restoration.
- Also validate approval when the player is offline.
- Export the audit once to confirm write permissions.
- Back up `config.yml`, `lang/`, and the database before major changes.

The full configuration reference is in [Configuracion](configuracion.md).
