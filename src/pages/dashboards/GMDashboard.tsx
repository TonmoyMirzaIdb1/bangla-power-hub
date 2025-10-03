import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useParams } from "react-router-dom";

const GMDashboard = () => {
  const { t } = useLanguage();
  const { department = "operations" } = useParams<{ department: string }>();
  const deptName = department.charAt(0).toUpperCase() + department.slice(1);

  const getDepartmentMetrics = () => {
    switch(department.toLowerCase()) {
      case "generation":
        return { title: "GM Generation", metric1: "8,750 MW", metric2: "94.2%", metric3: "32 Plants" };
      case "transmission":
        return { title: "GM Transmission", metric1: "12,450 MW", metric2: "96.1%", metric3: "248 Lines" };
      case "distribution":
        return { title: "GM Distribution", metric1: "11,200 MW", metric2: "92.8%", metric3: "1,542 Feeders" };
      case "finance":
        return { title: "GM Finance", metric1: "৳45,250 Cr", metric2: "87%", metric3: "Q4 FY2025" };
      case "hr":
        return { title: "GM HR", metric1: "16,842", metric2: "94.5%", metric3: "1,240 Trained" };
      case "planning":
        return { title: "GM Planning", metric1: "24 Projects", metric2: "78%", metric3: "৳12,500 Cr" };
      case "maintenance":
        return { title: "GM Maintenance", metric1: "96.5%", metric2: "142 Units", metric3: "24/7 Active" };
      case "it":
        return { title: "GM IT", metric1: "99.2%", metric2: "32 Systems", metric3: "Zero Breaches" };
      case "audit":
        return { title: "GM Audit", metric1: "48 Audits", metric2: "96%", metric3: "12 Pending" };
      default:
        return { title: "GM Operations", metric1: "98.5%", metric2: "All Systems", metric3: "Active" };
    }
  };

  const metrics = getDepartmentMetrics();

  return (
    <DashboardLayout role={`GM ${deptName}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{metrics.title} Dashboard</h1>
          <p className="text-muted-foreground">Department management and operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Primary Metric</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.metric1}</div>
              <p className="text-xs text-muted-foreground">Current status</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <TrendingUp className="h-4 w-4 text-renewable" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.metric2}</div>
              <p className="text-xs text-muted-foreground">Performance rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Resources</CardTitle>
              <CheckCircle className="h-4 w-4 text-energy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.metric3}</div>
              <p className="text-xs text-muted-foreground">Active units</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Pending actions</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Team A', performance: 96 },
                  { name: 'Team B', performance: 92 },
                  { name: 'Team C', performance: 89 },
                  { name: 'Team D', performance: 94 },
                ].map((team) => (
                  <div key={team.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{team.name}</span>
                      <span className="text-sm font-bold">{team.performance}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${team.performance}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tasks Completed</span>
                  <span className="font-bold">248/260</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Budget Utilization</span>
                  <span className="font-bold">82%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Team Attendance</span>
                  <span className="font-bold text-renewable">97.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Safety Incidents</span>
                  <span className="font-bold text-primary">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GMDashboard;
