import { useSearchStore } from "../store";
import { formatDuration, formatViewCount } from "../utils/helper";
import SongItem from "./SongItem";

import { motion } from "framer-motion";

const RelatedSongsList = ({ relatedSongs }) => {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {relatedSongs &&
        relatedSongs.map((song, index) => {
          if (song.thumbnails.length < 2) return null;

          const imageUrl = song.thumbnails[1].url;
          const title = song.title;
          const author = song && song.author && song.author.name;
          const views = formatViewCount(song.view_count);
          const description = song.description;
          const durationInSeconds = song.length_seconds;
          const duration = formatDuration(durationInSeconds);
          const delay = index * 0.1; // Add delay to create a stagger effect

          return (
            <motion.div
              className="p-2"
              key={song.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay }}
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
  );
};

export default RelatedSongsList;
