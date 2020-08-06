import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Redirect } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div>
        <Header userName={localStorage.getItem("userName")} />
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <Switch>
                <Route exact path="/" render={props => <Register {...props} />} />
                {localStorage.getItem("userName") != null ? (
                  <Redirect to="/timeline" />
                ) : (
                  <Route path="/reg" component={Login} />
                )}
              </Switch>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                alteration in some form, by injected humour, or randomised words which don't look even slightly
                believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
                embarrassing hidden in the middle of text.
              </p>
              <img src="images/img_9.png" alt="imageHere" />
            </div>
          </div>
        </div>
        <div className="clear" />
        <Footer />
      </div>
    );
  }
}
export default Main;
