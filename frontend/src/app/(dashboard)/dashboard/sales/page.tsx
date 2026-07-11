import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import BranchHead from "@/features/dashboard/components/BranchHead";
import PagesFilterLinks from "@/features/dashboard/childs/customers/components/CustomersSearch";
import { Box } from "@mui/material";
import SalesList from "@/features/dashboard/childs/sales/components/SalesList";
import { SaleBranchName } from "@/data/DashboardSale";
import AddSaleModal from "@/features/dashboard/components/AddSaleModal";
import { Suspense } from "react";

const Sales = () => {
    return (
        <Container>
            <DashboardsPageHeader
                title="فروش ها"
                caption="128 حساب ، 180000000 ریال جمع حساب ها"
            >
                <AddSaleModal />
            </DashboardsPageHeader>
            <Box className="w-full overflow-x-scroll xl:overflow-auto">
                <Suspense fallback={null}>
                    <PagesFilterLinks page="sales" />
                </Suspense>
                <BranchHead branches={SaleBranchName} />
                <SalesList />
            </Box>
        </Container>
    );
};

export default Sales;
