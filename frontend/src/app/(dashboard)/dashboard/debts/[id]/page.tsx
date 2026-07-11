import DebtsDetailPage from "@/features/dashboard/childs/debts/components/DebtsDetailPage";
import React from "react";

const DebtsDetail = async ({ params }: { params: { id: number } }) => {
    const { id } = await params;

    return <DebtsDetailPage id={id} />;
};

export default DebtsDetail;
