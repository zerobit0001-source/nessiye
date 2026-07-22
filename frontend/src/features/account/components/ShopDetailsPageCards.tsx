import { formatPrice } from "@/utils/formatters";
import { Card, Typography } from "@mui/material";

interface ShopDetailsPageCardsProps {
  summary: {
    total_purchase: number;
    total_debt: number;
    total_paid: number;
    total_remaining: number;
  };
}

export default function ShopDetailsPageCards({
  summary,
}: ShopDetailsPageCardsProps) {
  return (
    <>
      <Card
        elevation={1}
        className="border border-red-300 bg-red-200/30! flex flex-col gap-2 rounded-xl! p-4 "
      >
        <span>
          <Typography variant="caption">کل بدهی باقیمانده</Typography>
          <Typography variant="subtitle1" className="font-bold!" color="error">
            {formatPrice(summary.total_remaining)} تومان
          </Typography>
        </span>
      </Card>
      <Card
        elevation={1}
        className="border border-green-300 bg-green-200/30! flex flex-col gap-2 rounded-xl! p-4 "
      >
        <span>
          <Typography variant="caption">کل مبلغ پرداختی</Typography>
          <Typography
            variant="subtitle1"
            className="font-bold!"
            color="success"
          >
            {formatPrice(summary.total_paid)} تومان
          </Typography>
        </span>
      </Card>
      <Card
        elevation={1}
        className="flex flex-col gap-2 rounded-xl! p-4 col-span-full md:col-span-1 border border-gray-200 "
      >
        <span>
          <Typography variant="caption">مجموع کل خریدها</Typography>
          <Typography
            variant="subtitle1"
            className="font-bold!"
            color="primary"
          >
            {formatPrice(summary.total_debt)} تومان
          </Typography>
        </span>
      </Card>
    </>
  );
}
