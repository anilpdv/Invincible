import { Center, Flex, Text, Anchor } from "@mantine/core";
import React from "react";
import { Search } from "./Search";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Center>
        <motion.div
          className="flex p-7"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.p
            className="pr-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            Donate
          </motion.p>

          <motion.div
            className="cursor-pointer"
            onClick={() => {
              navigate("/trending");
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            <Anchor>Trending</Anchor>
          </motion.div>
        </motion.div>
      </Center>

      <Center h={400}>
        <Flex direction={"column"}>
          <motion.h1
            className="text-6xl md:text-6xl lg:text-7xl font-mono font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          >
            INVINCIBLE!
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          >
            <Search />
          </motion.div>
        </Flex>
      </Center>
    </>
  );
};

export default FrontPage;
