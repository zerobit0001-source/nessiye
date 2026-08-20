import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  text: string;
  link: string;
  variant: "contained" | "outlined" | "text";
  icon?: boolean;
}

export default function LinkButton({
  text,
  link,
  variant,
  icon = true,
}: LinkButtonProps) {
  return (
    <Link href={link}>
      <Button
        variant={variant}
        endIcon={icon ? <AddRounded fontSize="small" /> : null}
        className="rounded-lg!"
      >
        {text}
      </Button>
    </Link>
  );
}
