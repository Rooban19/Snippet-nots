import { useState } from 'react';
import moment from 'moment';
import api from '../api';

const ModalUpdate = ({ onUpdateTask, title, desc, id }) => {
  const [text, setText] = useState(title);
  const [day, setDay] = useState(desc);
  const [reminder, setReminder] = useState(false);
  console.log(id, text, day);
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please add a task');
      return;
    }
    console.log(id, text, day);

    onUpdateTask(id, text, day);

    // setText('');
    // setDay('');
  };

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Title</label>
        <input
          type='text'
          placeholder='Enter the title'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Description</label>
        <input
          type='text'
          placeholder='Enter the description'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>

      <input type='submit' value='Save' className='btn btn-block' />
    </form>
  );
};

export default ModalUpdate;
