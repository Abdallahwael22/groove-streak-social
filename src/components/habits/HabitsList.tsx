
import { useState } from 'react';
import HabitItem, { Habit } from './HabitItem';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Sample data for the MVP
const initialHabits: Habit[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: 'Start each day with 10 minutes of mindfulness',
    streak: 7,
    goal: '10 minutes',
    frequency: 'daily',
    category: 'Mindfulness',
    completedToday: true,
    progress: 70,
  },
  {
    id: '2',
    title: 'Read Books',
    description: 'Read for at least 30 minutes',
    streak: 3,
    goal: '30 minutes',
    frequency: 'daily',
    category: 'Learning',
    completedToday: false,
    progress: 45,
  },
  {
    id: '3',
    title: 'Drink Water',
    description: 'Drink 8 glasses of water throughout the day',
    streak: 5,
    goal: '8 glasses',
    frequency: 'daily',
    category: 'Health',
    completedToday: true,
    progress: 62,
  },
  {
    id: '4',
    title: 'Exercise',
    description: '30 minutes of cardio or strength training',
    streak: 0,
    goal: '30 minutes',
    frequency: 'daily',
    category: 'Fitness',
    completedToday: false,
    progress: 25,
  },
];

interface HabitsListProps {
  onAddHabit: () => void;
  onEditHabit: (id: string) => void;
}

const HabitsList = ({ onAddHabit, onEditHabit }: HabitsListProps) => {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  
  const handleStatusChange = (id: string, completed: boolean) => {
    setHabits(
      habits.map(habit => 
        habit.id === id 
          ? { 
              ...habit, 
              completedToday: completed,
              streak: completed ? habit.streak + (habit.completedToday ? 0 : 1) : Math.max(0, habit.streak - 1),
              progress: completed ? Math.min(100, habit.progress + 5) : Math.max(0, habit.progress - 5)
            } 
          : habit
      )
    );
    
    toast({
      title: completed ? "Habit completed! 🎉" : "Habit marked as incomplete",
      description: completed ? "Great job keeping up with your streak!" : "Keep pushing, you can do it!",
    });
  };
  
  const handleDelete = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
    toast({
      title: "Habit deleted",
      description: "The habit has been successfully removed",
    });
  };
  
  const handleViewHistory = (id: string) => {
    toast({
      title: "Feature coming soon",
      description: "Habit history view will be available in the next update",
    });
  };
  
  const filteredHabits = habits.filter(habit => {
    if (activeTab === 'all') return true;
    if (activeTab === 'completed') return habit.completedToday;
    if (activeTab === 'pending') return !habit.completedToday;
    return true;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Habits</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button size="sm" onClick={onAddHabit}>
            <Plus className="h-4 w-4 mr-1" />
            Add Habit
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="space-y-3">
            {filteredHabits.length > 0 ? (
              filteredHabits.map(habit => (
                <HabitItem
                  key={habit.id}
                  habit={habit}
                  onStatusChange={handleStatusChange}
                  onEdit={onEditHabit}
                  onDelete={handleDelete}
                  onViewHistory={handleViewHistory}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No habits found. Add your first habit!</p>
                <Button variant="outline" className="mt-4" onClick={onAddHabit}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Habit
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <div className="space-y-3">
            {filteredHabits.length > 0 ? (
              filteredHabits.map(habit => (
                <HabitItem
                  key={habit.id}
                  habit={habit}
                  onStatusChange={handleStatusChange}
                  onEdit={onEditHabit}
                  onDelete={handleDelete}
                  onViewHistory={handleViewHistory}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No completed habits for today yet.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <div className="space-y-3">
            {filteredHabits.length > 0 ? (
              filteredHabits.map(habit => (
                <HabitItem
                  key={habit.id}
                  habit={habit}
                  onStatusChange={handleStatusChange}
                  onEdit={onEditHabit}
                  onDelete={handleDelete}
                  onViewHistory={handleViewHistory}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Great job! All habits have been completed today!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HabitsList;
