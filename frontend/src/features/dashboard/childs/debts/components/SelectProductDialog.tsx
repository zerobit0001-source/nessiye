import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  CircularProgress,
  InputAdornment,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import {
  CloseRounded,
  DeleteRounded,
  SearchRounded,
} from "@mui/icons-material";
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
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectProductDialog({
  products,
  setSelectedProducts,
  selectedProducts,
  isLoading,
  search,
  setSearch,
}: SelectProductDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearch("");
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        className="w-full h-20"
        onClick={handleClickOpen}
      >
        انتخاب کالا
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="select-product-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="select-product-dialog-title">انتخاب کالا</DialogTitle>
        <span className="px-4 py-2">
          <TextField
            fullWidth
            placeholder="جستجوی کالا..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>
                ),
              },
            }}
            className=""
          />
        </span>
        <DialogContent>
          {/* Search */}

          {/* Products */}
          <List
            className="w-full"
            sx={{
              overflowY: "auto",
            }}
          >
            {products.length === 0 && (
              <Typography variant="body2">محصولی یافت نشد</Typography>
            )}
            {isLoading ? (
              <div className="flex justify-center py-6">
                <CircularProgress size={28} />
              </div>
            ) : (
              products.map((product) => (
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
                    <Avatar>{product.name?.charAt(0)}</Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={product.name}
                    secondary={product.barcode}
                  />
                </ListItemButton>
              ))
            )}
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
