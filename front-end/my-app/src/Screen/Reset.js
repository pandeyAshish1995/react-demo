import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
//import { validateInstance } from "validate-react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Login from "./Login";
import App from "../App";
import { Redirect } from "react-router-dom";
import {BaseUrl} from "../config"

class Reset extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params.id);
    this.state = {
      password: "",
      reType_password: "",
      _id: "",
      alert1: "",
      alert2: ""
    };
  }
  showPassword1 = () => {
    var x = document.getElementById("myInput1");
    var y = document.getElementById("myInput2");
    if (x.type === "password" || y.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
  };

  handleOnchange = event => {
    const { name, value } = event.target;
    console.log("name:", event.target.name, "value:", event.target.value);
    this.setState(() => ({
      [name]: value
    }));
    if (event.target.name === "password") {
      if (this.state.password.trim().length < 7) {
        this.setState({
          alert1: "password length must be greater or equal to 6"
        });
      } else {
        this.setState({
          alert1: ""
        });
      }
    }
    if (event.target.name === "reType_password") {
      if (this.state.reType_password.trim().length < 7) {
        this.setState({
          alert2: "password length must be greater or equal to 6"
        });
      } else if (this.state.password != this.state.reType_password) {
        this.setState({
          alert2: "your reTypePassword is not matched"
        });
      } else {
        this.setState({
          alert2: ""
        });
      }
    }
  };

  handleOnSubmit = event => {
    event.preventDefault();
    if (this.state.password.trim().length < 7) {
      this.setState({
        alert1: "password length must be greater or equal to 6"
      });
    } else {
      this.setState({
        alert1: ""
      });
    }
    if (this.state.reType_password.trim().length < 7) {
      this.setState({
        alert2: "password length must be greater or equal to 6"
      });
    } else if (this.state.password != this.state.reType_password) {
      this.setState({
        alert2: "your reTypePassword is not matched"
      });
    } else {
      this.setState({
        alert2: ""
      });
    }

    if (
      this.state.password.trim().length > 6 &&
      this.state.password.trim() === this.state.reType_password.trim()
    ) {
      const { password } = this.state;

      // On submit of the form, send a POST request with the data to the server.

      var allData = {
        password: password,
        _id: this.props.match.params.id
      };
      console.log("this is all data", JSON.stringify(allData));
      fetch(`${BaseUrl}/resetPass`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(allData)
      })
        .then(response => response.json())
        .then(responseJson => {
          // reset in db response data in in db
          console.log("responseJson", responseJson);
          if (responseJson.ok === 1) {
            this.props.history.push({
              pathname: "/reg"
            });
            this.setState({
              password_reset: "completed"
            });
          }
        })
        .catch(error => {
          console.log("err this is", error);
        });
    }
  };

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button
                type="button"
                className="btn btn-navbar"
                data-toggle="collapse"
                data-target=".nav-collapse"
              >
                {" "}
                <span className="icon-bar" /> <span className="icon-bar" />{" "}
                <span className="icon-bar" />{" "}
              </button>
              <a className="brand" href>
                PPL
              </a>
              <div className="pro_info pull-right">
                <div className="pro_icn">
                  <img src="/images/pic_small.png" />
                </div>
                <div className="pro_txt">
                  Me
                  <b className="caret" />
                </div>
                <ul
                  className="dropdown-menu"
                  role="menu"
                  aria-labelledby="dLabel"
                >
                  <li>
                    <a tabIndex={-1} href="#">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a tabIndex={-1} href="#">
                      Message Box
                    </a>
                  </li>
                  <li>
                    <a tabIndex={-1} href="#">
                      Change Language
                    </a>
                  </li>
                  <li className="divider" />
                  <li>
                    <a tabIndex={-1} href="#">
                      <input type="text" placeholder="search" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
                  <li className="active">
                    {" "}
                    <a href>Home</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>E-Coupons</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>E-Brands</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>Resuse Market</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>Lost and Found</a>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <div className="header_lft">
            <div className="logo">
              <a href="#">
                <img src="/images/logo.png" />
              </a>
            </div>
            <div className="navigatn">
              <ul>
                <li>
                  <a href="#" className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#"> E-Coupons </a>
                </li>
                <li>
                  <a href="#">E-Brands </a>
                </li>
                <li>
                  <a href="#"> Resuse Market </a>
                </li>
                <li>
                  <a href="#"> Lost and Found</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header_rgt">
            <div className="flag_div">
              <img src="/images/flag.png" />
            </div>
            <input type="text" placeholder="Search" className="txt_box" />
            <div className="msg_box">
              <a href="#">
                <span className="msg_count">100</span>
              </a>
            </div>
            <div className="info_div">
              <div className="image_div">
                {" "}
                <img src="/images/pic.png" />{" "}
              </div>
              <div className="info_div1">Me</div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Reset Password</h1>

                <ul>
                  {/*.//////...................................................///////////// form start here         */}
                  <form onSubmit={this.handleOnSubmit}>
                    {" "}
                    <li>
                      <span>Enter New Password</span>
                      <input
                        type="password"
                        style={{ color: "black" }}
                        placeholder="Enter your new password"
                        name="password"
                        id="myInput1"
                        onChange={this.handleOnchange}
                        value={this.state.password}
                      />
                    </li>
                    <p style={{ color: "red" }}>{this.state.alert1}</p>
                    <li>
                      <span>Confirm Password</span>
                      <input
                        type="password"
                        id="myInput2"
                        style={{ color: "black" }}
                        placeholder="Enter retype your new password"
                        name="reType_password"
                        onChange={this.handleOnchange}
                        value={this.state.reType_password}
                      />
                    </li>
                    <p style={{ color: "red" }}>{this.state.alert2}</p>
                    <input type="checkbox" onClick={this.showPassword1} />
                    show Password
                    <li>
                      <input type="submit" defaultValue="Submit" />
                    </li>
                  </form>{" "}
                  {/*./////////////////// form end ................................end  here         */}
                </ul>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.{" "}
              </p>
              <img src="/images/img_9.png" alt />{" "}
            </div>
          </div>
        </div>
        <div className="clear" />
        <div className="footr">
          <div className="footr_lft">
            <div className="footer_div1">
              Copyright © Pet-Socail 2014 All Rights Reserved
            </div>
            <div className="footer_div2">
              <a href="#">Privacy Policy </a>|{" "}
              <a href="#"> Terms &amp; Conditions</a>
            </div>
          </div>
          <div className="footr_rgt">
            <ul>
              <li>
                <a href="#">
                  <img src="/images/social_1.png" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/images/social_2.png" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/images/social_3.png" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/images/social_4.png" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default Reset;
