import {
  Home, BarChart3, FileText, Settings, Users, Zap, AlertTriangle,
  Building, Wrench, DollarSign, ClipboardList, Shield, MapPin,
  Activity, Gauge, Bell, UserCog, HardDrive, Briefcase, TrendingUp,
  LayoutDashboard, Database, Power, Network, Receipt, HelpCircle,
  PieChart,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
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

interface MenuItem {
  title: string;
  icon: React.ElementType;
  url: string;
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const { t } = useLanguage();
  const location = useLocation();

  const getMenuGroups = (): MenuGroup[] => {
    const overview: MenuItem = { title: "Overview", icon: LayoutDashboard, url: "#overview" };
    const analytics: MenuItem = { title: "Analytics", icon: PieChart, url: "#analytics" };
    const reports: MenuItem = { title: "Reports", icon: FileText, url: "#reports" };
    const settings: MenuItem = { title: "Settings", icon: Settings, url: "#settings" };
    const incidents: MenuItem = { title: "Incidents", icon: AlertTriangle, url: "/management/incidents" };

    if (role === "Chairman" || role === "Managing Director") {
      return [
        {
          label: "Executive",
          items: [overview, analytics, reports],
        },
        {
          label: "Management",
          items: [
            { title: "Power Plants", icon: Power, url: "/management/power-plants" },
            { title: "Substations", icon: Network, url: "/management/substations" },
            { title: "User Management", icon: UserCog, url: "/management/users" },
            incidents,
          ],
        },
        {
          label: "Operations",
          items: [
            { title: "Generation", icon: Zap, url: "#generation" },
            { title: "Transmission", icon: Activity, url: "#transmission" },
            { title: "Distribution", icon: MapPin, url: "#distribution" },
            { title: "Finance", icon: DollarSign, url: "#finance" },
          ],
        },
        { label: "System", items: [settings] },
      ];
    }

    if (role?.includes("Director")) {
      const dept = role.includes("Generation") ? "generation"
        : role.includes("Transmission") ? "transmission"
        : role.includes("Distribution") ? "distribution"
        : role.includes("Finance") ? "finance"
        : role.includes("HR") ? "hr" : "planning";

      const deptItems: MenuItem[] = [];
      if (["generation", "transmission", "distribution"].includes(dept)) {
        deptItems.push(
          { title: "Power Plants", icon: Power, url: "/management/power-plants" },
          { title: "Substations", icon: Network, url: "/management/substations" },
          { title: "Performance", icon: TrendingUp, url: "#performance" },
          incidents,
        );
      }
      if (dept === "finance") {
        deptItems.push(
          { title: "Billing", icon: Receipt, url: "#billing" },
          { title: "Revenue", icon: DollarSign, url: "#revenue" },
        );
      }
      if (dept === "hr") {
        deptItems.push(
          { title: "Employee Directory", icon: Users, url: "#employees" },
          { title: "User Management", icon: UserCog, url: "/management/users" },
        );
      }

      return [
        { label: "Dashboard", items: [overview, analytics, reports] },
        { label: "Department", items: deptItems },
        { label: "System", items: [settings] },
      ];
    }

    if (role?.startsWith("GM") || role?.startsWith("DGM") || role?.startsWith("AGM")) {
      return [
        { label: "Dashboard", items: [overview, analytics, reports] },
        {
          label: "Operations",
          items: [
            { title: "Team Performance", icon: Users, url: "#team" },
            { title: "Tasks", icon: ClipboardList, url: "#tasks" },
            { title: "Resources", icon: Database, url: "#resources" },
            incidents,
          ],
        },
        { label: "System", items: [settings] },
      ];
    }

    if (role === "Chief Engineer") {
      return [
        { label: "Dashboard", items: [overview, analytics] },
        {
          label: "Engineering",
          items: [
            { title: "Power Plants", icon: Power, url: "/management/power-plants" },
            { title: "Substations", icon: Network, url: "/management/substations" },
            { title: "Maintenance", icon: Wrench, url: "#maintenance" },
            incidents,
          ],
        },
        { label: "Reports", items: [reports, settings] },
      ];
    }

    if (role?.includes("Engineer")) {
      return [
        { label: "Dashboard", items: [overview] },
        {
          label: "Work",
          items: [
            { title: "My Tasks", icon: ClipboardList, url: "#tasks" },
            { title: "Equipment", icon: HardDrive, url: "#equipment" },
            { title: "Maintenance Log", icon: Wrench, url: "#maintenance" },
            incidents,
            reports,
          ],
        },
        { label: "System", items: [settings] },
      ];
    }

    if (role === "System Analyst") {
      return [
        { label: "Dashboard", items: [overview, analytics] },
        {
          label: "Systems",
          items: [
            { title: "System Health", icon: Activity, url: "#health" },
            { title: "Database", icon: Database, url: "#database" },
            { title: "Security", icon: Shield, url: "#security" },
            { title: "User Management", icon: UserCog, url: "/management/users" },
            reports,
          ],
        },
        { label: "System", items: [settings] },
      ];
    }

    if (role?.includes("Technician")) {
      return [
        { label: "Dashboard", items: [overview] },
        {
          label: "Work",
          items: [
            { title: "Work Orders", icon: ClipboardList, url: "#orders" },
            { title: "Equipment", icon: HardDrive, url: "#equipment" },
            { title: "Safety", icon: Shield, url: "#safety" },
            incidents,
          ],
        },
        { label: "System", items: [settings] },
      ];
    }

    if (role?.includes("Operator")) {
      return [
        { label: "Dashboard", items: [overview] },
        {
          label: "Operations",
          items: [
            { title: "Live Monitoring", icon: Gauge, url: "#monitoring" },
            { title: "Alarms", icon: Bell, url: "#alarms" },
            { title: "Shift Log", icon: ClipboardList, url: "#shift-log" },
            incidents,
          ],
        },
        { label: "System", items: [settings] },
      ];
    }

    if (role?.includes("Officer")) {
      return [
        { label: "Dashboard", items: [overview, reports] },
        {
          label: "Work",
          items: [
            { title: "Tasks", icon: ClipboardList, url: "#tasks" },
            { title: "Documents", icon: FileText, url: "#documents" },
            { title: "Requests", icon: HelpCircle, url: "#requests" },
          ],
        },
        { label: "System", items: [settings] },
      ];
    }

    // Customer
    return [
      { label: "Dashboard", items: [overview] },
      {
        label: "Services",
        items: [
          { title: "My Bills", icon: Receipt, url: "#bills" },
          { title: "Usage History", icon: BarChart3, url: "#usage" },
          { title: "Service Requests", icon: HelpCircle, url: "#requests" },
          { title: "Outage Info", icon: AlertTriangle, url: "#outages" },
        ],
      },
      { label: "Account", items: [settings] },
    ];
  };

  const groups = getMenuGroups();

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isLink = item.url.startsWith("/");
                  const isActive = isLink && location.pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        {isLink ? (
                          <Link to={item.url}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        ) : (
                          <a href={item.url}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </a>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
