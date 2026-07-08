"use client";

import Container from "@/components/dash/Container";
import CopyButtonSku from "@/features/dashboard/components/CopyButtonSku";
import ProductPageHeader from "@/features/dashboard/components/ProductPageHeader";
import { Avatar, Card, Typography } from "@mui/material";
import { useGetProductByIdQuery } from "../api/ApiProduct";

const ProductDetailsPage = ({ id }: { id: string }) => {
    const { data, isLoading, isSuccess, error } = useGetProductByIdQuery(id);

    const product = isSuccess ? data.product : null;

    const formatter = new Intl.NumberFormat("fa-IR", {
        style: "currency",
        currency: "IRR",
    });
    const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    if (isLoading) {
        return (
            <Container>
                <div className="w-full h-screen flex items-center justify-center">
                    <Typography variant="h6">در حال بارگذاری...</Typography>
                </div>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container>
                <div className="w-full h-screen flex items-center justify-center">
                    <Typography variant="h6">محصول یافت نشد</Typography>
                </div>
            </Container>
        );
    }

    console.log(product);
    return (
        <Container>
            <ProductPageHeader id={id} />
            <Card className="p-4 flex items-center justify-center md:justify-between flex-wrap gap-4">
                <div className="flex flex-col md:items-start items-center gap-2">
                    <div className="flex items-center gap-4">
                        <Typography variant="h6">{product.name}</Typography>
                        {product.barcode && (
                            <CopyButtonSku text={product.barcode} />
                        )}
                    </div>
                    <Typography variant="caption">
                        {product.description}
                    </Typography>
                    <div className="">
                        <Typography variant="h6">
                            قیمت خرید : {formatter.format(product.buy_price)}
                        </Typography>
                        <Typography variant="h6">
                            قیمت فروش : {formatter.format(product.sell_price)}
                        </Typography>
                    </div>
                    <div className="">
                        <Typography variant="body1">
                            {product.exp_date}
                        </Typography>
                    </div>
                    <div className="">
                        <Typography variant="body1">
                            دسته بندی :{" "}
                            {product.category_name
                                ? product.category_name
                                : "بدون دسته بندی"}
                        </Typography>
                    </div>
                    <div className="">
                        <Typography variant="h6">
                            موجودی : {product.stock}
                        </Typography>
                    </div>
                </div>
                <Avatar
                    variant="rounded"
                    className="w-70! h-90!"
                    alt={product.name}
                >
                    {product.name[0]}
                </Avatar>
            </Card>
        </Container>
    );
};

export default ProductDetailsPage;
