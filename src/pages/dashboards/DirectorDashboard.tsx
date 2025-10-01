import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertTriangle, Power, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const DirectorDashboard = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout role="Director">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{t('director.title')}</h1>
          <p className="text-muted-foreground">{t('director.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('director.powerOutput')}</CardTitle>
              <Power className="h-4 w-4 text-energy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,750 MW</div>
              <p className="text-xs text-muted-foreground">{t('director.generationCapacity')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('director.plantEfficiency')}</CardTitle>
              <Activity className="h-4 w-4 text-renewable" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91.2%</div>
              <p className="text-xs text-muted-foreground">{t('director.overallPerformance')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('chairman.activePlants')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">{t('director.currentlyOperational')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('director.alerts')}</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">{t('director.requiringAttention')}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('director.plantPerformance')}</CardTitle>
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
              <CardTitle>{t('director.fuelConsumption')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('director.gasDaily')}</span>
                  <span className="font-bold">2,450 MMCF</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('director.coalDaily')}</span>
                  <span className="font-bold">8,500 Tons</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('director.fuelCost')}</span>
                  <span className="font-bold">৳1,250 Cr/Month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('director.heatRate')}</span>
                  <span className="font-bold">2,385 kcal/kWh</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DirectorDashboard;
