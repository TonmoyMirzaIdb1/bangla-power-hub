import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertTriangle, Power, TrendingUp } from "lucide-react";

const DirectorDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Director Dashboard</h1>
          <p className="text-muted-foreground">Generation Performance & Operations Management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Power Output</CardTitle>
              <Power className="h-4 w-4 text-energy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,750 MW</div>
              <p className="text-xs text-muted-foreground">Generation capacity</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Plant Efficiency</CardTitle>
              <Activity className="h-4 w-4 text-renewable" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91.2%</div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Plants</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">Currently operational</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Requiring attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Plant Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Barapukuria Coal', capacity: 525, efficiency: 94 },
                  { name: 'Ashuganj Power Station', capacity: 724, efficiency: 92 },
                  { name: 'Rampal Power Station', capacity: 1320, efficiency: 89 },
                ].map((plant) => (
                  <div key={plant.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{plant.name}</span>
                      <span className="text-sm font-bold">{plant.capacity} MW - {plant.efficiency}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-energy h-2 rounded-full" style={{ width: `${plant.efficiency}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fuel Consumption</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Gas (Daily)</span>
                  <span className="font-bold">2,450 MMCF</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Coal (Daily)</span>
                  <span className="font-bold">8,500 Tons</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Fuel Cost</span>
                  <span className="font-bold">৳1,250 Cr/Month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Heat Rate</span>
                  <span className="font-bold">2,385 kcal/kWh</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DirectorDashboard;
