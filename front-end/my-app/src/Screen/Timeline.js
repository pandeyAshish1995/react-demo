import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import Uploaded_post from "./Uploaded_post";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import SinglePost from "./SinglePost";
import Footer from "../component/Footer";
import Header from "../component/Header";
import { BaseUrl } from "../config";

class Timeline extends Component {
  constructor() {
    console.log("it is called");
    if (localStorage.getItem("userName") == null) {
      <Redirect to="/" />;
    }
    super();
    this.state = {
      description: "",
      category: "",
      categoryAdd: "",
      categoryAddAlert: "",
      uploadedDataAlert: "",
      files: [],
      categoryImg: [],
      selectedOption: "animal",
      options: [],
      uploadRequest: false,
      allCategory: [],
      handleAddCategoryClickStatus: false,
      categoryaddStatus: false,
      allResponseFrom: [],
      allResponse: [],
      category_clicked: ""
    };
  }
  handleMyUpload = event => {
    document.getElementById("myUpLoad").style.boxShadow = "0 1px 20px 6px #f7c42c inset";
    document.getElementById("allTimeLine").style.boxShadow = "";
    console.log("handlemyupload is called");
    var handleMyUpload = this.state.allResponse.filter(value => {
      return value.userName === localStorage.getItem("userName");
    });
    console.log("myupload ...............", handleMyUpload);
    this.setState({
      allResponse: handleMyUpload
    });
  };
  //..........................................,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,//

  //..........................................//................................................................//
  allTimeline = event => {
    document.getElementById("allTimeLine").style.boxShadow = "0 1px 20px 6px #f7c42c inset";
    document.getElementById("myUpLoad").style.boxShadow = "";
    this.allresponseFunction();
  };
  categoryFilter = event => {
    let category_clicked = event.target.name;

    this.setState({ category_clicked: category_clicked });
    var userName = localStorage.getItem("userName");

    localStorage.setItem("categoryName", this.state.category_clicked);
    console.log("category filter is called", category_clicked);

    console.log("sghjklkshweeeeeeeeeeeeeeeeeeeeeek", category_clicked);
    var allData = {
      userName: userName
    };
    console.log("this is all data", JSON.stringify(allData));
    fetch(`${BaseUrl}/timeline/all_uploads`, {
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
        console.log("responseJson", responseJson.length);

        this.setState({
          allResponseFrom: responseJson
        });
        var all = this.state.allResponseFrom.filter(value => {
          return value.category === category_clicked;
        });
        this.setState({
          allResponse: all
        });
      })
      .catch(error => {
        console.log("err this is", error);
      });
  };

  handleAddCategoryClick = () => {
    this.setState({
      handleAddCategoryClickStatus: !this.state.handleAddCategoryClickStatus,
      uploadRequest: false
    });
    this.setState({
      categoryAdd: "",
      categoryImg: [],
      categoryAddAlert: ""
    });
  };
  componentDidMount() {
    let doc_id = document.getElementById("allTimeLine");
    if (doc_id) {
      document.getElementById("allTimeLine").style.boxShadow = "0 1px 20px 6px #f7c42c inset";
    }

    fetch(`${BaseUrl}/category/showCategory`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
      // body: JSON.stringify(allData)
    })
      .then(response => response.json())
      .then(responseJson => {
        // inserted data in in db
        console.log("responseJson", responseJson.length);

        this.setState({
          allCategory: responseJson,
          options: responseJson
        });
      })
      .catch(error => {
        console.log("err this is", error);
      });

