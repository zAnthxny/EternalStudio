# Permisos

NovaRestore usa un set de permisos claro y separado por responsabilidades. Esto facilita crear perfiles de staff sin entregar acceso total a todos.

## Tabla completa de permisos

| Permiso | Descripcion exacta | Perfil sugerido |
| --- | --- | --- |
| `rollback.admin.all` | Acceso total. Incluye todos los permisos del plugin por herencia | Administrador principal |
| `rollback.view` | Permite abrir la GUI e inspeccionar snapshots | Staff, soporte, moderacion |
| `rollback.request` | Permite enviar solicitudes de rollback a Discord desde la GUI | Staff autorizado para solicitar |
| `rollback.info` | Permite usar `info`, `stats` e `history` | Soporte, moderacion, auditoria |
| `rollback.logs` | Permite consultar logs de auditoria | Auditoria, liderazgo, administracion |
| `rollback.manage.cancel` | Permite cancelar solicitudes pendientes o en cola | Moderador senior, administrador |
| `rollback.manage.reopen` | Permite reabrir solicitudes rechazadas | Moderador senior, administrador |
| `rollback.manage.unlock` | Permite desbloquear muertes restauradas para permitir una nueva solicitud | Administrador de confianza |
| `rollback.export` | Permite exportar la auditoria a `yml` o `json` | Auditoria, administrador |
| `rollback.reload` | Permite recargar configuracion y reconectar servicios | Administrador tecnico |

## Herencia del permiso global

El permiso `rollback.admin.all` incluye:

- `rollback.view`
- `rollback.request`
- `rollback.info`
- `rollback.logs`
- `rollback.manage.cancel`
- `rollback.manage.reopen`
- `rollback.manage.unlock`
- `rollback.export`
- `rollback.reload`

## Recomendaciones por rol

| Rol sugerido | Permisos recomendados | Uso esperado |
| --- | --- | --- |
| Soporte basico | `rollback.view`, `rollback.info` | Revisar casos sin capacidad de solicitar o ejecutar acciones de gestion |
| Staff de revisiones | `rollback.view`, `rollback.request`, `rollback.info` | Analizar casos y mandar solicitudes a Discord |
| Auditor | `rollback.view`, `rollback.info`, `rollback.logs`, `rollback.export` | Revisar decisiones y exportar evidencia |
| Moderador senior | `rollback.view`, `rollback.request`, `rollback.info`, `rollback.logs`, `rollback.manage.cancel`, `rollback.manage.reopen` | Operar y corregir flujo de solicitudes |
| Administrador | `rollback.admin.all` | Control total |

## Ejemplos con LuckPerms

### Dar acceso total al grupo admin

```text
/lp group admin permission set rollback.admin.all true
```

### Crear un perfil de staff que puede revisar y solicitar

```text
/lp group staff permission set rollback.view true
/lp group staff permission set rollback.request true
/lp group staff permission set rollback.info true
```

### Crear un perfil de auditoria

```text
/lp group auditor permission set rollback.view true
/lp group auditor permission set rollback.info true
/lp group auditor permission set rollback.logs true
/lp group auditor permission set rollback.export true
```

### Permitir cancelaciones y reaperturas a un rango senior

```text
/lp group seniorstaff permission set rollback.view true
/lp group seniorstaff permission set rollback.request true
/lp group seniorstaff permission set rollback.info true
/lp group seniorstaff permission set rollback.logs true
/lp group seniorstaff permission set rollback.manage.cancel true
/lp group seniorstaff permission set rollback.manage.reopen true
```

### Permitir desbloqueo solo a administradores

```text
/lp group admin permission set rollback.manage.unlock true
```

## Politica recomendada de seguridad

- No entregues `rollback.manage.unlock` a rangos comunes.
- Mantén `rollback.export` en manos de personal de confianza.
- Usa `rollback.request` solo para staff que de verdad deba abrir tickets en Discord.
- Si un rango solo debe revisar, `rollback.view` + `rollback.info` suele ser suficiente.

## Notas operativas

- El comando sin argumentos muestra solo el uso correspondiente a los permisos del usuario.
- La aprobacion y el rechazo desde Discord no dependen de permisos de Minecraft, sino del control de roles configurado en Discord.
- Si el rol de Discord es la capa principal de aprobacion, puedes reservar en Minecraft solo los permisos de consulta y solicitud.

La operativa completa de cada comando esta documentada en [Comandos](comandos.md).

