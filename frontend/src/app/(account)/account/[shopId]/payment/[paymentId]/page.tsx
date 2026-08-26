import AccountPaymentDetailsPage from "@/features/account/childs/payment/AccountPaymentDetailsPage";

export default async function page({
  params,
}: {
  params: Promise<{ shopId: string; paymentId: string }>;
}) {
  const { shopId, paymentId } = await params;
  const shopIdNumber = Number(shopId);
  const paymentIdNumber = paymentId;
 
 
  return (
    <AccountPaymentDetailsPage
      paymentId={paymentIdNumber}
      shopId={shopIdNumber}
    />
  );
}
