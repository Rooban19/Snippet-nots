import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'hello there', time: '12:27 AM 27/8/2021', user: 'Rooban' },
  ]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
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

    // const res = await fetch('http://localhost:5000/tasks', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(task),
    // });

    // const data = await res.json();

    // setTasks([...tasks, data]);
    var today = new Date();
    var time = today.getHours() + ':' + today.getMinutes();
    var date =
      +today.getDate() +
      '/' +
      (today.getMonth() + 1) +
      '/' +
      today.getFullYear();
    const timestamp = time + ' AM ' + date;
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = {
      id: id,
      text: task.text,
      time: timestamp,
      user: task.day,
    };
    setTasks([...tasks, newTask]);
    console.log(tasks);
  };

  // Delete Task
  const deleteTask = async (id) => {
    // const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: 'DELETE',
    // });
    // //We should control the response status to decide if we will change the state or not.
    // res.status === 200
    //  ?setTasks( tasks.filter( ( task ) => task.id !== id ) )
    setTasks(tasks.filter((task) => task.id !== id));
    //: alert('Error Deleting This Task');
  };

  // Toggle Reminder
  const toggleReminder = () => {};

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        {/* <Route
          path='/'
          exact
          render={(props) => (
            <> */}
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder}
          />
        ) : (
          'No Tasks To Show'
        )}
        {/* </>
          )}
        />
        <Route path='/about' component={About} /> */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
