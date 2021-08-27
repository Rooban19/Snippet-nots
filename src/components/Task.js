import { AiFillDelete } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

const Task = ({ task, onDelete, onToggle }) => {
  const history = useHistory();

  return (
    <div
      className={`task ${task.reminder && 'reminder'}`}
      onClick={() =>
        history.push('/details', { title: task.text, desc: task.user })
      }>
      <h3>
        {task.text}{' '}
        <AiFillDelete
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      {/* <p>{task.time}</p> */}
      <p>
        {' '}
        {task.user.length > 50
          ? task.user.slice(0, 80) + '. . . . .'
          : task.user}
      </p>
    </div>
  );
};

export default Task;
