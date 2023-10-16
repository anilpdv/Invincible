import { List } from "@mantine/core";
import { useSearchStore } from "../store";
import { SongItem } from "./SongItem";

function formatViewCount(viewCount) {
  if (viewCount >= 1000000) {
    return (viewCount / 1000000).toFixed(1) + "m";
  } else if (viewCount >= 1000) {
    return (viewCount / 1000).toFixed(1) + "k";
  } else {
    return viewCount;
  }
}

const RelatedSongsList = () => {
  const relatedSongs = useSearchStore((state) => state.relatedSongs);
  return (
    <>
      <div className="flex flex-col">
        {relatedSongs.map((song) => {
          if (song.thumbnails.length < 2) return null;
          let imageUrl = song.thumbnails[1].url;
          let title = song.title;
          let author = song.channel.name;
          let views = formatViewCount(song.viewCount);

          return (
            <div className="p-2 " key={song.id}>
              <SongItem
                id={song.id}
                image={imageUrl}
                title={title}
                author={author}
                views={views}
                song={song}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RelatedSongsList;
