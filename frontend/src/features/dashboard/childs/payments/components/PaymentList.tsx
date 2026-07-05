"use client";
import { useGetPaymentsQuery } from "../api/ApiPayment";
import PaymentRow from "./PaymentRow";

const PaymentList = () => {
    const { data, isLoading, error } = useGetPaymentsQuery();

    if (isLoading) {
        return <p>loading...</p>;
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
