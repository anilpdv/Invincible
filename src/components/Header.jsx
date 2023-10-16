import React from "react";
import { Search } from "./Search";
import { Divider, Container, Flex, Box, Center, Text } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-around p-7">
        <h1
          className="font-bold text-[20px] flex-1"
          onClick={() => {
            navigate("/");
          }}
        >
          INVINCIBLE!
        </h1>

        <Search className={"flex-1"} />
        <div className="flex-1"></div>
        <IconSettings className="flex" />
      </div>

      <Divider />
    </>
  );
};

export default Header;
