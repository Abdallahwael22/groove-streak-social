
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type SuggestedHabit = {
  id: string;
  title: string;
  description: string;
  category: string;
  popularity: number;
};

const suggestedHabits: SuggestedHabit[] = [
  {
    id: '1',
    title: 'Drink More Water',
    description: 'Aim for 8 glasses of water per day for better health',
    category: 'Health',
    popularity: 94,
  },
  {
    id: '2',
    title: '10-Minute Meditation',
    description: 'Start each day with a short mindfulness practice',
    category: 'Mindfulness',
    popularity: 87,
  },
  {
    id: '3',
    title: 'Daily Journal',
    description: 'Write down thoughts and reflections before bed',
    category: 'Wellbeing',
    popularity: 82,
  },
  {
    id: '4',
    title: '15-Minute Reading',
    description: 'Read a book every day to improve knowledge',
    category: 'Learning',
    popularity: 79,
  }
];

const SuggestedHabits = () => {
  const { toast } = useToast();
  
  const handleAddHabit = (habit: SuggestedHabit) => {
    toast({
      title: "Habit added",
      description: `${habit.title} has been added to your habits`,
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Suggested Habits</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {suggestedHabits.map(habit => (
            <div key={habit.id} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{habit.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{habit.category}</Badge>
                  <span className="text-xs text-muted-foreground">{habit.popularity}% popular</span>
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => handleAddHabit(habit)}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add habit</span>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedHabits;
