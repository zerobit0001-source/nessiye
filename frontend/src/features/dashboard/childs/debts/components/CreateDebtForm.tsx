"use client";

import { ProductType } from "@/types/types";
import { Button, Card, createFilterOptions, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAddSalesMutation } from "../../sales/api/ApiSales";
import { useGetModalDataQuery } from "@/features/dashboard/api/ApiModalsData";
import { toast } from "react-toastify";
import SelectCustomerDialog from "./SelectCustomerDialog";
import SelectProductDialog from "./SelectProductDialog";
import SelectedProductsList from "./SelectedProductsList";
import { formatPrice } from "@/utils/formatters";

interface CreateDebtFormProps {
  customerId?: string;
}

export default function CreateDebtForm({ customerId }: CreateDebtFormProps) {
  const [scannerOpen, setScannerOpen] = useState(false);

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // products api RTKQuery
  const [
    addSale,
    { data: addSaleRes, isLoading: addSaleLoading, error: addSaleError },
  ] = useAddSalesMutation();
  const {
    data: customersData,
    isLoading: isCustomerLoading,
    error: isCustomerError,
    isSuccess: isCustomerSuccess,
  } = useGetModalDataQuery({ type: "customers" });
  const {
    data: productsData,
    isLoading: isProductLoading,
    error: isProductError,
  } = useGetModalDataQuery({
    type: "products",
    search: debouncedSearch,
  });
 
 
  const customers = customersData?.customers ?? [];
  const products = productsData?.products ?? [];

  // initialize selectedCustomer based on customerId
  useEffect(() => {
    if (!customerId || !isCustomerSuccess || customers.length === 0) return;

    const customerIdNumber = Number(customerId);

    if (!Number.isInteger(customerIdNumber)) {
      toast.error("شناسه مشتری نامعتبر است");
      return;
    }

    const customer = customers.find(
      (customer) => customer.id === customerIdNumber,
    );

    if (!customer) {
      toast.error("مشتری موردنظر پیدا نشد");
      return;
    }

    setSelectedCustomer({
      id: customer.id,
      phone_number: customer.phone_number,
      full_name: customer.full_name,
    });
  }, [customerId, isCustomerSuccess, customers]);

  async function handleAddSale() {
    const body = {
      customer_id: selectedCustomer?.id,
      is_debt: true,
      items: selectedProducts.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    };

    const toastId = toast.loading("در حال ثبت بدهی...");

    try {
      const result = await addSale(body).unwrap();

      if (!result.ok) {
        toast.update(toastId, {
          type: "error",
          render: "خطا در ایجاد بدهی",
          autoClose: 2000,
          isLoading: false,
        });
        return;
      }

      toast.update(toastId, {
        type: "success",
        render: "بدهی ثبت شد",
        autoClose: 2000,
        isLoading: false,
      });
      setSelectedCustomer(null);
      setSelectedProducts([]);
    } catch (error) {
 
      const message = (error as { data?: { error?: string } })?.data?.error;
      toast.update(toastId, {
        type: "error",
        render: `خطا از سمت سرور: ${message ?? "خطا"}`,
        autoClose: 2000,
        isLoading: false,
      });
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
        {/* Customer select dialog */}
        <SelectCustomerDialog
          selectedCustomer={selectedCustomer}
          customers={customers}
          setSelectedCustomer={setSelectedCustomer}
          isLoading={isCustomerLoading}
        />
        {/* Product select dialog */}
        <SelectProductDialog
          products={products}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          isLoading={isProductLoading}
          search={search}
          setSearch={setSearch}
        />
        {/* Selected products list */}
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
          className="rounded-lg! py-4 px-4 flex flex-col gap-4 sticky top-0 "
        >
          <Typography variant="body1" className="font-bold!">
            خلاصه بدهی
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
          <Button
            variant={"contained"}
            color="primary"
            onClick={handleAddSale}
            disabled={
              addSaleLoading ||
              !selectedCustomer ||
              selectedProducts.length === 0
            }
          >
            ثبت بدهی
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
