"use client";

import { ProductType } from "@/types/types";
import { formatPrice } from "@/utils/formatters";
import { AddRounded, DeleteRounded, RemoveRounded } from "@mui/icons-material";
import { Button, Card, IconButton, TextField, Typography } from "@mui/material";

interface SelectedProductType {
  product: ProductType;
  quantity: number;
}

interface SelectedProductsListProps {
  products: SelectedProductType[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onDelete: (productId: number) => void;
}
export default function SelectedProductsList({
  products,
  onDecrease,
  onDelete,
  onIncrease,
}: SelectedProductsListProps) {
  if (products.length === 0) {
    return <Card className="p-4 text-center">هیچ کالایی انتخاب نشده است.</Card>;
  }
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body1">
        اقلام انتخواب شده ({products.length})
      </Typography>
      {products.map((item) => (
        <Card
          elevation={1}
          key={item.product.id}
          className="rounded-lg! px-2 py-4 flex items-center justify-between"
        >
          <Typography variant="body2">{item.product.name}</Typography>
          <span className="flex items-center gap-4">
            <span className="flex gap-2 items-center">
              <IconButton onClick={() => onIncrease(item.product.id)}>
                <AddRounded fontSize="small" color="primary" />
              </IconButton>
              <Typography variant="body2">{item.quantity}</Typography>
              <IconButton onClick={() => onDecrease(item.product.id)}>
                <RemoveRounded fontSize="small" color="error" />
              </IconButton>
            </span>
            <Typography variant="body2">
              {formatPrice(item.product.sell_price * item.quantity)} تومان
            </Typography>
            <IconButton onClick={() => onDelete(item.product.id)}>
              <DeleteRounded color="error" />
            </IconButton>
          </span>
        </Card>
      ))}
    </div>
  );
}
