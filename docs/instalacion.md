# Instalacion

Esta pagina cubre la instalacion desde cero, la primera ejecucion del plugin y los problemas de arranque mas comunes.

## Requisitos previos

| Requisito | Necesario | Detalle |
| --- | --- | --- |
| Java | Si | `Java 21` |
| Servidor | Si | `Paper 1.21.4 - 1.21.11` |
| Conexion a disco | Si | El plugin necesita escribir configuracion, idiomas, base de datos y exports |
| Discord bot | Recomendado | Necesario para el flujo de aprobacion desde Discord |
| MySQL | Opcional | Solo si usaras `database.type: MYSQL` |
| Otros plugins | No | No se detectaron dependencias obligatorias de plugins externos |

## Compatibilidad exacta

| Elemento | Estado |
| --- | --- |
| `Paper 1.21.4 - 1.21.11` | Objetivo del proyecto |
| `api-version: 1.21` | Declarado |
| `SQLite` | Integrado |
| `MySQL` | Integrado |
| `Discord / JDA` | Integrado |
| `PlaceholderAPI` | No necesario |
| `Vault` | No necesario |
| `Folia` | Pendiente de confirmacion |

## Dependencias obligatorias y opcionales

### Obligatorio

- Un servidor `Paper` compatible.
- `Java 21`.
- El archivo `.jar` del plugin.

### Opcional

- Un bot de Discord con acceso al canal donde se aprobaran solicitudes.
- Un servidor `MySQL` si no quieres usar `SQLite`.
- Un webhook de Discord si quieres duplicar la auditoria fuera del canal principal.

## Instalacion desde cero

### Opcion A: instalacion normal en produccion

1. Deten el servidor.
2. Copia el `.jar` de `NovaRestore` a la carpeta `plugins/`.
3. Inicia el servidor para que el plugin genere sus archivos.
4. Deten el servidor nuevamente.
5. Edita `plugins/NovaRestore/config.yml`.
6. Si usaras Discord, configura:
   - `discord.log-channel-id`
   - `discord.admin-role-ids`
   - deja `discord.bot-token` como placeholder o documentacion, sin poner el token real
7. Define el token real en el arranque del servidor usando `-Ddiscord.token=TU_TOKEN`
8. Vuelve a iniciar el servidor.
9. Verifica que no aparezcan errores de base de datos ni de Discord en consola.

### Cargar el token del bot en el servidor

NovaRestore esta pensado para produccion. El token real del bot no debe guardarse en `plugins/NovaRestore/config.yml`.

Politica operativa recomendada:

- `discord.bot-token` debe quedarse como placeholder o nota visual.
- El token real debe cargarse en el arranque del servidor usando la propiedad JVM `discord.token`.
- El argumento debe ir antes de `-jar`.
- Solo el personal de infraestructura o despliegue debe tener acceso al script o panel donde se define ese arranque.

Ejemplo en `Linux` con `start.sh`:

```bash
#!/bin/bash
cd /opt/minecraft/survival
java -Xms4G -Xmx4G "-Ddiscord.token=TU_TOKEN_REAL" -jar paper-1.21.11.jar nogui
```

Ejemplo en `Windows` con `start.bat`:

```bat
@echo off
cd /d "C:\Minecraft\Survival"
java -Xms4G -Xmx4G "-Ddiscord.token=TU_TOKEN_REAL" -jar "paper-1.21.11.jar" nogui
pause
```

Si tu `.jar` de Paper tiene otro nombre, usa el nombre exacto del archivo. Por ejemplo:

- `paper-1.21.11-123.jar`
- `server.jar`
- `paperclip.jar`

Antes de editar el script, confirma el nombre real del archivo del servidor:

En `Linux`:

```bash
ls *.jar
```

En `Windows PowerShell`:

```powershell
Get-ChildItem *.jar
```

Si usas un panel de hosting, la regla es la misma:

- agrega `-Ddiscord.token=TU_TOKEN_REAL` al comando de arranque del servidor
- colocalo antes de `-jar`
- no pegues el token en `config.yml`

Comportamiento esperado de NovaRestore:

- si `discord.token` es valido, el bot intentara conectarse al arrancar
- si falta o es invalido, el plugin cargara en modo degradado y avisara claramente en consola
- si detecta un token real en `config.yml`, mostrara un warning de seguridad y no lo usara como fallback

Checklist rapido para produccion:

- el bot ya esta invitado al servidor de Discord correcto
- `discord.log-channel-id` apunta al canal correcto
- `discord.admin-role-ids` contiene los roles correctos
- el token se define en el script o panel de arranque del servidor
- `discord.bot-token` no contiene el secreto real

