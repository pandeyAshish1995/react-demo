import React, { Component } from "react";
import { Link } from "react-router-dom";
import {BaseUrl} from "../config"

class Register extends Component {
  constructor() {
    super();
    console.log(this.state);
    this.state = {
      userName: "",
      mailSendStatus: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      nameAlert: "",
      passAlert: "",
      fNameAlert: "",
      lNameAlert: "",
      emailAlert: "",
      error: false,
      signUp_State: false,
      _id: ""
    };
  }

  handleChange = e => {
    // const { userName, firstName, lastName, email, password } = this.state;
    const { name, value } = e.target;

    this.setState(() => ({
      [name]: value
    }));

    console.log(e.target.name);

    if ("email" === e.target.name) {
      console.log(this.state.email);
      var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.state.email.match(mailFormat)) {
        this.setState({
          emailAlert: ""
        });
      } else {
        this.setState({
          emailAlert: "input Valid email"
        });
      }
    }
    //password validation
    if ("password" === e.target.name) {
      console.log(this.state.password);
      // var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      // var pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (this.state.password.length > 4) {
        this.setState({
          passAlert: ""
        });
      } else {
        this.setState({
          passAlert:
            "Passwords must contain at least six characters, including uppercase, lowercase letters and numbers"
        });
      }
    }
  };
  handleSubmit = event => {
    event.preventDefault();

    const {
      userName,
      firstName,
      lastName,
      email,
      password,
      error
    } = this.state;
    if (userName.trim() === "") {
      this.setState({
        nameAlert: "cant be empty"
      });
    } else {
      this.setState({
        nameAlert: ""
      });
    }
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //console.log("email after submit",this.state.email);
    if (email.match(mailFormat)) {
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
    if (this.state.password.length > 4) {
      this.setState({
        passAlert: ""
      });
    } else {
      this.setState({
        passAlert:
          "Passwords must contain at least six characters, including uppercase, lowercase letters and numbers"
      });
    }
    if (firstName.trim() === "") {
      this.setState({
        fNameAlert: "cant be empty"
      });
    } else {
      this.setState({
        fNameAlert: ""
      });
    }

    if (lastName.trim() === "") {
      this.setState({
        lNameAlert: "cant be empty"
      });
    } else {
      this.setState({
        lNameAlert: ""
      });
    }
    console.log(this.state.email.match(mailFormat), this.state.error);
    // On submit of the form, send a POST request with the data to the server.
    if (userName.trim() != "" && error === true && password.trim().length > 4) {
      var allData = {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      console.log("this is all data", JSON.stringify(allData));
      fetch(`${BaseUrl}/submitData`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(allData)
      })
        .then(response => response.json())
        .then(responseJson => {
          // inserted data in in db
          console.log(".............", responseJson);
          // console.log(".........jjjljghfffgd....",responseJson.duplicatekey);
          // console.log("mail error...................",responseJson.mailsendError);

          // if(responseJson.has("firstName")){
          if (responseJson.duplicatekey != undefined) {
            // if (responseJson.duplicatekey == "ppl-project.users.$userName") {
            //   this.setState({
            //     nameAlert:
            //       "this userName is already exists provide another username"
            //   });
            // } else {
            //   this.setState({
            //     emailAlert:
            //       "this email is already exists provide another email !"
            //   });
            // }
            console.log("duplicacy", responseJson.duplicatekey);
            // } else if (responseJson.mailsendError != undefined) {
            //   //console.log("mail error",responseJson.mailsendError);
            //   // this.setState({emailAlert: responseJson.mailsendError})
            //   this.setState({
            //     signUp_State: true,
            //     mailSendStatus: true
            //   });
          } else {
            console.log("all well");
            this.setState({
              signUp_State: true,
              mailSendStatus: true
            });
          }

          // }
          // else{
          //   console.log(".............provide unique username")
          // }

             this.props.history.push({
            pathname: "/reg",
            state: {
              email: this.state.email,
              _id: responseJson,
              userName: this.state.userName
            }
          });
        })
        .catch(error => {
          console.log("err", error);
          console.log("........error.....", error);
          this.setState({ signUp_State: false });
        });
    }
  };

  render() {
    const {
      userName,
      firstName,
      lastName,
      email,
      password,
      fNameAlert,
      lNameAlert,
      emailAlert,
      passAlert,
      nameAlert
    } = this.state;
    return (
      <div className="register_sec">
        {this.state.mailSendStatus ? (
          <div className="popup_sec" id="pop_forgt">
            <div className="clos_btn">
              <img src="images/clos.png" alt="" id="clos_pop" />
            </div>
            <div className="pop_hdr">
              A mail has been send to your e-mail Id for verify your Account
            </div>
            <div className="man_contnt">
              <span>Please Check Your Mail Box!</span>
              <Link to="/reg">
                <input type="submit" value="Ok" />
              </Link>
            </div>
          </div>
        ) : (
          <div />
        )}
        <h1>Create An Account</h1>
        <ul>
          <form onSubmit={this.handleSubmit}>
            <li>
              <span>Username</span>
              <input
                type="text"
                placeholder="Enter your username"
                name="userName"
                style={{
                  borderColor: userName === "" ? "red" : "white"
                }}
                onChange={this.handleChange}
                value={userName}
              />
              <p style={{ color: "red" }}>{nameAlert}</p>
            </li>
            <li>
              <span>Password</span>
              <input
                type="text"
                name="password"
                placeholder="Enter your password"
                onChange={this.handleChange}
                style={{
                  borderColor: password === "" ? "red" : ""
                }}
                value={password}
              />
              <p style={{ color: "red" }}>{passAlert}</p>
            </li>
            <li>
              <span>Email</span>
              <input
                type="text"
                name="email"
                placeholder="Enter Your Email"
                style={{
                  borderColor: email === "" ? "red" : ""
                }}
                onChange={this.handleChange}
                value={email}
              />
              <p style={{ color: "red" }}>{emailAlert}</p>
            </li>
            <li>
              <span>First Name</span>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                onChange={this.handleChange}
                style={{
                  borderColor: firstName === "" ? "red" : "white"
                }}
                value={firstName}
              />
              <p style={{ color: "red" }}>{fNameAlert}</p>
            </li>
            <li>
              <span>Last Name</span>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                onChange={this.handleChange}
                value={lastName}
                style={{
                  borderColor: lastName === "" ? "red" : "white"
                }}
              />
              <p style={{ color: "red" }}>{lNameAlert}</p>
            </li>
            <li>
              <input type="checkbox" required />I agree to Term &amp; Conditions
            </li>
            <li>
              <input
                type="submit"
                defaultValue="Register"
                //disabled={!this.state.error}
              />
            </li>
          </form>
        </ul>
        <div className="addtnal_acnt">
          I already have an account.{" "}
          <Link to={{ pathname: "/reg", state: { foo: "bar" } }}>
            {" "}
            <a
              onClick={() => {
                this.setState({
                  signUp_State: true
                });
              }}
            >
              Login My Account !
            </a>
          </Link>
        </div>
      </div>
    );
  }
}
export default Register;
