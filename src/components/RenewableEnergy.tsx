import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Wind, Droplets, Leaf, Target, TrendingUp } from "lucide-react";
import renewableImage from "@/assets/renewable-energy.jpg";

const RenewableEnergy = () => {
  const renewableProjects = [
    {
      icon: Sun,
      title: "Teesta Solar Plant",
      capacity: "200 MW",
      location: "Lalmonirhat",
      status: "Operational",
      description: "Large-scale solar photovoltaic project contributing to clean energy goals"
    },
    {
      icon: Droplets,
      title: "Kaptai Hydroelectric",
      capacity: "230 MW",
      location: "Rangamati",
      status: "Operational",
      description: "Bangladesh's only major hydroelectric facility providing clean renewable power"
    },
    {
      icon: Wind,
      title: "Offshore Wind Project",
      capacity: "500+ MW",
      location: "Bay of Bengal",
      status: "Under Development",
      description: "Ambitious offshore wind development to harness coastal wind resources"
    },
    {
      icon: Sun,
      title: "Rooftop Solar Program",
      capacity: "100+ MW",
      location: "Nationwide",
      status: "Expanding",
      description: "Distributed solar installations on residential and commercial buildings"
    }
  ];

  const targets = [
    {
      icon: Target,
      metric: "10%",
      description: "Renewable energy by 2025",
      color: "renewable"
    },
    {
      icon: Leaf,
      metric: "40%",
      description: "Clean energy by 2041",
      color: "energy"
    },
    {
      icon: TrendingUp,
      metric: "Zero",
      description: "Net carbon by 2050",
      color: "primary"
    }
  ];

  return (
    <section id="renewable" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            Renewable Energy Initiative
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            BPDB is committed to Bangladesh's sustainable energy future through 
            innovative renewable energy projects and clean technology adoption.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Leading the Green Transition
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As Bangladesh moves towards energy independence and environmental sustainability, 
                BPDB is pioneering the development of renewable energy infrastructure. Our 
                comprehensive approach includes solar, wind, and hydroelectric projects that 
                will reduce carbon emissions while ensuring energy security.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {targets.map((target, index) => (
                <div key={index} className="text-center p-4 bg-gradient-subtle rounded-xl">
                  <target.icon className={`h-8 w-8 text-${target.color} mx-auto mb-3`} />
                  <div className={`text-2xl font-bold text-${target.color} mb-1`}>
                    {target.metric}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {target.description}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="renewable" size="lg" className="w-full sm:w-auto">
              <Leaf className="h-5 w-5 mr-2" />
              View Sustainability Report
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <img 
              src={renewableImage} 
              alt="Renewable Energy Infrastructure"
              className="rounded-2xl shadow-hero w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-renewable/20 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Renewable Projects */}
        <div className="bg-gradient-subtle rounded-2xl p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
            Key Renewable Energy Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renewableProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="p-3 bg-renewable/10 rounded-full group-hover:bg-renewable/20 transition-colors">
                      <project.icon className="h-6 w-6 text-renewable" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-energy font-semibold">{project.capacity}</span>
                        <span className="text-muted-foreground">{project.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Operational' 
                      ? 'bg-renewable/10 text-renewable' 
                      : project.status === 'Under Development'
                      ? 'bg-energy/10 text-energy'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {project.status}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RenewableEnergy;