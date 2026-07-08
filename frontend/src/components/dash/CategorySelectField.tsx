"use client";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { categories } from "@/utils/filteringData";
import { useGetCategoriesQuery } from "@/features/dashboard/childs/products/api/ApiProduct";

interface Props {
    setCategory: (category: string | undefined) => void;
}

export default function CategorySelect({ setCategory }: Props) {
    const { data, isLoading, error } = useGetCategoriesQuery();

    return (
        <Autocomplete
            disablePortal
            id="category-select"
            options={data?.categories ?? []}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="دسته‌بندی محصول"
                    placeholder="انتخاب کنید..."
                />
            )}
            onChange={(event, newValue) => {
                setCategory(newValue?.name);
            }}
            size="small"
            fullWidth
        />
    );
}
