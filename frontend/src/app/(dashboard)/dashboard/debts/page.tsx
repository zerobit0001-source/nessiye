import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import { DebtsBranchName } from "@/data/DashboardCredits";
import BranchHead from "@/features/dashboard/components/BranchHead";
import PagesFilterLinks from "@/features/dashboard/childs/customers/components/CustomersSearch";
import { Box } from "@mui/material";
import DebtsList from "@/features/dashboard/childs/debts/components/DebtsList";
import AddDebtModal from "@/features/dashboard/components/AddDebtsModal";

const Orders = () => {
    return (
        <Container>
            <DashboardsPageHeader
                title="حساب ها"
                caption="128 حساب ، 180000000 ریال جمع حساب ها"
            >
                <AddDebtModal />
            </DashboardsPageHeader>
            <Box className="w-full overflow-x-scroll xl:overflow-auto">
                <PagesFilterLinks page="debts" />
                <BranchHead branches={DebtsBranchName} />
                <DebtsList />
            </Box>
        </Container>
    );
};

export default Orders;
