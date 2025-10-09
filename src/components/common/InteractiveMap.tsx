import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapLocation {
  id: string;
  name: string;
  type: "plant" | "substation";
  lat: number;
  lng: number;
  status: "operational" | "maintenance" | "offline";
  capacity?: string;
}

interface InteractiveMapProps {
  locations: MapLocation[];
  onLocationClick?: (location: MapLocation) => void;
  className?: string;
}

export const InteractiveMap = ({ locations, onLocationClick, className }: InteractiveMapProps) => {
  // Simple grid-based map visualization
  // For production, integrate with Leaflet or Google Maps
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-renewable";
      case "maintenance":
        return "bg-energy";
      case "offline":
        return "bg-muted";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="h-5 w-5" />
          Network Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px] bg-muted/30 rounded-lg border overflow-hidden">
          {/* Map Grid */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-0">
            {locations.map((location, idx) => {
              // Position based on index for demo purposes
              const row = Math.floor(idx / 4) + 1;
              const col = (idx % 4) * 3 + 2;
              
              return (
                <div
                  key={location.id}
                  className={cn(
                    "absolute flex items-center justify-center cursor-pointer transition-transform hover:scale-110",
                  )}
                  style={{
                    left: `${(col / 12) * 100}%`,
                    top: `${(row / 8) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => onLocationClick?.(location)}
                >
                  <div className="relative group">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shadow-lg",
                        getStatusColor(location.status)
                      )}
                    >
                      {location.type === "plant" ? (
                        <Zap className="h-5 w-5 text-white" />
                      ) : (
                        <Radio className="h-5 w-5 text-white" />
                      )}
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-popover text-popover-foreground p-3 rounded-lg shadow-lg border min-w-[200px]">
                        <h4 className="font-semibold text-sm mb-1">{location.name}</h4>
                        <div className="space-y-1 text-xs">
                          <p className="text-muted-foreground capitalize">
                            Type: {location.type}
                          </p>
                          {location.capacity && (
                            <p className="text-muted-foreground">
                              Capacity: {location.capacity}
                            </p>
                          )}
                          <Badge
                            variant={location.status === "operational" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {location.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur p-3 rounded-lg border shadow-lg">
            <h4 className="text-sm font-semibold mb-2">Legend</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Power Plant</span>
              </div>
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-primary" />
                <span>Substation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-renewable" />
                <span>Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-energy" />
                <span>Maintenance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted" />
                <span>Offline</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2">
          Click on markers to view details. For production, integrate with mapping service.
        </p>
      </CardContent>
    </Card>
  );
};
