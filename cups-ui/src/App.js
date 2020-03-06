import React from 'react';
import './App.css';

import Home from './components/Home'
import Login from './components/Login'
import ManagerControlCenter from './components/ManagerControlCenter'
import NavBar from './components/NavBar'
import CreateAccount from './components/CreateAccount'
import AddItem from './components/AddItemNew'

import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {

  return(
    <Router>
      <div className="App">
        {/* NavBar rendered always as header  */}
        <NavBar/>

        <Route path="/" exact component={Home} />
        <Route path="/add" component={AddItem} />
        <Route path="/login" component={Login} />
        <Route path="/create" component={CreateAccount} />
        <Route path="/control" component={ManagerControlCenter} />

      </div>
    </Router>
  );

}

export default App;
