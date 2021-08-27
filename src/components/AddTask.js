import { useState } from 'react';
import moment from 'moment';
import api from '../api';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please add a task');
      return;
    }

    onAdd({ text, day, reminder });

    setText('');
    setDay('');
    setReminder(false);
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

export default AddTask;
