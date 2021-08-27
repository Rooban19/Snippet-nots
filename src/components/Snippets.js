import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Tasks from './Tasks';
import AddTask from './AddTask';
import PropTypes from 'prop-types';
import api from '../api';

const Snippets = (props) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);
  console.log(tasks);
  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(`${api}getsnip/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJvb2JhbmRjOEBnbWFpbC5jb20ifQ.OGrEymIqN3f9EAcdVJJfi_KSZQfDDnGGY7ywSXVLutU',
      }),
    });
    const data = await res.json();

    return data.result;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  const addTask = async (task) => {
    console.log('TASK ', task);

    const response = await fetch(`${api}${'createsnip/'}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: task.text,
        text: task.day,
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJvb2JhbmRjOEBnbWFpbC5jb20ifQ.OGrEymIqN3f9EAcdVJJfi_KSZQfDDnGGY7ywSXVLutU',
      }),
    });

    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  };

  // Delete Task
  const deleteTask = async (id) => {
    console.log('DELETE ID ', id);
    const res = await fetch(`${api}${'deletesnip'}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        snipid: id,
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJvb2JhbmRjOEBnbWFpbC5jb20ifQ.OGrEymIqN3f9EAcdVJJfi_KSZQfDDnGGY7ywSXVLutU',
      }),
    });
    // //We should control the response status to decide if we will change the state or not.
    // res.status === 200
    //  ?setTasks( tasks.filter( ( task ) => task.id !== id ) )
    // setTasks(tasks.filter((task) => task.id !== id));
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
    //: alert('Error Deleting This Task');
  };

  // Toggle Reminder
  const toggleReminder = () => {};

  return (
    <div>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No Tasks To Show'
      )}
    </div>
  );
};

Snippets.propTypes = {};

export default Snippets;
