"use client";

import { DebtType } from "@/types/types";
import { formatDate, formatPrice } from "@/utils/formatters";
import { CloseRounded, DeleteRounded } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface SelectCustomerDebtDialogProps {
  selectedCustomer: {
    id: number;
    phone_number: string;
    full_name: string;
  } | null;
  selectedDebt: DebtType | null;
  setSelectedDebt: React.Dispatch<React.SetStateAction<DebtType | null>>;
  debts: DebtType[] | [];
}

export default function SelectCustomerDebtDialog({
  selectedDebt,
  setSelectedDebt,
  debts,
  selectedCustomer,
}: SelectCustomerDebtDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/*{selectedDebt ? (
        <Card
          className="p-4 cursor-pointer flex items-center justify-between rounded-lg!"
          onClick={handleClickOpen}
        >
          <span className="flex items-center gap-2">
            <Avatar />
            <span className="flex flex-col ">
              <Typography variant="body1" className="font-bold!">
                {selectedDebt.full_name}
              </Typography>

              <Typography variant="caption">
                {selectedDebt.phone_number}
              </Typography>
            </span>
          </span>
          <Typography variant="body2" color="error">
            بدهی فعال {formatPrice(2000000)} تومان
          </Typography>
        </Card>
      ) : (*/}
      <Button
        variant="contained"
        className=" w-full h-20"
        onClick={handleClickOpen}
        disabled={!selectedCustomer}
      >
        انتخاب بدهی
      </Button>
      {/*)}*/}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">انتخاب مشتری</DialogTitle>
        <DialogContent>
          <List className="w-full">
            {debts.map((debt) => (
              <ListItemButton
                selected={selectedDebt?.id === debt.id}
                key={debt.id}
                onClick={() => {
                  setSelectedDebt(debt);
                  handleClose();
                }}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>

                <ListItemText
                  primary={debt.debt_id}
                  secondary={formatDate(debt.created_at)}
                />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSelectedDebt(null);
              handleClose();
            }}
            color="error"
            variant="outlined"
            endIcon={<DeleteRounded />}
          >
            پاک کن
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            endIcon={<CloseRounded />}
          >
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
