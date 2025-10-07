import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "operational" | "maintenance" | "offline" | "warning" | "critical";
  label?: string;
  showDot?: boolean;
  className?: string;
}

export const StatusIndicator = ({ status, label, showDot = true, className }: StatusIndicatorProps) => {
  const statusConfig = {
    operational: { color: "bg-renewable", text: "Operational", textColor: "text-renewable" },
    maintenance: { color: "bg-energy", text: "Maintenance", textColor: "text-energy-foreground" },
    offline: { color: "bg-muted", text: "Offline", textColor: "text-muted-foreground" },
    warning: { color: "bg-yellow-500", text: "Warning", textColor: "text-yellow-600" },
    critical: { color: "bg-destructive", text: "Critical", textColor: "text-destructive" },
  };

  const config = statusConfig[status];
  const displayLabel = label || config.text;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showDot && (
        <span className={cn("h-2 w-2 rounded-full animate-pulse", config.color)} />
      )}
      <span className={cn("text-sm font-medium", config.textColor)}>{displayLabel}</span>
    </div>
  );
};
