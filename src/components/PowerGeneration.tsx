import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Zap, Droplets, Sun, Wind, Atom } from "lucide-react";
import gasPlant from "@/assets/gas-power-plant.jpg";
import coalPlant from "@/assets/coal-power-plant.jpg";
import renewableEnergy from "@/assets/renewable-energy.jpg";

const PowerGeneration = () => {
  const generationTypes = [
    {
      icon: Flame,
      title: "Gas-Based Power",
      percentage: "40%+",
      description: "Historically the dominant fuel source with major stations at Ghorasal and Ashuganj",
      image: gasPlant,
      color: "gas"
    },
    {
      icon: Zap,
      title: "Coal-Based Power",
      percentage: "25%",
      description: "Modern ultra-super critical plants including Payra, Rampal, and Matarbari stations",
      image: coalPlant,
      color: "coal"
    },
    {
      icon: Sun,
      title: "Renewable Energy",
      percentage: "10%",
      description: "Expanding solar and wind projects including Teesta Solar and Kaptai Hydroelectric",
      image: renewableEnergy,
      color: "renewable"
    },
    {
      icon: Droplets,
      title: "Oil-Based Power",
      percentage: "15%",
      description: "HFO and HSD powered plants serving as peaking and backup power sources",
      image: null,
      color: "primary"
    },
    {
      icon: Atom,
      title: "Nuclear Power",
      percentage: "Future",
      description: "Rooppur Nuclear Power Plant under construction in Pabna",
      image: null,
      color: "energy"
    },
    {
      icon: Wind,
      title: "Imported Power",
      percentage: "10%",
      description: "Significant imports from India with plans to increase from Nepal",
      image: null,
      color: "accent"
    }
  ];

  const majorPlants = [
    {
      name: "Ghorasal Power Station",
      location: "Narsingdi",
      type: "Gas-fired",
      capacity: "210 MW"
    },
    {
      name: "Payra Power Plant",
      location: "Patuakhali",
      type: "Coal-fired",
      capacity: "1,320 MW"
    },
    {
      name: "Rampal Power Station",
      location: "Bagerhat",
      type: "Coal-fired",
      capacity: "1,320 MW"
    },
    {
      name: "Kaptai Hydroelectric",
      location: "Rangamati",
      type: "Hydroelectric",
      capacity: "230 MW"
    }
  ];

  return (
    <section id="generation" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            Diversified Power Generation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            BPDB operates a comprehensive portfolio of power generation technologies, 
            ensuring energy security and reliability for Bangladesh's growing economy.
          </p>
        </div>

        {/* Generation Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {generationTypes.map((type, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 overflow-hidden">
              {type.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={type.image} 
                    alt={type.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg bg-${type.color}/10`}>
                    <type.icon className={`h-6 w-6 text-${type.color}`} />
                  </div>
                  <div className={`text-2xl font-bold text-${type.color}`}>
                    {type.percentage}
                  </div>
                </div>
                <CardTitle className="text-xl">{type.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {type.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Major Power Plants */}
        <div className="bg-card rounded-2xl p-8 shadow-card">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
            Major Power Plants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {majorPlants.map((plant, index) => (
              <div key={index} className="text-center p-6 bg-gradient-subtle rounded-xl hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-primary mb-2">{plant.name}</h4>
                <p className="text-sm text-muted-foreground mb-1">{plant.location}</p>
                <p className="text-sm text-muted-foreground mb-2">{plant.type}</p>
                <div className="text-lg font-semibold text-energy">{plant.capacity}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="hero" size="lg">
              View All Power Plants
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PowerGeneration;