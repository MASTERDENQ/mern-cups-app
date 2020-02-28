import React from 'react';
import './App.css';
import Login from './components/Login'
import ManagerControlCenter from './components/ManagerControlCenter'
import NavBar from './components/NavBar'
import CreateAccount from './components/CreateAccount'
import AddItem from './components/AddItem';

function LoginCheck() {
  
  return true;
}

function App() {
  return (
    LoginCheck() ?
    <div>
      <AddItem />
    </div> :
    <div>
    <NavBar />
    <ManagerControlCenter />
  </div> 
  );
}

export default App;
