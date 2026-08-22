import { api } from "@/services/api";

export const ApiModalsData = api.injectEndpoints({
  endpoints: (builder) => ({
    getModalData: builder.query<
      any,
      { type: "products" | "customers" | "credits" }
    >({
      query: ({ type }) => `modal?type=${type}`,
    }),
  }),
});

export const { useGetModalDataQuery } = ApiModalsData;
