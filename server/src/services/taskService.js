import { db } from '../db/database.js';

function formatTask(task) {
  if (!task) {
    return null;
  }

  return {
    ...task,
    completed: Boolean(task.completed)
  };
}

export const taskService = {
  getTasks() {
    const tasks = db.prepare(`
      SELECT
        id,
        title,
        description,
        completed,
        due_date AS dueDate,
        priority,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM tasks
      ORDER BY created_at DESC
    `).all();

    return tasks.map(formatTask);
  },

  getTaskById(id) {
    const task = db.prepare(`
      SELECT
        id,
        title,
        description,
        completed,
        due_date AS dueDate,
        priority,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM tasks
      WHERE id = ?
    `).get(id);

    return formatTask(task);
  },

  createTask({
    title,
    description = null,
    completed = false,
    dueDate = null,
    priority = null
  }) {
    const now = new Date().toISOString();
    const completedValue = completed ? 1 : 0;

    const result = db.prepare(`
      INSERT INTO tasks (
        title,
        description,
        completed,
        due_date,
        priority,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      title,
      description,
      completedValue,
      dueDate,
      priority,
      now,
      now
    );

    return this.getTaskById(result.lastInsertRowid);
  },

  updateTask(
    id,
    {
      title,
      description = null,
      completed = false,
      dueDate = null,
      priority = null
    }
  ) {
    const now = new Date().toISOString();
    const completedValue = completed ? 1 : 0;

    const result = db.prepare(`
      UPDATE tasks
      SET
        title = ?,
        description = ?,
        completed = ?,
        due_date = ?,
        priority = ?,
        updated_at = ?
      WHERE id = ?
    `).run(
      title,
      description,
      completedValue,
      dueDate,
      priority,
      now,
      id
    );

    if (result.changes === 0) {
      return null;
    }

    return this.getTaskById(id);
  },

  deleteTask(id) {
    const result = db.prepare(`
      DELETE FROM tasks
      WHERE id = ?
    `).run(id);

    return result.changes > 0;
  }
};