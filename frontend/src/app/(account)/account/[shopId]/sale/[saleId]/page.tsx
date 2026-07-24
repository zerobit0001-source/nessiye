import Container from "@/components/dash/Container";
import SlideUpAnimation from "@/components/SlideUpAnimation";
import AccountSaleDetailsPage from "@/features/account/childs/sale/AccountSaleDetailsPage";
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
  params: Promise<{ shopId: string; saleId: string }>;
}) {
  const { shopId, saleId } = await params;
  const shopIdNumber = Number(shopId);
  const saleIdNumber = Number(saleId);
  return <AccountSaleDetailsPage saleId={saleIdNumber} shopId={shopIdNumber} />;
}
