import React, { useState } from "react";
import "./App.css";
// import millify from "millify";

import web from "../src/logo.png";
// import web1 from "../src/download.png";

import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import web1 from "../src/download.png";
// import web2 from "../src/image.png";
import { NavLink } from "react-router-dom";
import { HiMinus } from "react-icons/hi";
import web3 from "../src/image2.png";

function Youtubec() {
  const [share1, setShare] = useState([]);
  const [data2, setData1] = useState("");

  const getData = (e) => {
    setData1(e.target.value);
  };

  const submitData = (e) => {
    e.preventDefault();
    apiGet();
  };
  const deleteyt = (index) => {
    const updateTodo = [...share1].filter((value) => {
      return index !== index;
    });
    setData1("");
    setShare(updateTodo);
  };

  //   const deleteyt = (index) => {
  //     const updateTodo = [...share1].filter((value) => {
  //       return value !== value;
  //     });

  //     setShare(updateTodo);
  //   };

  //   const ytDuration = require("youtube-duration");

  var str = data2;
  var equal = str.split("channel/").pop();
  console.log("equal value", equal);

  const apiGet = async () => {
    await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=AIzaSyB05nncsg-V0LFogZTsM95inqeslHuVOnE&channelId=${equal}&part=snippet,id&order=date&maxResults=5`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("fet", data);
        setShare((val) => {
          return [...val, data.items];
        });

        console.log("data", share1);
      });
  };
  console.log("real data", share1);

  return (
    <>
      <center>
        <img
          src={web}
          style={{ height: "100px", width: "120px", marginTop: "10px" }}
          alt=""
        />
        <h2>Tool to search within video in 2 simple steps:</h2>
        <button className="button1">1</button>_ _ _ _ _ _ _ _ _ _
        <button className="button2">2</button>
        <br />
        <br />
        <h5>
          Select the video channel from youtube. (you can select upto 10 videos
          or 1 channel in this demo version)
        </h5>
      </center>
      <div className="row">
        <div className="row">
          <div className="col-md-2 drop">
            {/* <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                >
                  youtube url
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/">youtube url</a>
                  </li>
                  <li>
                    <a href="/youtubec">youtube channel</a>
                  </li>
                </ul>
              </div> */}

            {/* <select className="form-select">
                <option selected>Youtube Url</option>

                <option to="/">Youtube Channel</option>

                <option to="/youtubec">youtube Url</option>
              </select> */}

            <div class="dropdown">
              <button
                class="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                youtube channel
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <NavLink
                    style={{ textDecoration: "none", color: "black" }}
                    to="/"
                  >
                    <img src={web1} alt=".." width="12px" height="12px" />
                    &nbsp; youtube Url
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{ textDecoration: "none", color: "black" }}
                    to="/youtubec "
                  >
                    <img src={web3} alt=".." width="12px" height="12px" />
                    &nbsp; youtube channel
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-5 mx-3">
            <div className="input-group">
              <input type="text" className="form-control" onChange={getData} />
              <button
                className="btn btn-success"
                type="submit"
                onClick={submitData}
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {share1.length === 0 ? (
            <div></div>
          ) : (
            share1[0].map((value, index) => {
              console.log("val", value);

              return (
                <>
                  <div
                    class="card"
                    style={{ width: "15rem", marginLeft: "14px" }}
                  >
                    <div className="button4" onClick={() => deleteyt(index)}>
                      <HiMinus />
                    </div>
                    <img
                      src={value?.snippet?.thumbnails?.high.url}
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h5>{value?.snippet?.title}</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <p className="card-title">
                            <MdOutlineWatchLater />
                            {value?.snippet?.publishTime}
                          </p>
                        </div>
                        <div className="col-md-6 manage ">
                          <p className="card-title">
                            <AiOutlineEye />
                            {value?.statistics?.viewCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
export default Youtubec;

// [...val, items.items];
