import AuthHydrator from "@/utils/auth/AuthHydrateRedux";
import { getCurrentUser } from "@/utils/auth/GetCurrentUser";
import { redirect } from "next/navigation";
import "../globals.css"

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const user = await getCurrentUser();

    // if (!user) {
    //     redirect("/auth?mode=login");
    // }

    // if (user.is_shop) {
    //     redirect("/dashboard");
    // }

    return (
        <div className="container mx-auto">
            <AuthHydrator />
            {children}
        </div>
    );
}
