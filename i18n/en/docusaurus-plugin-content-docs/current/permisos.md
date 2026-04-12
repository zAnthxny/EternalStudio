# Permissions

NovaRestore uses a clear permission set separated by responsibility. This makes it easier to create staff profiles without giving full access to everyone.

## Full permission table

| Permission | Exact description | Suggested profile |
| --- | --- | --- |
| `rollback.admin.all` | Full access. Includes all plugin permissions by inheritance | Main administrator |
| `rollback.view` | Allows opening the GUI and inspecting snapshots | Staff, support, moderation |
| `rollback.request` | Allows sending rollback requests to Discord from the GUI | Staff authorized to request |
| `rollback.info` | Allows using `info`, `stats`, and `history` | Support, moderation, audit |
| `rollback.logs` | Allows checking audit logs | Audit, leadership, administration |
| `rollback.manage.cancel` | Allows cancelling pending or queued requests | Senior moderator, administrator |
| `rollback.manage.reopen` | Allows reopening denied requests | Senior moderator, administrator |
| `rollback.manage.unlock` | Allows unlocking restored deaths to permit a new request | Trusted administrator |
| `rollback.export` | Allows exporting audits to `yml` or `json` | Audit, administrator |
| `rollback.reload` | Allows reloading configuration and reconnecting services | Technical administrator |

## Global permission inheritance

The `rollback.admin.all` permission includes:

- `rollback.view`
- `rollback.request`
- `rollback.info`
- `rollback.logs`
- `rollback.manage.cancel`
- `rollback.manage.reopen`
- `rollback.manage.unlock`
- `rollback.export`
- `rollback.reload`

## Recommendations by role

| Suggested role | Recommended permissions | Expected use |
| --- | --- | --- |
| Basic support | `rollback.view`, `rollback.info` | Review cases without being able to request or manage |
| Review staff | `rollback.view`, `rollback.request`, `rollback.info` | Analyze cases and send requests to Discord |
| Auditor | `rollback.view`, `rollback.info`, `rollback.logs`, `rollback.export` | Review decisions and export evidence |
| Senior moderator | `rollback.view`, `rollback.request`, `rollback.info`, `rollback.logs`, `rollback.manage.cancel`, `rollback.manage.reopen` | Operate and correct the request flow |
| Administrator | `rollback.admin.all` | Full control |

## LuckPerms examples

### Give full access to the admin group

```text
/lp group admin permission set rollback.admin.all true
```

### Create a staff profile that can review and request

```text
/lp group staff permission set rollback.view true
/lp group staff permission set rollback.request true
/lp group staff permission set rollback.info true
```

### Create an audit profile

```text
/lp group auditor permission set rollback.view true
/lp group auditor permission set rollback.info true
/lp group auditor permission set rollback.logs true
/lp group auditor permission set rollback.export true
```

### Allow cancellations and reopens to a senior rank

```text
/lp group seniorstaff permission set rollback.view true
/lp group seniorstaff permission set rollback.request true
/lp group seniorstaff permission set rollback.info true
/lp group seniorstaff permission set rollback.logs true
/lp group seniorstaff permission set rollback.manage.cancel true
/lp group seniorstaff permission set rollback.manage.reopen true
```

### Allow unlock only to administrators

```text
/lp group admin permission set rollback.manage.unlock true
```

## Recommended security policy

- Do not give `rollback.manage.unlock` to common ranks.
- Keep `rollback.export` in the hands of trusted staff.
- Use `rollback.request` only for staff who should really open tickets in Discord.
- If a rank should only review, `rollback.view` + `rollback.info` is usually enough.

## Operational notes

- The base command without arguments only shows the usage corresponding to the player's permissions.
- Approval and denial from Discord do not depend on Minecraft permissions, but on the configured Discord role control.
- If the Discord role is the main approval layer, you can reserve only consultation and request permissions in Minecraft.

The full command operation is documented in [Commands](comandos.md).
