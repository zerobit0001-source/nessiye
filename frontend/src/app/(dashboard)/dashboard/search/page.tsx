import Container from "@/components/dash/Container";
import DashboardsPageHeader from "@/components/dash/DashboardsPageHeader";
import SearchPage from "@/features/dashboard/childs/search/components/SearchPage";

export default async function Search({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { q } = await searchParams;
  return (
    <Container>
      <DashboardsPageHeader title="جستجو" caption={`نتایج جستجو برای: ${q}`}>
        <div></div>
      </DashboardsPageHeader>
      <SearchPage q={q} />
    </Container>
  );
}
