
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Profile = () => {
  // In a real app, this would come from auth context
  const [user] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: '',
    joinedDate: 'March 2025',
    streak: 7,
    completedHabits: 42,
    bio: 'Building healthy habits one day at a time.'
  });

  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <Button variant="outline" onClick={() => navigate('/settings')}>
            Edit Profile
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-habit-primary">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xl bg-habit-light text-habit-primary">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground mt-1">Joined {user.joinedDate}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user.bio}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
              <span className="text-3xl font-bold text-habit-primary">{user.streak}</span>
              <span className="text-sm text-muted-foreground">Current Streak</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
              <span className="text-3xl font-bold text-habit-primary">{user.completedHabits}</span>
              <span className="text-sm text-muted-foreground">Habits Completed</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge variant="outline" className="py-2 px-3">
              <span className="mr-1">🔥</span> 7 Day Streak
            </Badge>
            <Badge variant="outline" className="py-2 px-3">
              <span className="mr-1">🏆</span> Early Adopter
            </Badge>
            <Badge variant="outline" className="py-2 px-3">
              <span className="mr-1">📈</span> Trend Setter
            </Badge>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
