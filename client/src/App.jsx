import TasksPage from './pages/TasksPage';

function App({ tasks = [], onSubmit }) {
  return (
    <TasksPage
      tasks={tasks}
      onSubmit={onSubmit}
    />
  );
}

export default App;