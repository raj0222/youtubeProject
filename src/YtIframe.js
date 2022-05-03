import React from "react";

function YtIframe() {
  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
      height: "390",
      width: "640",
      videoId: "60ItHLz5WEA",
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }
  function playerSeekTo(seconds) {
    player.seekTo(seconds);
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }
  function stopVideo() {
    player.stopVideo();
  }
  return (
    <>
      <iframe
        src="https://www.youtube.com/embed/FKWwdQu6_ok?enablejsapi=1"
        frameborder="0"
        allowfullscreen
        id="video"
      ></iframe>

      <a href="/" onclick="playerSeekTo(70); return false;">
        Link to 1 minutes 10 seconds
      </a>
      <a href="/" onclick="playerSeekTo(90); return false;">
        Link to 1 minutes 30seconds
      </a>
      <a href="/" onclick="playerSeekTo(110); return false;">
        Link to 1 minutes 50 seconds
      </a>
    </>
  );
}

export default YtIframe;
