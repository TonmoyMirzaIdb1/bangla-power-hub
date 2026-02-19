import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, AlertTriangle, Power, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeLineChart, RealtimePieChart } from "@/components/common/Charts";
import { StatusIndicator } from "@/components/common/StatusIndicator";
import { Badge } from "@/components/ui/badge";

const DirectorDashboard = () => {
  const { t } = useLanguage();
  const path = window.location.pathname;
  const dept = path.includes("generation") ? "Generation"
    : path.includes("transmission") ? "Transmission"
    : path.includes("distribution") ? "Distribution"
    : path.includes("finance") ? "Finance"
    : path.includes("hr") ? "HR" : "Planning";

  const [plants, setPlants] = useState<any[]>([]);
  const [substations, setSubstations] = useState<any[]>([]);
  const [incidents, setIncidents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [pRes, sRes, iRes] = await Promise.all([
        supabase.from("power_plants").select("*").eq("is_active", true),
        supabase.from("substations").select("*").eq("is_active", true),
        supabase.from("incidents").select("*").order("created_at", { ascending: false }).limit(10),
      ]);
      setPlants(pRes.data || []);
      setSubstations(sRes.data || []);
      setIncidents(iRes.data || []);
    };
    fetchData();
  }, []);

  const totalCapacity = plants.reduce((s, p) => s + Number(p.capacity_mw), 0);
  const openIncidents = incidents.filter(i => i.status === "open").length;

  const capacityByFuel = Object.entries(
    plants.reduce((acc, p) => {
      const fuel = p.fuel_type || "Unknown";
      acc[fuel] = (acc[fuel] || 0) + Number(p.capacity_mw);
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, amount: value as number }));

  return (
    <DashboardLayout role={`Director (${dept})`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-1">Director ({dept}) Dashboard</h1>
          <p className="text-muted-foreground">{dept} Performance & Operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
              <Power className="h-4 w-4 text-energy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCapacity.toLocaleString()} MW</div>
              <p className="text-xs text-muted-foreground">{plants.length} plants active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Substations</CardTitle>
              <Activity className="h-4 w-4 text-renewable" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{substations.length}</div>
              <StatusIndicator status="operational" label="All operational" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91.2%</div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Incidents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{openIncidents}</div>
              <StatusIndicator status={openIncidents > 3 ? "critical" : openIncidents > 0 ? "warning" : "operational"} />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {capacityByFuel.length > 0 && (
                <RealtimePieChart data={capacityByFuel} title="Capacity by Fuel Type" dataKey="amount" nameKey="name" colors={["hsl(var(--primary))", "hsl(var(--destructive))", "hsl(30 80% 55%)", "hsl(142 76% 36%)", "hsl(var(--muted-foreground))"]} />
              )}
              <RealtimeLineChart
                title="Monthly Generation Trend"
                data={[
                  { name: "Jan", mw: 8200 }, { name: "Feb", mw: 8500 },
                  { name: "Mar", mw: 8750 }, { name: "Apr", mw: 9100 },
                  { name: "May", mw: 9400 }, { name: "Jun", mw: 9650 },
                ]}
                xKey="name" lines={[{ dataKey: "mw", stroke: "hsl(var(--primary))", name: "MW" }]}
              />
            </div>
          </TabsContent>

          <TabsContent value="assets">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Power Plants</CardTitle></CardHeader>
                <CardContent>
                  {plants.length === 0 ? <p className="text-sm text-muted-foreground">No plants found</p> : (
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {plants.map(p => (
                        <div key={p.id} className="flex justify-between items-center p-2 bg-secondary/50 rounded">
                          <div>
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.location} • {p.fuel_type}</p>
                          </div>
                          <Badge variant="outline">{p.capacity_mw} MW</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Substations</CardTitle></CardHeader>
                <CardContent>
                  {substations.length === 0 ? <p className="text-sm text-muted-foreground">No substations found</p> : (
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {substations.map(s => (
                        <div key={s.id} className="flex justify-between items-center p-2 bg-secondary/50 rounded">
                          <div>
                            <p className="text-sm font-medium">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{s.location} • {s.voltage_level}</p>
                          </div>
                          <Badge variant="outline">{s.capacity_mva} MVA</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="incidents">
            <Card>
              <CardHeader><CardTitle>Recent Incidents</CardTitle></CardHeader>
              <CardContent>
                {incidents.length === 0 ? <p className="text-sm text-muted-foreground">No incidents found</p> : (
                  <div className="space-y-3">
                    {incidents.map(inc => (
                      <div key={inc.id} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{inc.incident_type}</p>
                          <p className="text-xs text-muted-foreground">{inc.description?.slice(0, 80)}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Badge variant={inc.severity === "critical" ? "destructive" : "outline"}>{inc.severity}</Badge>
                          <StatusIndicator status={inc.status === "open" ? "warning" : inc.status === "resolved" ? "operational" : "maintenance"} label={inc.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DirectorDashboard;
