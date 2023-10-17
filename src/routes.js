import { createBrowserRouter } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import SongList from "./components/SongList";
import VideoPlayer from "./components/VideoPlayer";
import Trending from "./components/Trending";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
  },
  {
    path: "/search",
    element: <SongList />,
  },
  {
    path: "/video/:id",
    element: <VideoPlayer />,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
  {
    path: "/trending",
    element: <Trending />,
  },
]);
