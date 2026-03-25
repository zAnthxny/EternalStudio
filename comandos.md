# Comandos

## Vista general

El proyecto actual registra un unico comando principal: `invrestore`.

No hay aliases definidos en `plugin.yml`.

El acceso ya no depende de `op` por defecto ni de un unico permiso global. Ahora cada bloque del comando puede asignarse al rango que tu quieras, por ejemplo `mod`, `srmod`, `admin` o `manager`.

## Tabla completa de comandos

| Comando | Descripcion | Uso | Permiso | Alias | Ejemplo |
| --- | --- | --- | --- | --- | --- |
| `/invrestore <jugador> [pagina] [filtro] [busqueda]` | Abre la GUI de muertes o historial filtrado | `/invrestore Steve 1 open` | `rollback.view` | Ninguno | `/invrestore Steve 1 restored nether` |
| Solicitar rollback desde la GUI | Envia la peticion a Discord desde el menu de inspeccion | Click en `Solicitar rollback` | `rollback.request` | No aplica | Abrir snapshot y enviar razon |
| `/invrestore reload` | Recarga configuracion, base de datos y bot de Discord | `/invrestore reload` | `rollback.reload` | Ninguno | `/invrestore reload` |
| `/invrestore cancel <ID> <razon>` | Cancela una solicitud pendiente o en cola | `/invrestore cancel 1718200000000 motivo` | `rollback.manage.cancel` | Ninguno | `/invrestore cancel 1718200000000 caso resuelto` |
| `/invrestore reopen <ID>` | Reabre una muerte rechazada | `/invrestore reopen <ID>` | `rollback.manage.reopen` | Ninguno | `/invrestore reopen 1718200000000` |
| `/invrestore unlock <ID>` | Desbloquea una muerte restaurada | `/invrestore unlock <ID>` | `rollback.manage.unlock` | Ninguno | `/invrestore unlock 1718200000000` |
| `/invrestore info <jugador>` | Muestra estadisticas resumidas | `/invrestore info Steve` | `rollback.info` | Ninguno | `/invrestore info Steve` |
| `/invrestore stats <jugador>` | Variante funcional del bloque informativo | `/invrestore stats Steve` | `rollback.info` | Ninguno | `/invrestore stats Steve` |
| `/invrestore history <jugador> [filtro] [busqueda]` | Muestra historial textual de snapshots | `/invrestore history Steve open lag` | `rollback.info` | Ninguno | `/invrestore history Steve pending nether` |
| `/invrestore logs <jugador>` | Muestra auditoria reciente del jugador | `/invrestore logs Steve` | `rollback.logs` | Ninguno | `/invrestore logs Steve` |
| `/invrestore export <yml|json> [jugador]` | Exporta auditoria global o por jugador | `/invrestore export json Steve` | `rollback.export` | Ninguno | `/invrestore export yml` |

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

## Asignacion por rangos

Ejemplo recomendado por jerarquia:

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

### Resultado practico

- `mod`: puede abrir la GUI, revisar snapshots y mandar la peticion a Discord
- `srmod`: puede hacer lo de `mod` y ademas consultar info, history y logs
- `admin` y `manager`: pueden usar todo mediante `rollback.admin.all`
