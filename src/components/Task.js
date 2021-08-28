import { AiFillDelete } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

const Task = ({ task, onDelete, onToggle }) => {
  const history = useHistory();

  return (
    <div className='task'>
      <h3>
        <div onClick={() => onToggle(task.id)}> {task.title} </div>
        <AiFillDelete
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />
      </h3>

      {/* <p>{task.time}</p> */}
    </div>
  );
};

export default Task;
