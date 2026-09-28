import { describe, it, expect } from 'vitest';
import { taskService } from '../src/services/taskService.js';

describe('taskService', () => {
  it('should create a task and return it', () => {
    const task = taskService.createTask({
      title: 'Test task',
      description: 'This is a test task.',
      completed: false,
      dueDate: '2026-10-01',
      priority: 'High'
    });

    expect(task).toBeDefined();
    expect(task.title).toBe('Test task');
    expect(task.description).toBe('This is a test task.');
    expect(task.completed).toBe(false);
    expect(task.dueDate).toBe('2026-10-01');
    expect(task.priority).toBe('High');
  });

  it('should retrieve a task by its ID', () => {
    const task = taskService.createTask({
      title: 'Find me',
      description: 'Testing retrieval.',
      completed: false,
      dueDate: null,
      priority: null
    });

    const foundTask = taskService.getTaskById(task.id);

    expect(foundTask).toBeDefined();
    expect(foundTask.id).toBe(task.id);
    expect(foundTask.title).toBe('Find me');
  });

  it('should update a task', () => {
    const task = taskService.createTask({
      title: 'Original title',
      description: 'Original description',
      completed: false,
      dueDate: null,
      priority: 'Low'
    });

    const updatedTask = taskService.updateTask(task.id, {
      title: 'Updated title',
      description: 'Updated description',
      completed: true,
      dueDate: '2026-11-01',
      priority: 'High'
    });

    expect(updatedTask.title).toBe('Updated title');
    expect(updatedTask.description).toBe('Updated description');
    expect(updatedTask.completed).toBe(true);
    expect(updatedTask.dueDate).toBe('2026-11-01');
    expect(updatedTask.priority).toBe('High');
  });

  it('should delete a task', () => {
    const task = taskService.createTask({
      title: 'Delete me',
      description: 'This task should be deleted.',
      completed: false,
      dueDate: null,
      priority: null
    });

    const deleted = taskService.deleteTask(task.id);
    const foundTask = taskService.getTaskById(task.id);

    expect(deleted).toBe(true);
    expect(foundTask).toBeNull();
  });
});