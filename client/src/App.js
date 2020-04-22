import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import ManagerControlCenter from "./components/manager/ManagerControlCenter";
import NavBar from "./components/NavBar";
import AddItem from "./components/manager/AddItem";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemsList from "./components/manager/ItemsList";
import CustomerMenu from "./components/customer/CustomerMenu";
import Test from "./components/auth/TestUpload";
import AddItemTest from "./components/manager/AddItemTest";
// import BarGraph from "./components/BarGraph";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      username: "",
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data, username) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data,
      username: username,
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/* NavBar rendered always as header  */}

          <NavBar
            loggedInStatus={this.state.loggedInStatus}
            username={this.state.username}
          />

          <Switch>
            <Route
              exact
              path={"/"}
              render={(props) => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />

            <Route
              exact
              path={"/add"}
              render={(props) => (
                <AddItem
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />

            <Route
              exact
              path={"/test"}
              render={(props) => (
                <Test {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />

            <Route
              exact
              path={"/add1"}
              render={(props) => (
                <AddItemTest
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />

            <Route
              exact
              path={"/control"}
              render={(props) => (
                <ManagerControlCenter
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />

            <Route
              exact
              path={"/list"}
              render={(props) => (
                <ItemsList
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />

            <Route
              exact
              path={"/menu"}
              render={(props) => (
                <CustomerMenu
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />

            {/* <Route path="*" return={Page_Not_Found_404} /> */}
            {/* <Route path="/graph" component={BarGraph} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
