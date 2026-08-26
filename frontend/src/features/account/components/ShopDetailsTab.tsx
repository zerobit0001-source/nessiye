"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ShopDetailsDebtCard from "./ShopDetailsDebtCard";
import ShopDetailsSaleCard from "./ShopDetailsSaleCard";
import ShopDetailsPaymentCard from "./ShopDetailsPaymentCard";
import ShopDetailsDebtTab from "./ShopDetailsDebtTab";
import ShopDetailsSaleTab from "./ShopDetailsSaleTab";
import ShopDetailsPaymentTab from "./ShopDetailsPaymentTab";

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
      {value === index && <Box className="pt-2">{children}</Box>}
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

  // const {
  //   data: debts,
  //   isLoading: loadingDebts,
  //   error: errorDebts,
  // } = useGetShopDebtsQuery(shopId, {
  //   skip: value !== 0,
  // });
  // const {
  //   data: sales,
  //   isLoading: loadingSales,
  //   error: errorSales,
  // } = useGetShopSalesQuery(shopId, {
  //   skip: value !== 1,
  // });
  // const {
  //   data: payments,
  //   isLoading: loadingPayments,
  //   error: errorPayments,
  // } = useGetShopPaymentsQuery(shopId, {
  //   skip: value !== 2,
  // });

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
        <ShopDetailsDebtTab shopId={shopId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ShopDetailsSaleTab shopId={shopId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ShopDetailsPaymentTab shopId={shopId} />
      </CustomTabPanel>
    </Box>
  );
}
