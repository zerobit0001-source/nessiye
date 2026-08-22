import type { Metadata } from "next";
import DebtsDetailPage from "@/features/dashboard/childs/debts/components/DebtsDetailPage";

interface DebtsDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: DebtsDetailProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `بدهی ${id}`,
    description: `مشاهده جزئیات بدهی شماره ${id} در نسیه.`,
  };
}

const DebtsDetail = async ({ params }: DebtsDetailProps) => {
  const { id } = await params;

  return <DebtsDetailPage id={id} />;
};

export default DebtsDetail;
