import { IconEye } from "@tabler/icons-react";
import { Card, Text, Group, Center, rem, useMantineTheme } from "@mantine/core";
import { Image, AspectRatio } from "@mantine/core";
import classes from "./SongItem.module.css";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../store";

export function SongItem({ id, image, title, author, views, song }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { setRelatedSongs, setCurrentSong } = useSearchStore((store) => store);
  async function fetchRelatedSongs() {
    try {
      const response = await fetch(
        "https://musiq-ecf9a99fa8d9.herokuapp.com/api/getvideo/" + id
      );
      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }
      const data = await response.json();
      console.log(data);
      setRelatedSongs(data);
      setCurrentSong(song);
      navigate("/video/" + id);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Card
      key={title}
      p="md"
      radius="md"
      component="a"
      onClick={() => {
        console.log("clicked");
        fetchRelatedSongs();
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
