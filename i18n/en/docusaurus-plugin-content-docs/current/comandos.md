# Commands

NovaRestore centralizes almost all operation in the base command `invrollback`, with alias `invrestore`.

## General summary

| Command | Description | Usage | Permission | Alias | Console |
| --- | --- | --- | --- | --- | --- |
| `/invrollback &lt;player&gt; [page] [filter] [search]` | Opens the player's death GUI | `/invrollback Steve 1 open` | `rollback.view` | `/invrestore` | No |
| `/invrollback reload` | Reloads configuration and attempts to reconnect services | `/invrollback reload` | `rollback.reload` | `/invrestore reload` | Yes |
| `/invrollback cancel &lt;ID&gt; &lt;reason&gt;` | Cancels a pending or queued request | `/invrollback cancel 1711412345678 reason` | `rollback.manage.cancel` | `/invrestore cancel` | Yes |
| `/invrollback reopen &lt;ID&gt;` | Reopens a denied request | `/invrollback reopen 1711412345678` | `rollback.manage.reopen` | `/invrestore reopen` | Yes |
| `/invrollback unlock &lt;ID&gt;` | Unlocks a restored death to allow a new request | `/invrollback unlock 1711412345678` | `rollback.manage.unlock` | `/invrestore unlock` | Yes |
| `/invrollback info &lt;player&gt;` | Shows a statistical summary for the player | `/invrollback info Steve` | `rollback.info` | `/invrestore info` | Yes |
| `/invrollback stats &lt;player&gt;` | Functional alias of `info` | `/invrollback stats Steve` | `rollback.info` | `/invrestore stats` | Yes |
| `/invrollback history &lt;player&gt; [filter] [search]` | Shows summarized death history | `/invrollback history Steve restored` | `rollback.info` | `/invrestore history` | Yes |
| `/invrollback logs &lt;player&gt;` | Shows the player's recent audit log | `/invrollback logs Steve` | `rollback.logs` | `/invrestore logs` | Yes |
| `/invrollback export &lt;yml\|json&gt; [player]` | Exports global or player-specific audit data | `/invrollback export json Steve` | `rollback.export` | `/invrestore export` | Yes |

## Available filters

Supported command and GUI filters are:

| Filter | Description |
| --- | --- |
| `all` | All deaths |
| `open` | Open snapshots |
| `pending` | Pending requests |
| `queued` | Approved restorations waiting in queue |
| `restored` | Applied restorations |
| `denied` | Denied requests |

## Special command behavior

### `/invrollback &lt;player&gt; [page] [filter] [search]`

- Can only be opened by a player inside the server.
- Loads up to `45` snapshots per page.
- Search can match:
  - player name
  - `death_id`
  - date
  - world
  - coordinates
  - category
  - reason
  - state

Examples:

```text
/invrollback Steve
/invrollback Steve 2
/invrollback Steve 1 pending
/invrollback Steve 1 all nether
/invrollback Steve 1 restored 2026-03
```

### `/invrollback reload`

Reloads:

- `config.yml`
- active language
- database connection

It also attempts to restart the bot only if needed. If the token changed during reload, the code itself warns that a full server restart is the safest path.

### `/invrollback cancel &lt;ID&gt; &lt;reason&gt;`

- Requires a mandatory reason.
- Only works on `PENDING` or `QUEUED` snapshots.
- Reopens the snapshot to `OPEN`.
- Updates Discord and audit records.

Example:

```text
/invrollback cancel 1711412345678 Ticket closed due to insufficient evidence
```

### `/invrollback reopen &lt;ID&gt;`

- Only works on `DENIED` snapshots.
- Returns the snapshot to `OPEN`.
- Allows it to be requested again.

### `/invrollback unlock &lt;ID&gt;`

- Only works on `RESTORED` snapshots.
- Removes the operational lock and allows a new request.
- Must be used very carefully.

### `/invrollback info &lt;player&gt;` and `/invrollback stats &lt;player&gt;`

They show:

- total deaths
- open
- pending
- queued
- restored
- denied
- audited requests
- audited restores
- denial rate
- date of last death

### `/invrollback history &lt;player&gt; [filter] [search]`

- Returns up to `12` entries.
- Useful for quick chat review without opening the GUI.

Examples:

```text
/invrollback history Steve
/invrollback history Steve open
/invrollback history Steve all pvp
```

### `/invrollback logs &lt;player&gt;`

- Returns up to `12` recent audited events.
- Shows actor, current status, and server.

### `/invrollback export &lt;yml\|json&gt; [player]`

- If you do not specify a player, it exports the full audit.
- If you specify a player, it exports only that player's history.
- Files are saved in `plugins/NovaRestore/exports/`.

Examples:

```text
/invrollback export yml
/invrollback export json
/invrollback export yml Steve
/invrollback export json Steve
```

## Operational flow from the GUI

### Main menu

From `/invrollback &lt;player&gt;`, staff can:

- change page
- rotate filters
- see total and visible count
- open a specific snapshot

### Inspection menu

When opening a snapshot, these actions are available:

| Action | Description |
| --- | --- |
| Back | Returns to the previous list |
| View details | Date, status, category, server, and location |
| Quick history | Requester, reason, last action, note, and applied restore type |
| Teleport | Takes staff to the recorded death location |
| Show ID | Sends the `death_id` to chat |
| Request rollback | Starts the chat reason prompt and then sends to Discord |

## Request flow

1. Staff opens the death from the GUI.
2. Clicks `Request rollback`.
3. The plugin closes the inventory and asks for a reason in chat.
4. Staff writes free text or the number of a quick reason.
5. The plugin sends the request to Discord.

Default quick reasons:

- `bug`
- `lag`
- `pvp`
- `error-admin`
- `desync`

The prompt can also be cancelled by typing `cancelar` or `cancel`.

## Discord flow

When the request reaches Discord:

- an embed is created with case data
- a visual inventory preview is attached if it could be generated
- a selector appears with valid restoration types and a deny option

If the moderator approves:

- with player online: rollback is applied immediately
- with player offline: it becomes `QUEUED` and is delivered on next login

If the moderator denies:

- the snapshot becomes `DENIED`
- the player can be notified if notifications are enabled

## Practical examples ready to copy

### Case 1: survival death caused by lag

```text
/invrollback Steve
/invrollback info Steve
```

Suggested process:

1. open the death
2. review items and location
3. request rollback with reason `lag`
4. approve in Discord

### Case 2: player offline at approval time

No special command is required. The normal flow is:

1. request sent
2. approval in Discord
3. snapshot marked `QUEUED`
4. automatic restoration on next login

### Case 3: appeal after denial

```text
/invrollback reopen 1711412345678
```

### Case 4: free a restored death for a new review

```text
/invrollback unlock 1711412345678
```

### Case 5: audit for internal review

```text
/invrollback logs Steve
/invrollback export json Steve
```

## Usage suggestions by server type

| Server type | Recommended use |
| --- | --- |
| Survival | Review deaths caused by lag, bugs, or administrative mistakes |
| PvP / factions | Investigate disputes and combat disconnects |
| Skyblock | Review void losses or movement failures `[specific environment validation pending]` |
| Prison / RPG | Maintain serious audit trails of staff restores |

## Autocomplete

The command includes tab completion for:

- available subcommands based on permissions
- known players
- pending, denied, or restored `death_id`s
- `yml` and `json` formats
- supported filters

The permission reference is in [Permissions.md](permisos.md).
