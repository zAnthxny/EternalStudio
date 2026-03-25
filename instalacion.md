# Instalacion

## Requisitos previos

| Requisito | Estado |
| --- | --- |
| Servidor Paper | Obligatorio |
| Minecraft `1.21.4 - 1.21.11` | Objetivo de soporte |
| Java 21 | Obligatorio |
| Token de bot de Discord | Necesario si usaras aprobaciones por Discord |
| Canal de logs en Discord | Recomendado |
| Rol administrativo en Discord | Recomendado |

## Compatibilidad exacta

### Confirmada por el proyecto

- `Paper 1.21.x`
- `api-version: 1.21`
- `Java 21`

### Pendiente de confirmacion

- `Purpur`
- `Spigot`
- `Folia`

## Dependencias obligatorias

InvRestore no requiere otros plugins como Vault, PlaceholderAPI o Citizens.

## Instalacion desde cero

1. Descarga el jar compilado de InvRestore.
2. Apaga tu servidor.
3. Coloca el archivo en la carpeta `plugins/`.
4. Inicia el servidor una vez para generar la configuracion.
5. Deten el servidor.
6. Edita `plugins/InvRestore/config.yml`.
7. Configura el token del bot de Discord y el canal donde llegaran las solicitudes.
8. Inicia de nuevo el servidor.

## Recomendacion de seguridad para el token

La via preferida es iniciar el servidor con:

```text
-Ddiscord.token=TU_TOKEN
```

Si no lo haces, el plugin intentara usar `discord.bot-token` desde `config.yml`.

## Archivos que se generan

```text
plugins/InvRestore/
├─ config.yml
├─ audit-log.yml
├─ deaths/
│  └─ <uuid>.yml
└─ exports/
   ├─ audit-log-<fecha>.yml
   └─ audit-log-<fecha>.json
```

## Verificacion basica

- confirma que el plugin se habilite sin errores
- confirma que el bot de Discord se conecte si esta configurado
- confirma que `/invrestore` exista

## Errores comunes de instalacion

### El plugin no carga

- usa `Java 21`
- verifica que el servidor sea `Paper 1.21.x`
- reemplaza el jar si esta corrupto

### El bot de Discord no inicia

- revisa el token
- reemplaza el placeholder por un valor real
- prueba `/invrestore reload`

### No aparece el canal de Discord

- revisa `discord.log-channel-id`
- confirma permisos del bot
- verifica que el bot este en el servidor correcto
