import MainNavbar from "@/features/main/components/MainNavbar";
import AuthHydrator from "@/utils/auth/AuthHydrateRedux";
import { getCurrentUser } from "@/utils/auth/GetCurrentUser";
import { redirect } from "next/navigation";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    // if (!user) {
    //     redirect("/auth?mode=login");
    // }

    // if (user.is_shop) {
    //     redirect("/dashboard");
    // }

    return (
        <div className="">
            {/* <MainNavbar /> */}
            <AuthHydrator />
            {children}
        </div>
    );
}
