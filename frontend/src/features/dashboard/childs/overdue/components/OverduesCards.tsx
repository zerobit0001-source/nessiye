import { Box } from "@mui/material";
import StatsCard from "../../components/StatCard";
import {
  AccessTimeRounded,
  AttachMoneyRounded,
  PeopleRounded,
  ReceiptLongRounded,
} from "@mui/icons-material";

export default function OverduesCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      <StatsCard
        title={"کل بدهی‌های معوق"}
        value={12}
        unit={"عدد"}
        icon={<ReceiptLongRounded />}
        iconBg="error.light"
        iconColor="error.dark"
      />
      <StatsCard
        title={"میانگین روزهای تأخیر"}
        value={16}
        unit={"روز"}
        icon={<AccessTimeRounded />}
        iconBg="warning.light"
        iconColor="warning.dark"
      />
      <StatsCard
        title={"مشتریان درگیر"}
        value={11}
        unit={"نفر"}
        icon={<PeopleRounded />}
        iconBg="warning.light"
        iconColor="warning.dark"
      />
      <StatsCard
        title={"وصول‌شده این ماه"}
        value={98000000}
        unit={"تمان"}
        icon={<AttachMoneyRounded />}
        iconBg="secondary.light"
        iconColor="secondary.dark"
      />
    </div>
  );
}
