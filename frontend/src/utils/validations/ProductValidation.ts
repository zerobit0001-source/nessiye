import { z } from "zod";

const numberField = (
  requiredMessage: string,
  minValue: number,
  minMessage: string,
) =>
  z
    .string()
    .trim()
    .min(1, requiredMessage)
    .transform((value) => Number(value))
    .refine((value) => !Number.isNaN(value), {
      message: "عدد معتبر وارد کنید",
    })
    .refine((value) => value >= minValue, {
      message: minMessage,
    });

const productSchema = z.object({
  name: z.string().trim().min(1, "نام محصول را وارد کنید"),

  barcode: z.string().trim().optional().or(z.literal("")),

  buy_price: numberField(
    "قیمت خرید را وارد کنید",
    1,
    "قیمت خرید باید بزرگتر از صفر باشد",
  ),

  sell_price: numberField(
    "قیمت فروش را وارد کنید",
    1,
    "قیمت فروش باید بزرگتر از صفر باشد",
  ),

  stock: numberField(
    "موجودی اولیه را وارد کنید",
    0,
    "موجودی نمی‌تواند منفی باشد",
  ),

  description: z.string().trim().optional(),
});

export const validateAddProductForm = productSchema.refine(
  (data) => data.sell_price >= data.buy_price,
  {
    path: ["sell_price"],
    message: "قیمت فروش نباید کمتر از قیمت خرید باشد.",
  },
);

export type AddProductFormType = z.infer<typeof validateAddProductForm>;

export const validateUpdateProductForm = productSchema
  .extend({
    exp_date: z.string().optional(),
  })
  .refine((data) => data.sell_price >= data.buy_price, {
    path: ["sell_price"],
    message: "قیمت فروش نباید کمتر از قیمت خرید باشد.",
  });

export type UpdateProductFormType = z.infer<typeof validateUpdateProductForm>;
