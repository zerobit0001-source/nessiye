"use client";

import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategorySelect from "@/components/dash/CategorySelectField";

const ProductsSearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") ?? "");

    const [category, setCategory] = useState<string | null>(
        searchParams.get("category"),
    );

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

        if (category) {
            params.set("category", category);
        } else {
            params.delete("category");
        }

        router.replace(`?${params.toString()}`);
    }, [debouncedSearch, category]);

    return (
        <div className="grid grid-cols-2 w-full ">
            <div className="flex flex-col md:flex-row col-span-full lg:col-span-1 items-center w-full gap-4 ">
                <TextField
                    size="small"
                    label="جستوجو"
                    placeholder="نام محصول ، بارکد ، شناسه و ..."
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex  w-full gap-2">
                    <CategorySelect setCategory={setCategory} />
                    {/* <BranchSelect setBranch={setBranch} /> */}
                </div>
            </div>
        </div>
    );
};

export default ProductsSearch;
