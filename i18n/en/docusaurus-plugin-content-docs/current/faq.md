# FAQ, support, and maintenance

## Troubleshooting

| Problem | Probable cause | Recommended solution |
| --- | --- | --- |
| The plugin loads, but does not send requests to Discord | Missing token, active placeholder, or wrong channel | Configure a real token, validate `discord.log-channel-id`, and restart |
| Discord says a role is missing | `discord.admin-role-ids` is wrong or the user does not have that role | Check role IDs and moderator permissions in Discord |
| The rollback was approved, but not applied immediately | The player was offline | The snapshot remains `QUEUED` and is delivered on the next login |
| The rollback cannot be applied | `require-empty-sections-before-restore` blocks the operation | Empty the target sections or disable the protection |
| No saved deaths appear | There were no items, or the world/gamemode is filtered | Check `storage.filters` and run a controlled test |
| Audit export does not work | There is no data or `exports/` cannot be created | Ensure write permissions and verify that audited events exist |
| The player does not appear when searched | The player is offline and has no previous stored snapshots | Use the exact name or confirm that recorded deaths exist |
| The request disappeared from pending state | Timeout is enabled | Check `requests.timeout-minutes` |
| Console shows a database error | Invalid `MySQL` credentials or inaccessible SQLite path | Verify configuration and disk permissions |

## Recommended diagnostic flow

1. Confirm `Java 21`.
2. Confirm `Paper` version.
3. Check `config.yml`.
4. Verify Discord bot status.
5. Use `/invrollback info <player>` to see if snapshots exist.
6. Use `/invrollback logs <player>` to review audited history.
7. If using `MySQL`, test external connectivity to the database.
8. If you changed the token or other critical parameters, fully restart the server.

## Professional FAQ for buyers and administrators

### Does the plugin require Discord to work

Not necessarily for storing deaths, inspecting them, or checking history.

For the premium remote approval and denial flow, yes. That part depends on the Discord bot.

### Does it support partial restores

Yes. The current implementation supports:

- full
- inventory
- armor
- offhand
- experience
- Ender Chest

### Can it restore an offline player

It does not apply the inventory directly to a disconnected player. In that case it leaves the restore queued and automatically delivers it when the player joins.

### Does it create a backup before restoring

Yes, if `protections.create-backup-before-restore` is enabled. The backup is stored as an extra snapshot with the `BACKUP` category.

### Can it avoid overwriting current inventories

Yes. Enable `protections.require-empty-sections-before-restore`.

### Does it have PlaceholderAPI

No public PlaceholderAPI support was detected in this version.

### Does it use SQLite or MySQL

Both. `SQLite` is ready to use by default and `MySQL` is intended for more serious production environments.

### Does it store combat logout snapshots

Yes, if the corresponding option is enabled and the disconnect happens inside the configured combat window.

### Does it have exportable audit logs

Yes. It can export in `yml` or `json`.

### Does it have menus configurable through separate files

No separate menu file was detected. Menu texts are edited through `lang/es.yml` and `lang/en.yml`.

## What to send when requesting support

To get a high-quality answer faster, the user should send:

- plugin version
- exact Paper version
- Java version
- database type in use
- relevant `config.yml` fragment
- full console error
- affected player name
- `death_id` if available
- whether the player was online or offline when approved
- screenshot of the Discord message if applicable
- exact reproduction steps

## Support

### Channels

- Support Discord: `[TO BE FILLED]`
- Website: `[TO BE FILLED]`
- Email or form: `[TO BE FILLED]`
- Bug report: `[TO BE FILLED]`
- Feature suggestions: `[TO BE FILLED]`

### Operational recommendation

Before opening a ticket:

1. reproduce the case once more in a controlled environment
2. confirm whether the issue is Discord, database, or permissions
3. try exporting the audit or reviewing the player's logs
