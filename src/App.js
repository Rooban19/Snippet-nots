import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import Snippets from './components/Snippets';
import Details from './components/details';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Route path='/' exact component={Login} />
        <Route path='/snippets' component={Snippets} />
        <Route path='/details' component={Details} />
      </div>
    </Router>
  );
};

export default App;
