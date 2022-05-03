import React, { useState } from "react";
import "./App.css";
import getVideoId from "get-video-id";
import millify from "millify";
import web from "../src/logo.png";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { HiMinus } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import web1 from "../src/download.png";
import web3 from "../src/image2.png";
import Ytsubtitle from "./Ytsubtitle";
import { getSubtitles } from "youtube-captions-scraper";

function YtApi(props) {
  const [share1, setShare] = useState([]);
  const [data1, setData1] = useState("");
  const [change, setChange] = useState([]);
  const [ids, setids] = useState([]);
  const getData = (e) => {
    setData1(e.target.value);
  };
  // const changeFunction = (e) => {
  //   e.target.setAttribute("src", "src/image.png");
  //   e.target.setAttribute("alt", "max");
  // };

  const submitData = (e) => {
    e.preventDefault();
    apiGet();
    getSubtitles({
      videoID: getVideoId(data1).id, // youtube video id
      lang: "en", // default: `en`
    }).then((captions) => {
      setChange([...change, captions]);
      // setids([...ids, getVideoId(data1).id]);
    });
  };
  console.log("idss", ids);
  console.log("changesub", change);
  const deleteyt = (id) => {
    console.log("inddex", id);
    setShare((val) => {
      return val.filter((el, index) => {
        return id !== index;
      });
    });
  };

  // const deleteyt = (index) => {
  //   const updateTodo = [...share1].filter((value) => {
  //     return index !== index;
  //   });

  //   setShare(updateTodo);
  // };

  const ytDuration = require(" youtube-duration");

  const apiGet = async () => {
    await fetch(
      `https://www.googleapis.com/youtube/v3/videos?&id=${
        getVideoId(data1).id
      }&key=AIzaSyB05nncsg-V0LFogZTsM95inqeslHuVOnE&part=snippet,contentDetails,statistics&`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("fgsg", data);
        setShare((val) => {
          if (share1.length < 10) {
            return [...val, data.items];
          } else {
            alert("limit reached ");
          }
        });
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
        <NavLink to="/youtubeplayer">
          <button className="button1">1</button>
        </NavLink>
        _ _ _ _ _ _ _ _ _ _
        <NavLink to="/ytsubtitle">
          <button className="button2">2</button>
        </NavLink>
        <br />
        <br />
        <h5>
          Select the video channel from youtube.
          <span style={{ color: "gray", fontSize: "17px" }}>
            (you can select upto 10 videos or 1 channel in this demo version)
          </span>
        </h5>
      </center>

      <div className="row">
        <div className="row">
          <div className="col-md-2 drop">
            <div class="dropdown">
              <button
                className="btn btn-light dropdown-toggle px-5 "
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Youtube url
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <NavLink
                    style={{ textDecoration: "none", color: "black" }}
                    to="/"
                  >
                    <img
                      src={web3}
                      alt=".."
                      width="12px"
                      height="12px"
                      // onClick={changeFunction}
                    />
                    &nbsp; youtube Url
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{ textDecoration: "none", color: "black" }}
                    to="/youtubec "
                  >
                    <img
                      src={web1}
                      alt=".."
                      width="12px"
                      height="12px"
                      // onClick={changeFunction}
                    />
                    &nbsp; youtube channel
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-5 ">
            <div className="input-group">
              <input type="text" className="form-control" onChange={getData} />
              <button
                className="btn btn-success sbutton"
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
          {share1?.length === 0 ? (
            <div></div>
          ) : (
            share1?.map((value, index) => {
              var count = millify(share1[index][0]?.statistics?.viewCount);
              return (
                <>
                  <div
                    className="card gy-4 "
                    style={{
                      width: "15rem",
                      marginLeft: "14px",
                      objectFit: "cover",
                    }}
                  >
                    <div className="button4" onClick={() => deleteyt(index)}>
                      <HiMinus />
                    </div>
                    <img
                      src={share1[index][0]?.snippet?.thumbnails?.high.url}
                      className="card-img-top"
                      style={{ objectFit: "cover" }}
                      alt="..."
                      id="imgClickAndChange"
                      onclick="changeImage()"
                    />

                    <h5>{share1[index][0]?.snippet?.title}</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="card-title">
                          <MdOutlineWatchLater />
                          {ytDuration.format(
                            share1[index][0]?.contentDetails?.duration
                          )}
                        </p>
                      </div>
                      <div className="col-md-6 manage ">
                        <p className="card-title">
                          <AiOutlineEye />
                          {count}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
      </div>
      <Ytsubtitle share1={share1} data1={data1} change={change} ids={ids} />
    </>
  );
}
export default YtApi;
