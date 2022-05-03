import React, { useEffect, useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { getSubtitles } from "youtube-captions-scraper";
import YouTube from "react-youtube";
import YtApi from "./YtApi";
import millify from "millify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import getVideoId from "get-video-id";
import { AiOutlineEye } from "react-icons/ai";
const ytDuration = require("youtube-duration");

// import { BsRecordCircleFill } from "react-icons/bs";

function Ytsubtitle(props) {
  const [data, setdata] = useState("");
  const [final, setfinal] = useState([]);
  const [modal, setmodal] = useState(false);

  // const [showText, setShowText] = useState(false);
  const [stime, setstime] = useState();

  const getdataa = (e) => {
    setdata(e.target.value);
  };
  console.log("getdata", data);

  const submitdataa = (e) => {
    console.log("ram");
    searchFor(data);
  };

  // getSubtitles({
  //   videoID: getVideoId(props.data1).id, // youtube video id
  //   lang: "en", // default: `en`
  // }).then((captions) => {
  //   setprops.change(captions);

  //   console.log("props.change");
  // });

  console.log("ssss", props.change);
  function trimString(s) {
    var l = 0,
      r = s.length - 1;
    while (l < s.length && s[l] === " ") l++;
    while (r > l && s[r] === " ") r -= 1;
    return s.substring(l, r + 1);
  }

  function compareObjects(o1, o2) {
    var k = "";
    for (k in o1) if (o1[k] !== o2[k]) return false;
    for (k in o2) if (o1[k] !== o2[k]) return false;
    return true;
  }

  function itemExists(haystack, needle) {
    for (var i = 0; i < haystack.length; i++)
      if (compareObjects(haystack[i], needle)) return true;
    return false;
  }

  function searchFor(toSearch) {
    if (props.change.length === 0) {
    } else {
      toSearch = trimString(toSearch); // trim it

      props.change.map((val, index) => {
        var results = [];
        for (var i = 0; i < val?.length; i++) {
          for (var key in val?.[i]) {
            if (val?.[i][key].indexOf(toSearch) !== -1) {
              if (!itemExists(results, val?.[i])) results.push(val?.[i]);
            }
          }
        }
        return setfinal((val1) => {
          return [...val1, results];
        });
      });
    }
  }

  //   var results = [];
  //   toSearch = trimString(toSearch); // trim it

  //   for (var i = 0; i < props.change?.length; i++) {
  //     for (var key in props.change?.[i]) {
  //       if (props.change?.[i][key].indexOf(toSearch) !== -1) {
  //         if (!itemExists(results, props.change?.[i]))
  //           results.push(props.change?.[i]);
  //       }
  //     }
  //   }
  //   setfinal(results);
  // }
  console.log("final", final);
  console.log("share1 data fero ytsub", props.share1);
  const play = (p) => {
    setstime(p);
    setmodal(true);
  };

  return (
    <>
      <center>
        <div className="row row justify-content-md-center m-5">
          <div className="col-md-6">
            {/* <input type="text" className="form-control" onClick={getdataa} /> */}
            <div className="buttonIn">
              <input type="text" onChange={getdataa} />
              <button
                className="btn btn-success"
                onClick={() => {
                  submitdataa(data);
                  // func2();
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div class="card" style={{ maxWidth: "1320px" }}>
          <div class="row g-0">
            {props.share1?.map((val, index) => {
              return (
                <>
                  <div class="col-md-2 colimg1">
                    <img
                      src={
                        props.share1[index][0]?.snippet?.thumbnails?.medium.url
                      }
                      width="200px"
                      height="120px"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-10  coltitle">
                    <div class="card-body ">
                      <h5 class="countduration">
                        {props.share1[index][0]?.snippet?.title}
                      </h5>

                      <p class="card-text textduration ">
                        <small class="text-muted countduration">
                          <MdOutlineWatchLater />
                          {ytDuration.format(
                            props.share1[index][0]?.contentDetails?.duration
                          )}
                        </small>
                        <small class="text-muted counteye">
                          <AiOutlineEye />
                          {millify(
                            props.share1[index][0]?.statistics?.viewCount
                          )}
                        </small>
                      </p>
                    </div>
                  </div>
                  {final?.length === 0 ? (
                    <div></div>
                  ) : (
                    <div
                      className="container  overflow-scroll"
                      style={{ backgroundColor: "#FFF1F3" }}
                    >
                      {final[0]?.map((val, index) => {
                        return (
                          <>
                            <div className="row row1 ">
                              <div>
                                <hr style={{ color: "red", height: "3px" }} />
                                <div class="vertical">
                                  <div className="mx-2 ">
                                    <button
                                      onClick={() => play(val.start)}
                                      className="dot"
                                      style={{ top: "-33px" }}
                                    ></button>
                                    <div style={{ maxHeight: "150px" }}>
                                      <p
                                        style={{
                                          fontSize: "15px",
                                          color: "red",
                                        }}
                                      >
                                        from {val.start}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          wordWrap: "break-word",
                                        }}
                                        className="card-text text-truncate"
                                      >
                                        {val.text}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </center>

      {/* {final?.length === 0 ? (
        <div></div>
      ) : (
        <div
          className="container cyt overflow-auto"
          style={{ backgroundColor: "#FFF1F3" }}
        >
          {final?.map((val, index) => {
            return (
              <>
                <div className="row row1 mt-3">
                  <div>
                    <hr style={{ color: "red", height: "3px" }} />
                    <div class="vertical">
                      <div className="mx-2 ">
                        <button
                          onClick={() => play(val.start)}
                          className="dot"
                          style={{ top: "-33px" }}
                        ></button>
                        <div style={{ maxHeight: "150px" }}>
                          <p style={{ fontSize: "15px", color: "red" }}>
                            from {val.start}
                          </p>
                          <p
                            style={{ fontSize: "12px", wordWrap: "break-word" }}
                            className="card-text text-truncate"
                          >
                            {val.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )} */}

      <center>
        <div>
          <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
            <ModalHeader
              className="m-0"
              toggle={() => setmodal(!modal)}
            ></ModalHeader>
            <ModalBody>
              <YouTube
                videoId={getVideoId(props.data1).id}
                opts={{
                  height: "390",
                  width: "765",
                  playerVars: {
                    autoplay: 1,
                    start: parseInt(stime),
                  },
                }}
              />
            </ModalBody>
          </Modal>
          {/* <button
            className="btn btn-success mt-3"
            // onClick={() => setmodal(true)}
          >
            youtube player
          </button> */}
        </div>
      </center>
    </>
  );
}

export default Ytsubtitle;
