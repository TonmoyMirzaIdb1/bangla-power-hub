import { Home, BarChart3, FileText, Settings, Users, Zap } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  role?: string;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const { t } = useLanguage();

  const getMenuItems = () => {
    const baseItems = [
      { title: t('nav.overview'), icon: Home, url: "#overview" },
      { title: t('nav.analytics'), icon: BarChart3, url: "#analytics" },
      { title: t('nav.reports'), icon: FileText, url: "#reports" },
    ];

    if (role === "Chairman") {
      return [
        ...baseItems,
        { title: t('chairman.workforce'), icon: Users, url: "#workforce" },
        { title: t('nav.settings'), icon: Settings, url: "#settings" },
      ];
    } else if (role?.includes("Director")) {
      return [
        ...baseItems,
        { title: t('nav.performance'), icon: Zap, url: "#performance" },
        { title: t('nav.settings'), icon: Settings, url: "#settings" },
      ];
    } else {
      return [
        ...baseItems,
        { title: t('nav.settings'), icon: Settings, url: "#settings" },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('nav.dashboard')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
