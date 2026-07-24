import Container from "@/components/dash/Container";
import SlideUpAnimation from "@/components/SlideUpAnimation";
import AccountDebtDetailsPage from "@/features/account/childs/debt/AccountDebtDetailsPage";
import {
  ChevronRightRounded,
  HistoryRounded,
  LocalMall,
  LocationOnRounded,
} from "@mui/icons-material";
import { Card, Chip, Divider, Typography } from "@mui/material";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ shopId: string; debtId: string }>;
}) {
  const { shopId, debtId } = await params;
  const shopIdNumber = Number(shopId);

  return <AccountDebtDetailsPage shopId={shopIdNumber} debtId={debtId} />;
}
