import "./App.css";
import YtApi from "./YtApi";
import Youtubec from "./Youtubec";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ytsubtitle from "./Ytsubtitle";
import YouTubePlayer from "./YoutubePlayer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<YtApi />} />
          <Route exact path="/youtubec" element={<Youtubec />} />
          <Route exact path="/ytsubtitle" element={<Ytsubtitle />} />
          <Route exact path="/youtubeplayer" element={<YouTubePlayer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
