import { configureStore } from "@reduxjs/toolkit";

import themeSliceReducer from "@/features/theme/themeSlice";

import { userInfoReducer } from "@/features/auth/slices/userInformationsSlice";
import { customerSliceReducer } from "@/features/dashboard/childs/customers/slices/customerFormSlice";
import { paymentSliceReducer } from "@/features/dashboard/childs/payments/slices/paymentFormSlice";
import { productFormReducers } from "@/features/dashboard/childs/products/slices/productFormSlice";
import { salesSliceReducer } from "@/features/dashboard/childs/debts/slices/debtsFormSlice";

import { api } from "@/services/api";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    theme: themeSliceReducer,

    salesForm: salesSliceReducer,
    paymentsForm: paymentSliceReducer,
    customersForm: customerSliceReducer,
    productsForm: productFormReducers,
    
    api: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
    ),
  devTools: {
    maxAge: 50,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
