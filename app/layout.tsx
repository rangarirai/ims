"use client";
import { Inter } from "next/font/google";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import "./globals.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import NavBar from "@/components/NavBar";
import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";
import ShowAlert from "@/components/ShowAlert";
import ShowLoader from "@/components/ShowLoader";
import { LocalizationProvider } from "@mui/x-date-pickers";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Typography variant="h5">Fanak Cosmetics</Typography>
              </Stack>
            </Toolbar>
          </AppBar>
          <Container>
            <CssBaseline />
            <Toolbar />
            {children}
            <ShowAlert />
            <ShowLoader />
            <NavBar />
          </Container>
        </LocalizationProvider>
      </body>
    </html>
  );
}
