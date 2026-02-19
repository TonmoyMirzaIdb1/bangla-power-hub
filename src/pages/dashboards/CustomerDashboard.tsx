import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, Lightbulb, Clock, Plus } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeLineChart, RealtimeBarChart } from "@/components/common/Charts";
import { StatusIndicator } from "@/components/common/StatusIndicator";
import { Badge } from "@/components/ui/badge";

const CustomerDashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [bills, setBills] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [billsRes, reqRes] = await Promise.all([
        supabase.from("customer_bills").select("*").eq("customer_id", user.id).order("billing_month", { ascending: false }).limit(12),
        supabase.from("service_requests").select("*").eq("customer_id", user.id).order("created_at", { ascending: false }).limit(10),
      ]);
      setBills(billsRes.data || []);
      setRequests(reqRes.data || []);
    };
    fetchData();
  }, [user]);

  const pendingRequests = requests.filter(r => r.status === "pending").length;
  const resolvedRequests = requests.filter(r => r.status === "resolved").length;
  const latestBill = bills[0];
  const totalDue = bills.filter(b => !b.paid).reduce((sum, b) => sum + Number(b.amount_bdt), 0);

  const usageData = bills.slice(0, 6).reverse().map(b => ({
    name: new Date(b.billing_month).toLocaleDateString("en", { month: "short" }),
    kwh: Number(b.consumption_kwh),
  }));

  const billData = bills.slice(0, 6).reverse().map(b => ({
    name: new Date(b.billing_month).toLocaleDateString("en", { month: "short" }),
    amount: Number(b.amount_bdt),
  }));

  return (
    <DashboardLayout role="Customer">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-1">{t('customer.title')}</h1>
          <p className="text-muted-foreground">{t('customer.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Due</CardTitle>
              <DollarSign className="h-4 w-4 text-energy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳{totalDue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{bills.filter(b => !b.paid).length} unpaid bills</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('customer.usage')}</CardTitle>
              <Lightbulb className="h-4 w-4 text-renewable" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestBill ? `${latestBill.consumption_kwh} kWh` : "N/A"}</div>
              <p className="text-xs text-muted-foreground">Latest billing period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('customer.serviceRequests')}</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requests.length}</div>
              <p className="text-xs text-muted-foreground">{pendingRequests} pending, {resolvedRequests} resolved</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Account Status</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <StatusIndicator status={totalDue > 0 ? "warning" : "operational"} label={totalDue > 0 ? "Payment due" : "All clear"} />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="billing" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="requests">Service Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="billing" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>{t('customer.billingHistory')}</CardTitle></CardHeader>
                <CardContent>
                  {bills.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No billing data yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {bills.slice(0, 6).map((bill) => (
                        <div key={bill.id} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{new Date(bill.billing_month).toLocaleDateString("en", { month: "long", year: "numeric" })}</p>
                            <p className="text-xs text-muted-foreground">{bill.consumption_kwh} kWh</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm">৳{Number(bill.amount_bdt).toLocaleString()}</p>
                            <Badge variant={bill.paid ? "default" : "destructive"} className="text-xs">
                              {bill.paid ? "Paid" : "Due"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              {billData.length > 0 && (
                <RealtimeBarChart data={billData} title="Bill Amount Trend (৳)" xKey="name" bars={[{ dataKey: "amount", fill: "hsl(var(--primary))", name: "Amount" }]} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            {usageData.length > 0 ? (
              <RealtimeLineChart data={usageData} title="Consumption History (kWh)" xKey="name" lines={[{ dataKey: "kwh", stroke: "hsl(var(--primary))", name: "kWh" }]} />
            ) : (
              <Card><CardContent className="pt-6"><p className="text-muted-foreground text-sm">No usage data available.</p></CardContent></Card>
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Service Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {requests.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No service requests yet.</p>
                ) : (
                  <div className="space-y-3">
                    {requests.map((req) => (
                      <div key={req.id} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{req.request_type}</p>
                          <p className="text-xs text-muted-foreground">{req.description?.slice(0, 60) || "No description"}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={req.priority === "urgent" ? "destructive" : "outline"} className="text-xs">{req.priority}</Badge>
                          <StatusIndicator
                            status={req.status === "resolved" ? "operational" : req.status === "in_progress" ? "warning" : "maintenance"}
                            label={req.status}
                          />
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

export default CustomerDashboard;
