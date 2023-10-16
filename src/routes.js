import { createBrowserRouter } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import SongList from "./components/SongList";
import VideoPlayer from "./components/VideoPlayer";

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
]);
