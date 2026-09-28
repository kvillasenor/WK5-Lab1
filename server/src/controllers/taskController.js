import { taskService } from '../services/taskService.js';
import { validateTask } from '../middleware/taskValidation.js';

export function getTasks(_req, res, next) {
  try {
    const tasks = taskService.getTasks();

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}

export function getTaskById(req, res, next) {
  try {
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
      return res.status(400).json({
        error: 'Task ID must be a valid number.'
      });
    }

    const task = taskService.getTaskById(taskId);

    if (!task) {
      return res.status(404).json({
        error: 'Task not found.'
      });
    }

    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

export function createTask(req, res, next) {
  try {
    if (!validateTask(req, res)) {
      return;
    }

    const task = taskService.createTask(req.body);

    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export function updateTask(req, res, next) {
  try {
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
      return res.status(400).json({
        error: 'Task ID must be a valid number.'
      });
    }

    if (!validateTask(req, res)) {
      return;
    }

    const task = taskService.updateTask(taskId, req.body);

    if (!task) {
      return res.status(404).json({
        error: 'Task not found.'
      });
    }

    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

export function deleteTask(req, res, next) {
  try {
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
      return res.status(400).json({
        error: 'Task ID must be a valid number.'
      });
    }

    const deleted = taskService.deleteTask(taskId);

    if (!deleted) {
      return res.status(404).json({
        error: 'Task not found.'
      });
    }

    return res.status(200).json({
      message: 'Task deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
}