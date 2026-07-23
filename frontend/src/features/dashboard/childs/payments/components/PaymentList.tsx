"use client";
import { useState } from "react";
import AppTable from "../../components/AppTable";
import { useGetPaymentsQuery } from "../api/ApiPayment";
import PaymentRow from "./PaymentRow";
import PaymentsRowSkeleton from "./PaymentsRowSkeleton";
interface Props {
  search?: string;
  status?: string;
  ordering?: string;
  period?: string;
}
const PaymentList = ({ search, status, ordering, period }: Props) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetPaymentsQuery({
    search,
    status,
    ordering,
    period,
    page,
  });

  console.log("this is period", period);

  if (isLoading) {
    return Array.from({ length: 8 }).map((_, index) => (
      <PaymentsRowSkeleton key={index} />
    ));
  }
  if (error) {
    return <p>Something went wrong.</p>;
  }

  const payments = data?.results ?? [];
  console.log(data);
  return (
    <AppTable
      headers={["شناسه", "مشتری", "مبلغ", "روش پرداخت", "تاریخ", ""]}
      data={payments}
      renderRow={(payment) => <PaymentRow payment={payment} key={payment.id} />}
      pagination={{
        page,
        totalPages: data?.total_pages ?? 1,
        totalItems: data?.count ?? 0,
        pageSize: data?.page_size ?? 20,
        onChange: setPage,
      }}
    />
  );
};

export default PaymentList;
