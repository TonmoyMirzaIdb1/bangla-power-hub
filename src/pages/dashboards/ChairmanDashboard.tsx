import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, TrendingUp, Users, Zap, AlertTriangle, Power } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeLineChart, RealtimeBarChart, RealtimePieChart } from "@/components/common/Charts";
import { StatusIndicator } from "@/components/common/StatusIndicator";
import { Badge } from "@/components/ui/badge";

const ChairmanDashboard = () => {
  const { t } = useLanguage();
  const [plantCount, setPlantCount] = useState(0);
  const [substationCount, setSubstationCount] = useState(0);
  const [incidentCount, setIncidentCount] = useState(0);
  const [plants, setPlants] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [plantsRes, subsRes, incRes] = await Promise.all([
        supabase.from("power_plants").select("*").eq("is_active", true),
        supabase.from("substations").select("*").eq("is_active", true),
        supabase.from("incidents").select("*").eq("status", "open"),
      ]);
      setPlantCount(plantsRes.data?.length || 0);
      setSubstationCount(subsRes.data?.length || 0);
      setIncidentCount(incRes.data?.length || 0);
      setPlants(plantsRes.data || []);
    };
    fetchData();
  }, []);

  const generationTrend = [
    { name: "Jan", mw: 11200 }, { name: "Feb", mw: 11800 },
    { name: "Mar", mw: 12100 }, { name: "Apr", mw: 12450 },
    { name: "May", mw: 12800 }, { name: "Jun", mw: 13100 },
  ];

  const fuelMix = [
    { name: "Gas", amount: 52 }, { name: "Coal", amount: 18 },
    { name: "Oil", amount: 12 }, { name: "Renewable", amount: 10 },
    { name: "Import", amount: 8 },
  ];

  const deptPerf = [
    { name: "Gen", score: 96 }, { name: "Trans", score: 94 },
    { name: "Dist", score: 89 }, { name: "Fin", score: 97 }, { name: "HR", score: 92 },
  ];

  const revenue = [
    { name: "Q1", amount: 10200 }, { name: "Q2", amount: 11800 },
    { name: "Q3", amount: 12100 }, { name: "Q4", amount: 11150 },
  ];

  return (
    <DashboardLayout role="Chairman">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-1">{t('chairman.title')}</h1>
          <p className="text-muted-foreground">{t('chairman.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('chairman.totalGeneration')}</CardTitle>
              <Zap className="h-4 w-4 text-energy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,450 MW</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-renewable" /> +8.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('chairman.systemEfficiency')}</CardTitle>
              <Activity className="h-4 w-4 text-renewable" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.5%</div>
              <StatusIndicator status="operational" label="All systems normal" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('chairman.activePlants')}</CardTitle>
              <Power className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{plantCount}</div>
              <p className="text-xs text-muted-foreground">{substationCount} substations active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{incidentCount}</div>
              <StatusIndicator status={incidentCount > 5 ? "critical" : incidentCount > 0 ? "warning" : "operational"} />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="generation">Generation</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RealtimeLineChart data={generationTrend} title="Generation Trend (MW)" xKey="name" lines={[{ dataKey: "mw", stroke: "hsl(var(--primary))", name: "MW" }]} />
              <RealtimePieChart data={fuelMix} title="Fuel Mix" dataKey="amount" nameKey="name" colors={["hsl(var(--primary))", "hsl(var(--destructive))", "hsl(30 80% 55%)", "hsl(142 76% 36%)", "hsl(var(--muted-foreground))"]} />
            </div>
          </TabsContent>

          <TabsContent value="generation" className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Power Plants Status</CardTitle></CardHeader>
              <CardContent>
                {plants.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No power plant data available. Add plants via Management → Power Plants.</p>
                ) : (
                  <div className="space-y-3">
                    {plants.map((plant) => (
                      <div key={plant.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{plant.name}</p>
                          <p className="text-xs text-muted-foreground">{plant.location || "N/A"} • {plant.fuel_type || "Unknown"}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{plant.capacity_mw} MW</Badge>
                          <StatusIndicator status={plant.is_active ? "operational" : "offline"} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>{t('chairman.financialOverview')}</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: t('chairman.revenue'), value: "৳45,250 Cr", color: "text-renewable" },
                      { label: t('chairman.opex'), value: "৳32,180 Cr", color: "text-foreground" },
                      { label: t('chairman.netProfit'), value: "৳13,070 Cr", color: "text-renewable" },
                      { label: t('chairman.budgetUtilization'), value: "87%", color: "text-primary" },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className={`font-bold ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <RealtimeBarChart data={revenue} title="Revenue Breakdown (Cr ৳)" xKey="name" bars={[{ dataKey: "amount", fill: "hsl(var(--primary))", name: "Revenue" }]} />
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <RealtimeBarChart data={deptPerf} title="Department Performance (%)" xKey="name" bars={[{ dataKey: "score", fill: "hsl(var(--primary))", name: "Score" }]} />
            <Card>
              <CardHeader><CardTitle>{t('chairman.kpi')}</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: t('chairman.generationEfficiency'), value: 92 },
                    { label: t('chairman.transmissionReliability'), value: 96 },
                    { label: t('chairman.distributionNetwork'), value: 89 },
                  ].map((kpi) => (
                    <div key={kpi.label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">{kpi.label}</span>
                        <span className="text-sm font-bold">{kpi.value}%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${kpi.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ChairmanDashboard;
