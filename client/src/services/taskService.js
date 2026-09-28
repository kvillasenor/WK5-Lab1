const API_BASE_URL = '/api/tasks';

export async function getTasks() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error('Failed to retrieve tasks.');
  }

  return response.json();
}

export async function createTask(task) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    throw new Error('Failed to create task.');
  }

  return response.json();
}

export async function updateTask(id, task) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    throw new Error('Failed to update task.');
  }

  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete task.');
  }
}