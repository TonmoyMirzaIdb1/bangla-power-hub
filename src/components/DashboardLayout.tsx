import { ReactNode } from "react";
import Header from "@/components/Header";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardFooter } from "@/components/DashboardFooter";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  role?: string;
}

export const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SidebarProvider>
        <div className="flex flex-1 w-full pt-16">
          <DashboardSidebar role={role} />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </SidebarProvider>
      <DashboardFooter />
    </div>
  );
};
