import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, Users, Zap } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const ChairmanDashboard = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout role="Chairman">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{t('chairman.title')}</h1>
          <p className="text-muted-foreground">{t('chairman.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('chairman.totalGeneration')}</CardTitle>
              <Zap className="h-4 w-4 text-energy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,450 MW</div>
              <p className="text-xs text-muted-foreground">+8.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('chairman.systemEfficiency')}</CardTitle>
              <Activity className="h-4 w-4 text-renewable" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.5%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('chairman.activePlants')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">{t('chairman.operational')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('chairman.workforce')}</CardTitle>
              <Users className="h-4 w-4 text-gas" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15,234</div>
              <p className="text-xs text-muted-foreground">{t('chairman.totalEmployees')}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('chairman.kpi')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">{t('chairman.generationEfficiency')}</span>
                    <span className="text-sm font-bold">92%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-renewable h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">{t('chairman.transmissionReliability')}</span>
                    <span className="text-sm font-bold">96%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">{t('chairman.distributionNetwork')}</span>
                    <span className="text-sm font-bold">89%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-gas h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('chairman.financialOverview')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('chairman.revenue')}</span>
                  <span className="font-bold">৳45,250 Cr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('chairman.opex')}</span>
                  <span className="font-bold">৳32,180 Cr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('chairman.netProfit')}</span>
                  <span className="font-bold text-renewable">৳13,070 Cr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t('chairman.budgetUtilization')}</span>
                  <span className="font-bold">87%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChairmanDashboard;
