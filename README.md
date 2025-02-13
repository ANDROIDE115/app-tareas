"# Mi API de Tareas" 
# API de Gestión de Tareas (To-Do List) 📝

API RESTful para gestión de tareas desarrollada en Node.js con Express. Permite realizar operaciones CRUD básicas con validaciones y manejo de errores.

##  Características Principales
- Crear, leer, actualizar y eliminar tareas
- Validación de datos de entrada
- IDs únicos universales (UUIDv4)
- Filtrado de tareas por estado
- Documentación completa de endpoints
- Pruebas automatizadas con Jest

## 📋 Requisitos Técnicos
- Node.js v18.16.0 o superior
- npm v9.5.1 o superior

## ⚙️ Instalación
1. Clonar repositorio:
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git

Pasos para correr la Api
Instalar dependencias:
npm install

Principales
Paquete	Versión	Descripción
express 4.21.2	Framework web
cors	2.8.5	Middleware para CORS
uuid	11.0.5	Generación de UUIDs
Desarrollo
Paquete	Versión	Descripción
jest	29.7.0	Framework de pruebas
supertest	7.0.0	Testing de endpoints HTTP

Modo desarrollo (con recarga automática):

bash consola de comandos 
Copy
npm run dev
debe aparecer en consola el mensaje :Servidor corriendo en http://localhost:3000


Modo producción:

bash consola de comandos 
Copy
npm start
debe aparecer en consola el mensaje :Servidor corriendo en http://localhost:3000

funcionamiento y pruebas :
Endpoints Disponibles

Método	Endpoint	Descripción
GET	/	Verificar estado del API
POST	/tareas	Crear nueva tarea
GET	/tareas	Obtener todas las tareas
GET	/tareas/:id	Obtener una tarea por ID
PATCH	/tareas/:id	Actualizar parcialmente una tarea
DELETE	/tareas/:id	Eliminar una tarea

ejemplos de uso :
1. Obtener mensaje de bienvenida
GET /
Devuelve un mensaje de bienvenida.
usa este comnado :curl -X GET http://localhost:3000/
 Respuesta:
 API To-Do List

 2.Crear una nueva tarea
 POST /tareas
 usa este comnado :curl -X POST http://localhost:3000/tareas -H "Content-Type: application/json" -d "{\"titulo\": \"Comprar leche\", \"descripcion\": \"Ir al supermercado\"}"

    Respuesta esperada : 
    {"id":"4c5eb494-fcb0-4ee9-810d-96372f1b582c","titulo":"Comprar leche","descripcion":"Ir al supermercado","completado":false}

3.  3. Obtener todas las tareas
     GET /tareas
 Devuelve la lista de todas las tareas.

usa este comnado
curl -X GET http://localhost:3000/tareas
 Respuesta esperada:
 [{"id":"4c5eb494-fcb0-4ee9-810d-96372f1b582c","titulo":"Comprar leche","descripcion":"Ir al supermercado","completado":false}]

 4. Filtrar tareas por estado
 GET /tareas?completado=true
 Obtiene solo las tareas completadas.

usa este comnado:
curl -X GET "http://localhost:3000/tareas?completado=true"
 Respuesta esperada: [] vacio porque la tarea no esta completada esta en false

 5. Actualizar una tarea
 PATCH /tareas/:id
  Permite modificar titulo, descripcion o completado.
    usa este comnado:
    curl -X PATCH http://localhost:3000/tareas/4c5eb494-fcb0-4ee9-810d-96372f1b582c -H "Content-Type: application/json" -d "{\"completado\": true}"

    Respuesta:{"id":"4c5eb494-fcb0-4ee9-810d-96372f1b582c","titulo":"Comprar leche","descripcion":"Ir al supermercado","completado":true}

   5. Obtener una tarea específica
 GET /tareas/:id
 Devuelve los detalles de una tarea.

usa este comando :
curl -X GET http://localhost:3000/tareas/4c5eb494-fcb0-4ee9-810d-96372f1b582c

Respuesta:
{"id":"4c5eb494-fcb0-4ee9-810d-96372f1b582c","titulo":"Comprar leche","descripcion":"Ir al supermercado","completado":true}

 6. Eliminar una tarea
 DELETE /tareas/:id
 Elimina una tarea por su id.
    usa este comando :
    curl -X DELETE http://localhost:3000/tareas/4c5eb494-fcb0-4ee9-810d-96372f1b582c

    Respuesta: Sin contenido porque la tarea se eliminó con éxito


Algunas pruebas manuales :

Endpoint 1: POST /tareas (Crear Tarea)
 Descripción: Permite crear una nueva tarea.

 Casos de prueba
 Caso 1: Crear una tarea válida
