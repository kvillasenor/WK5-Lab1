import { useEffect, useState } from 'react';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from '../services/taskService';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadTasks();
  }, []);

  async function handleCreateTask(task) {
  try {
    const taskData = {
      ...task,
      priority: task.priority || undefined
    };

    const newTask = await createTask(taskData);

    setTasks((previousTasks) => [
      newTask,
      ...previousTasks
    ]);

    setError('');
  } catch (error) {
    setError(error.message);
  }
}

async function handleCompleteTask(task) {
  try {
    const updatedTask = await updateTask(task.id, {
      title: task.title,
      description: task.description,
      completed: true,
      dueDate: task.dueDate,
      priority: task.priority
    });

    setTasks((previousTasks) =>
      previousTasks.map((currentTask) =>
        currentTask.id === updatedTask.id
          ? updatedTask
          : currentTask
      )
    );

    setError('');
  } catch (error) {
    setError(error.message);
  }
}

async function handleDeleteTask(id) {
  try {
    await deleteTask(id);

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );

    setError('');
  } catch (error) {
    setError(error.message);
  }
}

async function handleEditTask(id, task) {
  try {
    const taskData = {
      ...task,
      priority: task.priority || undefined
    };

    const updatedTask = await updateTask(id, taskData);

    setTasks((previousTasks) =>
      previousTasks.map((currentTask) =>
        currentTask.id === updatedTask.id
          ? updatedTask
          : currentTask
      )
    );

    setError('');
    return true;
  } catch (error) {
    setError(error.message);
    return false;
  }
}
  return (
    <main className="tasks-page">
      <header className="tasks-page-header">
        <h1>Task Management</h1>
        <p>Manage your tasks in one place.</p>
      </header>

      <div className="tasks-page-content">
        {error && (
          <p role="alert" className="tasks-page-error">
            {error}
          </p>
        )}

        <TaskForm onSubmit={handleCreateTask} />

        <TaskList
          tasks={tasks}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </div>
    </main>
  );
}

export default TasksPage;