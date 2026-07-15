"use client";
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
  const { data, isLoading, error } = useGetPaymentsQuery({
    search,
    status,
    ordering,
    period,
  });

  if (isLoading) {
    return Array.from({ length: 8 }).map((_, index) => (
      <PaymentsRowSkeleton key={index} />
    ));
  }
  if (error) {
    return <p>Something went wrong.</p>;
  }

  const payments = data?.results ?? [];
  console.log(payments);
  return (
    <AppTable
      headers={["شناسه", "مشتری", "مبلغ", "روش پرداخت", "تاریخ", ""]}
      data={payments}
      renderRow={(payment) => <PaymentRow payment={payment} key={payment.id} />}
    />
  );
};

export default PaymentList;
