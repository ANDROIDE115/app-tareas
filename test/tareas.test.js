const { app, server, tareas, findTareaById } = require('../app');
const request = require('supertest');

afterAll((done) => {
  server.close(done);
});

beforeEach(() => {
  tareas.length = 0; // Limpiar tareas antes de cada test
});

describe('API de Tareas', () => {
  test('POST /tareas - Crear tarea correctamente', async () => {
    const response = await request(app)
      .post('/tareas')
      .send({ titulo: 'Test', descripcion: 'Descripción test' });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(tareas.length).toBe(1);
  });

  test('POST /tareas - Error sin título', async () => {
    const response = await request(app)
      .post('/tareas')
      .send({ titulo: '' });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('El título es obligatorio');
  });

  test('GET /tareas - Obtener todas las tareas', async () => {
    tareas.push({ id: '1', titulo: 'Test', completado: false });
    const response = await request(app).get('/tareas');
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('GET /tareas/:id - Obtener tarea existente', async () => {
    tareas.push({ id: 'test-id', titulo: 'Test' });
    const response = await request(app).get('/tareas/test-id');
    
    expect(response.status).toBe(200);
    expect(response.body.id).toBe('test-id');
  });

  test('GET /tareas/:id - Error con ID inexistente', async () => {
    const response = await request(app).get('/tareas/fake-id');
    expect(response.status).toBe(404);
  });

  test('PATCH /tareas/:id - Actualización correcta', async () => {
    tareas.push({ id: '1', titulo: 'Original', completado: false });
    const response = await request(app)
      .patch('/tareas/1')
      .send({ titulo: 'Actualizado', completado: true });
    
    expect(response.status).toBe(200);
    expect(response.body.titulo).toBe('Actualizado');
    expect(response.body.completado).toBe(true);
  });

  test('DELETE /tareas/:id - Eliminar tarea', async () => {
    tareas.push({ id: 'delete-id', titulo: 'Para eliminar' });
    const response = await request(app).delete('/tareas/delete-id');
    
    expect(response.status).toBe(204);
    expect(tareas.length).toBe(0);
  });
});