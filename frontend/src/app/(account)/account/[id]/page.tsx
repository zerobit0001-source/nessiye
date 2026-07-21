import ShopDetailsPage from "@/features/account/components/ShopDetailsPage";
import { log } from "node:console";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status: "active" | "settled" | "overdue" }>;
}) => {
  const { id } = await params;
  const { status } = await searchParams;

  log(id, status);

  return <ShopDetailsPage id={id} status={status} />;
};

export default page;
