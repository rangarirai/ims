import { useStore } from "@/store";
import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

function ShowLoader() {
  const loading = useStore((state) => state.loading);
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1000,
      }}
      open={loading ? true : false}
      // onClick={}
    >
      <Stack spacing={4} alignItems={"center"}>
        <CircularProgress color="inherit" />
        <Typography>{loading}</Typography>
      </Stack>
    </Backdrop>
  );
}

export default ShowLoader;
