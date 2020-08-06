import React, { Component } from "react";
import moment from "moment";
import { sort_TimeLine } from "../AppServices";
import Header from "../component/Header";
import {BaseUrl} from "../config"

class IndexPpl extends Component {
  constructor() {
    super();
    this.state = {
      allResponse: [],
      latestFirst: true
    };
  }

  handleMostCommented = event => {
    event.preventDefault();
    this.setState({
      allResponse: this.state.allResponse.sort((a, b) => {
        if (a.comment.length > b.comment.length) return -1;
        else return 1;
      })
    });
  };

  latestTimeLine = async () => {
    try {
      let responseJson = await sort_TimeLine({ by: "latestFirst" });
      this.setState({
        allResponse: responseJson,
        latestFirst: true
      });
    } catch (error) {
      alert("err in latest");
    }
  };
  componentDidMount() {
    this.latestTimeLine();
  }

  handleOldestFirst = async event => {
    event.preventDefault();
    try {
      let responseJson = await sort_TimeLine({ by: "oldestFirst" });

      this.setState({
        allResponse: responseJson,
        latestFirst: true
      });
    } catch (error) {
      alert("err in oldest");
    }
  };

  handleLatestFirst = event => {
    event.preventDefault();
    this.latestTimeLine();
  };

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
    return (
      <div>
        <Header />
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="contnt_1">
                <div className="post_div">
                  <div className="post_list">
                    <ul>
                      <li>
                        <a onClick={this.handleLatestFirst}>
                          <span className="list_img">
                            <img src="images/img_1.png" />
                          </span>
                          Latest First
                        </a>
                      </li>
                      <li>
                        <a onClick={this.handleOldestFirst}>
                          <span className="list_img">
                            <img src="images/img_2.png" />
                          </span>
                          Oldest First
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="list_img">
                            <img src="images/img_3.png" />
                          </span>
                          Most Pet
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="list_img">
                            <img src="images/img_4.png" />
                          </span>
                          Most Clicks
                        </a>
                      </li>
                      <li>
                        <a onClick={this.handleMostCommented}>
                          <span className="list_img">
                            <img src="images/img_5.png" />
                          </span>
                          Most Commented
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="post_txt">4 New Post Updates</div>
                </div>
              </div>
              <div className="contnt_2">
                {/*.......................................................................................*/}
                {this.state.allResponse.map(p => (
                  <div className="div_a">
                    <div className="div_title">{p.description}</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">{p.category}</div>
                    </div>
                    <div className="div_top">
                      <div className="div_top_lft">
                        <img src="images/img_6.png" />
                        Steave Waugh
                      </div>
                      <div className="div_top_rgt">
                        <span className="span_date">
                          {moment(p.time).format("DD")}
                          {"-" + months[moment(p.time).months()]}
                          {"-" + moment(p.time).format("YYYY")}
                        </span>
                        <span className="span_time">
                          {moment(p.time).hour() > 12 ? moment(p.time).hour() - 12 : moment(p.time).hour()}{" "}
                          {":" + moment(p.time).format("MM:A")}
                        </span>
                      </div>
                    </div>
                    <div className="div_image">
                      <img src={`${BaseUrl}/uploads/${p.selectedFiles}`} alt="pet" />
                    </div>
                    <div className="div_btm">
                      <div className="btm_list">
                        <ul>
                          <li>
                            <a>
                              <span className="btn_icon">
                                <img src="images/icon_004.png" alt="comment" />
                              </span>
                              {p.comment.length} Comments
                            </a>
                          </li>
                          <li>
                            <a>
                              <span className="btn_icon">
                                <img src="images/icon_003.png" alt="like" />
                              </span>
                              Likes
                            </a>
                          </li>
                          <div className="like_count" style={{ marginRight: 10 }}>
                            <span className="lft_cnt" />
                            <span className="mid_cnt">{p.like.length}</span>
                            <span className="rit_cnt" />
                          </div>
                          <li>
                            <a>
                              <span className="btn_icon">
                                <img src="images/icon_003.png" alt="share" />
                              </span>
                              Unlike
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}
export default IndexPpl;
