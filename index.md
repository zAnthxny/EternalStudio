# InvRestore

InvRestore es un plugin de administracion para servidores de Minecraft orientado al registro de muertes, inspeccion de inventarios perdidos y gestion de restauraciones con flujo de aprobacion en Discord, ahora con almacenamiento en base de datos `SQLite` o `MySQL`.

Esta documentacion esta pensada para uso interno, publicacion en GitHub y adaptacion posterior a GitHub Wiki, GitBook, BuiltByBit, Spigot o una web oficial. Todo el contenido se basa en el estado real del proyecto actual. Cuando un dato comercial o de marca no esta confirmado, queda marcado como `[POR COMPLETAR]`.

## Resumen rapido

| Dato | Valor |
| --- | --- |
| Nombre del plugin | `InvRestore` |
| Version actual | `1.1.0` |
| Autor actual detectado | `zAnthxny_` |
| Categoria | `Administracion / Rollback / Staff Tools` |
| Versiones objetivo de Minecraft | `1.21.4 - 1.21.11` |
| Software confirmado | `Paper` |
| Compatibilidad adicional | `Purpur / Spigot / Folia: pendiente de confirmacion` |
| Version de Java | `Java 21` |
| Dependencias de otros plugins | `Ninguna` |
| Integracion externa | `Discord mediante bot JDA` |
| Base de datos | `SQLite y MySQL` |
| Sitio oficial / Discord / soporte | `[Discord](https://discord.gg/VHDmGMgBUV)` |

## Que hace InvRestore

InvRestore guarda snapshots completos cuando un jugador muere, permite inspeccionar esas muertes desde una GUI in-game, enviar solicitudes de restauracion a Discord con una razon personalizada y aprobar, rechazar o dejar en cola cada rollback desde botones y modales. Toda la informacion principal del sistema ahora se almacena en base de datos para una operacion mas limpia, escalable y profesional.

## Caracteristicas principales

- Registro automatico de muertes con inventario, armadura, offhand, XP y Ender Chest.
- GUI administrativa con paginacion, filtros por estado y busqueda.
- Inspeccion visual de snapshots antes de tomar una decision.
- Solicitud de rollback desde Minecraft con motivo escrito en chat.
- Flujo de aprobacion en Discord con botones y confirmacion mediante modal.
- Restauraciones parciales o completas.
- Cola de entregas para jugadores offline.
- Sistema de auditoria con almacenamiento en base de datos y exportacion a YAML o JSON.
- Soporte nativo para `SQLite` y `MySQL`.
- Backups automaticos previos a la restauracion.
- Controles opcionales para exigir inventarios vacios antes de aplicar un restore.
- Configuracion reorganizada y mas presentable para entornos comerciales.

## Beneficios

- Reduce discusiones del staff porque cada accion queda registrada.
- Evita restauraciones a ciegas, ya que permite revisar el contenido perdido antes de aprobar.
- Permite operar parte del flujo desde Discord sin entrar al servidor.
- Minimiza errores gracias a backups previos y validaciones opcionales.
- Facilita soporte y revisiones posteriores mediante logs y exportaciones.
- Mejora la gestion de datos frente a configuraciones basadas solo en archivos planos.

## Navegacion

- [Instalacion](./instalacion.md)
- [Configuracion](./configuracion.md)
- [Comandos](./comandos.md)
- [Permisos](./permisos.md)
- [FAQ](./faq.md)

## Compatibilidad

### Confirmada por el proyecto actual

- `Paper 1.21.11` como API de compilacion.
- `api-version: 1.21`.
- `Java 21`.
- `SQLite` listo para usar por defecto.
- `MySQL` soportado mediante configuracion.

## Almacenamiento

El sistema actual ya no depende del guardado principal en archivos YAML.

- `SQLite` es la opcion predeterminada y funciona sin configuracion externa adicional.
- `MySQL` esta disponible para servidores que prefieren una base de datos remota.
- La auditoria y los snapshots se almacenan en base de datos.
- Las exportaciones siguen disponibles en `YML` y `JSON`.

Para cambiar el tipo de base de datos, revisa [Configuracion](./configuracion.md).

### Objetivo de soporte documentado

- `Minecraft 1.21.4`
- `Minecraft 1.21.5`
- `Minecraft 1.21.6`
- `Minecraft 1.21.7`
- `Minecraft 1.21.8`
- `Minecraft 1.21.9`
- `Minecraft 1.21.10`
- `Minecraft 1.21.11`

## Soporte y venta

- Discord de soporte: `[POR COMPLETAR]`
- Plataforma de venta principal: `[POR COMPLETAR]`
