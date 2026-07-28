import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  Card,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { formatPrice } from "@/utils/formatters";
import { CloseRounded, DeleteRounded } from "@mui/icons-material";

type Customer = {
  id: number;
  phone_number: string;
  full_name: string;
};

interface SelectCustomerDialogProps {
  selectedCustomer: Customer | null;
  customers: Customer[];
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
}

export default function SelectCustomerDialog({
  selectedCustomer,
  customers,
  setSelectedCustomer,
}: SelectCustomerDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {selectedCustomer ? (
        <Card
          className="p-4 cursor-pointer flex items-center justify-between rounded-lg!"
          onClick={handleClickOpen}
        >
          <span className="flex items-center gap-2">
            <Avatar />
            <span className="flex flex-col ">
              <Typography variant="body1" className="font-bold!">
                {selectedCustomer.full_name}
              </Typography>

              <Typography variant="caption">
                {selectedCustomer.phone_number}
              </Typography>
            </span>
          </span>
          <Typography variant="body2" color="error">
            بدهی فعال {formatPrice(2000000)} تومان
          </Typography>
        </Card>
      ) : (
        <Button
          variant="contained"
          className=" w-full h-20"
          onClick={handleClickOpen}
        >
          انتخاب مشتری
        </Button>
      )}
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
            {customers.map((customer) => (
              <ListItemButton
                key={customer.id}
                onClick={() => {
                  setSelectedCustomer(customer);
                  handleClose();
                }}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>

                <ListItemText
                  primary={customer.full_name}
                  secondary={customer.phone_number}
                />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSelectedCustomer(null);
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
