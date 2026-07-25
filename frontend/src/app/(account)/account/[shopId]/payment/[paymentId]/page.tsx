import AccountPaymentDetailsPage from "@/features/account/childs/payment/AccountPaymentDetailsPage";

export default async function page({
  params,
}: {
  params: Promise<{ shopId: string; paymentId: string }>;
}) {
  const { shopId, paymentId } = await params;
  const shopIdNumber = Number(shopId);
  const paymentIdNumber = Number(paymentId);
  console.log("shop ID : ", shopId);
  console.log("payment ID : ", paymentId);
  return (
    <AccountPaymentDetailsPage
      paymentId={paymentIdNumber}
      shopId={shopIdNumber}
    />
  );
}
