"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ShopDetailsDebtCard from "./ShopDetailsDebtCard";
import ShopDetailsSaleCard from "./ShopDetailsSaleCard";
import ShopDetailsPaymentCard from "./ShopDetailsPaymentCard";

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

export default function ShopDetailsTab() {
  const [value, setValue] = React.useState(0);

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
          <ShopDetailsDebtCard
            id="8842"
            status="overdue"
            total={2000000}
            paid={500000}
            remaining={1500000}
            createdAt="۱۴۰۳/۰۲/۱۵"
          />
          <ShopDetailsDebtCard
            id="8842"
            status="overdue"
            total={2000000}
            paid={500000}
            remaining={1500000}
            createdAt="۱۴۰۳/۰۲/۱۵"
          />
          <ShopDetailsDebtCard
            id="8842"
            status="overdue"
            total={2000000}
            paid={500000}
            remaining={1500000}
            createdAt="۱۴۰۳/۰۲/۱۵"
          />
          <ShopDetailsDebtCard
            id="8842"
            status="overdue"
            total={2000000}
            paid={500000}
            remaining={1500000}
            createdAt="۱۴۰۳/۰۲/۱۵"
          />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="flex flex-col gap-4">
          <ShopDetailsSaleCard
            id="8842"
            createdAt="۱۴۰۳/۰۲/۱۵"
            total={2000000}
            itemsCount={10}
          />
          <ShopDetailsSaleCard
            id="8842"
            createdAt="۱۴۰۳/۰۲/۱۵"
            total={2000000}
            itemsCount={10}
          />
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
