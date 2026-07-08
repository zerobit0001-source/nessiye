import DashboardNavBar from "@/features/dashboard/components/DashboardNavBar";
import SideBar from "@/features/dashboard/components/SideBar";
import SlideUpAnimation from "@/components/SlideUpAnimation";
import MobileMenu from "@/components/dash/MobileMenu";
import { getCurrentUser } from "@/utils/auth/GetCurrentUser";
import { redirect } from "next/navigation";
import AuthHydrator from "@/utils/auth/AuthHydrateRedux";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const user = await getCurrentUser();

    //     if (!user) {
    //         redirect("/auth?mode=login");
    //     }

    //     if (!user.is_shop) {
    //         redirect("/account");
    //     }

    return (
        <div className="h-screen grid  grid-rows-[auto_1fr] ">

            {/* ser user information to redux */}

            <AuthHydrator />

            {/* Navbar */}
            <div className="z-10">
                <DashboardNavBar />
            </div>

            {/* Main Area */}
            <div className="grid grid-cols-12">
                <aside className="hidden lg:col-span-2 lg:block">
                    <SideBar />
                </aside>
                <MobileMenu />

                <main className="col-span-12! lg:col-span-10! p-4 overflow-auto">
                    <SlideUpAnimation>{children}</SlideUpAnimation>
                </main>
            </div>
        </div>
    );
}
