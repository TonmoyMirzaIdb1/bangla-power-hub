import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/contexts/LanguageContext";

interface TechnicianDashboardProps {
  specialization?: string;
  level?: string;
}

const TechnicianDashboard = ({ specialization = "Electrical", level = "Technician" }: TechnicianDashboardProps) => {
  const { t } = useLanguage();

  return (
    <DashboardLayout role={`${level} (${specialization})`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{level} ({specialization}) Dashboard</h1>
          <p className="text-muted-foreground">Maintenance and technical support</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Work Orders</CardTitle>
              <Wrench className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Assigned today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-renewable" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Urgent</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">High priority</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Hours Today</CardTitle>
              <Clock className="h-4 w-4 text-energy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.5</div>
              <p className="text-xs text-muted-foreground">Out of 8</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { order: 'Transformer Maintenance', location: 'Substation A', priority: 'High', status: 'In Progress' },
                  { order: 'Cable Replacement', location: 'Feeder 12', priority: 'Medium', status: 'Pending' },
                  { order: 'Equipment Inspection', location: 'Plant B', priority: 'Low', status: 'Scheduled' },
                  { order: 'Emergency Repair', location: 'Zone 4', priority: 'High', status: 'Assigned' },
                ].map((order, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{order.order}</p>
                      <p className="text-xs text-muted-foreground">{order.location}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.priority === 'High' ? 'bg-destructive/10 text-destructive' :
                        order.priority === 'Medium' ? 'bg-energy/10 text-energy-foreground' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {order.priority}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Work Orders Completed</span>
                  <span className="font-bold">34/38</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Response Time</span>
                  <span className="font-bold text-renewable">18 mins</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quality Rating</span>
                  <span className="font-bold text-primary">4.8/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Safety Compliance</span>
                  <span className="font-bold">100%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TechnicianDashboard;
