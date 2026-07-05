import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import { PaymentBranchName } from "@/data/DashboardPayments";
import PaymentList from "@/features/dashboard/childs/payments/components/PaymentList";
import AddPaymentModal from "@/features/dashboard/components/AddPaymentModal";
import BranchHead from "@/features/dashboard/components/BranchHead";
import { AddRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const Payments = () => {
    return (
        <Container>
            <DashboardsPageHeader
                title="پرداختی ها"
                caption="42 م ریال مبلغ جمع شده این ماه"
            >
                <AddPaymentModal />
            </DashboardsPageHeader>

            <Box className="w-full overflow-x-scroll xl:overflow-auto">
                <BranchHead branches={PaymentBranchName} />
                <PaymentList />
            </Box>
        </Container>
    );
};

export default Payments;
