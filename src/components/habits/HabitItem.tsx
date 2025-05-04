
import { useState } from 'react';
import { Check, MoreVertical, Trash, Edit, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export type Habit = {
  id: string;
  title: string;
  description?: string;
  streak: number;
  goal: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  category: string;
  completedToday: boolean;
  progress: number;
};

interface HabitItemProps {
  habit: Habit;
  onStatusChange: (id: string, completed: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewHistory: (id: string) => void;
}

const HabitItem = ({ habit, onStatusChange, onEdit, onDelete, onViewHistory }: HabitItemProps) => {
  const [isCompleted, setIsCompleted] = useState(habit.completedToday);
  
  const handleToggle = () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    onStatusChange(habit.id, newStatus);
  };
  
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border group animate-in fade-in-50">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Button
              variant={isCompleted ? "default" : "outline"}
              size="icon"
              className={`h-8 w-8 rounded-full transition-all ${
                isCompleted ? "bg-habit-primary text-white" : "text-muted-foreground"
              }`}
              onClick={handleToggle}
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Mark as {isCompleted ? 'incomplete' : 'complete'}</span>
            </Button>

            <div>
              <h3 className="font-medium">{habit.title}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <Badge variant="outline" className="text-xs">{habit.category}</Badge>
                <span>{habit.frequency}</span>
                <span>·</span>
                <span>Goal: {habit.goal}</span>
              </div>
            </div>
          </div>
          
          {habit.description && (
            <p className="text-sm text-muted-foreground mt-2 ml-11">{habit.description}</p>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(habit.id)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewHistory(habit.id)}>
              <Calendar className="mr-2 h-4 w-4" />
              View History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onDelete(habit.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="ml-11 mt-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium">
            Progress: {habit.progress}%
          </span>
          {habit.streak > 0 && (
            <span className="text-xs font-medium text-habit-primary flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-habit-primary rounded-full"></span>
              {habit.streak} day streak
            </span>
          )}
        </div>
        <Progress value={habit.progress} className="h-1.5" />
      </div>
    </div>
  );
};

export default HabitItem;
