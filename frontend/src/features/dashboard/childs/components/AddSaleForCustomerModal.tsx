"use client";
import { AddRounded, CloseRounded } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { number } from "zod";
import { toast } from "react-toastify";
import { PostSalesType } from "@/types/ApiResponesesType";
import { ProductType } from "@/types/types";
import { CustomerType } from "@/types/customerType";
import {
  ApiCustomer,
  useGetCustomersQuery,
} from "../customers/api/ApiCustomer";
import { useGetProductsQuery } from "../products/api/ApiProduct";
import { useAddSalesMutation } from "../sales/api/ApiSales";
import { salesSliceActions } from "../debts/slices/debtsFormSlice";
import ModalContainer from "../../components/ModalContainer";
import { useGetModalDataQuery } from "../../api/ApiModalsData";

const AddSaleForCustomerModal = ({ customer }: { customer: CustomerType }) => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<PostSalesType>({
    customer_id: customer.id,
    items: [],
  });

  const [open, setOpen] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);

  const [cost, setCost] = useState<number>(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const filterOptions = createFilterOptions({
    stringify: (option: {
      id: number;
      phone_number: string;
      full_name: string;
    }) => `${option.full_name} ${option.phone_number}`,
  });

  // products api RTKQuery
  const {
    data: ProductsData,
    isLoading: IsProductLoading,
    error: IsProductError,
  } = useGetModalDataQuery({ type: "products" }, { skip: !open });
  const [
    addSale,
    { data: addSaleRes, isLoading: addSaleLoading, error: addSaleError },
  ] = useAddSalesMutation();

  const products = ProductsData?.products ?? [];

  const handleCost = () => {
    if (!selectedProducts || selectedProducts.length === 0) {
      setCost(0);
      return;
    }
    const total = selectedProducts.reduce(
      (acc, product) => acc + product.sell_price,
      0,
    );
    setCost(total);
  };

  useEffect(() => {
    handleCost();
  }, [selectedProducts]);

  async function handleAddSale() {
    try {
      const result = await addSale(form).unwrap();

      if (!result.ok) {
        toast.error("خطا در ایجاد فروش");
        return;
      }

      dispatch(ApiCustomer.util.invalidateTags(["Credits"]));
      toast.success("فروش ثبت شد");
      setForm({
        customer_id: null,
        items: [],
      });
      setSelectedProducts([]);
      return;
    } catch (error) {
 
      toast.error("error");
    }
  }

  const handleClear = () => {
    dispatch(salesSliceActions.resetForm());
    handleClose();
  };
 
  return (
    <>
      <Button
        endIcon={<AddRounded fontSize="small" />}
        size="small"
        variant="contained"
        onClick={handleOpen}
      >
        فروش جدید
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" bg-black/10 backdrop-blur-xs transition-all"
      >
        <ModalContainer>
          <Box className="p-2 flex items-center justify-between w-full border-b border-gray-200">
            <Typography variant="subtitle1" className="font-bold!">
              ثبت فروش
            </Typography>
            <IconButton color="error" onClick={handleClose}>
              <CloseRounded />
            </IconButton>
          </Box>
          <Box className="p-4">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Typography variant="body2">مصولات</Typography>
                <Autocomplete
                  disablePortal
                  multiple
                  id="category-select"
                  options={products}
                  getOptionLabel={(option) => option.name}
                  value={selectedProducts}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.name} -{" "}
                        {option.sell_price.toLocaleString()}
                      </li>
                    );
                  }}
                  onChange={(event, newValue) => {
                    setSelectedProducts((old) => newValue);
                    setForm((prev) => ({
                      ...prev,
                      items: newValue.map((product) => ({
                        product_id: Number(product.id),
                        quantity: 1,
                      })),
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="انتخاب کنید..."
                    />
                  )}
                  size="small"
                  fullWidth
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <div className="w-full">
                  <Typography variant="body2">
                    مبلغ (ریال)
                  </Typography>
                  <TextField
                    placeholder="مبلغ به ریال"
                    size="small"
                    fullWidth
                    value={cost}
                  />
                </div>
              </div>
            </form>
          </Box>
          <div className="flex gap-2 border-t border-gray-300 pt-4 ">
            <Button onClick={handleAddSale} variant="contained">
              ثبت فروش
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClear}
            >
              انصراف
            </Button>
          </div>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default AddSaleForCustomerModal;
