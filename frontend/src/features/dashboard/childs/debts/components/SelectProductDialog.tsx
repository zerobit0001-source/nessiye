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
  CircularProgress,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { formatPrice } from "@/utils/formatters";
import { CloseRounded, DeleteRounded } from "@mui/icons-material";
import { ProductType } from "@/types/types";

export interface SelectedProductType {
  product: ProductType;
  quantity: number;
}

interface SelectProductDialogProps {
  products: ProductType[];
  selectedProducts: SelectedProductType[];
  setSelectedProducts: React.Dispatch<
    React.SetStateAction<SelectedProductType[]>
  >;
  isLoading: boolean;
}
export default function SelectProductDialog({
  products,
  setSelectedProducts,
  selectedProducts,
  isLoading
}: SelectProductDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        className=" w-full h-20"
        onClick={handleClickOpen}
      >
        انتخاب کالا
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">انتخاب کالا</DialogTitle>
        <DialogContent>
          {isLoading && <CircularProgress />}
          <List className="w-full">
            {products.map((product) => (
              <ListItemButton
                key={product.id}
                selected={selectedProducts.some(
                  (p) => p.product.id === product.id,
                )}
                onClick={() => {
                  setSelectedProducts((prev) => {
                    const exists = prev.some(
                      (p) => p.product.id === product.id,
                    );

                    if (exists) {
                      return prev.filter((p) => p.product.id !== product.id);
                    }

                    return [
                      ...prev,
                      {
                        product,
                        quantity: 1,
                      },
                    ];
                  });
                }}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>

                <ListItemText
                  primary={product.name}
                  secondary={product.barcode}
                />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSelectedProducts([]);
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
