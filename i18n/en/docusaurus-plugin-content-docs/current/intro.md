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
| Support Discord | `[TO BE FILLED]` |

## Wiki map

This documentation was condensed into six pages so it is easy to maintain and publish on GitHub:

| Page | Content |
| --- | --- |
| [Introduction](/) | General presentation, benefits, compatibility, navigation map, and commercial positioning |
| [instalacion.md](instalacion.md) | Requirements, deployment, first startup, generated files, and common startup issues |
| [configuracion.md](configuracion.md) | `config.yml`, languages, integrations, placeholders, database, internal system, and optimization |
| [comandos.md](comandos.md) | Commands, GUI, filters, practical examples, and operational flow |
| [permisos.md](permisos.md) | Full permissions, suggested staff profiles, and LuckPerms examples |
| [faq.md](faq.md) | Troubleshooting, FAQ, support, license, and changelog template |

## What NovaRestore does

NovaRestore solves a very specific problem for serious servers: recovering lost inventories without turning the process into something improvised, opaque, or unsafe.

Instead of relying on manual restorations, incomplete evidence, or rushed decisions, the plugin records every death with useful support data:

- main inventory
- armor
- offhand
- Ender Chest
- experience
- server and location
- exact date
- visible death reason
- statistical summary of valuable items

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

- death ID
- date
- world
- coordinates
- reason
- status
- category

### 4. Real inspection view

The inspection screen is not just a text list. It shows the lost inventory, armor, offhand, current status, quick history, location, and direct actions such as teleport or rollback request.

### 5. Discord approval flow

The request starts in Minecraft, but approval or denial is handled in Discord. The plugin generates an embed with case information and a visual inventory preview so review is much faster.

In addition to the general options, the embed includes the `Others` menu, designed for fine restorations when staff do not want to restore an entire section.

### 6. Partial or full restorations

Depending on the snapshot, Discord can approve:

- full restore
- inventory only
- armor only
- offhand only
- experience only
- Ender Chest only
- one or several specific tools or armor pieces through `Others`

If a section does not exist in that snapshot, the option simply does not appear.

Inside `Others`, staff can select one or several options in the same approval, for example:

- sword
- pickaxe
- axe
- shovel
- helmet
- chestplate
- leggings
- boots
- offhand

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

- request
- queued approval
- applied restore
- automatic delivery
- denial
- cancellation
- reopening
- unlock
- timeout expiration

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

- survival servers with economy and active staff
- PvP or factions servers with frequent disputes
- game modes where deaths caused by bugs, lag, or admin mistakes must be reviewed with evidence
- networks with multiple staff members that need traceability
- premium projects that want serious support instead of improvised handling

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

- Discord: [NovaStudios](https://discord.gg/zeSHUQXPuz)

## Short marketplace text

> NovaRestore professionalizes inventory rollback on Paper. It stores every death with real context, lets staff review it through a clear GUI, sends requests with Discord approval, supports full, partial, or item-specific restorations, and keeps exportable audit logs for serious staff teams. Ideal for servers that want premium support, operational control, and player trust.
