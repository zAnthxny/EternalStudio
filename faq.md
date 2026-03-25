# Solucion de Problemas y FAQ

## FAQ rapida

### El plugin guarda todas las muertes automaticamente

Si `storage.enable-save-filters` esta en `false`, si. Si esta en `true`, respetara mundos y gamemodes bloqueados.

### Se puede restaurar solo una parte del inventario

Si. El proyecto actual soporta restore de inventario, armadura, offhand, XP, Ender Chest o restore completo.

### El jugador debe estar online para aprobar

No. Si esta offline, la restauracion puede quedar en cola.

### Se necesita PlaceholderAPI

No.

### Se necesita MySQL

No.

### Se puede usar sin Discord

El flujo actual esta fuertemente orientado a Discord. Sin bot conectado, no podras enviar solicitudes de rollback a Discord.

## Problemas frecuentes

### No se guardan muertes

- revisa filtros de guardado
- verifica permisos de escritura
- confirma que el jugador tenia algo que guardar

### La solicitud no llega a Discord

- revisa token del bot
- revisa `log-channel-id`
- confirma permisos del bot

### Discord dice que no tienes permiso

- revisa `discord.require-admin-role`
- revisa `discord.admin-role-id`
- confirma que el moderador tenga el rol

### El restore no se aplica

- revisa si el snapshot sigue en `PENDING` o `QUEUED`
- revisa si `require-empty-sections-before-restore` lo bloquea
- revisa si fallo el backup previo

### No puedo volver a solicitar una muerte restaurada

Es normal. Utiliza:

```text
/invrestore unlock <ID>
```

## Diagnostico recomendado

1. Revisa consola.
2. Revisa `config.yml`.
3. Verifica el estado del snapshot.
4. Revisa `audit-log.yml`.
5. Exporta auditoria si necesitas evidencia externa.

## Nota: 

- Se recomienda probar el plugin en un servidor de prueba (TestServer) para una configuración optima. 

- Volver al [Inicio](./index.md)
