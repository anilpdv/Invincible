import { IconEye } from "@tabler/icons-react";
import { Card, Text, Group, Center, rem, useMantineTheme } from "@mantine/core";
import { Image, AspectRatio } from "@mantine/core";
import classes from "./SongItem.module.css";
import { useNavigate } from "react-router-dom";
import { fetchRelatedSongs, useSearchStore } from "../store";

export function SongItem({ id, image, title, author, views, song }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { setCurrentSong, setRelatedSongs } = useSearchStore((store) => store);

  const handleFetchRelatedSongs = async (id) => {
    let relatedSongs = await fetchRelatedSongs(id);
    setCurrentSong(song);
    setRelatedSongs(relatedSongs);
    navigate("/video/" + id);
  };
  return (
    <Card
      key={title}
      p="md"
      radius="md"
      component="a"
      onClick={(e) => {
        handleFetchRelatedSongs(id);
      }}
      className={classes.card + " cursor-pointer"}
    >
      <AspectRatio ratio={720 / 404}>
        <Image src={image} />
      </AspectRatio>

      <Group gap="md" m={5}>
        <Text
          size="md"
          className={classes.title}
          fw={800}
          lineClamp={2}
          c={"white"}
        >
          {title}
        </Text>
        <Text size="sm" className={classes.author} fw={500}>
          {author}
        </Text>
        <Center>
          <IconEye
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
            color={theme.colors.dark[2]}
          />
          <Text size="sm" p={3} className={classes.bodyText}>
            {views}
          </Text>
        </Center>
      </Group>
    </Card>
  );
}
