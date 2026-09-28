import TaskItem from './TaskItem';

function TaskList({ tasks = [], onComplete, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <section className="task-list" aria-labelledby="task-list-heading">
        <h2 id="task-list-heading">Tasks</h2>
        <p className="task-list-empty">No tasks available.</p>
      </section>
    );
  }

  return (
    <section className="task-list" aria-labelledby="task-list-heading">
      <h2 id="task-list-heading">Tasks</h2>

      <ul className="task-list-items">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskItem
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TaskList;