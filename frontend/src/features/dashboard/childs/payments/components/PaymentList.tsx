"use client";
import { useGetPaymentsQuery } from "../api/ApiPayment";
import PaymentRow from "./PaymentRow";
import PaymentsRowSkeleton from "./PaymentsRowSkeleton";

const PaymentList = () => {
    const { data, isLoading, error } = useGetPaymentsQuery();

    if (isLoading) {
        return Array.from({ length: 8 }).map((_, index) => (
            <PaymentsRowSkeleton key={index} />
        ));
    }
    if (error) {
        return <p>Something went wrong.</p>;
    }

    const payments = data?.payments ?? [];
    console.log(payments);
    return (
        <>
            {payments.map((payment) => (
                <PaymentRow payment={payment} key={payment.id} />
            ))}
        </>
    );
};

export default PaymentList;
