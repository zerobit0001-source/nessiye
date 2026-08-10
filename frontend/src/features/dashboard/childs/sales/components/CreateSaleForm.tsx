"use client";

import { ProductType } from "@/types/types";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  createFilterOptions,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAddSalesMutation } from "../../sales/api/ApiSales";
import { useGetModalDataQuery } from "@/features/dashboard/api/ApiModalsData";
import { toast } from "react-toastify";

import { formatPrice } from "@/utils/formatters";
import SelectCustomerDialog from "./SelectCsutomerDialog";
import SelectProductDialog from "../../debts/components/SelectProductDialog";
import SelectedProductsList from "../../debts/components/SelectedProductsList";

export default function CreateSaleForm() {
  const [scannerOpen, setScannerOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<{
    id: number;
    phone_number: string;
    full_name: string;
  } | null>(null);

  const [selectedProducts, setSelectedProducts] = useState<
    {
      product: ProductType;
      quantity: number;
    }[]
  >([]);

  const [cost, setCost] = useState<number>(0);

  const filterOptions = createFilterOptions({
    stringify: (option: {
      id: number;
      phone_number: string;
      full_name: string;
    }) => `${option.full_name} ${option.phone_number}`,
  });

  // products api RTKQuery
  const [
    addSale,
    { data: addSaleRes, isLoading: addSaleLoading, error: addSaleError },
  ] = useAddSalesMutation();
  const {
    data: customersData,
    isLoading: isCustomerLoading,
    error: isCustomerError,
  } = useGetModalDataQuery({ type: "customers" });
  const {
    data: productsData,
    isLoading: isProductLoading,
    error: isProductError,
  } = useGetModalDataQuery({ type: "products" });

  console.log("this is modals customers : ", customersData);
  console.log("this is modals products : ", productsData);

  const customers = customersData?.customers ?? [];
  const products = productsData?.products ?? [];

  async function handleAddSale() {
    const body = {
      customer_id: selectedCustomer?.id,
      items: selectedProducts.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      const result = await addSale(body).unwrap();

      if (!result.ok) {
        toast.error("خطا در ایجاد فروش");
        return;
      }

      toast.success("فروش ثبت شد");
      setSelectedCustomer(null);
      setSelectedProducts([]);
      return;
    } catch (error) {
      console.log(error);
      toast.error(error.data.error || "error");
    }
  }
  const handleIncrease = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };
  const handleDecrease = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };
  const handleDelete = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  };
  const totalCost = selectedProducts.reduce(
    (sum, item) => sum + item.product.sell_price * item.quantity,
    0,
  );
  return (
    <div className="w-250 grid grid-cols-1 lg:grid-cols-6 gap-4">
      <div className=" col-span-full lg:col-span-4 flex flex-col gap-4">
        {/* Select Customer */}
        <SelectCustomerDialog
          customers={customers}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
        {/* Select product */}

        <SelectProductDialog
          products={products}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          isLoading={isProductLoading}
        />

        {/* products List */}

        <SelectedProductsList
          products={selectedProducts}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onDelete={handleDelete}
        />
      </div>
      <div className="col-span-full lg:col-span-2">
        <Card
          elevation={1}
          className="rounded-lg! py-4 px-4 flex flex-col gap-4 sticky top-0"
        >
          <Typography variant="body1" className="font-bold!">
            خلاصه فروش
          </Typography>
          <span className="w-full flex items-center justify-between">
            <Typography variant="caption">تعداد عناوین :</Typography>
            <Typography variant="caption">
              {selectedProducts.length} کالا
            </Typography>
          </span>
          <span className="w-full flex items-center justify-between">
            <Typography variant="caption">جمع کل :</Typography>
            <Typography variant="caption">
              {formatPrice(totalCost)} تومان
            </Typography>
          </span>
          <Button variant={"contained"} color="primary" onClick={handleAddSale}>
            ثبت فروش
          </Button>
          <Button
            variant={"outlined"}
            color="error"
            onClick={() => {
              setSelectedCustomer(null);
              setSelectedProducts([]);
            }}
          >
            انصراف
          </Button>
        </Card>
      </div>
    </div>
  );
}
