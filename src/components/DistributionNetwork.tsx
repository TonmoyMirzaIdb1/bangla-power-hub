import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Zap, Building2, Home } from "lucide-react";

const DistributionNetwork = () => {
  const distributionZones = [
    {
      name: "Chittagong Zone",
      icon: MapPin,
      coverage: "Chittagong metropolitan and greater region",
      voltage: "33 kV / 11 kV / 0.4 kV",
      customers: "Commercial & Industrial"
    },
    {
      name: "Comilla Zone", 
      icon: Building2,
      coverage: "Comilla and surrounding areas",
      voltage: "33 kV / 11 kV / 0.4 kV",
      customers: "Mixed Residential & Commercial"
    },
    {
      name: "Mymensingh Zone",
      icon: Home,
      coverage: "Mymensingh region",
      voltage: "33 kV / 11 kV / 0.4 kV", 
      customers: "Residential & Agricultural"
    },
    {
      name: "Sylhet Zone",
      icon: Zap,
      coverage: "Sylhet region",
      voltage: "33 kV / 11 kV / 0.4 kV",
      customers: "Urban & Rural Mixed"
    }
  ];

  const subsidiaries = [
    {
      name: "DPDC",
      fullName: "Dhaka Power Distribution Company",
      area: "Dhaka Metropolitan Area",
      established: "2008"
    },
    {
      name: "DESCO", 
      fullName: "Dhaka Electric Supply Company",
      area: "Other parts of Dhaka Metro",
      established: "2008"
    },
    {
      name: "WZPDCL",
      fullName: "West Zone Power Distribution Company",
      area: "Khulna, Barisal, Rajshahi, Rangpur",
      established: "2012"
    },
    {
      name: "NWZPDCL",
      fullName: "North West Zone Power Distribution Company",
      area: "Northwestern region",
      established: "2012"
    },
    {
      name: "NESCO",
      fullName: "Northern Electricity Supply Company", 
      area: "Northern region",
      established: "2010"
    },
    {
      name: "REB",
      fullName: "Rural Electrification Board",
      area: "Rural areas nationwide",
      established: "1977"
    }
  ];

  return (
    <section id="distribution" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            Nationwide Distribution Network
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            BPDB operates an extensive distribution network through direct zones and subsidiary companies, 
            delivering reliable electricity across Bangladesh's diverse urban and rural landscapes.
          </p>
        </div>

        {/* Direct Distribution Zones */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
            BPDB Direct Distribution Zones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {distributionZones.map((zone, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                    <zone.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{zone.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <CardDescription>{zone.coverage}</CardDescription>
                  <div className="text-sm font-medium text-energy">{zone.voltage}</div>
                  <div className="text-sm text-muted-foreground">{zone.customers}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Distribution Subsidiaries */}
        <div className="bg-gradient-subtle rounded-2xl p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
            Distribution Subsidiaries & Partners
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subsidiaries.map((company, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{company.name}</CardTitle>
                  <CardDescription className="font-medium">{company.fullName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Coverage:</span>
                      <span className="text-sm font-medium">{company.area}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Established:</span>
                      <span className="text-sm font-medium text-energy">{company.established}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Infrastructure Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-card rounded-xl shadow-card">
            <div className="text-4xl font-bold text-primary mb-2">33 kV</div>
            <div className="text-muted-foreground">Primary Distribution Voltage</div>
          </div>
          <div className="p-8 bg-card rounded-xl shadow-card">
            <div className="text-4xl font-bold text-energy mb-2">11 kV</div>
            <div className="text-muted-foreground">Secondary Distribution Voltage</div>
          </div>
          <div className="p-8 bg-card rounded-xl shadow-card">
            <div className="text-4xl font-bold text-renewable mb-2">400 V</div>
            <div className="text-muted-foreground">Consumer Delivery Voltage</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistributionNetwork;