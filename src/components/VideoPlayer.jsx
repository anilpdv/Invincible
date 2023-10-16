import { Box, Divider, Flex } from "@mantine/core";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import RelatedSongsList from "./RelatedSongsList";
import Header from "./Header";
import { useSearchStore } from "../store";
import { formatViewCount } from "./SongList";

const VideoPlayer = () => {
  let params = useParams();

  const currentSong = useSearchStore((state) => state.currentSong);
  const relatedSongs = useSearchStore((state) => state.relatedSongs);
  const navigate = useNavigate();
  console.log(params);

  const handleVideoEnd = () => {
    useSearchStore.setState({ currentSong: relatedSongs[0] });
    navigate(`/video/${relatedSongs[0].id}`);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row lg:flex-row">
        <div className="p-5 lg:p-10 h-23 md:w-4/5 ">
          <ReactPlayer
            width={"100%"}
            controls
            playing={true}
            url={`https://musiq-ecf9a99fa8d9.herokuapp.com/api/watch/${params.id}/${currentSong.title}.mp4`}
            onEnded={handleVideoEnd}
          />

          <div className="pt-4 flex-col justify-around h-10 text-white">
            <h1 className="text-4xl font-bold">{currentSong.title}</h1>

            <h3 className="text-xl font-bold py-2">
              {formatViewCount(currentSong.viewCount)} views
            </h3>
            <p className="text-md">{currentSong.description}</p>
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
