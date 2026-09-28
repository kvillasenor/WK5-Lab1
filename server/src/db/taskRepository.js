import db from './database.js';

const getAllTasksStatement = db.prepare(`
  SELECT
    id,
    title,
    description,
    completed,
    due_date,
    priority,
    created_at,
    updated_at
  FROM tasks
  ORDER BY id DESC
`);

const getTaskByIdStatement = db.prepare(`
  SELECT
    id,
    title,
    description,
    completed,
    due_date,
    priority,
    created_at,
    updated_at
  FROM tasks
  WHERE id = ?
`);

const createTaskStatement = db.prepare(`
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
`);

const updateTaskStatement = db.prepare(`
  UPDATE tasks
  SET
    title = ?,
    description = ?,
    completed = ?,
    due_date = ?,
    priority = ?,
    updated_at = ?
  WHERE id = ?
`);

const deleteTaskStatement = db.prepare(`
  DELETE FROM tasks
  WHERE id = ?
`);

export function getAllTasks() {
  return getAllTasksStatement.all();
}

export function getTaskById(id) {
  return getTaskByIdStatement.get(id);
}

export function createTask({
  title,
  description = null,
  completed = 0,
  dueDate = null,
  priority = null,
  createdAt,
  updatedAt
}) {
  const result = createTaskStatement.run(
    title,
    description,
    completed,
    dueDate,
    priority,
    createdAt,
    updatedAt
  );

  return getTaskById(result.lastInsertRowid);
}

export function updateTask(
  id,
  {
    title,
    description = null,
    completed = 0,
    dueDate = null,
    priority = null,
    updatedAt
  }
) {
  const result = updateTaskStatement.run(
    title,
    description,
    completed,
    dueDate,
    priority,
    updatedAt,
    id
  );

  if (result.changes === 0) {
    return null;
  }

  return getTaskById(id);
}

export function deleteTask(id) {
  const result = deleteTaskStatement.run(id);

  return result.changes > 0;
}