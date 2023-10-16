import { Center, Title, Container, Flex, Text, Anchor } from "@mantine/core";
import React from "react";
import { Search } from "./Search";

const FrontPage = () => {
  return (
    <Container>
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
          <h1 className="text-7xl font-mono font-bold">INVINCIBLE!</h1>
          <Search />
        </Flex>
      </Center>
    </Container>
  );
};

export default FrontPage;
