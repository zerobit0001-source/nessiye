import { ArrowBackRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const DebtsDetailsPageHeader = () => {
    return (
        <div className="w-full flex items-center justify-between">
            <Link href={"/dashboard/debts"}>
                <Button
                    size="small"
                    startIcon={<ArrowForwardIosRounded fontSize="small" />}
                    variant="outlined"
                >
                    برگشت
                </Button>
            </Link>
        </div>
    );
};

export default DebtsDetailsPageHeader;
