import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";

import Home from "./components/Home";
import Login from "./components/Login";
import ManagerControlCenter from "./components/ManagerControlCenter";
import NavBar from "./components/NavBar";
import CreateAccount from "./components/CreateAccount";
import AddItem from "./components/AddItem";

import { BrowserRouter as Router, Route } from "react-router-dom";
import ItemsList from "./components/ItemsList";
import ItemModal from "./components/ItemModal";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* NavBar rendered always as header  */}
          <NavBar />

          <Route path="/" exact component={Home} />
          <Route path="/add" component={AddItem} />
          <Route path="/login" component={Login} />
          <Route path="/create" component={CreateAccount} />
          <Route path="/control" component={ManagerControlCenter} />
          <Route path="/list" component={ItemsList} />
        </div>
      </Router>

      // <div className="App">
      //   <NavBar />

      //   <Container>
      //     {/* <AddItem /> */}
      //     <ItemModal />
      //     <ItemsList />
      //   </Container>
      // </div>
    );
  }
}

export default App;
