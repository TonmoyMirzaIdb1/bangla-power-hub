import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { SearchInput } from "@/components/common/SearchInput";
import { InteractiveMap } from "@/components/common/InteractiveMap";
import { Factory, Zap, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlantManagementForm } from "@/components/forms/PlantManagementForm";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function PowerPlantsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch power plants
  const { data: plants, isLoading, refetch } = useQuery({
    queryKey: ["power-plants"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("power_plants")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleCreatePlant = async (data: any) => {
    try {
      const { error } = await supabase
        .from("power_plants")
        .insert([data]);

      if (error) throw error;
      
      toast.success("Power plant created successfully");
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to create power plant");
    }
  };

  const handleUpdatePlant = async (data: any) => {
    try {
      const { error } = await supabase
        .from("power_plants")
        .update(data)
        .eq("id", selectedPlant.id);

      if (error) throw error;
      
      toast.success("Power plant updated successfully");
      setIsDialogOpen(false);
      setSelectedPlant(null);
      refetch();
    } catch (error) {
      toast.error("Failed to update power plant");
    }
  };

  const columns = [
    { key: "name", label: "Plant Name" },
    { key: "location", label: "Location" },
    { key: "capacity_mw", label: "Capacity (MW)" },
    { key: "fuel_type", label: "Fuel Type" },
    { key: "is_active", label: "Status", render: (value: boolean) => value ? "Active" : "Inactive" },
  ];

  const filteredPlants = plants?.filter((plant) =>
    plant.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Convert plants to map locations
  const mapLocations = plants?.map((plant, idx) => ({
    id: plant.id,
    name: plant.name,
    type: "plant" as const,
    lat: 23.8 + idx * 0.1,
    lng: 90.4 + idx * 0.1,
    status: plant.is_active ? "operational" as const : "offline" as const,
    capacity: `${plant.capacity_mw} MW`,
  })) || [];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Power Plants Management</h1>
            <p className="text-muted-foreground">
              Manage power generation facilities and monitor performance
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedPlant(null)}>
                <Factory className="h-4 w-4 mr-2" />
                Add Power Plant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedPlant ? "Edit Power Plant" : "Create New Power Plant"}
                </DialogTitle>
              </DialogHeader>
              <PlantManagementForm
                onSubmit={selectedPlant ? handleUpdatePlant : handleCreatePlant}
                initialData={selectedPlant}
                mode={selectedPlant ? "edit" : "create"}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Plants</CardTitle>
              <Factory className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{plants?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
              <Zap className="h-4 w-4 text-energy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {plants?.reduce((sum, p) => sum + Number(p.capacity_mw || 0), 0).toFixed(0)} MW
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
                {plants?.filter((p) => p.is_active).length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map */}
        <InteractiveMap
          locations={mapLocations}
          onLocationClick={(location) => {
            const plant = plants?.find((p) => p.id === location.id);
            if (plant) {
              setSelectedPlant(plant);
              setIsDialogOpen(true);
            }
          }}
        />

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Power Plants List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search power plants..."
            />

            <DataTable
              data={filteredPlants || []}
              columns={columns}
              onRowClick={(plant) => {
                setSelectedPlant(plant);
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
