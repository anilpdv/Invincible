import { Divider } from "@mantine/core";
import React, { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RelatedSongsList from "./RelatedSongsList";
import Header from "./Header";
import { fetchRelatedSongs, useSearchStore } from "../store";
import { formatViewCount } from "./SongList";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const params = useParams();

  const { currentSong, setCurrentSong, setRelatedSongs } = useSearchStore(
    (store) => store
  );
  const relatedSongs = useSearchStore((state) => state.relatedSongs);

  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play(); // Reload the video to force it to update
    }
  }, [params.id]);

  const handleVideoEnd = async () => {
    if (relatedSongs && relatedSongs.length > 0) {
      let nextSong = relatedSongs[0];
      if (nextSong) {
        setCurrentSong(nextSong);
        let relatedSongs = await fetchRelatedSongs(nextSong.id);
        setRelatedSongs(relatedSongs);
        navigate("/video/" + nextSong.id);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row lg:flex-row">
        <div className="p-3 lg:p-10 md:w-4/5 h-2/5">
          <ReactPlayer
            width={"100%"}
            controls
            playing={true}
            url={`https://www.youtube.com/watch?v=${params.id}`}
            onEnded={handleVideoEnd}
          />

          <div className="pt-2 flex-col justify-around h-16 text-white">
            <h1 className="text-md font-bold md:text-2xl">
              {currentSong.title}
            </h1>

            <h3 className="text-sm font-bold sm:py-2 md:text-xl">
              {formatViewCount(currentSong.viewCount)} views
            </h3>
            <p className="text-md hidden lg:block md:block">
              {currentSong.description}
            </p>
            <Divider />
          </div>
        </div>
        <div className="p-5 md:w-3/5 lg:w-2/5">
          <RelatedSongsList />
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
