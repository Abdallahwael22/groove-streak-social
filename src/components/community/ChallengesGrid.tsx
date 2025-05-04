
import { useState } from 'react';
import ChallengeCard, { Challenge } from './ChallengeCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data for the MVP
const initialChallenges: Challenge[] = [
  {
    id: '1',
    title: '30 Day Meditation',
    description: 'Build a daily meditation practice for improved focus and mindfulness',
    participants: 128,
    duration: '30 days',
    startDate: new Date(2025, 4, 1),
    endDate: new Date(2025, 4, 30),
    category: 'Mindfulness',
    creator: {
      name: 'Sarah Kim',
      avatar: '',
    },
    joined: false,
    progress: 0,
  },
  {
    id: '2',
    title: 'Reading Challenge',
    description: 'Read for 20 minutes every day to finish more books this month',
    participants: 94,
    duration: '21 days',
    startDate: new Date(2025, 4, 1),
    endDate: new Date(2025, 4, 21),
    category: 'Learning',
    creator: {
      name: 'Mike Johnson',
      avatar: '',
    },
    joined: true,
    progress: 45,
  },
  {
    id: '3',
    title: 'Water Intake Challenge',
    description: 'Drink 8 glasses of water every day for better health and energy',
    participants: 256,
    duration: '14 days',
    startDate: new Date(2025, 4, 1),
    endDate: new Date(2025, 4, 15),
    category: 'Health',
    creator: {
      name: 'Emma Wilson',
      avatar: '',
    },
    joined: true,
    progress: 75,
  },
  {
    id: '4',
    title: 'Morning Workout',
    description: 'Start your day with a 20-minute workout for increased energy',
    participants: 186,
    duration: '30 days',
    startDate: new Date(2025, 4, 1),
    endDate: new Date(2025, 5, 1),
    category: 'Fitness',
    creator: {
      name: 'Thomas Lee',
      avatar: '',
    },
    joined: false,
    progress: 0,
  },
  {
    id: '5',
    title: 'Digital Detox',
    description: 'Reduce screen time and be more present in your daily life',
    participants: 142,
    duration: '7 days',
    startDate: new Date(2025, 4, 1),
    endDate: new Date(2025, 4, 8),
    category: 'Wellbeing',
    creator: {
      name: 'Lisa Carter',
      avatar: '',
    },
    joined: false,
    progress: 0,
  },
  {
    id: '6',
    title: 'Gratitude Journal',
    description: 'Write down 3 things you are grateful for every day',
    participants: 218,
    duration: '21 days',
    startDate: new Date(2025, 4, 1),
    endDate: new Date(2025, 4, 21),
    category: 'Mindfulness',
    creator: {
      name: 'David Chen',
      avatar: '',
    },
    joined: false,
    progress: 0,
  },
];

interface ChallengesGridProps {
  onCreateChallenge: () => void;
}

const ChallengesGrid = ({ onCreateChallenge }: ChallengesGridProps) => {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const handleJoinChallenge = (id: string) => {
    setChallenges(
      challenges.map(challenge => 
        challenge.id === id ? { ...challenge, joined: true, progress: 0 } : challenge
      )
    );
    
    toast({
      title: "Challenge joined! 🎉",
      description: "You've successfully joined the challenge. Good luck!",
    });
  };
  
  const handleLeaveChallenge = (id: string) => {
    setChallenges(
      challenges.map(challenge => 
        challenge.id === id ? { ...challenge, joined: false, progress: 0 } : challenge
      )
    );
    
    toast({
      title: "Challenge left",
      description: "You've left the challenge. You can join again anytime.",
    });
  };
  
  const filteredChallenges = challenges.filter(challenge => 
    challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    challenge.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl font-semibold">Community Challenges</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={onCreateChallenge}>
            <Plus className="h-4 w-4 mr-1" />
            Create
          </Button>
        </div>
      </div>
      
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChallenges.map(challenge => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onJoin={handleJoinChallenge}
              onLeave={handleLeaveChallenge}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">No challenges found matching your search.</p>
          <Button variant="outline" onClick={() => setSearchQuery('')}>
            Clear search
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChallengesGrid;
