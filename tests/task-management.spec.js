import { test, expect } from '@playwright/test';

test('user can create, edit, complete, and delete a task', async ({ page }) => {
  await page.goto('/');

  const taskTitle = `E2E Test Task ${Date.now()}`;
  const updatedTaskTitle = `${taskTitle} Updated`;

  // Create a task
  await page.getByLabel('Title').fill(taskTitle);
  await page.getByLabel('Description').fill('Created by Playwright.');
  await page.getByLabel('Due Date').fill('2026-12-01');
  await page.getByLabel('Priority').selectOption('High');

  await page.getByRole('button', { name: 'Add Task' }).click();

  // Find the task that was just created
  const task = page.locator('.task-item').filter({
    has: page.getByRole('heading', { name: taskTitle })
  });

  // Verify the task appears
  await expect(task).toBeVisible();

  // Edit the task
  await task.getByRole('button', { name: 'Edit' }).click();

  await task.getByLabel('Title').fill(updatedTaskTitle);

  await task.getByRole('button', { name: 'Save Changes' }).click();

  // Verify the edit
  await expect(
    task.getByRole('heading', { name: updatedTaskTitle })
  ).toBeVisible();

  // Complete the task
  await task.getByRole('button', { name: 'Complete' }).click();

  await expect(task.getByText('Completed')).toBeVisible();

  // Delete the task
  await task.getByRole('button', { name: 'Delete' }).click();

  // Verify the task was deleted
  await expect(task).not.toBeVisible();
});