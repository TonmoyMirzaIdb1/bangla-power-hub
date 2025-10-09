import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { SearchInput } from "@/components/common/SearchInput";
import { DataFilter } from "@/components/common/DataFilter";
import { AlertTriangle, TrendingDown, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IncidentReportForm } from "@/components/forms/IncidentReportForm";
import { StatusIndicator } from "@/components/common/StatusIndicator";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function IncidentManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch incidents
  const { data: incidents, isLoading, refetch } = useQuery({
    queryKey: ["incidents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("incidents")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleCreateIncident = async (data: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("incidents")
        .insert([{ ...data, reported_by: user?.id }]);

      if (error) throw error;
      
      toast.success("Incident reported successfully");
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to report incident");
    }
  };

  const columns = [
    { key: "incident_type", label: "Type" },
    { 
      key: "severity", 
      label: "Severity",
      render: (value: string) => {
        const statusMap: Record<string, any> = {
          low: "operational",
          medium: "maintenance",
          high: "warning",
          critical: "critical"
        };
        return <StatusIndicator status={statusMap[value] || "operational"} label={value} />;
      }
    },
    { key: "location", label: "Location" },
    { key: "status", label: "Status" },
    { 
      key: "created_at", 
      label: "Reported",
      render: (value: string) => new Date(value).toLocaleDateString()
    },
  ];

  const filteredIncidents = incidents?.filter((incident) =>
    incident.incident_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: incidents?.length || 0,
    open: incidents?.filter((i) => i.status === "open").length || 0,
    resolved: incidents?.filter((i) => i.status === "resolved").length || 0,
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Incident Management</h1>
            <p className="text-muted-foreground">
              Track and manage system incidents and outages
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Report New Incident</DialogTitle>
              </DialogHeader>
              <IncidentReportForm onSubmit={handleCreateIncident} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.open}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-renewable" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-renewable">{stats.resolved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Incidents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Incidents List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search incidents..."
                className="flex-1"
              />
              <DataFilter
                title="Status"
                options={[
                  { label: "Open", value: "open", checked: true },
                  { label: "In Progress", value: "in_progress", checked: true },
                  { label: "Resolved", value: "resolved", checked: true },
                ]}
                onFilterChange={(value, checked) => {
                  console.log("Filter changed:", value, checked);
                }}
              />
            </div>

            <DataTable
              data={filteredIncidents || []}
              columns={columns}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
