# Prueba Tecnica - Ingeniero de Software Senior para Proyecto de la UMnaizles.

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
- `comopleted` (BOOLEAN - DEFAULT false): Indica si la tarea está completada o no.
