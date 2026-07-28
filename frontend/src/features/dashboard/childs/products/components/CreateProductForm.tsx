"use client";

import { useState } from "react";
import {
  Autocomplete,
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { AddRounded, DeleteRounded, QrCodeRounded } from "@mui/icons-material";
import { validateAddProductForm } from "@/utils/validations/ProductValidation";
import { useAddProductMutation } from "../api/ApiProduct";
import { toast } from "react-toastify";

interface Option {
  id: number;
  name: string;
}

const categories: Option[] = [
  { id: 1, name: "مواد غذایی" },
  { id: 2, name: "نوشیدنی" },
  { id: 3, name: "لبنیات" },
];

const units: Option[] = [
  { id: 1, name: "عدد" },
  { id: 2, name: "کیلوگرم" },
  { id: 3, name: "بسته" },
];

const initialForm = {
  name: "",
  barcode: "",
  category: null as Option | null,
  unit: null as Option | null,
  buy_price: "",
  sell_price: "",
  stock: "",
  description: "",
};

export default function CreateProductForm() {
  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof initialForm, string>>
  >({});

  const [createProduct, productQuery] = useAddProductMutation();

  const handleChange =
    (key: keyof typeof initialForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));

      if (key in errors) {
        setErrors((prev) => ({
          ...prev,
          [key]: "",
        }));
      }
    };
  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = validateAddProductForm.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
        barcode: fieldErrors.barcode?.[0],
        buy_price: fieldErrors.buy_price?.[0],
        sell_price: fieldErrors.sell_price?.[0],
        stock: fieldErrors.stock?.[0],
        description: fieldErrors.description?.[0],
      });

      return;
    }

    setErrors({});

    console.log(result.data);

    try {
      const res = await createProduct(result.data).unwrap();

      if (res.ok) {
        toast.success("محصول با موفقیت ثبت شد");
      } else {
        toast.error("خطا در ثبت محصول");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("خطا در ثبت محصول");
      return;
    }
    handleReset();
  };

  const handleBarcodeScanner = () => {
    console.log("Open Barcode Scanner");
  };

  return (
    <Card
      className="p-6 rounded-lg! w-full max-w-4xl mt-4 mx-auto"
      elevation={1}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Name + Barcode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextField
            fullWidth
            size="small"
            label="نام کالا *"
            value={form.name}
            onChange={handleChange("name")}
            error={!!errors.name}
            helperText={errors.name}
            className="col-span-full md:col-span-2"
          />

          <TextField
            fullWidth
            size="small"
            label="بارکد"
            value={form.barcode}
            onChange={handleChange("barcode")}
            className="col-span-full md:col-span-1"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleBarcodeScanner}>
                    <QrCodeRounded color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errors.barcode}
            helperText={errors.barcode}
          />
        </div>

        {/* Category + Unit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Autocomplete
            fullWidth
            options={categories}
            value={form.category}
            onChange={(_, value) =>
              setForm((prev) => ({
                ...prev,
                category: value,
              }))
            }
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            renderInput={(params) => (
              <TextField {...params} label="دسته بندی" size="small" />
            )}
          />

          <Autocomplete
            fullWidth
            options={units}
            value={form.unit}
            onChange={(_, value) =>
              setForm((prev) => ({
                ...prev,
                unit: value,
              }))
            }
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            renderInput={(params) => (
              <TextField {...params} label="واحد شمارش" size="small" />
            )}
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            fullWidth
            size="small"
            type="number"
            label="قیمت خرید *"
            value={form.buy_price}
            onChange={handleChange("buy_price")}
            error={!!errors.buy_price}
            helperText={errors.buy_price}
            inputProps={{ min: 0 }}
          />

          <TextField
            fullWidth
            size="small"
            type="number"
            label="قیمت فروش *"
            value={form.sell_price}
            onChange={handleChange("sell_price")}
            error={!!errors.sell_price}
            helperText={errors.sell_price}
            inputProps={{ min: 0 }}
          />
        </div>

        {/* Stock */}
        <TextField
          fullWidth
          size="small"
          type="number"
          label="موجودی اولیه *"
          value={form.stock}
          onChange={handleChange("stock")}
          error={!!errors.stock}
          helperText={errors.stock}
          inputProps={{ min: 0 }}
        />

        {/* Description */}
        <TextField
          fullWidth
          multiline
          rows={4}
          size="small"
          label="توضیحات"
          value={form.description}
          onChange={handleChange("description")}
          error={!!errors.description}
          helperText={errors.description}
        />

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
          <Button
            variant="outlined"
            color="error"
            endIcon={<DeleteRounded />}
            onClick={handleReset}
            disabled={productQuery.isLoading}
          >
            پاک کردن
          </Button>

          <Button
            type="submit"
            variant="contained"
            endIcon={<AddRounded />}
            disabled={productQuery.isLoading}
          >
            ثبت کالا
          </Button>
        </div>
      </form>
    </Card>
  );
}
