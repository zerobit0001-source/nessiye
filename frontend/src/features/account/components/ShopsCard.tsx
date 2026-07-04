import { ShopType } from "@/types/types";
import { ChevronLeftRounded } from "@mui/icons-material";
import { Avatar, Button, Card, Typography } from "@mui/material";
import Link from "next/link";

interface shopcardProps {
    shop: ShopType;
}

const ShopsCard = ({ shop }: shopcardProps) => {
    return (
        <Card className="rounded-xl! p-4! flex flex-col gap-8">
            <div className="flex items-center justify-between w-full">
                <div className="flex  gap-2 items-center">
                    <Avatar variant="rounded" />
                    <div className="">
                        <Typography variant="body1">
                            سوپرمارکت {shop.shop_name}
                        </Typography>
                        <Typography variant="caption">
                            {shop.shop_address}
                        </Typography>
                    </div>
                </div>
                <ChevronLeftRounded color="disabled" />
            </div>
            <div className="bg-blue-500/50! p-4 border border-blue-500 rounded-xl!">
                <Typography variant="body2">بدهی باقی‌مانده</Typography>
                <Typography variant="h5" color="primary" className="font-bold!">
                    {shop.total_amount.toLocaleString("fa-IR")} تومان
                </Typography>
            </div>
            <div className="flex w-full items-center justify-between">
                <Button variant="outlined">
                    {shop.number_of_debts} فاکتور باز
                </Button>
                <Typography variant="caption">1405/03/29</Typography>
            </div>
            <Link href={`account/${shop.shop_id}`}>
                <Button variant="contained" fullWidth>
                    مشاهده جزئیات
                </Button>
            </Link>
        </Card>
    );
};

export default ShopsCard;
