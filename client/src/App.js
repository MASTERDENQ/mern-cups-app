import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import ManagerControlCenter from "./components/manager/ManagerControlCenter";
import NavBar from "./components/NavBar";
import AddItem from "./components/manager/AddItem";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemsList from "./components/manager/ItemsList";
import CustomerMenu from "./components/customer/CustomerMenu";
import ConfirmOrder from "./components/customer/ReviewOrder";
import ViewEditItems from "./components/manager/ViewEditItems";
import Test from "./components/auth/TestUpload";
import AddItemTest from "./components/manager/AddItemTest";
// import BarGraph from "./components/BarGraph";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/* NavBar rendered always as header  */}

          <NavBar />

          <Switch>
            <Route
              exact
              path={"/"}
              render={(props) => (
                <Home {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />

            <Route path="/add" component={AddItem} />

            <Route path="/control" component={ManagerControlCenter} />

            <Route
              exact
              path="/list"
              render={(props) => (
                <ItemsList
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />

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
