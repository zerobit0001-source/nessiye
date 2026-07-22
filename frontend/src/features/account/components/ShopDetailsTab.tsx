"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ShopDetailsDebtCard from "./ShopDetailsDebtCard";
import ShopDetailsSaleCard from "./ShopDetailsSaleCard";
import ShopDetailsPaymentCard from "./ShopDetailsPaymentCard";
import { DebtType, SaleType } from "@/types/types";
import { useGetShopDebtsQuery, useGetShopSalesQuery } from "../api/ApiAccount";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface ShopDetailsProps {
  shopId: number;
}

export default function ShopDetailsTab({ shopId }: ShopDetailsProps) {
  const [value, setValue] = React.useState(0);

  const {
    data: debts,
    isLoading: loadingDebts,
    error: errorDebts,
  } = useGetShopDebtsQuery(shopId);
  const {
    data: sales,
    isLoading: loadingSales,
    error: errorSales,
  } = useGetShopSalesQuery(shopId);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="لیست بدهی ها " {...a11yProps(0)} />
          <Tab label="تاریخجه خرید ها" {...a11yProps(1)} />
          <Tab label="لیست پرداخت ها" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="flex flex-col gap-4">
          {debts?.results.map((debt) => (
            <ShopDetailsDebtCard key={debt.id} debt={debt} />
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="flex flex-col gap-4">
          {sales?.results.map((sale) => (
            <ShopDetailsSaleCard key={sale.id} sale={sale} />
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="flex flex-col gap-4">
          <ShopDetailsPaymentCard
            id="8842"
            amount={2000000}
            createdAt="۱۴۰۳/۰۲/۱۵"
          />
          <ShopDetailsPaymentCard
            id="8842"
            amount={2000000}
            createdAt="۱۴۰۳/۰۲/۱۵"
          />
        </div>
      </CustomTabPanel>
    </Box>
  );
}
