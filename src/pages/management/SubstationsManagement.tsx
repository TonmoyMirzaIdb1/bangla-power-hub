import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { SearchInput } from "@/components/common/SearchInput";
import { InteractiveMap } from "@/components/common/InteractiveMap";
import { Radio, Zap, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SubstationManagementForm } from "@/components/forms/SubstationManagementForm";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function SubstationsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubstation, setSelectedSubstation] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch substations
  const { data: substations, isLoading, refetch } = useQuery({
    queryKey: ["substations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("substations")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleCreateSubstation = async (data: any) => {
    try {
      const { error } = await supabase
        .from("substations")
        .insert([data]);

      if (error) throw error;
      
      toast.success("Substation created successfully");
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to create substation");
    }
  };

  const handleUpdateSubstation = async (data: any) => {
    try {
      const { error } = await supabase
        .from("substations")
        .update(data)
        .eq("id", selectedSubstation.id);

      if (error) throw error;
      
      toast.success("Substation updated successfully");
      setIsDialogOpen(false);
      setSelectedSubstation(null);
      refetch();
    } catch (error) {
      toast.error("Failed to update substation");
    }
  };

  const columns = [
    { key: "name", label: "Substation Name" },
    { key: "location", label: "Location" },
    { key: "capacity_mva", label: "Capacity (MVA)" },
    { key: "voltage_level", label: "Voltage Level" },
    { key: "is_active", label: "Status", render: (value: boolean) => value ? "Active" : "Inactive" },
  ];

  const filteredSubstations = substations?.filter((substation) =>
    substation.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    substation.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Convert substations to map locations
  const mapLocations = substations?.map((substation, idx) => ({
    id: substation.id,
    name: substation.name,
    type: "substation" as const,
    lat: 23.8 + idx * 0.1,
    lng: 90.4 + idx * 0.1,
    status: substation.is_active ? "operational" as const : "offline" as const,
    capacity: `${substation.capacity_mva} MVA`,
  })) || [];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Substations Management</h1>
            <p className="text-muted-foreground">
              Manage electrical substations and transmission infrastructure
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedSubstation(null)}>
                <Radio className="h-4 w-4 mr-2" />
                Add Substation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedSubstation ? "Edit Substation" : "Create New Substation"}
                </DialogTitle>
              </DialogHeader>
              <SubstationManagementForm
                onSubmit={selectedSubstation ? handleUpdateSubstation : handleCreateSubstation}
                initialData={selectedSubstation}
                mode={selectedSubstation ? "edit" : "create"}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Substations</CardTitle>
              <Radio className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{substations?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
              <Zap className="h-4 w-4 text-energy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {substations?.reduce((sum, s) => sum + Number(s.capacity_mva || 0), 0).toFixed(0)} MVA
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Operational</CardTitle>
              <TrendingUp className="h-4 w-4 text-renewable" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {substations?.filter((s) => s.is_active).length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map */}
        <InteractiveMap
          locations={mapLocations}
          onLocationClick={(location) => {
            const substation = substations?.find((s) => s.id === location.id);
            if (substation) {
              setSelectedSubstation(substation);
              setIsDialogOpen(true);
            }
          }}
        />

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Substations List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search substations..."
            />

            <DataTable
              data={filteredSubstations || []}
              columns={columns}
              onRowClick={(substation) => {
                setSelectedSubstation(substation);
                setIsDialogOpen(true);
              }}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
