import Task from './Task';

const Tasks = ({ tasks, onDelete, onToggle }) => {
  console.log(typeof tasks, 'TASK COMPONENT');
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  );
};

export default Tasks;
