# FAQ, soporte y mantenimiento

Esta pagina centraliza diagnostico, preguntas frecuentes, soporte, licencia y una plantilla de changelog preparada para publicacion.

## Solucion de problemas

| Problema | Causa probable | Solucion recomendada |
| --- | --- | --- |
| El plugin carga, pero no envia solicitudes a Discord | Token ausente, placeholder activo o canal incorrecto | Configura un token real, valida `discord.log-channel-id` y reinicia |
| Discord responde que falta rol | `discord.admin-role-ids` incorrecto o el usuario no tiene ese rol | Revisa IDs y permisos del moderador en Discord |
| El rollback fue aprobado, pero no se aplico al instante | El jugador estaba offline | El snapshot queda `QUEUED` y se entrega en el siguiente login |
| El rollback no puede aplicarse | `require-empty-sections-before-restore` bloquea la operacion | Vacia las secciones objetivo o desactiva la proteccion |
| No aparecen muertes guardadas | No habia items, o el mundo/gamemode esta filtrado | Revisa `storage.filters` y haz una prueba controlada |
| No se puede exportar auditoria | No hay datos o no se puede crear `exports/` | Asegura permisos de escritura y revisa si existen eventos auditados |
| El jugador no aparece al buscarlo | No esta online y no hay snapshots previos almacenados | Usa un nombre exacto o confirma que existan muertes registradas |
| La solicitud desaparecio de estado pendiente | Timeout activado | Revisa `requests.timeout-minutes` |
| La consola muestra error de base de datos | Credenciales `MySQL` invalidas o ruta SQLite no accesible | Verifica configuracion y permisos de disco |

## Diagnostico recomendado paso a paso

1. Confirma `Java 21`.
2. Confirma version de `Paper`.
3. Revisa `config.yml`.
4. Verifica el estado del bot de Discord.
5. Usa `/invrollback info <jugador>` para ver si hay snapshots.
6. Usa `/invrollback logs <jugador>` para revisar el historial auditado.
7. Si trabajas con `MySQL`, prueba conectividad externa a la base.
8. Si cambiaste token o parametros criticos, reinicia el servidor completo.

## FAQ profesional para compradores y administradores

### El plugin necesita Discord para funcionar

Para guardar muertes, inspeccionarlas y consultar historial, no necesariamente.

Para el flujo premium de aprobacion y rechazo remoto, si. Esa parte depende del bot de Discord.

### Soporta restores parciales

Si. La implementacion actual soporta:

- completo
- inventario
- armadura
- offhand
- experiencia
- Ender Chest

### Puede restaurar a un jugador offline

No aplica el inventario sobre un jugador desconectado. En ese caso lo deja en cola y lo entrega automaticamente cuando el jugador entra.

### Crea backup antes de restaurar

Si, si `protections.create-backup-before-restore` esta activo. El backup se guarda como un snapshot extra de categoria `BACKUP`.

### Puede evitar sobreescribir inventarios actuales

Si. Activa `protections.require-empty-sections-before-restore`.

### Tiene PlaceholderAPI

No se detecta soporte publico para PlaceholderAPI en esta version.

### Usa SQLite o MySQL

Ambos. `SQLite` viene listo para usar y `MySQL` esta pensado para entornos de produccion mas serios.

### Guarda desconexiones en combate

Si, si la opcion correspondiente esta activa y la desconexion ocurre dentro de la ventana de combate configurada.

### Tiene auditoria exportable

Si. Se puede exportar en `yml` o `json`.

### Tiene menus configurables por archivo aparte

No se detecto un archivo de menus separado. Los textos del menu se editan desde `lang/es.yml` y `lang/en.yml`.

## Que informacion enviar al pedir soporte

Para acelerar una respuesta de calidad, el usuario deberia enviar:

- version del plugin
- version exacta de Paper
- version de Java
- tipo de base de datos usado
- fragmento relevante de `config.yml`
- error completo de consola
- nombre del jugador afectado
- `death_id` si existe
- si el jugador estaba online u offline al aprobar
- captura del mensaje de Discord si aplica
- pasos exactos para reproducir

## Soporte

### Canales

- Discord de soporte: [NovaStudios](https://discord.gg/zeSHUQXPuz)

### Recomendacion operativa

Antes de abrir un ticket:

1. reproduce el caso una vez mas en un entorno controlado
2. confirma si el problema es de Discord, base de datos o permisos
3. intenta exportar auditoria o revisar logs del jugador