### Opcion B: compilar desde este repositorio

Comando de build:

```powershell
.\mvnw.cmd -DskipTests package
```

Artefactos observados en este proyecto:

| Archivo | Uso esperado |
| --- | --- |
| `target/NovaRestore-dev-1.1.0.jar` | Build de desarrollo |
| `target/NovaRestore.jar` | Salida final de release/ofuscacion en este proyecto |

Si vas a distribuir una build comercial, confirma el nombre final del artefacto publico antes de publicar la wiki en marketplaces.

## Primera ejecucion

En el primer arranque, el plugin:

- carga `config.yml`
- inicializa el sistema de idioma
- abre la base de datos elegida
- crea las tablas necesarias si no existen
- registra listeners y comandos
- intenta conectar el bot de Discord
- activa el monitor de timeout para solicitudes pendientes

Si el token de Discord no esta configurado o sigue usando el placeholder, el plugin puede seguir cargando, pero el flujo de solicitudes hacia Discord no funcionara.

## Archivos y carpetas generados

Ubicacion esperada en un servidor:

```text
plugins/
  NovaRestore/
    config.yml
    lang/
      es.yml
      en.yml
    database/
      invrestore.db
    exports/
```

Notas importantes:

- `lang/es.yml` y `lang/en.yml` se generan en la primera carga.
- `database/invrestore.db` se crea cuando usas `SQLite`.
- `exports/` se crea la primera vez que exportas auditoria.
- Si cambias a `MySQL`, el archivo SQLite puede quedar como respaldo historico local.

## Que hace cada archivo

| Archivo o carpeta | Funcion |
| --- | --- |
| `config.yml` | Configuracion principal del plugin |
| `lang/es.yml` | Mensajes en espanol editables |
| `lang/en.yml` | Mensajes en ingles editables |
| `database/invrestore.db` | Base de datos local cuando usas SQLite |
| `exports/` | Exportaciones de auditoria en `yml` o `json` |

## Recomendacion de arranque rapido

### Servidor pequeno o mediano

Usa `SQLite` si:

- el servidor es una sola instancia
- el volumen de muertes no es extremo
- quieres instalar rapido
- prefieres administracion simple

### Red o servidor con mucho volumen

Usa `MySQL` si:

- tienes varios mundos con actividad alta
- el staff consulta mucho historial y auditoria
- quieres respaldos y monitoreo mas estables
- prefieres separar datos del disco local del servidor de juego

## Checklist de instalacion minima

- `Java 21` confirmado
- `Paper 1.21.x` confirmado
- jar colocado en `plugins/`
- `config.yml` generado
- idioma elegido
- base de datos configurada
- token de Discord configurado si usaras aprobaciones
- `log-channel-id` correcto
- uno o mas `admin-role-ids` correctos

## Errores comunes de instalacion

### El plugin carga, pero Discord no funciona

Causa comun:

- el token sigue siendo `TOKEN_EN_STARTUP_ARGUMENTS`
- el canal configurado no existe
- el bot no esta en el servidor de Discord

Solucion:

1. configura el token real
2. revisa `discord.log-channel-id`
3. confirma permisos del bot en el canal
4. reinicia el servidor

## La consola muestra error de base de datos

Causas comunes:

- credenciales `MySQL` invalidas
- host o puerto incorrecto
- carpeta SQLite sin permisos de escritura

Solucion:

1. revisa `database.type`
2. valida host, puerto, base, usuario y password
3. confirma que el servidor puede escribir en `plugins/NovaRestore/`

## El plugin no genera snapshots

Causas posibles:

- el jugador murio sin items ni contenido util que guardar
- el guardado esta filtrado por mundo o gamemode
- el evento ocurre en un entorno no validado

Solucion:

1. revisa `storage.filters.enabled`
2. valida `blocked-worlds` y `blocked-gamemodes`
3. haz una prueba controlada con items en inventario

## El plugin se activa, pero las solicitudes fallan

Causas comunes:

- bot no conectado
- canal no encontrado
- el snapshot ya esta pendiente o restaurado

Solucion:

1. usa `/invrollback info <jugador>`
2. abre la GUI y confirma el estado del snapshot
3. revisa los mensajes del plugin en consola

## Recomendaciones antes de pasar a produccion

- Haz una prueba completa de muerte, solicitud, aprobacion y restauracion.
- Valida tambien el caso de aprobacion con jugador offline.
- Exporta auditoria una vez para confirmar permisos de escritura.
- Respaldar `config.yml`, `lang/` y la base de datos antes de cambios grandes.

La referencia completa de configuracion esta en [configuracion.md](configuracion.md).