Comando en cmd:
curl -X POST http://localhost:3000/tareas -H "Content-Type: application/json" -d "{\"titulo\": \"Hacer ejercicio\", \"descripcion\": \"Correr 30 minutos\"}"
Respuesta esperada:

{
  "id": "uuid-generado",
  "titulo": "Hacer ejercicio",
  "descripcion": "Correr 30 minutos",
  "completado": false
}

 Caso 2: Crear una tarea sin título
 Comando en cmd:
 curl -X POST http://localhost:3000/tareas -H "Content-Type: application/json" -d "{\"descripcion\": \"Correr 30 minutos\"}"

 Respuesta esperada :
 {
  "error": "El título es obligatorio"
}

Caso 3: Crear una tarea con título vacío
 Comando en cmd:
curl -X POST http://localhost:3000/tareas -H "Content-Type: application/json" -d "{\"titulo\": \"\", \"descripcion\": \"Correr 30 minutos\"}"
Respuesta esperada :
 {
  "error": "El título es obligatorio"
}

Caso 4: Crear una tarea sin descripción
 Comando en cmd:
 curl -X POST http://localhost:3000/tareas -H "Content-Type: application/json" -d "{\"titulo\": \"Leer un libro\"}"

 Respuesta esperada:

{
  "id": "uuid-generado",
  "titulo": "Leer un libro",
  "descripcion": "",
  "completado": false
}

Caso 5: Enviar una solicitud sin JSON válido
 Comando en cmd:
 curl -X POST http://localhost:3000/tareas -H "Content-Type: application/json" -d "{titulo: Hacer ejercicio, descripcion: Correr 30 minutos}"

 Respuesta esperada 

{
  {"error":"Algo salió mal en el servidor"}
}

Endpoint 2: PATCH /tareas/:id (Actualizar Tarea)
 Tarea base:

{
  "id": "dc46e08a-771c-4956-943b-37055b3b529d",
  "titulo": "Comprar cerveza",
  "descripcion": "Ir al supermercado",
  "completado": false
}
Usaremos este ID (dc46e08a-771c-4956-943b-37055b3b529d) para realizar pruebas de actualización.

Descripción: Permite modificar una tarea existente.
Caso 1: Marcar una tarea como completada
 Comando en cmd:
curl -X PATCH http://localhost:3000/tareas/dc46e08a-771c-4956-943b-37055b3b529d -H "Content-Type: application/json" -d "{\"completado\": true}"
Respuesta esperada:
{
  "id": "dc46e08a-771c-4956-943b-37055b3b529d",
  "titulo": "Comprar cerveza",
  "descripcion": "Ir al supermercado",
  "completado": true
}
Editar título y descripción 📝
Descripción: Se cambia el título y la descripción de la tarea.

Comando en CMD:
curl -X PATCH http://localhost:3000/tareas/dc46e08a-771c-4956-943b-37055b3b529d -H "Content-Type: application/json" -d "{\"titulo\": \"Comprar vino\", \"descripcion\": \"Ir a la licorería\"}

Respuesta esperada:

{
  "id": "dc46e08a-771c-4956-943b-37055b3b529d",
  "titulo": "Comprar vino",
  "descripcion": "Ir a la licorería",
  "completado": true
}

Resultado esperado: La tarea ahora tiene un nuevo título y descripción.

Caso 3: Intentar actualizar con un ID inexistente ❌
Descripción: Se intenta actualizar una tarea que no existe en la base de datos.

Comando en CMD:
curl -X PATCH http://localhost:3000/tareas/11111111-2222-3333-4444-555555555555 -H "Content-Type: application/json" -d "{\"completado\": true}"

Respuesta esperada:

{
  "error": "Tarea no encontrada"

}
Resultado esperado: El servidor devuelve un error porque la tarea no existe

 Prubas automatizadas con jest:
 arrancas comando en consola npm test 

 my-app@1.0.0 test
> jestrs\Administrador\Documents\my-app>npm test

 PASS  test/tareas.test.js (8.877 s)
  API de Tareas
    √ POST /tareas - Crear tarea correctamente (359 ms)
    √ POST /tareas - Error sin título (10 ms)
    √ GET /tareas - Obtener todas las tareas (8 ms)
    √ GET /tareas/:id - Obtener tarea existente (7 ms)
    √ GET /tareas/:id - Error con ID inexistente (8 ms)
    √ PATCH /tareas/:id - Actualización correcta (8 ms)
    √ DELETE /tareas/:id - Eliminar tarea (7 ms)

----------|---------|----------|---------|---------|--------------------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|--------------------------------
All files |   80.55 |    46.42 |   71.42 |   83.87 |
 app.js   |   80.55 |    46.42 |   71.42 |   83.87 | 21,47,71,84,96,101-102,107-109
----------|---------|----------|---------|---------|--------------------------------
Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        10.775 s
Ran all test suites.


