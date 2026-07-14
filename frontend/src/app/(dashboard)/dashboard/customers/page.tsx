import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import { CustomersBranchName } from "@/data/DashboardCustomers";
import AddCustomerModal from "@/features/dashboard/components/AddCustomerModal";
import BranchHead from "@/features/dashboard/components/BranchHead";
import { Box } from "@mui/material";
import CustomersList from "@/features/dashboard/childs/customers/components/CustomersList";
import CustomersSearch from "@/features/dashboard/childs/customers/components/CustomersSearch";
import CustomerCards from "@/features/dashboard/childs/customers/components/CustomersCards";
import CustomersPageToolbar from "@/features/dashboard/childs/customers/components/CustomersPageToolbar";

interface Props {
    searchParams: Promise<{
        search?: string;
        page?: string;
        ordering?: string;
    }>;
}

const DashboardCustomers = async ({ searchParams }: Props) => {
    const params = await searchParams;

    return (
        <Container>
            <DashboardsPageHeader
                title="مشتری ها"
                caption="247 مشتری ثبت نام کرده ، 6 نا مشتری این ماه"
            >
                <AddCustomerModal />
            </DashboardsPageHeader>
            <CustomerCards />
            <CustomersPageToolbar />
            <Box className="w-full overflow-x-scroll xl:overflow-auto">
                {/* <CustomersSearch /> */}
                {/* branches */}
                {/* <BranchHead branches={CustomersBranchName} /> */}
                <CustomersList search={params.search} />
            </Box>
        </Container>
    );
};

export default DashboardCustomers;
