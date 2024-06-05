import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

import * as firebaseui from "firebaseui";
// imports the firebaseui styles using the CDN
import "firebaseui/dist/firebaseui.css";
import { app } from "@/firebase";
import { useStore } from "@/store";
import { Stack, Typography } from "@mui/material";

function AuthUI() {
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (!user?.email) {
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(getAuth(app));

      ui.start("#firebaseui-auth-container", {
        signInFlow: "popup",
        signInSuccessUrl: "/",
        signInOptions: [
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            clientId:
              "199193042650-ptuf61v15af1ojem7h66j1rq4u644msd.apps.googleusercontent.com",
          },
          // leave for ANOTHER video
          // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
        ],
        // required to enable one-tap sign-up credential helper
        credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
      });
    }
  }, []);
  if (user?.email) {
    return (
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <Stack spacing={1}>
          <Typography>Hi, </Typography>
          <Typography variant="h6">{user?.email}</Typography>
        </Stack>
      </Stack>
    );
  }
  return <div id="firebaseui-auth-container"></div>;
}

export default AuthUI;
