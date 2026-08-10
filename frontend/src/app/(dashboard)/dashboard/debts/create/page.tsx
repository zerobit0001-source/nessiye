import Container from "@/components/dash/Container";
import CreatePagesTitle from "@/features/dashboard/childs/components/CreatePagesTitle";
import CreateDebtForm from "@/features/dashboard/childs/debts/components/CreateDebtForm";

export default function CreateDebtPage() {
  return (
    <Container>
      <CreatePagesTitle title="ثبت بدهی جدید" subtitle="افزودن اقلام خریداری شده به صورت نسیه برای مشتری مشخص." />
      <div className="flex justify-center w-full">
        <CreateDebtForm />
      </div>
    </Container>
  );
}
