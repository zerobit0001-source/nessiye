import Image from "next/image";
import { LoopRounded } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";

export default function ReportExportButtons() {
  return (
    <>
      <Button
        variant="outlined"
        color="error"
        size="small"
        endIcon={
          <Image src="/icons/pdf_icon.png" alt="PDF" width={22} height={22} />
        }
      >
        خروجی PDF
      </Button>

      <Button
        variant="outlined"
        color="success"
        size="small"
        endIcon={
          <Image
            src="/icons/excel_icon.png"
            alt="Excel"
            width={22}
            height={22}
          />
        }
      >
        خروجی اکسل
      </Button>

      <IconButton color="primary">
        <LoopRounded />
      </IconButton>
    </>
  );
}
