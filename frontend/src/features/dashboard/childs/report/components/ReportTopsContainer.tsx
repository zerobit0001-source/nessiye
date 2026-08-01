import React from "react";
import ReportTableCard from "./ReportTableCard";
import { GroupsRounded, ReportProblemRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { formatPrice } from "@/utils/formatters";

export default function ReportTopsContainer() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ReportTableCard
        icon={<GroupsRounded color="success" />}
        title="مشتریان برتر (بیشترین خرید)"
        caption="۱۰ مشتری فعال"
        tableHeaderTitles={["مشتری", "کل خرید", "پرداختی", "مانده"]}
        rowRender={(item) => (
          <>
            <td className="flex flex-col">
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="caption">{item.phone_number}</Typography>
            </td>
            <td>
              <Typography variant="body2">{formatPrice(item.total)}</Typography>
            </td>
            <td>
              <Typography variant="body2" color="success">
                {formatPrice(item.paid)}
              </Typography>
            </td>
            <td>
              <Typography variant="body2" color="error">
                {formatPrice(item.balance)}
              </Typography>
            </td>
          </>
        )}
        data={[
          {
            name: "امیررضا عبداللهی",
            phone_number: "09121234567",
            total: 850000,
            paid: 500000,
            balance: 350000,
          },
          {
            name: "علی محمدی",
            phone_number: "09351267890",
            total: 1200000,
            paid: 700000,
            balance: 500000,
          },
          {
            name: "زهرا احمدی",
            phone_number: "09034561234",
            total: 450000,
            paid: 450000,
            balance: 0,
          },
          {
            name: "محمد حسینی",
            phone_number: "09911223344",
            total: 980000,
            paid: 300000,
            balance: 680000,
          },
        ]}
      />
      <ReportTableCard
        icon={<ReportProblemRounded color="error" />}
        title="بدهکارترین حساب‌ها"
        caption="نیازمند پیگیری"
        tableHeaderTitles={[
          "مشتری",
          "	بدهی معوقه",
          "	آخرین خرید",
          "	آخرین پرداخت",
        ]}
        rowRender={(item) => (
          <>
            <td className="flex flex-col">
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="caption">{item.phone_number}</Typography>
            </td>
            <td>
              <Typography variant="body2">{formatPrice(item.total)}</Typography>
            </td>
            <td>
              <Typography variant="body2" color="success">
                {formatPrice(item.paid)}
              </Typography>
            </td>
            <td>
              <Typography variant="body2" color="error">
                {formatPrice(item.balance)}
              </Typography>
            </td>
          </>
        )}
        data={[
          {
            name: "امیررضا عبداللهی",
            phone_number: "09121234567",
            total: 850000,
            paid: 500000,
            balance: 350000,
          },
          {
            name: "علی محمدی",
            phone_number: "09351267890",
            total: 1200000,
            paid: 700000,
            balance: 500000,
          },
          {
            name: "زهرا احمدی",
            phone_number: "09034561234",
            total: 450000,
            paid: 450000,
            balance: 0,
          },
          {
            name: "محمد حسینی",
            phone_number: "09911223344",
            total: 980000,
            paid: 300000,
            balance: 680000,
          },
        ]}
      />
    </div>
  );
}
