import AuthHydrator from "@/utils/auth/AuthHydrateRedux";
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
