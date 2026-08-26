"use client";

import { AddRounded, CloseRounded, QrCodeRounded } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ModalContainer from "./ModalContainer";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { productFormActions } from "../childs/products/slices/productFormSlice";
import { ProductModalFormType } from "@/types/modalsTypes";
import { validateAddProductForm } from "@/utils/validations/ProductValidation";
import {
  useAddProductMutation,
  useGetCategoriesQuery,
} from "../childs/products/api/ApiProduct";
import AddProductScannerDilog from "../childs/products/components/AddProductScannerDilog";
import { CatergoyType } from "@/types/types";
import { PostProductsType } from "@/types/ApiResponesesType";

const AddProductModal = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<PostProductsType>({
    name: "",
    barcode: "",
    buy_price: "",
    sell_price: "",
    exp_date: "",
    category: null,
    description: "",
    stock: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<CatergoyType | null>(
    null,
  );

  const [open, setOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addProduct, { isLoading, isSuccess, error, data }] =
    useAddProductMutation();
  const {
    data: categoriesData,
    isLoading: categoryIsLoading,
    error: categoryError,
  } = useGetCategoriesQuery();
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value }: { name: string; value: string | number } = e.target;
    if (name === "buy_price" || name === "sell_price" || name === "stock") {
      if (Number(value)) {
        value = Number(value);
      }
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    type FormFields = keyof typeof validateAddProductForm.shape;

    const fieldName = name as FormFields;

    dispatch(productFormActions.updateForm({ field: fieldName, value: value }));
  };

  async function handleAddProduct() {
    const isValid = validateAddProductForm.safeParse(form);
    if (!isValid.success) {
      toast.error(isValid.error.issues[0].message);
 
      return;
    }

    try {
      const result = await addProduct(form).unwrap();
 
      if (result.ok) {
        toast.success("محصول با موفقیت ثبت شد");
        dispatch(productFormActions.resetForm());
        setForm({
          name: "",
          barcode: "",
          buy_price: 0,
          sell_price: 0,
          exp_date: "",
          category: null,
          description: "",
          stock: 0,
        });
      } else {
        toast.error("خطا در ثبت محصول");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("خطا در ثبت محصول");
      return;
    }
  }

  return (
    <>
      <Button
        endIcon={<AddRounded fontSize="small" />}
        variant="contained"
        onClick={handleOpen}
      >
        محصول
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" bg-black/10 backdrop-blur-xs transition-all "
      >
        <ModalContainer>
          <Box className="p-2 flex items-center justify-between w-full border-b border-gray-200">
            <Typography variant="subtitle1" className="font-bold!">
              ثبت محصول جدید
            </Typography>
            <IconButton color="error" onClick={handleClose}>
              <CloseRounded />
            </IconButton>
          </Box>
          <Box className="p-4">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Typography variant="body2">نام محصول</Typography>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="چیپس لیمویی"
                  value={form.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-end gap-2 w-full">
                <div className="w-full flex flex-col gap-2">
                  <Typography variant="body2">بارکد</Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="6269334116182"
                    value={form.barcode}
                    name="barcode"
                    onChange={handleChange}
                  />
                </div>
                <IconButton
                  className="flex items-center justify-center"
                  aria-label="scanner"
                  color="primary"
                  onClick={() => setScannerOpen(true)}
                >
                  <QrCodeRounded />
                </IconButton>
                <AddProductScannerDilog
                  open={scannerOpen}
                  onClose={() => setScannerOpen(false)}
                  onScan={(barcode) => {
                    setForm((prev) => ({
                      ...prev,
                      barcode,
                    }));
                    setScannerOpen(false);
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <div className="w-full">
                  <Typography variant="body2">مبلغ خرید</Typography>
                  <TextField
                    placeholder="مبلغ به تومان ، (نامحدود)"
                    size="small"
                    fullWidth
                    value={form.buy_price}
                    name="buy_price"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <div className="w-full">
                    <Typography variant="body2">مبلغ فروش</Typography>
                    <TextField
                      placeholder="مبلغ به تومان ، (نامحدود)"
                      size="small"
                      fullWidth
                      value={form.sell_price}
                      name="sell_price"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <div className="w-full">
                  <Typography variant="body2">تاریخ انقضا (اختیاری)</Typography>
                  <TextField
                    placeholder="1404/05/29"
                    size="small"
                    type="date"
                    fullWidth
                    value={form.exp_date}
                    name="exp_date"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <Typography variant="body2">موجودی (اختیاری)</Typography>
                  <TextField
                    placeholder="32"
                    size="small"
                    fullWidth
                    value={form.stock}
                    name="stock"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <div className="w-full">
                  <Typography variant="body2">دسته بندی</Typography>
                  <Autocomplete
                    disablePortal
                    id="category-select"
                    options={categoriesData?.categories ?? []}
                    disabled={categoryIsLoading}
                    getOptionLabel={(option) => option.name}
                    value={selectedCategory || null}
                    onChange={(event, newValue) => {
                      setForm((prev) => ({
                        ...prev,
                        category: newValue?.id,
                      }));
                      setSelectedCategory(newValue);
                    }}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="انتخاب کنید..." />
                    )}
                    size="small"
                    fullWidth
                  />
                </div>
              </div>
              <TextField
                multiline
                rows={3}
                label="توضیحات"
                size="small"
                value={form.description}
                name="description"
                onChange={handleChange}
              />
            </form>
          </Box>
          <div className="flex gap-2 border-t border-gray-300 pt-4 ">
            <Button
              variant="contained"
              onClick={handleAddProduct}
              disabled={isLoading}
            >
              ثبت محصول
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                dispatch(productFormActions.resetForm());
                handleClose();
              }}
            >
              انصراف
            </Button>
          </div>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default AddProductModal;
