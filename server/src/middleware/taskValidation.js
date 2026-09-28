import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High']).optional()
});

export function validateTask(req, res) {
  const result = taskSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: 'Invalid task data.',
      details: result.error.issues
    });

    return false;
  }

  return true;
}