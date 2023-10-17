import React from "react";
import { Search } from "./Search";
import { Divider } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        className="flex items-center justify-around p-7"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="font-bold text-[20px] flex-1 hidden lg:block md:block cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span style={{ marginRight: "8px" }}>INVINCIBLE!</span>
        </motion.h1>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Search />
        </motion.div>

        <motion.div
          className="flex-1 hidden lg:block md:block sm:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        ></motion.div>

        <motion.div
          className="hidden lg:flex md:flex"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <IconSettings />
        </motion.div>
      </motion.div>

      <Divider />
    </>
  );
};

export default Header;
