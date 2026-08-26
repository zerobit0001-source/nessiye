"use client";
import { useGetModalDataQuery } from "@/features/dashboard/api/ApiModalsData";
import { useEffect, useRef, useState } from "react";
import SelectCustomerDialog from "../../debts/components/SelectCustomerDialog";
import {
  ApiCustomer,
  useLazyGetCustomerCreditsQuery,
} from "../../customers/api/ApiCustomer";
import { CustomerType, DebtType } from "@/types/types";
import { useAddPaymentMutation } from "../api/ApiPayment";
import SelectCustomerDebtDialog from "./SelectCustomerDebtDialog";
import {
  Autocomplete,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { formatDate, formatPrice } from "@/utils/formatters";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/lib/redux/hooks";
import { number } from "framer-motion";

export default function CreatePaymentForm({
  customerId,
  debtId,
}: {
  customerId?: string;
  debtId?: string;
}) {
  const [selectedCustomer, setSelectedCustomer] = useState<{
    id: number;
    phone_number: string;
    full_name: string;
  } | null>(null);
 
  const dispatch = useAppDispatch();

  const [selectedDebt, setSelectedDebt] = useState<DebtType | null>(null);
  const [debts, setDebts] = useState<DebtType[] | []>([]);
  const [customers, setCustomers] = useState<CustomerType[] | []>([]);
  const [amount, setAmount] = useState("");
  const [check, setCheck] = useState<boolean>(false);

  const {
    data: customersData,
    isLoading: isCustomerLoading,
    error: isCustomerError,
    isSuccess: CustomersSuccess,
  } = useGetModalDataQuery({ type: "customers" });
  const [
    getCustomerCredits,
    {
      data: Credits,
      isLoading: isCreditsLoading,
      error: CreditsError,
      isSuccess: CreditsSuccess,
    },
  ] = useLazyGetCustomerCreditsQuery();
  const [
    addPayment,
    {
      data: paymentData,
      isLoading: addPaymentLoading,
      error: addPaymentError,
      isSuccess: addPaymentSuccess,
    },
  ] = useAddPaymentMutation();
 
  // intialize the customers
  useEffect(() => {
    if (CustomersSuccess) {
      setCustomers(customersData.customers);
    }
  }, [CustomersSuccess, customersData]);

  // intialize customers debts
  useEffect(() => {
    if (CreditsSuccess) {
      setDebts(Credits.debts);
    }
  }, [CreditsSuccess, Credits]);

  useEffect(() => {
    if (!selectedCustomer) {
      setDebts([]);
      setSelectedDebt(null);
      return;
    }

    getCustomerCredits(selectedCustomer.id);
  }, [selectedCustomer, getCustomerCredits]);

  // price initialization
  useEffect(() => {
    if (check && selectedDebt) {
 
      setAmount(String(selectedDebt.remaining));
    }
    if (!check) {
      setAmount("");
    }
  }, [check, selectedDebt]);

  // intialize selectedCustomer based on customerId
  useEffect(() => {
    if (!customerId || !CustomersSuccess || customers.length === 0) return;

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
  }, [customerId, CustomersSuccess, customers]);

  // intialize debt based on debtId
  useEffect(() => {
    if (!debtId || !CreditsSuccess || debts.length === 0) return;

    const debt = debts.find((debt) => debt.id === Number(debtId));
    if (!debt) {
      toast.error("بدهی موردنظر پیدا نشد");
      return;
    }

    setSelectedDebt(debt);
  }, [debtId, CreditsSuccess, debts]);

  const resetForm = () => {
    setSelectedCustomer(null);
    setSelectedDebt(null);
    setDebts([]);
    setAmount("");
    setCheck(false);
  };

  async function handleSubmitPayment() {
    const numberedAmount = Number(amount);

    if (!selectedCustomer) {
      return toast.error("مشتری را انتخاب کنید");
    }

    if (!selectedDebt) {
      return toast.error("بدهی را انتخاب کنید");
    }

    if (numberedAmount <= 0) {
      return toast.error("مبلغ پرداخت را وارد کنید");
    }

    if (numberedAmount > selectedDebt.remaining) {
      return toast.error("مبلغ وارد شده بیشتر از مانده بدهی است");
    }

    try {
      const result = await addPayment({
        debt_id: selectedDebt.id,
        amount: numberedAmount,
        pay_full: check,
      }).unwrap();

      toast.success(result.message || "پرداخت با موفقیت انجام شد");

      dispatch(ApiCustomer.util.invalidateTags(["Credits"]));

      resetForm();
    } catch (error: any) {
 
      toast.error(error?.data?.error || "خطایی در ثبت پرداخت رخ داد");
    }
  }
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

        {/* Select Debt for payment */}

        <SelectCustomerDebtDialog
          selectedCustomer={selectedCustomer}
          debts={debts}
          selectedDebt={selectedDebt}
          setSelectedDebt={setSelectedDebt}
          isLoading={isCreditsLoading}
        />

        {/* Selected Debt */}

        <Typography variant="body1" className="font-bold!">
          بدهی انتخاب شده
        </Typography>

        {selectedDebt ? (
          <>
            <Card
              elevation={1}
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                بدهی #{selectedDebt.id}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {formatDate(selectedDebt.created_at, { dateStyle: "long" })}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>مبلغ کل</Typography>
                  <Typography fontWeight={700}>
                    {formatPrice(selectedDebt.amount)} تومان
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography>پرداخت شده</Typography>
                  <Typography color="success.main" fontWeight={700}>
                    {formatPrice(selectedDebt.paid_amount)} تومان
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography>مانده</Typography>
                  <Typography color="error.main" fontWeight={700}>
                    {formatPrice(selectedDebt.remaining)} تومان
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography>وضعیت</Typography>

                  <Chip
                    size="small"
                    label={selectedDebt.is_paid ? "تسویه شده" : "تسویه نشده"}
                    color={selectedDebt.is_paid ? "success" : "error"}
                  />
                </Stack>
              </Stack>
            </Card>
            <Divider sx={{ my: 2 }} />

            <Typography fontWeight={700} mb={1}>
              محصولات
            </Typography>

            <Stack spacing={1}>
              {selectedDebt.items.map((item) => (
                <Stack
                  key={item.id}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography>{item.product_name}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.quantity} × {formatPrice(item.price)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </>
        ) : (
          <Typography variant="caption" textAlign={"center"}>
            بدهی انتخاب نشده
          </Typography>
        )}

        <Typography variant="body1" className="font-bold!">
          اطلاعات دریافتی
        </Typography>

        <Card
          elevation={1}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: 3,
          }}
        >
          <TextField
            fullWidth
            size="small"
            label="مبلغ دریافتی (تومان)"
            placeholder="مثلاً 250,000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Autocomplete
            fullWidth
            size="small"
            options={[
              { id: 1, name: "کارت خوان" },
              { id: 2, name: "نقدی" },
              { id: 3, name: "انتقال بانکی" },
            ]}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField {...params} label="روش پرداخت" />
            )}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={check}
                onChange={(e) => setCheck(e.target.checked)}
              />
            }
            label={<Typography variant="caption">پرداخت کامل</Typography>}
            sx={{ m: 0 }}
          />
        </Card>
      </div>
      <div className="col-span-full lg:col-span-2">
        <Card
          elevation={1}
          sx={{
            p: 3,
            borderRadius: 3,
            position: "sticky",
            top: 20,
          }}
        >
          <Typography variant="h6" fontWeight={700} textAlign="center" mb={3}>
            خلاصه تراکنش
          </Typography>

          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography color="text.secondary">فاکتور انتخابی:</Typography>

              <Typography fontWeight={700}>
                {selectedDebt ? `DEBT-${selectedDebt.id}` : "-"}
              </Typography>
            </Stack>

            <Divider />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography color="text.secondary">مبلغ دریافتی:</Typography>

              <Typography fontWeight={700} color="success.main">
                {amount ? `${formatPrice(Number(amount))} تومان` : "۰ تومان"}
              </Typography>
            </Stack>
          </Stack>

          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              mt: 4,
              height: 52,
              borderRadius: 2,
            }}
            disabled={!selectedCustomer || !selectedDebt || !amount}
            onClick={handleSubmitPayment}
          >
            ثبت دریافت وجه
          </Button>
        </Card>
      </div>
    </div>
  );
}
