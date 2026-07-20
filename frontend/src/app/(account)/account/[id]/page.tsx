import ShopDetailsPage from "@/features/account/components/ShopDetailsPage";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <ShopDetailsPage id={id} />;
};

export default page;
