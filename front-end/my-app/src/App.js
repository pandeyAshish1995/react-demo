import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Forget from "./Screen/Forget";
import Reset from "./Screen/Reset";
import IndexPpl from "./Screen/IndexPpl";
import Main from "./Screen/Main";
import { Redirect } from "react-router-dom";
import Timeline from "./Screen/Timeline";

/*import { validateInstance } from "validate-react";*/
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        {localStorage.getItem("userName") != null ? (
          <div>
            <Switch>
              <Route exact path="/forget" component={Forget} />
              <Route path="/reset/:id" component={Reset} />
              <Route path="/timeline" component={Timeline} />
              <Route path="/index" component={IndexPpl} />
              <Route path="/" component={Main} />
            </Switch>
          </div>
        ) : (
          <Switch>
            <Route path="/reset/:id" component={Reset} />
            <Route exact path="/forget" component={Forget} />
            <Route path="/" component={Main} />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
