import { api } from "@/services/api";

export const ApiModalsData = api.injectEndpoints({
  endpoints: (builder) => ({
    getModalData: builder.query<
      any,
      { type: "products" | "customers" | "credits"; search?: string }
    >({
      query: ({ type, search }) => `modal?type=${type}&search=${search || ""}`,
    }),
  }),
});

export const { useGetModalDataQuery } = ApiModalsData;
