# Prueba Técnica - Ingeniero de Software Senior para Proyecto de la UManizales.

## Descripción - Requerimientos

Construir una aplicación web de lista de tareas (ToDo List) que permita a los usuarios
crear, leer, actualizar y eliminar tareas. La aplicación debe utilizar una base de datos
en PostgreSQL para almacenar las tareas, JavaScript para la lógica del lado del cliente, Astro.js y
Alpine.js para la interfaz de usuario y NestJS para la API RESTful del lado del servidor y
Tailwind CSS para el diseño gráfico.

## Estrutura del Proyecto

### Sección 1
Esta primera sección contiene las sentencias SQLs para la creación de la base de datos en PostgreSQL,
la creación de la tabla `tasks` y algunos registros de prueba con una consulta de ejemplo.

El nombre de la base de datos es `todo_app`.

La tabla `tasks` tiene los siguientes campos:
- `id` (SERIAL - PRIMARY KEY): Identificador único de la tarea.
- `title` (VARCHAR(255) - NOT NULL): Título de la tarea.
- `description` (TEXT): Descripción de la tarea.
- `is_completed` (BOOLEAN - DEFAULT false): Indica si la tarea está completada o no.
- `created_at` (TIMESTAMPTZ - DEFAULT CURRENT_TIMESTAMP): Fecha y hora de creación de la tarea.
- `user_id` (INTEGER - NOT NULL): Identificador del usuario que creó la tarea.

También se creó una tabla `users` con los siguientes campos:
- `id` (SERIAL - PRIMARY KEY): Identificador único del usuario.
- `name` (VARCHAR(255) - NOT NULL): Nombre del usuario.
- `email` (VARCHAR(255) - NOT NULL): Correo electrónico del usuario.
- `password` (VARCHAR(72) - NOT NULL): Contraseña del usuario.
- `created_at` (TIMESTAMPTZ - DEFAULT CURRENT_TIMESTAMP): Fecha y hora de creación del usuario.

Se crearon los siguientes índices:
- `idx_tasks_created_at_desc`: Índice para la columna `created_at` de la tabla `tasks` en orden descendente.
- `idx_tasks_title_full_text_search`: Índice para la columna `title` de la tabla `tasks` para realizar búsquedas de texto completo.
- `idx_tasks_description_full_text_search`: Índice para la columna `description` de la tabla `tasks` para realizar búsquedas de texto completo.
- `idx_users_email_unique`: Índice único para la columna `email` de la tabla `users`.

#### Levantar la DB con docker-compose

#### Requisitos
- Docker
- Docker Compose

Ejecutar el siguiente comando en la terminal desde la raíz del proyecto (dev-senior-en-unmanizales):
```bash
docker-compose up -d
```

#### Ejecutar las sentencias SQLs
Copiamos el archivo `section-1/queries.sql` y lo pegamos en la terminal del contenedor de la base de datos.
```bash
docker cp section-1/db.sql dev-senior-en-unmanizales_db_1:./
```

Entramos a la terminal del contenedor de la base de datos:
```bash
docker-compose exec db bash
```

Ejecutamos el archivo `db.sql` en la terminal del contenedor de la base de datos:
```bash
psql -U <USERNAME> -d <DB_NAME> -W -f db.sql
```
El comando anterior nos pedirá la contraseña del usuario de la base de datos que configuramos en el flag -U.


### Sección 2
Es el Frontend de la aplicación de lista de tareas (ToDo List). Se utilizó **Astro.js** y **Alpine.js** para la interfaz de usuario y **Tailwind CSS** para el diseño gráfico.

#### Requisitos
- Node.js
- pnpm

#### Instalación

Entrar a la raíz del proyecto en Astro.js:
```bash
cd section-2
```

Instalar las dependencias:
```bash
pnpm install
```

#### Ejecución

Levantar el servidor en modo desarrollo:
```bash
pnpm dev
```



### Sección 3
Se creó una **RESTful** **API** con **NestJs**; la cual, contiene los endpoints (CRUD) para gestionar las tareas. La API Está protegida con
una `API_KEY`. Este Servidor se conecta a la base de datos **PostgreSQL** para realizar las operaciones.

#### Requisitos
- Node.js
- pnpm
- Crear un archivo `.env` en la raíz del proyecto (dev-senior-en-unmanizales). Debe de tener las variables de entorno
que se mencionan en el archivo `.env.example`.

#### Instalación

Entrar a la raíz del proyecto en NestJs:
```bash
cd section-3
```

Instalar las dependencias:
```bash
pnpm install
```

#### Ejecución
Levantar el servidor en modo desarrollo:
```bash
pnpm run start:dev
```

#### Documentación
La documentación de la API se encuentra en la siguiente URL: http://localhost:3000/api/docs
