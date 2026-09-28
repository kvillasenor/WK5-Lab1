import { useState } from 'react';

function TaskForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create Task</h2>

      <div className="task-form-field">
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="task-form-field">
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div className="task-form-field">
        <label htmlFor="task-due-date">Due Date</label>
        <input
          id="task-due-date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="task-form-field">
        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="">Select a priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;