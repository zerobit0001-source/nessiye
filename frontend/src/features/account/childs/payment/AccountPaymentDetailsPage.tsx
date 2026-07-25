"use client";
import React from "react";
import { useGetShopPaymentDetailsQuery } from "../../api/ApiAccount";

export default function AccountPaymentDetailsPage({
  paymentId,
  shopId,
}: {
  paymentId: number;
  shopId: number;
}) {
  const { data, isLoading, error, isSuccess } = useGetShopPaymentDetailsQuery({
    shopId,
    paymentId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!isSuccess) return <div>No data</div>;

  const payment = isSuccess ? data.payment : null;

  console.log(payment);
  return <div></div>;
}
