import Container from "@/components/dash/Container";
import CustomerPageHeader from "@/features/dashboard/components/CustomerPageHeader";
import CustomersPage from "@/features/dashboard/childs/customers/components/CustomersPage";
import GetCustomer from "@/features/dashboard/hooks/GetCustomer";

interface customerProps {
    params: Promise<{
        id: string;
    }>;
}

const Customer = async ({ params }: customerProps) => {
    const { id } = await params;

    return (
        <Container>
            <CustomerPageHeader />
            <CustomersPage id={id} />
        </Container>
    );
};

export default Customer;
