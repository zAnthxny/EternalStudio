---
slug: /
title: Introduction
---

# NovaRestore

NovaRestore is a professional Paper plugin that stores death snapshots, lets staff review them through a clear GUI, and manages restorations through Discord approval to keep control, traceability, and operational safety.

## Quick overview

| Data | Value |
| --- | --- |
| Plugin | `NovaRestore` |
| Documented version | `1.1.0` |
| Author | `zAnthxny_` |
| Category | Administration, inventory rollback, audit |
| Target Minecraft | `Paper 1.21.4 - 1.21.11` |
| Declared API | `1.21` |
| Required Java | `21` |
| Database | `SQLite` or `MySQL` |
| External plugin dependencies | None |
| Main integration | Discord through JDA bot |
| Included languages | `es`, `en` |
| Support Discord | [NovaStudios](https://discord.gg/k67f2k6hkR) |

## Wiki map

| Page | Content |
| --- | --- |
| [Introduction](/) | General presentation, benefits, compatibility, navigation map, and commercial positioning |
| [Instalation](instalacion.md) | Requirements, deployment, first startup, generated files, and common startup issues |
| [Configuration](configuracion.md) | `config.yml`, languages, integrations, placeholders, database, internal system, and optimization |
| [Commands](comandos.md) | Commands, GUI, filters, practical examples, and operational flow |
| [Permissions](permisos.md) | Full permissions, suggested staff profiles, and LuckPerms examples |
| [FAQ](faq.md) | Troubleshooting, FAQ, support, license, and changelog template |

## What NovaRestore does

NovaRestore solves a very specific problem for serious servers: recovering lost inventories without turning the process into something improvised, opaque, or unsafe.

Instead of relying on manual restorations, incomplete evidence, or rushed decisions, the plugin records every death with useful support data:

- Main inventory
- Armor
- Offhand
- Ender Chest
- Experience
- Server and location
- Exact date
- Visible death reason
- Statistical summary of valuable items

With that record, staff can inspect the loss, request approval through Discord, and apply a full, partial, or more precise restoration depending on the case.

## Problems it solves

- Reduces impulsive restorations without context.
- Provides clear evidence for tickets, appeals, and internal reviews.
- Prevents duplicate restorations through consumed snapshot locking.
- Allows remote approval from Discord without forcing the reviewer to be inside the server.
- Maintains traceability with exportable audit logs in `yml` or `json`.
- Supports small servers with `SQLite` and serious networks with `MySQL`.

## Main features

### 1. Automatic death capture

Each `PlayerDeathEvent` can create a complete player snapshot. If there are no useful items or contents to save, the plugin avoids creating unnecessary noise.

### 2. Combat logout safety snapshot

If `protections.save-combat-logout-snapshots` is enabled, the plugin detects recent combat activity and stores an extra snapshot if the player leaves or gets kicked within the configured combat window.

### 3. Staff browsing GUI

Staff can open a paginated GUI with status filters and search by:

- Death ID
- Date
- World
- Coordinates
- Reason
- Status
- Category

### 4. Real inspection view

The inspection screen is not just a text list. It shows the lost inventory, armor, offhand, current status, quick history, location, and direct actions such as teleport or rollback request.

### 5. Discord approval flow

The request starts in Minecraft, but approval or denial is handled in Discord. The plugin generates an embed with case information and a visual inventory preview so review is much faster.

In addition to the general options, the embed includes the `Others` menu, designed for fine restorations when staff do not want to restore an entire section.

### 6. Partial or full restorations

Depending on the snapshot, Discord can approve:

- Full restore
- Inventory only
- Armor only
- Offhand only
- Experience only
- Ender Chest only
- One or several specific tools or armor pieces through `Others`

If a section does not exist in that snapshot, the option simply does not appear.

Inside `Others`, staff can select one or several options in the same approval, for example:

- Sword
- Pickaxe
- Axe
- Shovel
- Helmet
- Chestplate
- Leggings
- Boots
- Offhand

That allows much more surgical returns, such as restoring only a sword and a pickaxe, or a chestplate together with the offhand, without restoring the entire inventory or full armor set.

### 7. Queue for offline players

If a rollback is approved while the player is offline, the plugin places it in `QUEUED` status and automatically delivers it on the next login.

### 8. Operational protections

The system includes several security layers:

- automatic backup before restore
- option to require target sections to be empty
- restored snapshot locking
- manual reopening of denied requests
- manual unlock of restored snapshots if staff decides to allow another restore

### 9. Real audit trail

Every important action can be recorded:

- Eequest
- Queued approval
- Applied restore
- Automatic delivery
- Denial
- Cancellation
- Reopening
- Unlock
- Timeout expiration

The audit log can also be exported through command.

## Verified compatibility and scope

| Element | Status |
| --- | --- |
| Paper 1.21.4 - 1.21.11 | Verified by project README |
| Paper API 1.21 | Declared in `plugin.yml` |
| Java 21 | Required by `pom.xml` |
| SQLite | Supported natively |
| MySQL | Supported natively |
| Discord bot | Supported natively |
| PlaceholderAPI | No public support verified |
| Vault | Not detected |
| Citizens | Not detected |
| DecentHolograms | Not detected |
| Folia | Pending confirmation |
| Spigot/Purpur/Pufferfish | Pending official validation |

## What kind of server it fits

NovaRestore fits especially well in:

- Survival servers with economy and active staff
- PvP or factions servers with frequent disputes
- Game modes where deaths caused by bugs, lag, or admin mistakes must be reviewed with evidence
- Networks with multiple staff members that need traceability
- Premium projects that want serious support instead of improvised handling

## Quick use cases

| Scenario | How NovaRestore helps |
| --- | --- |
| Survival death caused by lag | Staff reviews the loss, requests rollback, and approves it with evidence |
| Player disconnects after PvP | A safety snapshot is stored because of recent combat |
| Player offline when approved | The restoration is queued and delivered on next join |
| Very specific partial return | Discord allows approving several tools or pieces in one action |
| Internal staff audit | Logs are reviewed and exported to file |
| Large server with heavy activity | `MySQL` is used with controlled retention and prepared indexes |

## Why it stands out as a premium product

- It does not rely on clumsy commands or blind restorations.
- It provides a full flow from capture to final audit.
- It has a strong Discord presentation thanks to embeds and visual previews.
- It allows fine-grained Discord restorations with multi-selection of specific tools and armor pieces.
- It controls risks with backup, locking, and validations.
- It adapts to both small servers and more demanding networks.

### Support

- Discord: [NovaStudios](https://discord.gg/k67f2k6hkR)

## NOTE:

> NovaRestore professionalizes inventory rollback on Paper. It stores every death with real context, lets staff review it through a clear GUI, sends requests with Discord approval, supports full, partial, or item-specific restorations, and keeps exportable audit logs for serious staff teams. Ideal for servers that want premium support, operational control, and player trust.

- It is recommended to use it first on a test server (TestServer) for plugin configuration.
