import { Routes, Route, useNavigate } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import SongList from "./components/SongList";
import VideoPlayer from "./components/VideoPlayer";
import Trending from "./components/Trending";
import { NotFoundTitle } from "./components/NothingFound";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import SignInView from "./components/Auth/SignInView";
import SignUpView from "./components/Auth/SignUpView";
import UserProfileView from "./components/Auth/UserProfileView";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const Router = () => {
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
            "bg-teal-700 hover-bg-teal-500 text-sm normal-case",
          footerActionLink: "text-teal-700 hover:text-teal-500",
        },
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <FrontPage />
            </>
          }
        />
        <Route path="/sign-in/*" element={<SignInView />} />
        <Route path="/sign-up/*" element={<SignUpView />} />
        <Route
          path="/search"
          element={
            <>
              <SignedIn>
                <SongList />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn redirectUrl={"/search"} />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/video/:id"
          element={
            <SignedIn>
              <VideoPlayer redirectUrl={"/video/:id"} />
            </SignedIn>
          }
        />
        <Route
          path="/trending"
          element={
            <>
              <SignedOut>
                <RedirectToSignIn redirectUrl={"/trending"} />
              </SignedOut>
              <SignedIn>
                <Trending />
              </SignedIn>
            </>
          }
        />
        <Route
          path="/user-profile"
          element={
            <SignedIn>
              <UserProfileView />
            </SignedIn>
          }
        />

        <Route path="*" element={<NotFoundTitle />} />
      </Routes>
    </ClerkProvider>
  );
};

export default Router;
