"use client";
import { DebtsListType, ProductsListType } from "@/types/types";
import { formatDate, formatPrice } from "@/utils/formatters";
import Link from "next/link";
import { TableCell, Chip, TableRow, Avatar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

interface ProductsRowsProps {
  product: ProductsListType;
}

const ProductRow = ({ product }: ProductsRowsProps) => {
  return (
    <TableRow key={product.id}>
      <TableCell align="center">
        <Link
          href={`/dashboard/products/${product.id}`}
          className="underline text-blue-400 flex gap-2 items-center"
        >
          <Avatar variant="rounded" alt={product.name}></Avatar>
          <span>
            <Typography variant="body1" >
              {product.name}
            </Typography>
            <Typography variant="caption" >
              {product.id}
            </Typography>
          </span>
        </Link>
      </TableCell>
      <TableCell align="center">{product.barcode}</TableCell>
      <TableCell align="center">{product.sell_price}</TableCell>
      <TableCell align="center">{product.stock}</TableCell>

      
    </TableRow>
  );
};

export default ProductRow;
