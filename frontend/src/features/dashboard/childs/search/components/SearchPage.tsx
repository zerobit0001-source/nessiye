"use client";

import { Alert, CircularProgress, Stack, Typography } from "@mui/material";
import { useSearchDashboardQuery } from "../../dashboard/api/ApiDashboard";
import SearchResultSection from "./SearchResultSection";
import CustomerSearchResult from "./CustomerSearchResult";
import DebtSearchResult from "./DebtSearchResult";
import SaleSearchResult from "./SaleSearchResult";
import PaymentSearchResult from "./PaymentSearchResult";

type Props = {
  q: string;
};

export default function SearchPage({ q }: Props) {
  const { data, error, isLoading } = useSearchDashboardQuery(q);

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" py={8}>
        <CircularProgress size={28} />
      </Stack>
    );
  }

  if (error) {
    return <Alert severity="error">دریافت نتایج جستجو با خطا مواجه شد.</Alert>;
  }

  if (!data) {
    return null;
  }

  const { customers, debts, sales, payments, products } = data.results;

  const hasResults =
    customers.length > 0 ||
    debts.length > 0 ||
    sales.length > 0 ||
    payments.length > 0 ||
    products.length > 0;

  if (!hasResults) {
    return (
      <Stack alignItems="center" py={8} spacing={1}>
        <Typography variant="h6">نتیجه‌ای پیدا نشد</Typography>

        <Typography variant="body2" color="text.secondary">
          برای «{q}» موردی پیدا نکردیم.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      {customers.length > 0 && (
        <SearchResultSection title="مشتریان" count={customers.length}>
          {customers.map((customer) => (
            <CustomerSearchResult key={customer.id} customer={customer} />
          ))}
        </SearchResultSection>
      )}

      {debts.length > 0 && (
        <SearchResultSection title="نسیه‌ها" count={debts.length}>
          {debts.map((debt) => (
            <DebtSearchResult key={debt.id} debt={debt} />
          ))}
        </SearchResultSection>
      )}

      {sales.length > 0 && (
        <SearchResultSection title="فروش‌ها" count={sales.length}>
          {sales.map((sale) => (
            <SaleSearchResult key={sale.id} sale={sale} />
          ))}
        </SearchResultSection>
      )}

      {payments.length > 0 && (
        <SearchResultSection title="پرداخت‌ها" count={payments.length}>
          {payments.map((payment) => (
            <PaymentSearchResult key={payment.id} payment={payment} />
          ))}
        </SearchResultSection>
      )}

      {products.length > 0 && (
        <SearchResultSection title="محصولات" count={products.length}>
          {/* Product results */}
        </SearchResultSection>
      )}
    </Stack>
  );
}
