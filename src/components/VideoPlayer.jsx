import { Box, Divider, Flex } from "@mantine/core";
import React, { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RelatedSongsList from "./RelatedSongsList";
import Header from "./Header";
import { useSearchStore } from "../store";
import { formatViewCount } from "./SongList";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const params = useParams();
  const currentSong = useSearchStore((state) => state.currentSong);
  const relatedSongs = useSearchStore((state) => state.relatedSongs);
  const navigate = useNavigate();
  const url = `https://musiq-ecf9a99fa8d9.herokuapp.com/api/watch/${params.id}/${currentSong.title}.mp4`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video to force it to update
      videoRef.current.play().catch((error) => {
        console.error("Autoplay error:", error);
      });

      // Event listener for video end
      videoRef.current.addEventListener("ended", () => {
        handleVideoEnd();
      });
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("ended", () => {
          handleVideoEnd();
        });
      }
    };
  }, [params.id]); // Add params.id as a dependency to trigger the useEffect when it changes

  const handleVideoEnd = () => {
    useSearchStore.setState({ currentSong: relatedSongs[0] });
    navigate(`/video/${relatedSongs[0].id}`);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row lg:flex-row">
        <div className="p-3 lg:p-10 md:w-4/5 h-2/5">
          <video
            className="rounded-lg"
            ref={videoRef}
            width={"100%"}
            controls
            autoPlay // Enable autoplay
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="pt-2 flex-col justify-around h-10 text-white">
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
