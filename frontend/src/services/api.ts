import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include",
  }),

  tagTypes: [
    "Dashboard",
    "Charts",
    "Cards",
    "TopCustomers",
    "TopDebtors",
    "TopProducts",
    "Payments",
    "Products",
    "Customers",
    "Customer",
    "Credits",
    "Shops",
    "Shop",
    "Shop/Debts",
    "Shop/Sales",
    "Shop/Payments",
    "Sales",
    "Debts",
  ],

  endpoints: () => ({}),
});
