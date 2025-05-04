
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type StreakCalendarProps = {
  streak: number;
  maxDays?: number;
  size?: 'sm' | 'md' | 'lg';
};

const StreakCalendar = ({ streak, maxDays = 7, size = 'md' }: StreakCalendarProps) => {
  // Get dates for the last X days
  const getDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = maxDays - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push({
        date,
        isToday: i === 0,
        isCompleted: i < streak
      });
    }
    
    return dates;
  };

  const dates = getDates();
  
  const sizeClasses = {
    sm: {
      container: "gap-1",
      dot: "w-2 h-2",
      dateText: "text-xs"
    },
    md: {
      container: "gap-2",
      dot: "w-3 h-3",
      dateText: "text-xs"
    },
    lg: {
      container: "gap-3",
      dot: "w-4 h-4",
      dateText: "text-sm"
    }
  };
  
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center gap-2 mb-3">
        <CalendarIcon className="h-4 w-4 text-habit-primary" />
        <h3 className="font-medium">Current streak: {streak} days</h3>
      </div>
      
      <div className={cn("flex items-center justify-between", sizeClasses[size].container)}>
        {dates.map((item, index) => {
          // Determine the class for the streak dot
          let dotClass = "habit-streak-dot";
          
          if (item.isToday) {
            dotClass += " habit-streak-dot-today";
          } else if (item.isCompleted) {
            dotClass += " habit-streak-dot-completed";
          } else {
            dotClass += " habit-streak-dot-missed";
          }
          
          return (
            <div key={index} className="flex flex-col items-center gap-1">
              <div className={cn(dotClass, sizeClasses[size].dot)} />
              <span className={cn("text-muted-foreground", sizeClasses[size].dateText)}>
                {item.date.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StreakCalendar;
