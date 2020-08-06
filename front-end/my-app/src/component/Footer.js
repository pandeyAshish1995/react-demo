import React, { Component } from "react";
class Footer extends Component {
  render() {
    return (
      <div className="footr">
        <div className="footr_lft">
          <div className="footer_div1">
            Copyright © Pet-Socail 2014 All Rights Reserved
          </div>
          <div className="footer_div2">
            <a>Privacy Policy </a>| <a> Terms &amp; Conditions</a>
          </div>
        </div>
        <div className="footr_rgt">
          <ul>
            <li>
              <a>
                <img src="images/social_1.png" alt="socialImg" />
              </a>
            </li>
            <li>
              <a>
                <img src="images/social_2.png" alt="img" />
              </a>
            </li>
            <li>
              <a>
                <img src="images/social_3.png" alt="img" />
              </a>
            </li>
            <li>
              <a>
                <img src="images/social_4.png" alt="img" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Footer;
