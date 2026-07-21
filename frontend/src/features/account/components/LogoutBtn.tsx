"use client";
import { userInfoActions } from "@/features/auth/slices/userInformationsSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { SignoutAuth } from "@/utils/auth/CheckAuth";
import { LogoutRounded, WarningRounded } from "@mui/icons-material";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function LogoutBtn() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();

  const handleSignout = () => {
    dispatch(userInfoActions.resetForm());
    handleClose();
    SignoutAuth();
  };
  return (
    <>
      <LogoutRounded onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="rounded-lg flex flex-col items-center justify-center gap-5 py-5"
        >
          <WarningRounded color="warning" className="text-4xl! lg:text-6xl!" />
          <Typography variant="h6" className="font-bold!">
            آیا از خروج اطمینان دارید؟
          </Typography>
          <div className="flex gap-4">
            <Button variant="contained" color="error" onClick={handleSignout}>
              بله
            </Button>
            <Button variant="outlined" color="success" onClick={handleClose}>
              خیر
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
