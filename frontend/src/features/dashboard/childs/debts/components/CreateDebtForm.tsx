"use client";

import { ProductType } from "@/types/types";
import {
  Autocomplete,
  Avatar,
  Box,
  Card,
  createFilterOptions,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAddSalesMutation } from "../../sales/api/ApiSales";
import { useGetModalDataQuery } from "@/features/dashboard/api/ApiModalsData";
import { toast } from "react-toastify";
import SelectCustomerDialog from "./SelectCustomerDialog";
import SelectProductDialog from "./SelectProductDialog";
import SelectedProductsList from "./SelectedProductsList";

export default function CreateDebtForm() {
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
      is_debt: true,
      items: selectedProducts.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      const result = await addSale(body).unwrap();

      if (!result.ok) {
        toast.error("خطا در ایجاد نسیه");
        return;
      }

      toast.success("نسیه ثبت شد");
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
  return (
    <div className="w-200 grid grid-cols-1 lg:grid-cols-6 gap-4">
      <div className=" col-span-full lg:col-span-4">
        {/* Customer select dialog */}
        <SelectCustomerDialog
          selectedCustomer={selectedCustomer}
          customers={customers}
          setSelectedCustomer={setSelectedCustomer}
        />
        {/* Product select dialog */}
        <SelectProductDialog
          products={products}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
        {/* Selected products list */}
        <SelectedProductsList
          products={selectedProducts}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onDelete={handleDelete}
        />
      </div>
      <Card className="col-span-full lg:col-span-2 p-4">
        <p>s</p>
      </Card>
    </div>
  );
}
