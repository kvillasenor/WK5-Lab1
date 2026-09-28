import { useState } from 'react';

function TaskItem({ task, onComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);

  const { title, description, dueDate, priority, completed } = task;

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  return (
    <article className={`task-item${completed ? ' task-item-completed' : ''}`}>
      <header className="task-item-header">
        <h3 className="task-item-title">{title}</h3>

        <span
          className={`task-item-status ${
            completed
              ? 'task-item-status-completed'
              : 'task-item-status-pending'
          }`}
        >
          {completed ? 'Completed' : 'Incomplete'}
        </span>
      </header>

      {isEditing ? (
        <form
            className="task-item-edit"
            onSubmit={(event) => {
              event.preventDefault();

              const formData = new FormData(event.currentTarget);

              onEdit(task.id, {
                title: formData.get('title'),
                description: formData.get('description'),
                completed: task.completed,
                dueDate: formData.get('dueDate'),
                priority: formData.get('priority') || undefined
              });

              setIsEditing(false);
            }}
          >
            <div className="task-form-field">
              <label htmlFor={`edit-title-${task.id}`}>Title</label>
              <input
                id={`edit-title-${task.id}`}
                name="title"
                type="text"
                defaultValue={task.title}
                required
              />
            </div>

            <div className="task-form-field">
              <label htmlFor={`edit-description-${task.id}`}>
                Description
              </label>
              <textarea
                id={`edit-description-${task.id}`}
                name="description"
                defaultValue={task.description || ''}
                rows="4"
              />
            </div>

            <div className="task-form-field">
              <label htmlFor={`edit-due-date-${task.id}`}>
                Due Date
              </label>
              <input
                id={`edit-due-date-${task.id}`}
                name="dueDate"
                type="date"
                defaultValue={task.dueDate || ''}
              />
            </div>

            <div className="task-form-field">
              <label htmlFor={`edit-priority-${task.id}`}>
                Priority
              </label>
              <select
                id={`edit-priority-${task.id}`}
                name="priority"
                defaultValue={task.priority || ''}
              >
                <option value="">Select a priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <button type="submit">Save Changes</button>

            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
        </form>
      ) : (
        <>
          <p className="task-item-description">
            {description || 'No description provided.'}
          </p>

          <dl className="task-item-details">
            <div>
              <dt>Due date</dt>
              <dd>{dueDate || 'No due date'}</dd>
            </div>

            <div>
              <dt>Priority</dt>
              <dd>{priority || 'Not specified'}</dd>
            </div>
          </dl>

          <div className="task-item-actions">
            {!completed && (
              <button type="button" onClick={() => onComplete(task)}>
                Complete
              </button>
            )}

            <button type="button" onClick={handleEditClick}>
              Edit
            </button>

            <button type="button" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export default TaskItem;