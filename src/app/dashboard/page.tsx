import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardContent from "@/features/dashboard/dashboard-content";
import { requireAuth } from "@/lib/auth-utils";

export default async function Page() {
  await requireAuth();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <DashboardContent />
      </SidebarInset>
    </SidebarProvider>
  );
}
