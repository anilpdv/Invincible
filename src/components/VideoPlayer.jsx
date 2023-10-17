import { Divider } from "@mantine/core";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion"; // Import the motion component from Framer Motion
import RelatedSongsList from "./RelatedSongsList";
import Header from "./Header";
import {
  fetchRelatedSongs,
  fetchRelatedSongsV2,
  useSearchStore,
} from "../store";

import ReactPlayer from "react-player";
import { formatViewCount } from "../utils/helper";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const params = useParams();
  const [showFullText, setShowFullText] = useState(false);

  const {
    currentSong,
    setCurrentSong,
    setRelatedSongs,
    setVideoDetails,
    videoDetails,
  } = useSearchStore((store) => store);
  const relatedSongs = useSearchStore((state) => state.relatedSongs);

  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play(); // Reload the video to force it to update
    }
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [params.id]);

  const handleVideoEnd = async () => {
    if (relatedSongs && relatedSongs.length > 0) {
      let nextSong = relatedSongs[0];
      if (nextSong) {
        setCurrentSong(nextSong);
        let data = await fetchRelatedSongsV2(nextSong.id);

        let relatedSongs = data.relatedSongs;
        let videoDetails = data.videoDetails;
        setVideoDetails(videoDetails);
        setRelatedSongs(relatedSongs);
        navigate("/video/" + nextSong.id);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row lg:flex-row">
        <motion.div
          className="p-3 lg:p-10 md:w-4/5 h-4/5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ReactPlayer
            width={"100%"}
            height={"440px"}
            controls
            playing={true}
            url={`https://www.youtube.com/watch?v=${params.id}`}
            onEnded={handleVideoEnd}
          />

          <div className="pt-3 flex-col justify-around h-16 text-gray-400">
            <motion.h1
              className="text-md md:text-2xl text-white font-extrabold"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {videoDetails.title}
            </motion.h1>

            <motion.h3
              className="text-sm sm:py-2 md:text-lg tracking-wider text-white-500"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {formatViewCount(videoDetails.viewCount)} views
            </motion.h3>

            <motion.p
              className="text-md hidden lg:block md:block text-gray-600"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              {showFullText
                ? videoDetails.description
                : `${videoDetails.description.slice(0, 400)}...`}
              <button
                className="text-blue-500"
                onClick={() => setShowFullText(!showFullText)}
              >
                {showFullText ? "Show less" : "Show more"}
              </button>
            </motion.p>
            <Divider m={10} />
          </div>
        </motion.div>
        <div className="p-5 md:w-3/5 lg:w-2/5">
          <RelatedSongsList />
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
