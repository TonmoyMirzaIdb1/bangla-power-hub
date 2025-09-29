import { Button } from "@/components/ui/button";
import { ArrowDown, Zap, MapPin, Users } from "lucide-react";
import heroImage from "@/assets/hero-power-plant.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Powering
            <span className="block text-energy"> Bangladesh's Future</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in">
            Bangladesh Power Development Board - The nation's leading electricity generation, 
            transmission, and distribution authority, ensuring reliable power for over 165 million people.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Button variant="outline-white" size="lg" className="text-lg">
              <Zap className="h-5 w-5 mr-2" />
              Our Services
            </Button>
            <Button variant="energy" size="lg" className="text-lg">
              <MapPin className="h-5 w-5 mr-2" />
              Power Plants
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-slide-in-left">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-energy mb-2">25,000+</div>
              <div className="text-white/80">MW Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-energy mb-2">165M+</div>
              <div className="text-white/80">People Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-energy mb-2">4</div>
              <div className="text-white/80">Distribution Zones</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;