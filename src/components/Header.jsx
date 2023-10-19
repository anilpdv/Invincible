import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Search } from "./Search";
import { Divider } from "@mantine/core";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "Sign Up | INVINCIBLE!";
    const observer = new MutationObserver(hideBanner);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const hideBanner = () => {
    try {
      const element = document.querySelector(".cl-internal-b3fm6y");
      if (element) {
        element.style.display = "none";
      }
    } catch (error) {
      console.error("An error occurred while hiding the element:", error);
    }
  };

  const handleTitleClick = () => {
    navigate("/");
  };

  const renderTrendingLink = () => {
    if (location.pathname !== "/trending") {
      return (
        <Link to="/trending" className="text-teal-500">
          Trending
        </Link>
      );
    }
    return null;
  };

  const renderUserButton = () => {
    return (
      <SignedIn>
        <UserButton
          afterSignOutUrl="/sign-in"
          userProfileMode="modal"
          userProfileProps={{
            appearance: {
              elements: {
                profileSectionPrimaryButton__emailAddresses:
                  " text-teal-500 normal-case",
                profileSectionPrimaryButton__connectedAccounts:
                  "text-teal-500 normal-case",
                profileSectionPrimaryButton__password:
                  " text-teal-500 normal-case",
                badge: "bg-teal-800 text-teal-500",
              },
            },
          }}
        />
      </SignedIn>
    );
  };

  const renderSignInButton = () => {
    return (
      <SignedOut>
        <SignInButton
          redirectUrl={`${window.origin}/sign-in`}
          afterSignInUrl="/trending"
        />
      </SignedOut>
    );
  };

  return (
    <>
      <motion.div
        className="flex items-center justify-evenly p-7"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="font-bold text-[20px] flex hidden lg:block md:block cursor-pointer"
          onClick={handleTitleClick}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span style={{ marginRight: "8px" }}>INVINCIBLE!</span>
        </motion.h1>

        <motion.div
          className="flex"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Search />
        </motion.div>

        <motion.div
          className=" hidden lg:block md:block sm:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          {renderTrendingLink()}
        </motion.div>

        <motion.div
          className="hidden lg:flex md:flex"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          {renderUserButton()}
          {renderSignInButton()}
        </motion.div>
      </motion.div>

      <Divider />
    </>
  );
};

export default Header;
