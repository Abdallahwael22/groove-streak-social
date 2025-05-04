
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  isHighlighted?: boolean;
}

const StatsCard = ({
  title,
  value,
  description,
  icon,
  trend,
  isHighlighted = false,
}: StatsCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all",
      isHighlighted && "border-habit-primary"
    )}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-end gap-2 mt-1">
              <h2 className="text-2xl font-bold">{value}</h2>
              {trend && (
                <span className={cn(
                  "text-xs font-medium flex items-center",
                  trend.positive ? "text-green-500" : "text-red-500"
                )}>
                  {trend.positive ? "↑" : "↓"} {trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {icon && (
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-habit-light">
              {icon}
            </div>
          )}
          {isHighlighted && (
            <div className="absolute top-0 right-0 p-1.5">
              <Sparkles className="h-4 w-4 text-habit-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
