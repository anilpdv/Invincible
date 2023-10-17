import React, { useEffect, useState } from "react";
import Header from "./Header";
import { SongItem } from "./SongItem";
import { motion } from "framer-motion";
import { formatViewCount } from "../utils/helper";
import { Select } from "@mantine/core";
import { countryOptions, typeOptions } from "../utils/TrendingFilterOptions";

const Trending = () => {
  const [songs, setSongs] = useState([]);
  const [country, setCountry] = useState("US");
  const [type, setType] = useState("Default");

  useEffect(() => {
    fetchTrendingSongs();
  }, []);

  const fetchTrendingSongs = async () => {
    try {
      let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=${country}&maxResults=200&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }
      const data = await response.json();
      setSongs(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSongsByCountry = async (country) => {
    try {
      let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=${country}&maxResults=200&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }
      const data = await response.json();
      setSongs(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSongsByType = async (type) => {
    try {
      let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=${country}&videoCategoryId=${type}&maxResults=200&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }
      const data = await response.json();
      setSongs(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-between mx-14">
        <Select
          label="Country"
          placeholder="Pick country"
          data={countryOptions}
          value={country}
          onChange={(value) => {
            setCountry(value);
            fetchSongsByCountry(value);
          }}
          searchable
        />
        <Select
          label="Type"
          placeholder="Pick type"
          data={typeOptions}
          value={type}
          onChange={(value) => {
            setType(value);

            if (value === "Default") {
              fetchTrendingSongs();
            } else {
              fetchSongsByType(value);
            }
          }}
        />
      </div>
      <motion.div // Wrap the song list in a motion component
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10"
        initial={{ opacity: 0, y: -50 }} // Set the initial animation state
        animate={{ opacity: 1, y: 0 }} // Set the animation state when the component mounts
        transition={{ duration: 0.5 }} // Set the duration of the animation
      >
        {songs.map((song) => {
          if (
            song &&
            song.snippet &&
            song.snippet.thumbnails &&
            song.snippet.thumbnails.standard
          ) {
            let imageUrl = song.snippet.thumbnails.standard.url;
            let title = song.snippet.title;
            let author = song.snippet.channelTitle;
            let views = formatViewCount(song.viewCount ? song.viewCount : 0);
            let description = song.snippet.description;

            return (
              <motion.div
                key={song.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <SongItem
                  id={song.id}
                  image={imageUrl}
                  title={title}
                  author={author}
                  views={views}
                  description={description}
                />
              </motion.div>
            );
          }
        })}
      </motion.div>
    </>
  );
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.5,
    },
  },
};

export default Trending;
