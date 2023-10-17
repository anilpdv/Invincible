import { useSearchStore } from "../store";
import { SongItem } from "./SongItem";
import { Search } from "./Search";
import Header from "./Header";

import { motion } from "framer-motion";
import { formatDuration, formatViewCount } from "../utils/helper";

const SongList = () => {
  const songs = useSearchStore((state) => state.songs);
  return (
    <>
      <Header />
      <motion.div // Wrap the song list in a motion component
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10"
        initial={{ opacity: 0, y: -50 }} // Set the initial animation state
        animate={{ opacity: 1, y: 0 }} // Set the animation state when the component mounts
        transition={{ duration: 0.5 }} // Set the duration of the animation
      >
        {songs.map((song) => {
          if (song.thumbnails.length < 2) return null;
          let imageUrl = song.thumbnails[1].url;
          let title = song.title;
          let author = song.channel.name;
          let views = formatViewCount(song.viewCount);
          let description = song.description;
          console.log(song);
          const durationInSeconds = song.duration;
          const duration = formatDuration(durationInSeconds);
          return (
            <motion.div // Wrap the song item in a motion component
              className="p-2"
              key={song.id}
              initial={{ opacity: 0, y: -50 }} // Set the initial animation state
              animate={{ opacity: 1, y: 0 }} // Set the animation state when the component mounts
              transition={{ duration: 0.5, delay: 0.2 }} // Set the duration and delay of the animation
            >
              <SongItem
                id={song.id}
                image={imageUrl}
                title={title}
                author={author}
                views={views}
                description={description}
                duration={duration}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
};

export default SongList;
