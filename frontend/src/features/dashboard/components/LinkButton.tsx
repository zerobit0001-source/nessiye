import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  text: string;
  link: string;
  variant: "contained" | "outlined" | "text";
}

export default function LinkButton({ text, link, variant }: LinkButtonProps) {
  return (
    <Link href={link}>
      <Button variant={variant} endIcon={<AddRounded fontSize="small" />} className="rounded-lg!" >
        {text}
      </Button>
    </Link>
  );
}
