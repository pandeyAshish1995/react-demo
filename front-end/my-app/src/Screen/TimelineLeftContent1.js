import React, { Component } from "react";

class TimeLineLeftContent1 extends Component {
  render() {
    return (
      <div className="contnt_1" id="upload">
        <div className="list_1">
          <ul>
            <li>
              <input type="checkbox" className="chk_bx" />
              Friends
            </li>
            <li>
              <input type="checkbox" className="chk_bx" />
              Flaged
            </li>
          </ul>
        </div>
        <div className="timeline_div">
          <div className="timeline_div1">
            <div className="profile_pic">
              <img src="images/timeline_img1.png" alt="timelineImg" />
              <div className="profile_text">
                <a>Change Profile Pic</a>
              </div>
            </div>
            <div className="profile_info">
              <div className="edit_div">
                <a>
                  Edit <img src="images/timeline_img.png" alt="timelineImg" />
                </a>
              </div>
              <div className="profile_form">
                <ul>
                  <li>
                    <div className="div_name1">name:</div>
                    <div className="div_name2">
                      {localStorage.getItem("userName")}
                    </div>
                  </li>
                  <li>
                    <div className="div_name1">Sex :</div>
                    <div className="div_name2">Male</div>
                  </li>
                  <li>
                    <div className="div_name1">Description :</div>
                    <div className="div_name3">
                      This is an example of a comment. You can create as many
                      comments like this one or sub comments as you like and
                      manage all of your content inside Account.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="timeline_div2">
            <ul>
              <li id="allTimeLine">
                <a onClick={this.props.allTimeline}>Timeline </a>
              </li>
              <li id="myUpLoad">
                <a onClick={this.props.myUpload}>My Uploads </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default TimeLineLeftContent1;