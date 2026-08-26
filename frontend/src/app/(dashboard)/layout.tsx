import DashboardNavBar from "@/features/dashboard/components/DashboardNavBar";
import SideBar from "@/features/dashboard/components/SideBar";
import SlideUpAnimation from "@/components/SlideUpAnimation";
import AuthHydrator from "@/utils/auth/AuthHydrateRedux";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 ">
        <AuthHydrator />
        <SideBar />
      </aside>

      {/* Mobile */}

      {/* Content */}
      <section className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavBar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto ">
            <SlideUpAnimation>{children}</SlideUpAnimation>
          </div>
        </main>
      </section>
    </div>
  );
}
