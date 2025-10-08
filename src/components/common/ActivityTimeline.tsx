import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Circle } from "lucide-react";

export interface TimelineActivity {
  id: string;
  title: string;
  description?: string;
  timestamp: Date;
  type: "info" | "success" | "warning" | "error";
  icon?: React.ReactNode;
}

interface ActivityTimelineProps {
  activities: TimelineActivity[];
  className?: string;
}

const typeColors = {
  info: "bg-blue-500",
  success: "bg-renewable",
  warning: "bg-yellow-500",
  error: "bg-destructive",
};

export const ActivityTimeline = ({ activities, className }: ActivityTimelineProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {activities.map((activity, index) => (
        <div key={activity.id} className="flex gap-4 relative">
          {/* Timeline line */}
          {index < activities.length - 1 && (
            <div className="absolute left-2 top-8 bottom-0 w-px bg-border" />
          )}

          {/* Timeline dot */}
          <div className="relative flex-shrink-0">
            <div className={cn("h-4 w-4 rounded-full", typeColors[activity.type])} />
          </div>

          {/* Content */}
          <div className="flex-1 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-sm font-medium">{activity.title}</h4>
                {activity.description && (
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                )}
              </div>
              <time className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </time>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
