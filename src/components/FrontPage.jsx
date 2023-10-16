import { Center, Flex, Text, Anchor } from "@mantine/core";
import React from "react";
import { Search } from "./Search";

const FrontPage = () => {
  return (
    <>
      <Center h={100} w={"100%"}>
        <Flex p={20} justify={"space-between"} className="font-sans">
          <Text p={20} fw={"bold"}>
            Donate
          </Text>
          <Anchor p={20} fw={"bold"}>
            Trending
          </Anchor>
        </Flex>
      </Center>
      <Center h={400}>
        <Flex direction={"column"}>
          <h1 className="text-4xl md:text-5xl lg:text-7xl  font-mono font-bold">
            INVINCIBLE!
          </h1>
          <Search />
        </Flex>
      </Center>
    </>
  );
};

export default FrontPage;
