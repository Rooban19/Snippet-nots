import { AiFillDelete } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

const Task = ({ task, onDelete, onToggle }) => {
  const history = useHistory();

  return (
    <div className={`task ${task.reminder && 'reminder'}`}>
      <h3>
        {task.title}{' '}
        <AiFillDelete
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      {/* <p>{task.time}</p> */}
      <p>
        {' '}
        {task.text.length > 50
          ? task.text.slice(0, 80) + '. . . . .'
          : task.text}
      </p>
    </div>
  );
};

export default Task;
