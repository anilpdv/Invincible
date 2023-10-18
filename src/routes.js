import { Routes, Route, useNavigate } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import SongList from "./components/SongList";
import VideoPlayer from "./components/VideoPlayer";
import Trending from "./components/Trending";
import { NotFoundTitle } from "./components/NothingFound";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignUp,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import SignInView from "./components/Auth/SignInView";
import SingUpView from "./components/Auth/SignUpView";
import UserProfileView from "./components/Auth/UserProfileView";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export const Router = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary:
            "bg-teal-700 hover:bg-teal-500 text-sm normal-case",
          footerActionLink: "text-teal-700 hover:text-teal-500",
        },
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <FrontPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path="/sign-in/*" element={<SignInView />} />
        <Route path="/sign-up/*" element={<SingUpView />} />
        <Route path="/search" element={<SongList />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/user-profile" element={<UserProfileView />} />

        <Route path="*" element={<NotFoundTitle />} />
      </Routes>
    </ClerkProvider>
  );
};
