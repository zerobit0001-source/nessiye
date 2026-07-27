"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  AddRounded,
  ArrowForwardIosRounded,
  DeleteRounded,
  EditRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";

import { toast } from "react-toastify";
import { useDeleteProductMutation } from "../childs/products/api/ApiProduct";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "1rem",
};

interface ProductPageHeaderProps {
  id: string | number;
}

const ProductPageHeader = ({ id }: ProductPageHeaderProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    if (!isLoading) {
      setOpen(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id).unwrap();

      toast.success("محصول با موفقیت حذف شد");

      handleClose();

      router.push("/dashboard/products");
    } catch (err) {
      console.error(err);

      toast.error("خطا در حذف محصول");
    }
  };

  return (
    <>
      {/*<Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="delete-product-modal"
            >
                <Box sx={style}>
                    <Typography variant="h6">حذف محصول</Typography>

                    <Typography sx={{ mt: 2 }}>
                        آیا از حذف این محصول مطمئن هستید؟
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            mt: 3,
                        }}
                    >
                        <Button
                            color="error"
                            variant="contained"
                            onClick={handleDelete}
                            disabled={isLoading}
                        >
                            {isLoading ? "در حال حذف..." : "حذف"}
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            انصراف
                        </Button>
                    </Box>
                </Box>
            </Modal>*/}

      <div className="flex items-center justify-between w-full">
        <Button
          component={Link}
          href="/dashboard/products"
          size="small"
          startIcon={<ArrowForwardIosRounded fontSize="small" />}
          variant="outlined"
        >
          برگشت
        </Button>

        {/*<Box className="flex gap-2">
                    <Tooltip title="حذف محصول" arrow leaveDelay={500}>
                        <IconButton color="error" onClick={handleOpen}>
                            <DeleteRounded />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="ویرایش محصول" arrow leaveDelay={500}>
                        <IconButton
                            component={Link}
                            href={`${id}/edit`}
                            color="primary"
                        >
                            <EditRounded />
                        </IconButton>
                    </Tooltip>

                    <Button endIcon={<AddRounded />} variant="contained">
                        تعداد
                    </Button>
                </Box>*/}
      </div>
    </>
  );
};

export default ProductPageHeader;
