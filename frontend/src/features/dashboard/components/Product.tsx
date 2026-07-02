import { ProductShowType } from "@/types/productTypes";
import { ImageRounded } from "@mui/icons-material";
import { Card, Typography } from "@mui/material";
import Link from "next/link";

interface ProductProps {
    product: ProductShowType;
}

const Product = ({ product }: ProductProps) => {
    return (
        <Link href={`products/${product.id}`} className="h-full">
            <Card className="rounded-lg! h-full">
                <div className="w-full h-70 flex items-center justify-center">
                    <ImageRounded color="action" />
                </div>
                <div className="p-2">
                    <Typography variant="body1">{product.name}</Typography>
                    {product.barcode && (
                        <Typography variant="body2">
                            بارکد : {product.barcode}
                        </Typography>
                    )}
                    <Typography variant="body2">
                        قیمت : {product.sell_price}
                    </Typography>
                    {product.exp_date && (
                        <Typography variant="body2">
                            تاریخ انقضا : {product.exp_date}
                        </Typography>
                    )}
                    <Typography variant="body2">{product.category}</Typography>
                    <Typography variant="body2">
                        تعداد : {product.stock}
                    </Typography>
                </div>
            </Card>
        </Link>
    );
};

export default Product;
