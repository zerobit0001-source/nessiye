"use client";

import { ArrowBack } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

const CreatePagesTitle = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <span>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="caption">{subtitle}</Typography>
      </span>
      <Button variant="outlined" endIcon={<ArrowBack />} onClick={() => window.history.back()}>
        بازکشت
      </Button>
    </div>
  );
};

export default CreatePagesTitle;
