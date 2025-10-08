import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, AlertTriangle, Info, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export type AlertType = "info" | "warning" | "error" | "success";

export interface SystemAlert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  timestamp: Date;
  read?: boolean;
}

interface AlertSystemProps {
  alerts: SystemAlert[];
  onDismiss?: (id: string) => void;
  onMarkAsRead?: (id: string) => void;
  className?: string;
}

const alertConfig = {
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950" },
  warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950" },
  error: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
  success: { icon: CheckCircle2, color: "text-renewable", bg: "bg-renewable/10" },
};

export const AlertSystem = ({ alerts, onDismiss, onMarkAsRead, className }: AlertSystemProps) => {
  return (
    <ScrollArea className={cn("h-[400px] w-full", className)}>
      <div className="space-y-3 p-4">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mb-2 opacity-50" />
            <p>No alerts</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const config = alertConfig[alert.type];
            const Icon = config.icon;

            return (
              <Alert
                key={alert.id}
                className={cn(config.bg, !alert.read && "border-l-4", "relative")}
                onClick={() => onMarkAsRead?.(alert.id)}
              >
                <Icon className={cn("h-4 w-4", config.color)} />
                <AlertTitle className="flex items-center justify-between">
                  {alert.title}
                  {onDismiss && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDismiss(alert.id);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </AlertTitle>
                <AlertDescription>
                  <p>{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.timestamp.toLocaleString()}
                  </p>
                </AlertDescription>
              </Alert>
            );
          })
        )}
      </div>
    </ScrollArea>
  );
};

interface AlertBadgeProps {
  count: number;
  className?: string;
}

export const AlertBadge = ({ count, className }: AlertBadgeProps) => {
  return (
    <div className={cn("relative", className)}>
      <Bell className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </div>
  );
};
