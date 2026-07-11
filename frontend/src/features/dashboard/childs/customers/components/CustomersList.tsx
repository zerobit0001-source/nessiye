"use client";

import React from "react";
import { useGetCustomersQuery } from "../api/ApiCustomer";
import CustomerRow from "../../components/CustomerRow";
import Link from "next/link";
import CustomerRowSkeleton from "./CustomerRowSkeleton";

export interface GetCustomersParams {
    search?: string;
    // page?: number;
    // ordering?: string;
}


const CustomersList = ({search} : GetCustomersParams) => {
    const { data, isLoading, error } = useGetCustomersQuery({
        search
    });

    if (isLoading) {
        return Array.from({ length: 8 }).map((_, index) => (
            <CustomerRowSkeleton key={index} />
        ));
    }
    if (error) {
        return <p>Something went wrong.</p>;
    }

    const customers = data?.customers ?? [];
    console.log(customers);

    return (
        <>
            {customers.map((customer) => (
                <Link href={`customers/${customer.id}`} key={customer.id}>
                    <CustomerRow customer={customer} />
                </Link>
            ))}
        </>
    );
};

export default CustomersList;
