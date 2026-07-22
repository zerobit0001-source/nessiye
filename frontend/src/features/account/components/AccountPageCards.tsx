import { formatPrice } from "@/utils/formatters";
import {
  AccountBalanceWalletRounded,
  CheckCircleOutlineRounded,
  ReceiptLongRounded,
  StorefrontRounded,
} from "@mui/icons-material";
import { Card, Typography } from "@mui/material";

interface AccountPageCardsProps {
  summary: {
    total_paid: number;
    total_remaining: number;
    open_debts_count: number;
    number_of_shops: number;
  };
}

export default function AccountPageCards({ summary }: AccountPageCardsProps) {
  return (
    <>
      <Card
        elevation={1}
        className="border border-red-300 bg-red-200/30! flex flex-col gap-2 rounded-xl! p-4 "
      >
        <AccountBalanceWalletRounded color="error" />
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
        <CheckCircleOutlineRounded color="success" />
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
      <Card elevation={1} className="flex flex-col gap-2 rounded-xl! p-4 ">
        <StorefrontRounded color="primary" />
        <span>
          <Typography variant="caption">تعداد فروشگاه‌ها</Typography>
          <Typography
            variant="subtitle1"
            className="font-bold!"
            color="primary"
          >
            {summary.number_of_shops}
          </Typography>
        </span>
      </Card>
      <Card
        elevation={1}
        className="flex flex-col gap-2 rounded-xl! p-4 md:col-span-full lg:col-span-1"
      >
        <ReceiptLongRounded color="warning" />
        <span>
          <Typography variant="caption">بدهی‌های باز</Typography>
          <Typography
            variant="subtitle1"
            className="font-bold!"
            color="warning"
          >
            {summary.open_debts_count}   فقره
          </Typography>
        </span>
      </Card>
    </>
  );
}
