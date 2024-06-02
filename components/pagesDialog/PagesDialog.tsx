import {
  AppBar,
  Dialog,
  IconButton,
  Button,
  Container,
  Toolbar,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import DisplayCurrentPage from "../DisplayCurrentPage";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type PagesDialogProps = {
  handleClose: () => void;
  open: boolean;
  children: React.ReactElement;
};

export default function PagesDialog({
  handleClose,
  open,
  children,
}: PagesDialogProps) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "fixed" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <DisplayCurrentPage />
          <Button autoFocus color="inherit" onClick={handleClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Toolbar />
        {children}
      </Container>
    </Dialog>
  );
}
