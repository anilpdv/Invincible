import React from "react";
import { IconAlarm, IconEye } from "@tabler/icons-react";
import { Text, Group, Center, rem, useMantineTheme } from "@mantine/core";
import { Image, AspectRatio } from "@mantine/core";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { fetchRelatedSongsV2, useSearchStore } from "../store";
import classes from "./SongItem.module.css";
import { useNavigate } from "react-router-dom";

function SongItem({ id, image, title, author, views, description, duration }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { setCurrentSong, setRelatedSongs, setVideoDetails } = useSearchStore(
    (store) => store
  );

  const handleFetchRelatedSongs = async (id) => {
    try {
      setCurrentSong({ id, image, title, author, views, description });
      navigate(`/video/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      key={title}
      p="md"
      radius="md"
      component="a"
      onClick={() => handleFetchRelatedSongs(id)}
      className={`${classes.card} cursor-pointer`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <AspectRatio ratio={336 / 188}>
          <Image src={image} />
        </AspectRatio>
      </motion.div>
      <motion.h2
        className={`${classes.title} mt-2 line-clamp-2 font-bold text-base`}
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
      {views !== 0 && (
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
            {duration && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Group gap="md" my={5}>
                  <Center>
                    <IconAlarm
                      style={{
                        width: rem(18),
                        height: rem(18),
                        marginRight: rem(4),
                      }}
                      stroke={1.5}
                      color={theme.colors.dark[2]}
                    />
                    <Text
                      p={3}
                      fw={500}
                      className={`${classes.bodyText} text-white font-bold`}
                      style={{ marginLeft: rem(4) }}
                    >
                      {duration}
                    </Text>
                  </Center>
                </Group>
              </motion.div>
            )}
          </Group>
        </motion.div>
      )}
    </motion.div>
  );
}

SongItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  views: PropTypes.number,
  description: PropTypes.string,
  duration: PropTypes.string,
};

export default SongItem;
