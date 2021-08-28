import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Tasks from './Tasks';
import AddTask from './AddTask';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ModalUpdate from './ModalUpdate';
import api from '../api';
import Cookies from 'js-cookie';

const Snippets = (props) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modalData, setModalData] = useState({ title: '', text: '', tag: '' });

  const cookie = Cookies.get('token');
  Modal.setAppElement('#root');
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);
  console.log(tasks.length, 'TT');
  function requestoptionsget(methodss, task) {
    return {
      method: methodss,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookie,
      },

      body: JSON.stringify({
        title: task.text,
        text: task.day,
        tag: task.tag,
      }),
    };
  }

  const fetchTasks = async () => {
    const res = await fetch(`${api}getsnip/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookie,
      },
    });
    const data = await res.json();
    if (data.code != 200) {
      return [];
    }
    console.log(data);
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
    const requestoptions = await requestoptionsget('POST', task);
    console.log('re', requestoptions);
    const response = await fetch(`${api}${'createsnip/'}`, requestoptions);
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
        Authorization: cookie,
      },
      body: JSON.stringify({
        snipid: id,
      }),
    });
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  };
  const onTaskClicked = async (id) => {
    console.log('ID Clicked ', id);
    const res = await fetch(`${api}detailview/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookie,
      },
      body: JSON.stringify({
        snipid: id,
      }),
    });

    const data = await res.json();
    if (data.code === 200) {
      setModalData(data.result[0]);
    }
    console.log(data);
    setModalOpen(true);
  };

  const updateTask = async (id, title, text, tag) => {
    console.log(text, title);
    const res = await fetch(`${api}updatesnip/`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookie,
      },
      body: JSON.stringify({
        id: id,
        title: title,
        text: text,
        tag: tag,
      }),
    });
    const data = await res.json();
    if (data.code != 200) {
      return [];
    }
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
    setModalOpen(false);
  };

  return (
    <div>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        overlayClassName='modaloverlay'
        className='modalcontainer'>
        <ModalUpdate
          onUpdateTask={updateTask}
          id={modalData.id}
          title={modalData.title}
          desc={modalData.text}
          tagg={modalData.tag.title}
        />
      </Modal>
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={onTaskClicked} />
      ) : (
        'No Tasks To Show'
      )}
    </div>
  );
};

Snippets.propTypes = {};

export default Snippets;
