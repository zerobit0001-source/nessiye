"use client";

import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";

const CreatePagesTitle = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <span>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="caption">{subtitle}</Typography>
      </span>
      <Button variant="outlined" className="hidden! md:flex!" endIcon={<ArrowBack />} onClick={() => window.history.back()}>
          بازگشت
      </Button>
      <IconButton color="primary" size="large" className="md:hidden!" onClick={() => window.history.back()}>
        <ArrowBack />
      </IconButton>
    </div>
  );
};

export default CreatePagesTitle;
