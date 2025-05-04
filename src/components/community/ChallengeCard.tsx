
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export type Challenge = {
  id: string;
  title: string;
  description: string;
  participants: number;
  duration: string;
  startDate: Date;
  endDate: Date;
  category: string;
  creator: {
    name: string;
    avatar: string;
  };
  joined: boolean;
  progress: number;
};

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin: (id: string) => void;
  onLeave: (id: string) => void;
}

const ChallengeCard = ({ challenge, onJoin, onLeave }: ChallengeCardProps) => {
  const daysLeft = Math.ceil(
    (challenge.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleActionClick = () => {
    if (challenge.joined) {
      onLeave(challenge.id);
    } else {
      onJoin(challenge.id);
    }
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-habit-primary to-habit-secondary h-20 relative">
        <span className="absolute top-2 right-2">
          <Badge variant="secondary">{challenge.category}</Badge>
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold">{challenge.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>

        <div className="mt-3 flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={challenge.creator.avatar} />
            <AvatarFallback className="text-xs">
              {challenge.creator.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs">Created by {challenge.creator.name}</span>
        </div>
        
        <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
          <div>
            <span className="font-medium">{challenge.participants} participants</span>
          </div>
          <div>
            <span>{challenge.duration}</span>
            <span className="mx-1">•</span>
            <span>{daysLeft} days left</span>
          </div>
        </div>
        
        {challenge.joined && (
          <div className="mt-3">
            <div className="flex justify-between mb-1">
              <span className="text-xs">Your Progress</span>
              <span className="text-xs font-medium">{challenge.progress}%</span>
            </div>
            <Progress value={challenge.progress} className="h-1.5" />
          </div>
        )}

        <Button
          className={`w-full mt-4 ${
            challenge.joined ? "bg-white text-habit-primary border border-habit-primary hover:bg-habit-light" : ""
          }`}
          variant={challenge.joined ? "outline" : "default"}
          onClick={handleActionClick}
        >
          {challenge.joined ? "Leave Challenge" : "Join Challenge"}
        </Button>
      </div>
    </div>
  );
};

export default ChallengeCard;
