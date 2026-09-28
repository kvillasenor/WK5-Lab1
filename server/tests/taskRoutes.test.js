import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Task API integration tests', () => {
  it('should return a list of tasks', async () => {
    const response = await request(app)
      .get('/api/tasks');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Integration test task',
        description: 'Created through the API.',
        completed: false,
        dueDate: '2026-10-15',
        priority: 'High'
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Integration test task');
    expect(response.body.completed).toBe(false);
    expect(response.body.priority).toBe('High');
  });

  it('should retrieve a task by ID', async () => {
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Retrieve integration test',
        description: 'Testing GET by ID.',
        completed: false,
        dueDate: '2026-10-20',
        priority: 'Medium'
      });

    const taskId = createResponse.body.id;

    const response = await request(app)
      .get(`/api/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(taskId);
    expect(response.body.title).toBe('Retrieve integration test');
  });

  it('should update a task', async () => {
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Original integration task',
        description: 'Original description.',
        completed: false,
        dueDate: '2026-10-25',
        priority: 'Low'
      });

    const taskId = createResponse.body.id;

    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({
        title: 'Updated integration task',
        description: 'Updated description.',
        completed: true,
        dueDate: '2026-11-01',
        priority: 'High'
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated integration task');
    expect(response.body.description).toBe('Updated description.');
    expect(response.body.completed).toBe(true);
    expect(response.body.priority).toBe('High');
  });

  it('should delete a task', async () => {
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Delete integration task',
        description: 'This task will be deleted.',
        completed: false,
        dueDate: '2026-10-30',
        priority: 'Low'
      });

    const taskId = createResponse.body.id;

    const deleteResponse = await request(app)
      .delete(`/api/tasks/${taskId}`);

    expect(deleteResponse.status).toBe(200);

    const getResponse = await request(app)
      .get(`/api/tasks/${taskId}`);

    expect(getResponse.status).toBe(404);
  });

  it('should reject invalid task data', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: '',
        completed: false
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid task data.');
  });

  it('should return 404 for a task that does not exist', async () => {
    const response = await request(app)
      .get('/api/tasks/999999');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Task not found.');
  });
});