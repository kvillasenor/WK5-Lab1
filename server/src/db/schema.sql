CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed INTEGER NOT NULL DEFAULT 0 CHECK (completed IN (0, 1)),
  due_date TEXT,
  priority TEXT CHECK (priority IN ('Low', 'Medium', 'High') OR priority IS NULL),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
