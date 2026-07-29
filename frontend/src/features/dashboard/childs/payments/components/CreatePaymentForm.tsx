"use client";
import { useGetModalDataQuery } from "@/features/dashboard/api/ApiModalsData";
import { useEffect, useState } from "react";
import SelectCustomerDialog from "../../debts/components/SelectCustomerDialog";
import { useLazyGetCustomerCreditsQuery } from "../../customers/api/ApiCustomer";
import { CustomerType, DebtType } from "@/types/types";
import { useAddPaymentMutation } from "../api/ApiPayment";
import SelectCustomerDebtDialog from "./SelectCustomerDebtDialog";

export default function CreatePaymentForm() {
  const [selectedCustomer, setSelectedCustomer] = useState<{
    id: number;
    phone_number: string;
    full_name: string;
  } | null>(null);

  const [selectedDebt, setSelectedDebt] = useState<DebtType | null>(null);
  const [debts, setDebts] = useState<DebtType[] | []>([]);
  const [customers, setCustomers] = useState<CustomerType[] | []>([]);
  const [amount, setAmount] = useState<number>(0);
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

  useEffect(() => {
    if (CustomersSuccess) {
      setCustomers(customersData.customers);
    }
  }, [CustomersSuccess, customersData]);
  useEffect(() => {
    if (CreditsSuccess) {
      setDebts(Credits.debts);
    }
  }, [CreditsSuccess, Credits]);
  useEffect(() => {
    if (selectedCustomer) {
      getCustomerCredits(selectedCustomer?.id);
    }
  }, [selectedCustomer, setSelectedCustomer]);

  return (
    <div className="w-250 grid grid-cols-1 lg:grid-cols-6 gap-4">
      <div className=" col-span-full lg:col-span-4 flex flex-col gap-4">
        {/* Customer select dialog */}
        <SelectCustomerDialog
          selectedCustomer={selectedCustomer}
          customers={customers}
          setSelectedCustomer={setSelectedCustomer}
        />

        {/* Select Debt for payment */}

        <SelectCustomerDebtDialog
          selectedCustomer={selectedCustomer}
          debts={debts}
          selectedDebt={selectedDebt}
          setSelectedDebt={setSelectedDebt}
        />
      </div>
      <div className="col-span-full lg:col-span-2"></div>
    </div>
  );
}
