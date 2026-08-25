import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import OverduesPage from "@/features/dashboard/childs/overdue/components/OverduesPage";


const Overdues = () => {
  return (
    <Container>
      <DashboardsPageHeader
        title="اقساط سررسید گذشته"
        caption="7 تا نسیه که تاخیر دارن ، جمع مبالغ 43 م ریال"
      >
        <div className=""></div>
      </DashboardsPageHeader>
      <OverduesPage />
    </Container>
  );
};

export default Overdues;
