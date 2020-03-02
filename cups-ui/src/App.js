import React from 'react';
import './App.css';

import Home from './components/Home'
import Login from './components/Login'
import ManagerControlCenter from './components/ManagerControlCenter'
import NavBar from './components/NavBar'
import CreateAccount from './components/CreateAccount'
import AddItem from './components/AddItem';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// function LoginCheck() {
//   return false;
// }

function App() {

  return(
    <Router>
      <div className="App">

        <NavBar/>

        <Route path="/" exact component={Home} />
        <Route path="/add" component={AddItem} />
        <Route path="/login" component={Login} />
        <Route path="/create" component={CreateAccount} />
        <Route path="/control" component={ManagerControlCenter} />

      </div>
    </Router>
  );

  // return (
  //   LoginCheck() ? 
  //     <div> <AddItem /> </div> :

  //   <div>
  //     <NavBar />
  //     <ManagerControlCenter />
  //   </div> 
  // );
}

export default App;
