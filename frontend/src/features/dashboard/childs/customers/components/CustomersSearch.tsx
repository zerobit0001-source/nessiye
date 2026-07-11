"use client";

import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CustomersSearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") ?? "");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (debouncedSearch) {
            params.set("search", debouncedSearch);
        } else {
            params.delete("search");
        }


        router.replace(`?${params.toString()}`);
    }, [debouncedSearch]);

    return (
        <div className="grid grid-cols-3 w-full my-2">
            <div className="flex flex-col md:flex-row col-span-full lg:col-span-1 items-center w-full gap-4 ">
                <TextField
                    size="small"
                    label="جستوجو"
                    placeholder="نام ، شماره تلفن ، شناسه و ..."
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    );
};

export default CustomersSearch;
