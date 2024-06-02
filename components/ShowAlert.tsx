import { handleAlert, useStore } from "@/store";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

function ShowAlert() {
  const alert = useStore((state) => state.alert);
  let type: "error" | "info" | "success" = alert?.error
    ? "error"
    : alert?.info
    ? "info"
    : "success";

  return (
    <Snackbar
      open={alert ? true : false}
      // autoHideDuration={6000} onClose={()=>{setAlert(null)}}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={() => {
          handleAlert({ close: true });
        }}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {alert?.error || alert?.info || alert?.success}
      </Alert>
    </Snackbar>
  );
}

export default ShowAlert;
