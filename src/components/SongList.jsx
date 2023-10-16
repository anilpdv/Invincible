import { Container, Divider } from "@mantine/core";
import { useSearchStore } from "../store";
import { SongItem } from "./SongItem";
import { Search } from "./Search";
import Header from "./Header";

export function formatViewCount(viewCount) {
  if (viewCount >= 1000000000) {
    return (viewCount / 1000000000).toFixed(1) + "B";
  } else if (viewCount >= 1000000) {
    return (viewCount / 1000000).toFixed(1) + "M";
  } else if (viewCount >= 1000) {
    return (viewCount / 1000).toFixed(1) + "K";
  } else {
    return viewCount;
  }
}

const SongList = () => {
  const songs = useSearchStore((state) => state.songs);
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
        {songs.map((song) => {
          if (song.thumbnails.length < 2) return null;
          let imageUrl = song.thumbnails[1].url;
          let title = song.title;
          let author = song.channel.name;
          let views = formatViewCount(song.viewCount);

          return (
            <SongItem
              key={song.id}
              id={song.id}
              image={imageUrl}
              title={title}
              author={author}
              views={views}
              song={song}
            />
          );
        })}
      </div>
    </>
  );
};

export default SongList;
