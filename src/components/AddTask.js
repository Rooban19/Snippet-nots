import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import moment from 'moment';
import api from '../api';
import Cookies from 'js-cookie';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [tag, setTag] = useState('');
  const [options, setOptions] = useState([]);
  console.log('TAG SELECT ', tag);
  const onSubmit = async (e) => {
    e.preventDefault();

    if (text != '' && day != '' && tag != '') {
      onAdd({ text, day, tag });
      console.log(text, day, tag);
      setText('');
      setDay('');
      setTag('');
      setOptions([]);
    } else {
      alert('Please fill the details and click save');
    }
  };

  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(actionMeta.action);
    if (actionMeta.action === 'select-option') {
      setTag(newValue.label);
    }
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.log(inputValue);
    if (inputValue !== '') {
      setTag(inputValue);
    }

    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const getList = async () => {
    const response = await fetch(`${api}gettags/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    });
    const data = await response.json();
    let taglist = [];
    const resut = data.result;
    for (const key in resut) {
      taglist.push({ value: resut[key].value, label: resut[key].value });
    }
    console.log(taglist);
    setOptions(taglist);
    console.log(data);
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

      <label>Tag</label>
      <CreatableSelect
        isClearable
        onChange={handleChange}
        onFocus={getList}
        onInputChange={handleInputChange}
        options={options}
      />

      <input type='submit' value='Save' className='btn btn-block' />
    </form>
  );
};

export default AddTask;
