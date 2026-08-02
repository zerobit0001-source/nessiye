import { configureStore } from "@reduxjs/toolkit";

import themeSliceReducer from "@/features/theme/themeSlice";

import { userInfoReducer } from "@/features/auth/slices/userInformationsSlice";
import { customerSliceReducer } from "@/features/dashboard/childs/customers/slices/customerFormSlice";
import { paymentSliceReducer } from "@/features/dashboard/childs/payments/slices/paymentFormSlice";
import { productFormReducers } from "@/features/dashboard/childs/products/slices/productFormSlice";
import { salesSliceReducer } from "@/features/dashboard/childs/debts/slices/debtsFormSlice";

import { ApiProduct } from "@/features/dashboard/childs/products/api/ApiProduct";
import { ApiCustomer } from "@/features/dashboard/childs/customers/api/ApiCustomer";
import { ApiSales } from "@/features/dashboard/childs/sales/api/ApiSales";
import { ApiAccount } from "@/features/account/api/ApiAccount";
import { ApiPayment } from "@/features/dashboard/childs/payments/api/ApiPayment";
import { ApiModalsData } from "@/features/dashboard/api/ApiModalsData";
import { ApiDashboard } from "@/features/dashboard/childs/dashboard/api/ApiDashboard";
import { ApiReport } from "@/features/dashboard/childs/report/api/ApiReport";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    theme: themeSliceReducer,

    salesForm: salesSliceReducer,
    paymentsForm: paymentSliceReducer,
    customersForm: customerSliceReducer,
    productsForm: productFormReducers,

    [ApiProduct.reducerPath]: ApiProduct.reducer,
    [ApiCustomer.reducerPath]: ApiCustomer.reducer,
    [ApiSales.reducerPath]: ApiSales.reducer,
    [ApiAccount.reducerPath]: ApiAccount.reducer,
    [ApiPayment.reducerPath]: ApiPayment.reducer,
    [ApiModalsData.reducerPath]: ApiModalsData.reducer,
    [ApiDashboard.reducerPath]: ApiDashboard.reducer,
    [ApiReport.reducerPath]: ApiReport.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ApiProduct.middleware,
      ApiCustomer.middleware,
      ApiSales.middleware,
      ApiAccount.middleware,
      ApiPayment.middleware,
      ApiModalsData.middleware,
      ApiDashboard.middleware,
      ApiReport.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
