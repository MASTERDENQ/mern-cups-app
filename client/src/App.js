import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import ManagerControlCenter from "./components/ManagerControlCenter";
import NavBar from "./components/NavBar";
import CreateAccount from "./components/CreateAccount";
import AddItem from "./components/AddItem";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemsList from "./components/ItemsList";
import CustomerMenu from "./components/CustomerMenu";
import ConfirmOrder from "./components/ConfirmOrder";
import ViewEditItems from "./components/ViewEditItems";
import Test from "./components/auth/TestUpload";
import AddItemTest from "./components/AddItemTest";

// import BarGraph from "./components/BarGraph";

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
            <Route path="/menu" component={CustomerMenu} />
            <Route path="/confirm" component={ConfirmOrder} />
            <Route path="/view" component={ViewEditItems} />
            <Route path="/test" component={Test} />
            <Route path="/add1" component={AddItemTest} />
            {/* <Route path="/graph" component={BarGraph} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
