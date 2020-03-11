import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import ManagerControlCenter from "./components/ManagerControlCenter";
import NavBar from "./components/NavBar";
import CreateAccount from "./components/CreateAccount";
import AddItem from "./components/AddItem";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemsList from "./components/ItemsList";
import ItemModal from "./components/ItemModal";
import Item from "./components/Item";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* NavBar rendered always as header  */}
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add" component={AddItem} />
            <Route path="/create" component={CreateAccount} />
            <Route path="/control" component={ManagerControlCenter} />
            <Route path="/list" exact component={ItemsList} />
            <Route path="/list/item" component={Item} />
          </Switch>
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