    fetch(`${BaseUrl}/timeline/all_uploads`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
      // body: JSON.stringify(allData)
    })
      .then(response => response.json())
      .then(responseJson => {
        // inserted data in in db
        console.log("responseJson", responseJson.length);

        this.setState({
          allResponse: responseJson
        });
      })
      .catch(error => {
        console.log("err this is", error);
      });

    //..................................................................

    //
  }

  handleChangeSelect = selectedOption => {
    this.setState({ selectedOption: selectedOption.target.value });
    console.log(`Option selected:`, selectedOption);
  };

  ///for files for category post
  handleUpload = () => {
    console.log("it is called");
    this.setState({
      uploadRequest: !this.state.uploadRequest,
      handleAddCategoryClickStatus: false
    });
  };

  onDropCategory = categoryImg => {
    this.setState({
      categoryImg
    });
    console.log("on drop category img state", this.state.categoryImg);
  };

  //category change................................./
  category_handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.name);
    //console.log("on drop event change  state", this.state.category_img[0]);
  };

  //category change..........................submit............................./

  handleAddCategory = e => {
    e.preventDefault();

    if (this.state.categoryAdd === "") {
      this.setState({ categoryAddAlert: "category name required" });
    } else if (this.state.categoryImg.length === 0) {
      this.setState({ categoryAddAlert: "category img is required" });
    } else {
      let formData = new FormData();
      formData.append("categoryImg", this.state.categoryImg[0]);
      formData.append("categoryAdd", this.state.categoryAdd);

      fetch(`${BaseUrl}/category/addCategory`, {
        method: "post",
        body: formData
      })
        .then(response => response.json())
        .then(responseJson => {
          // inserted data in in db
          console.log("responseJson", responseJson);
          if (responseJson.duplicatekey != undefined) {
            this.setState({
              categoryAddAlert: "category name must be unique try with another"
            });
          } else {
            fetch(`${BaseUrl}/category/showCategory`, {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
              // body: JSON.stringify(allData)
            })
              .then(response => response.json())
              .then(responseJson => {
                // inserted data in in db
                console.log("responseJson", responseJson.length);

                this.setState({
                  allCategory: responseJson,
                  options: responseJson,
                  handleAddCategoryClickStatus: false
                });
              })
              .catch(error => {
                console.log("err this is", error);
              });
            this.props.history.push({
              pathname: "/timeline",
              state: { email: this.state.email, response: responseJson }
            });
            this.setState({
              categoryAdd: "",
              categoryImg: [],
              categoryAddAlert: ""
            });
          }
        })
        // this.setState({
        //   categoryAdd: "",
        //   categoryImg:[],
        //   categoryAddAlert: "" ,

        // })
        .catch(error => {
          console.log("err this is", error);
        });
    }
  };

  //upload post  change/............................................../,,,,,,,,,,,,/
  onDrop = files => {
    this.setState({
      files
    });
    console.log("on drop state", this.state.files[0]);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log("on drop event change  state", this.state.files[0]);
  };

  handleLike = event => {
    console.log("clicked image id", event.target.name);
    event.preventDefault();
    this.setState({ stateLiked: true });
    var user = localStorage.getItem("userName");
    var like = {
      likedBy: user,
      postId: event.target.name
    };
    console.log("this is likes all Data", JSON.stringify(like));
    fetch(`${BaseUrl}/timeline/addlike`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(like)
    })
      .then(response => response.json())
      .then(responseJson => {
        var allData = {};
        // console.log("this is all data", JSON.stringify(allData));
        this.allresponseFunction();
        // inserted data in in db
      })
      .catch(error => {
        console.log("err this is", error);
      });
    this.allresponseFunction();
  };
  //upload submit //......................................................
  handleSubmit = e => {
    e.preventDefault();
    //this.state.selectedOption

    if (this.state.description === "" || this.state.files.length < 1) {
      this.setState({ uploadedDataAlert: "provide all field" });
    } else {
      var userName = localStorage.getItem("userName");
      var email = localStorage.getItem("email");
      let formData = new FormData();
      console.log("on drop onsubmit state", this.state.files[0]);
      //formData.append("myFile", this.state.myFile[0]);
      formData.append("files", this.state.files[0]);
      console.log("file drop is handle submit here", formData);
      formData.append("email", email);

      formData.append("description", this.state.description);
      formData.append("category", this.state.selectedOption);
      formData.append("userName", userName);

      fetch(`${BaseUrl}/timeline/timelinepost`, {
        method: "post",
        body: formData
      })
        .then(response => response.json())
        .then(responseJson => {
          // inserted data in in db
          console.log("responseJson", responseJson);
          this.allresponseFunction();
          this.props.history.push({
            pathname: "/timeline",
            state: { email: this.state.email, response: responseJson }
          });
        })
        .catch(error => {
          console.log("err this is", error);
        });
      this.setState({ uploadRequest: false });

      this.setState({
        uploadedDataAlert: "",
        description: "",
        files: [],
        selectedOption: ""
      });
    }
  };
  //............................../
  allresponseFunction = () => {
    console.log("all response function is called");
    fetch(`${BaseUrl}/timeline/all_uploads`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        // inserted data in in db
        console.log("responseJson", responseJson);

        this.setState({
          allResponse: responseJson
        });
      })
      .catch(error => {
        console.log("err this is", error);
      });
  };
  //...................................../........................../
  componentWillReceiveProps() {
    console.log("component will receive props is called");
    this.allresponseFunction();
  }
  handleLatestFirst = event => {
    document.getElementById("oldest").style.borderBottom = "";
    document.getElementById("mostCommented").style.borderBottom = "";
    document.getElementById("latest").style.borderBottom = "2px solid green";

    var latest = this.state.allResponse.sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.time) - new Date(a.time);
    });
    console.log("latest first", latest);
    this.setState({
      allResponse: latest
    });
  };
  handleMostCommented = event => {
    event.preventDefault();
    console.log("handle most commented called");
    document.getElementById("oldest").style.borderBottom = "";
    document.getElementById("mostCommented").style.borderBottom = "2px solid green";
    document.getElementById("latest").style.borderBottom = "";

    this.setState({
      allResponse: this.state.allResponse.sort((a, b) => {
        if (a.comment.length > b.comment.length) return -1;
        else return 1;
      })
    });
    console.log(this.state.allResponse);
  };

  handleOldestFirst = event => {
    this.setState({
      allResponse: this.state.allResponse.reverse(),
      latestFirst: true
    });
    document.getElementById("oldest").style.borderBottom = "2px solid green";
    document.getElementById("mostCommented").style.borderBottom = "";
    document.getElementById("latest").style.borderBottom = "";

    console.log("oldest first method is called");
  };

  render() {
    const { selectedOption } = this.state;
    localStorage.getItem("userName");

    console.log(localStorage.getItem("userName"));

    return (
      <div>
        <Header props={this.props} />
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_iconb.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a onClick={this.handleUpload}>Upload Post</a>{" "}
              </div>
              <div className="rght_btn" onClick={this.handleAddCategoryClick}>
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a>Add Category</a>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">
                  Categories
                </div>
                <div className="rght_list" id="addCategory">
                  {/*add category here.......................add category here.......................................*/}

                  {this.state.handleAddCategoryClickStatus ? (
                    <form id="anotherform">
                      <br />
                      <br />
                      <ul>
                        <li>
                          <div className="dropzone">
                            <Dropzone
                              onDrop={this.onDropCategory}
                              method="post"
                              content-type="multipart/form-data"
                              name="categoryImg"
                              type="file"
                              style={{
                                width: "57px",
                                height: "57px",
                                border: "2px dashed red",
                                backgroundSize: "100%",
                                align: "center",
                                float: "left"
                              }}
                            >
                              {this.state.categoryImg.map(f => (
                                <li key={f.name}>
                                  <div style={{ alignItems: "center", justifyContent: "center" }}>
                                    <img
                                      src={f.preview}
                                      alt="uploaded image shown here"
                                      style={{
                                        minHeight: "50px",
                                        minWidth: "50px",
                                        maxHeight: "55px",
                                        maxWidth: "55px",
                                        overflow: "hidden"
                                      }}
                                    />
                                  </div>
                                </li>
                              ))}
                            </Dropzone>
                            <input
                              type="text"
                              name="categoryAdd"
                              onChange={this.category_handleChange}
                              placeholder="Enter category"
                              value={this.state.categoryAdd}
                              style={{
                                float: "left",
                                marginLeft: "5px",
                                marginTop: "20px",
                                height: "20px",
                                width: "160px",
                                borderBottom: "2px solid blue",
                                backgroundColor: "white",
                                borderTop: "none",
                                borderLeft: "none",
                                borderRight: "none"
                              }}
                            />
                            <input
                              type="submit"
                              value="Submit"
                              onClick={this.handleAddCategory}
                              style={{
                                float: "right",
                                marginTop: "20px",
                                borderRadius: "2px"
                              }}
                            />
                            <p style={{ color: "red" }}>{this.state.categoryAddAlert}</p>
                          </div>
                          <aside />
                        </li>
                      </ul>
                    </form>
                  ) : (
                    <span>
                      {this.state.allCategory.map(p => (
                        <ul>
                          <li>
                            <a onClick={this.categoryFilter} name={p.categoryName}>
                              <span className="list_icon">
                                <img src={`${BaseUrl}/category/${p.categoryImg}`} alt="up" height="50px" width="50px" />
                              </span>{" "}
                              {p.categoryName}
                            </a>
                          </li>
                        </ul>
                      ))}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {this.state.uploadRequest ? (
              <div className="content_lft">
                <div className="contnt_2" id="upload">
                  <form id="anything">
                    <br />
                    <br />
                    <ul>
                      <section>
                        <div className="dropzone">
                          <Dropzone
                            onDrop={this.onDrop}
                            method="post"
                            content-type="multipart/form-data"
                            name="files"
                            type="file"
                          >
                            {this.state.files.map(f => (
                              <li key={f.name}>
                                <img
                                  src={f.preview}
                                  alt="uploaded image shown here"
                                  height="auto"
                                  width="auto"
                                  min-height="180px"
                                />
                              </li>
                            ))}
                          </Dropzone>
                        </div>
                        <aside />
                      </section>
                    </ul>
                    <ul>
                      <li>
                        <input
                          type="text"
                          name="description"
                          placeholder="Enter post description"
                          onChange={this.handleChange}
                          value={this.state.description}
                        />
                        <p style={{ color: "red" }}>{this.state.uploadedDataAlert}</p>
                      </li>

                      <li>
                        <select value={selectedOption} onChange={this.handleChangeSelect}>
                          <option value={"animal"}>select</option>
                          {this.state.options.map(a => {
                            return <option value={a.categoryName}>{a.categoryName}</option>;
                          })}
                        </select>
                      </li>
                      <br />
                      <li>
                        <input type="submit" value="Submit" onClick={this.handleSubmit} />
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            ) : (
              <div className="content_lft" id="singlePost">
                {this.props.location.pathname.length < 13 ? (
                  <div className="post_div">
                    <div className="post_list">
                      <ul>
                        <li id="latest">
                          <a onClick={this.handleLatestFirst}>
                            <span className="list_img">
                              <img src="images/img_1.png" />
                            </span>
                            Latest First
                          </a>
                        </li>
                        <li id="oldest">
                          <a onClick={this.handleOldestFirst}>
                            <span className="list_img">
                              <img src="images/img_2.png" />
                            </span>
                            Oldest First
                          </a>
                        </li>
                        <li id="mostCommented">
                          <a onClick={this.handleMostCommented}>
                            <span className="list_img">
                              <img src="images/img_5.png" />
                            </span>
                            Most Commented
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <h1 />
                )}
                <Switch>
                  <Route
                    exact
                    path="/timeline"
                    render={props => (
                      <Uploaded_post
                        {...props}
                        allResponse={this.state.allResponse}
                        categoryName={this.state.category_clicked}
                        handleLike={this.handleLike}
                        myUpload={this.handleMyUpload}
                        allTimeline={this.allTimeline}
                      />
                    )}
                  />
                  <Route path="/timeline/:imgId" component={SinglePost} />
                </Switch>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Timeline;
