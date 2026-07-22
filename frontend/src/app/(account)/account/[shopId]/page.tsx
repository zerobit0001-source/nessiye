import ShopDetailsPage from "@/features/account/components/ShopDetailsPage";
import { log } from "node:console";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ shopId: string }>;
  searchParams: Promise<{ status: "active" | "settled" | "overdue" }>;
}) => {
  const { shopId } = await params;
  const { status } = await searchParams;

  log(shopId, status);

  return <ShopDetailsPage shopId={shopId} status={status} />;
};

export default page;
