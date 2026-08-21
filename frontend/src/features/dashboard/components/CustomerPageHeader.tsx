import { ArrowBackRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import AddPaymentModal from "./AddPaymentModal";
import AddSaleModal from "./AddSaleModal";
import LinkButton from "./LinkButton";

const CustomerPageHeader = ({ id }: { id: string }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <Link href={"/dashboard/customers"}>
        <Button
          size="small"
          startIcon={<ArrowForwardIosRounded fontSize="small" />}
          variant="outlined"
        >
          برگشت
        </Button>
      </Link>
      <Box className="flex gap-2">
        {/*<AddSaleModal />*/}
        <LinkButton
          text="بدهی"
          link={`/dashboard/debts/create?customerId=${id}`}
          variant="outlined"
        />
        <LinkButton
          text="فروش"
          link={`/dashboard/sales/create?customerId=${id}`}
          variant="outlined"
        />
        <LinkButton
          text="پرداخت"
          link={`/dashboard/payments/create?customerId=${id}`}
          variant="contained"
        />
      </Box>
    </div>
  );
};

export default CustomerPageHeader;
