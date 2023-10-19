import { Center, Divider, Image } from "@mantine/core";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { formatViewCount } from "../utils/helper";
import CommentList from "./CommentList";
import Header from "./Header";
import RelatedSongsList from "./RelatedSongsList";
import { fetchRelatedSongsV2 } from "../store";
import { useQuery } from "react-query";
import { Loader } from "@mantine/core";
import {
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { useUser } from "@clerk/clerk-react";
import { addSubscriber, addUser } from "../firebaseApi";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const params = useParams();
  const [showFullText, setShowFullText] = useState(false);
  const navigate = useNavigate();
  const user = useUser();
  console.log("user", user);
  const [relatedSongs, setRelatedSongs] = useState([]);
  const [videoDetails, setVideoDetails] = useState({});
  const [subscribed, setSubscribed] = useState(false);
  const [like, setLike] = useState(false);

  useEffect(() => {
    let userData = {
      email: user.user.primaryEmailAddress.emailAddress,
      name: user.user.fullName,
      image: user.user.imageUrl,
      subscribers: [],
      likes: [],
      history: [],
      uid: user.user.id,
    };
    addUser(userData);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  const { data, isLoading, isError } = useQuery(
    ["relatedSongs", params.id],
    () => fetchRelatedSongsV2(params.id),
    { enabled: !!params.id }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  useEffect(() => {
    if (data) {
      setRelatedSongs(data.relatedSongs);
      setVideoDetails(data.videoDetails);
    }
  }, [data]);

  const handleVideoEnd = async () => {
    if (relatedSongs && relatedSongs.length > 0) {
      const nextSong = relatedSongs[0];
      if (nextSong) {
        const data = await fetchRelatedSongsV2(nextSong.id);
        setVideoDetails(data.videoDetails);
        setRelatedSongs(data.relatedSongs);
        navigate(`/video/${nextSong.id}`);
      }
    }
  };

  if (isLoading) {
    return (
      <Center h={"100vh"}>
        <Loader size={"xl"} />
      </Center>
    );
  }

  const toggleShowFullText = () => setShowFullText(!showFullText);

  const renderDescription = () => {
    const { description } = videoDetails;
    if (!description) return null;

    const truncatedDescription = `${description.slice(0, 200)}...`;

    return (
      <div className="bg-gray-800 rounded-lg p-3">
        <motion.h3
          className="text-sm font-bold md:text-lg tracking-wider text-white-500"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {formatViewCount(videoDetails.viewCount)} views
        </motion.h3>
        <p className="text-md hidden lg:block md:block text-gray-400">
          {showFullText ? description : truncatedDescription}
          <button className="text-blue-500" onClick={toggleShowFullText}>
            {showFullText ? "Show less" : "Show more"}
          </button>
        </p>
        <Divider m={10} />
      </div>
    );
  };

  const renderSubscribeButton = () => {
    let subscribers = videoDetails.author?.subscriber_count;
    let name = videoDetails.author?.name;
    let imageUrl = videoDetails.author?.thumbnails?.[1]?.url;

    if (!subscribers || !name || !imageUrl) {
      return null;
    }

    return (
      <div className="flex py-4 justify-between items-center lg:w-4/5">
        <div className="flex justify-between items-center">
          <Image src={imageUrl} alt="Avatar" h={50} w={50} radius="xl" />
          <div className="flex flex-col ml-3 pr-9">
            <p className="text-lg text-white font-bold ">{name}</p>
            <p className="text-sm text-gray-400">
              {formatViewCount(subscribers) + " subscribers"}
            </p>
          </div>
          {subscribed ? (
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
              Subscribed
            </button>
          ) : (
            <button
              className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
              onClick={() => {
                addSubscriber(user.user.id, {
                  id: params.id,
                  name,
                  imageUrl,
                  subscribers,
                });
                setSubscribed(true);
              }}
            >
              Subscribe
            </button>
          )}
        </div>
        <div className="flex justify-between items-center">
          <IconThumbUpFilled
            style={{ marginRight: "10px", color: like ? "teal" : null }}
            onClick={() => {
              setLike(!like);
            }}
          />
          <IconThumbDownFilled />
        </div>
      </div>
    );
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
            ref={videoRef}
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

            {renderSubscribeButton()}
            {renderDescription()}

            <CommentList id={params.id} />
          </div>
        </motion.div>
        <div className="p-5 md:w-3/5 lg:w-2/5">
          <RelatedSongsList relatedSongs={relatedSongs} />
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
