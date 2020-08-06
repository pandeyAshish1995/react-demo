import React, { Component } from "react";
//import { validateInstance } from "validate-react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { isMailValid } from "../component/utility";
import { login, loginPass } from "../AppServices";
import ActivityIndicator from "../component/ActivityIndicator";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailAlert: "",
      passAlert: "",
      _id: "",
      verifyAlert: "",
      error: false
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value
    }));
    let { email } = this.state;
    if ("email" === event.target.name) {
      if (isMailValid({ data: email })) {
        this.setState({
          emailAlert: "",
          error: true
        });
      } else {
        this.setState({
          emailAlert: "input Valid email",
          error: false
        });
      }
    }
    if ("password" === event.target.name) {
      if (this.state.password.trim().length > 5) {
        this.setState({
          passAlert: ""
        });
      } else {
        this.setState({
          passAlert: "Passwords must contain at least six characters"
        });
      }
    }
  };

  showPassword = () => {
    let x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { userName, firstName, lastName, email, password } = this.state;
    if (isMailValid({ data: email })) {
      this.setState({
        emailAlert: "",
        error: true
      });
    } else {
      this.setState({
        emailAlert: "input valid email",
        error: true
      });
      return;
    }
    try {
      if (this.state.password.trim().length > 5 && this.state.error === true) {
        let allData = {
          email: email,
          password: password
        };
        let responseJsonEmailExist = await login({ params: allData });
        if (responseJsonEmailExist.length > 0) {
          let EmailpassMatch = await loginPass({ params: allData });
          if (EmailpassMatch.length > 0) {
            localStorage.setItem("_id", EmailpassMatch[0]._id);
            localStorage.setItem("userName", EmailpassMatch[0].userName);

            this.props.history.push({
              pathname: "/timeline",
              state: {
                email: EmailpassMatch[0].email,
                _id: EmailpassMatch[0]._id
              }
            });
          } else {
            console.log(" password not match not match");
            this.setState({ passAlert: "password not matched " });
          }
        } else {
          this.setState({
            emailAlert: "Your email not exist!"
          });
        }
      } else {
        if (this.state.password.length < 6) {
          this.setState({
            passAlert: "enter at least 6 length"
          });
        }
      }
    } catch (err) {
      alert("errHappened inLogin");
    }
  };

  render() {
    const { password, email } = this.state;
    return (
        <div className="login_sec">
          <h1 id="alert">
            Log In
            {this.state.verifyAlert}
          </h1>
          <ul>
            <form onSubmit={this.handleSubmit}>
              <li>
                <span>Email-ID</span>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  onChange={this.handleChange}
                  style={{
                    borderColor: email === "" ? "red" : ""
                  }}
                  value={this.state.email}
                />
                <p style={{ color: "red" }}>{this.state.emailAlert}</p>
              </li>
              <li>
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  id="myInput"
                  placeholder="Enter Password"
                  onChange={this.handleChange}
                  style={{
                    borderColor: password === "" ? "red" : ""
                  }}
                  value={this.state.password}
                />
                <br />
                <br />
                <input type="checkbox" onClick={this.showPassword} />
                show Password
                <p style={{ color: "red" }}>{this.state.passAlert}</p>
              </li>
              <li />
              <li>
                <input type="submit" defaultValue="Log In" />
                <Link
                  to={{
                    pathname: "/forget",
                    state: { _id: localStorage.getItem("_id") }
                  }}
                >
                  <a href>Forgot Password</a>
                </Link>
              </li>
            </form>
          </ul>

          <Link to="/">
            <div className="addtnal_acnt">
              I do not have any account yet.
              <a href>Create My Account Now !</a>
            </div>
          </Link>
        </div>
    );
  }
}
export default Login;
