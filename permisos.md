# Permisos

## Tabla completa

| Permiso | Descripcion | Tipo de usuario recomendado | Valor por defecto |
| --- | --- | --- | --- |
| `rollback.view` | Permite abrir la GUI e inspeccionar snapshots | `Mod / Staff` | `false` |
| `rollback.request` | Permite enviar solicitudes de rollback a Discord | `Mod / Staff` | `false` |
| `rollback.info` | Permite usar `info`, `stats` y `history` | `SrMod / Staff senior` | `false` |
| `rollback.logs` | Permite consultar auditoria reciente | `SrMod / Admin` | `false` |
| `rollback.manage.cancel` | Permite cancelar solicitudes pendientes o en cola | `Admin / Manager` | `false` |
| `rollback.manage.reopen` | Permite reabrir solicitudes rechazadas | `Admin / Manager` | `false` |
| `rollback.manage.unlock` | Permite desbloquear muertes restauradas | `Admin / Manager` | `false` |
| `rollback.export` | Permite exportar auditoria | `Admin / Manager` | `false` |
| `rollback.reload` | Permite recargar configuracion y servicios | `Admin / Manager` | `false` |
| `rollback.admin.all` | Permite acceso completo a todas las funciones | `Admin principal / Manager` | `false` |

## Distribucion recomendada por rangos

### `mod`

- `rollback.view`
- `rollback.request`

### `srmod`

- `rollback.view`
- `rollback.request`
- `rollback.info`
- `rollback.logs`

### `admin`

- `rollback.admin.all`

### `manager`

- `rollback.admin.all`

## Ejemplos con LuckPerms

```text
/lp group mod permission set rollback.view true
/lp group mod permission set rollback.request true

/lp group srmod permission set rollback.view true
/lp group srmod permission set rollback.request true
/lp group srmod permission set rollback.info true
/lp group srmod permission set rollback.logs true

/lp group admin permission set rollback.admin.all true
/lp group manager permission set rollback.admin.all true
```
