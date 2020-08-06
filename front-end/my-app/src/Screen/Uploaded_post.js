import React, { Component } from "react";

import { Link } from "react-router-dom";

import TimeLineLeftContent1 from "./TimelineLeftContent1";
import NoDataScreen from "../Screen/NoDataScreen";
import {BaseUrl} from "../config"

var moment = require("moment");
class Uploaded_post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let { allResponse = [] } = this.props;
    return (
      <div>
        <TimeLineLeftContent1 myUpload={this.props.myUpload} allTimeline={this.props.allTimeline} />

        {/*......................................................................................./3456*/}
        <div className="contnt_2" id="uploaded">
          {!allResponse.length ? (
            <NoDataScreen />
          ) : (
            <ul>
              {allResponse.map(p => (
                //....................................................................................

                <div>
                  <div className="div_a">
                    <Link to={`/timeline/${p._id}`}>
                      <div className="div_title">{p.description}</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">{p.category}</div>
                      </div>
                      <div className="div_top">
                        <div className="div_top_lft">
                          <img src="images/img_6.png" alt="imageHere" />
                          {p.userName}
                        </div>
                        <div className="div_top_rgt">
                          <span className="span_date">
                            {moment(p.time).format("DD")}
                            {"-" + months[moment(p.time).months()]}
                            {"-" + moment(p.time).format("YYYY")}
                          </span>
                          <span className="span_time">{moment(p.time).format("hh:mm A")}</span>
                        </div>
                      </div>
                      <div className="div_image">
                        <img
                          alt="pet"
                          // src={`uploads/${
                          //   this.props.location.state.response.selectedFiles
                          // }`}
                          src={`${BaseUrl}/uploads/${p.selectedFiles}`}
                        />
                      </div>
                    </Link>
                    <div className="div_btm">
                      <div className="btm_list">
                        <ul>
                          <li>
                            <a href="#" name={p._id} onClick={this.props.handleLike}>
                              <span className="btn_icon">
                                <img src="images/icon_003.png" alt="share" />
                              </span>
                              {p.like.length + " "}
                              Likes
                            </a>
                          </li>
                          <li>
                            <a>
                              <span className="btn_icon">
                                <img src="images/icon_004.png" alt="share" />
                              </span>
                              {p.comment.length + " "} Comments
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Uploaded_post;
