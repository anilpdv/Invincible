import { SignUp, UserProfile } from "@clerk/clerk-react";
import { Center } from "@mantine/core";
import React, { useEffect } from "react";
import Header from "../Header";

const UserProfileView = () => {
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

  return (
    <>
      <Header />
      <Center>
        <UserProfile
          path="/user-profile"
          routing="path"
          appearance={{
            elements: {
              profileSectionPrimaryButton__emailAddresses:
                " text-teal-500 normal-case",
              profileSectionPrimaryButton__connectedAccounts:
                "text-teal-500 normal-case",
              profileSectionPrimaryButton__password:
                " text-teal-500 normal-case",
              badge: "bg-teal-800 text-teal-500",
            },
          }}
        />
      </Center>
    </>
  );
};

export default UserProfileView;
