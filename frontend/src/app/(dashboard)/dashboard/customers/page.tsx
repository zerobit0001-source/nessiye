import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import { Box } from "@mui/material";
import CustomersList from "@/features/dashboard/childs/customers/components/CustomersList";
import CustomerCards from "@/features/dashboard/childs/customers/components/CustomersCards";
import CustomersPageToolbar from "@/features/dashboard/childs/customers/components/CustomersPageToolbar";
import LinkButton from "@/features/dashboard/components/LinkButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مشتریان",
  description: "مدیریت مشتریان و مشاهده وضعیت حساب و بدهی مشتریان.",
};

interface Props {
  searchParams: Promise<{
    search?: string;
    page?: string;
    ordering?: string;
    filtering?: string;
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
        <LinkButton
          link="/dashboard/customers/create"
          text="افزودن مشتری"
          variant="contained"
        />
      </DashboardsPageHeader>
      <CustomerCards />
      <CustomersPageToolbar />
      <Box className="w-full overflow-x-scroll xl:overflow-auto">
        <CustomersList
          search={params.search}
          ordering={params.ordering}
          page={params.page}
          filtering={params.filtering}
        />
      </Box>
    </Container>
  );
};

export default DashboardCustomers;
