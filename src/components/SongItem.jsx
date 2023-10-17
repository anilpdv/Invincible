import React from "react";
import { IconEye } from "@tabler/icons-react";
import { Card, Text, Group, Center, rem, useMantineTheme } from "@mantine/core";
import { Image, AspectRatio } from "@mantine/core";
import { motion } from "framer-motion";

import { fetchRelatedSongsV2, useSearchStore } from "../store";
import { useNavigate } from "react-router-dom";
import classes from "./SongItem.module.css";

export function SongItem({ id, image, title, author, views, description }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { setCurrentSong, setRelatedSongs, setVideoDetails } = useSearchStore(
    (store) => store
  );

  const handleFetchRelatedSongs = async (id) => {
    let data = await fetchRelatedSongsV2(id);
    let videoDetails = data.videoDetails;
    let relatedSongs = data.relatedSongs;
    console.log(data);
    setCurrentSong({ id, image, title, author, views, description });
    setRelatedSongs(relatedSongs);
    setVideoDetails(videoDetails);
    navigate("/video/" + id);
  };

  return (
    <motion.div
      key={title}
      p="md"
      radius="md"
      component="a"
      onClick={() => handleFetchRelatedSongs(id)}
      className={classes.card + " cursor-pointer"}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <AspectRatio ratio={720 / 404}>
          <Image src={image} />
        </AspectRatio>
      </motion.div>
      <motion.h2
        className={classes.title + " mt-2 line-clamp-2 font-bold text-base"}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Text size="sm" className={classes.author} fw={500}>
          {author}
        </Text>
      </motion.div>
      {views ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Group gap="md" my={5}>
            <Center>
              <IconEye
                style={{ width: rem(18), height: rem(18), marginRight: rem(4) }}
                stroke={1.5}
                color={theme.colors.dark[2]}
              />
              <Text
                p={3}
                className={classes.bodyText}
                style={{ marginLeft: rem(4) }}
              >
                {views}
              </Text>
            </Center>
          </Group>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
