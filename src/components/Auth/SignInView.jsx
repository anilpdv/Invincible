import { SignIn } from "@clerk/clerk-react";
import { Center } from "@mantine/core";
import React, { useEffect } from "react";

const SignInView = () => {
  useEffect(() => {
    document.title = "Sign In | INVINCIBLE!";
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
      <Center>
        <SignIn />
      </Center>
    </>
  );
};

export default SignInView;
