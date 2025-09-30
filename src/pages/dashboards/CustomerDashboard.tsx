import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, Lightbulb, Clock } from "lucide-react";

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Customer Dashboard</h1>
          <p className="text-muted-foreground">Manage Your Electricity Services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Bill</CardTitle>
              <DollarSign className="h-4 w-4 text-energy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳3,450</div>
              <p className="text-xs text-muted-foreground">Due by Feb 15, 2025</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Usage This Month</CardTitle>
              <Lightbulb className="h-4 w-4 text-renewable" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">485 kWh</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Service Requests</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">1 pending, 1 completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Outage Time</CardTitle>
              <Clock className="h-4 w-4 text-gas" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.5 hrs</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: 'January 2025', amount: '৳3,450', status: 'Due' },
                  { month: 'December 2024', amount: '৳3,180', status: 'Paid' },
                  { month: 'November 2024', amount: '৳2,950', status: 'Paid' },
                ].map((bill) => (
                  <div key={bill.month} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{bill.month}</p>
                      <p className="text-sm text-muted-foreground">{bill.amount}</p>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      bill.status === 'Paid' 
                        ? 'bg-renewable/10 text-renewable' 
                        : 'bg-energy/10 text-energy-foreground'
                    }`}>
                      {bill.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">View All Bills</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Daily Average</span>
                    <span className="text-sm font-bold">16.2 kWh</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Peak Usage Time</span>
                    <span className="text-sm font-bold">7-10 PM</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Comparison to Similar Homes</span>
                  <span className="font-bold text-renewable">-8% Lower</span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">Energy Saving Tips</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
