"use client";

import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useState } from "react";

import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { handleAlert, setLoading, useStore } from "@/store";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [phone, setPhone] = useState("+263");
  const [OTP, setOTP] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult>();
  const user = useStore((state) => state.user);
  const router = useRouter();
  async function sendOTP() {
    try {
      setLoading("processing");
      let recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          setLoading(null);
        },
      });
      let confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifier
      );
      setConfirmation(confirmation);
      setLoading(null);
    } catch (error) {
      setLoading(null);
      handleAlert({ error });
    }
  }

  async function verifyOTP() {
    try {
      setLoading("verfying OTP");
      let data = await confirmation?.confirm(OTP);
      setLoading(null);
      router.push("/settings");
    } catch (error) {
      console.log(error, "login error");
      handleAlert({ error });
      setLoading(null);
    }
  }
  if (user) {
    return (
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <Typography variant="h5">Hi, {user?.phoneNumber}</Typography>
      </Stack>
    );
  }
  return (
    <>
      {!confirmation ? (
        <Box id="sendOTP">
          <Stack spacing={2}>
            <TextField
              label="Phone Number"
              value={phone}
              type="text"
              onChange={(e) => {
                setPhone(`${e.target.value}`);
              }}
            ></TextField>{" "}
            <Button id="sign-in-button" onClick={sendOTP}>
              Send OTP
            </Button>
            {/* <div id="recaptcha-container"></div> */}
          </Stack>
        </Box>
      ) : (
        <Box id="verify">
          <Stack spacing={2}>
            <Item>
              <TextField
                label="OTP"
                value={OTP}
                type="text"
                onChange={(e) => setOTP(`${e.target.value}`)}
              ></TextField>
            </Item>

            <Item>
              <Button onClick={verifyOTP}>verify otp</Button>
            </Item>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Login;
