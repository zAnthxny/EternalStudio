# Comandos

## Vista general

El proyecto actual registra un unico comando principal: `invrestore`.

No hay aliases definidos en `plugin.yml`.

## Tabla completa de comandos

| Comando | Descripcion | Uso | Permiso | Alias | Ejemplo |
| --- | --- | --- | --- | --- | --- |
| `/invrestore <jugador> [pagina] [filtro] [busqueda]` | Abre la GUI de muertes o historial filtrado | `/invrestore Steve 1 open` | `rollback.admin` | Ninguno | `/invrestore Steve 1 restored nether` |
| `/invrestore reload` | Recarga configuracion y reinicia el bot de Discord | `/invrestore reload` | `rollback.admin` | Ninguno | `/invrestore reload` |
| `/invrestore cancel <ID> <razon>` | Cancela una solicitud pendiente o en cola | `/invrestore cancel 1718200000000 motivo` | `rollback.admin` | Ninguno | `/invrestore cancel 1718200000000 caso resuelto` |
| `/invrestore reopen <ID>` | Reabre una muerte rechazada | `/invrestore reopen <ID>` | `rollback.admin` | Ninguno | `/invrestore reopen 1718200000000` |
| `/invrestore unlock <ID>` | Desbloquea una muerte restaurada | `/invrestore unlock <ID>` | `rollback.admin` | Ninguno | `/invrestore unlock 1718200000000` |
| `/invrestore info <jugador>` | Muestra estadisticas resumidas | `/invrestore info Steve` | `rollback.admin` | Ninguno | `/invrestore info Steve` |
| `/invrestore stats <jugador>` | Variante funcional del bloque informativo | `/invrestore stats Steve` | `rollback.admin` | Ninguno | `/invrestore stats Steve` |
| `/invrestore history <jugador> [filtro] [busqueda]` | Muestra historial textual de snapshots | `/invrestore history Steve open lag` | `rollback.admin` | Ninguno | `/invrestore history Steve pending nether` |
| `/invrestore logs <jugador>` | Muestra auditoria reciente del jugador | `/invrestore logs Steve` | `rollback.admin` | Ninguno | `/invrestore logs Steve` |
| `/invrestore export <yml|json> [jugador]` | Exporta auditoria global o por jugador | `/invrestore export json Steve` | `rollback.admin` | Ninguno | `/invrestore export yml` |

## Filtros validos

- `all`
- `open`
- `pending`
- `queued`
- `restored`
- `denied`

## Comportamientos especiales

### Apertura de GUI

`/invrestore <jugador>` requiere que el emisor sea un jugador. La consola no puede abrir menus.

### `reload`

Recarga `config.yml` y reinicia el bot de Discord.

### `cancel`

Funciona sobre estados `PENDING` y `QUEUED`.

### `reopen`

Solo funciona sobre `DENIED`.

### `unlock`

Solo funciona sobre `RESTORED`.

### `export`

Formatos soportados:

- `yml`
- `json`
