
import { Calendar, Activity, Trophy, Zap } from 'lucide-react';
import StatsCard from './StatsCard';
import StreakCalendar from '../habits/StreakCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', value: 4 },
  { name: 'Tue', value: 6 },
  { name: 'Wed', value: 5 },
  { name: 'Thu', value: 8 },
  { name: 'Fri', value: 7 },
  { name: 'Sat', value: 9 },
  { name: 'Sun', value: 11 },
];

const DashboardStats = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Current Streak"
          value="7 days"
          description="Keep it up!"
          icon={<Trophy className="h-5 w-5 text-habit-primary" />}
          isHighlighted
        />
        <StatsCard
          title="Habits Tracked"
          value="4"
          trend={{ value: 25, positive: true }}
          icon={<Calendar className="h-5 w-5 text-habit-primary" />}
        />
        <StatsCard
          title="Completion Rate"
          value="85%"
          trend={{ value: 5, positive: true }}
          icon={<Activity className="h-5 w-5 text-habit-primary" />}
        />
        <StatsCard
          title="Weekly Consistency"
          value="Good"
          description="Better than 65% of users"
          icon={<Zap className="h-5 w-5 text-habit-primary" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8B5CF6" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Streak Calendar</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <StreakCalendar streak={7} maxDays={7} size="lg" />
            <div className="mt-4 text-sm text-muted-foreground text-center">
              <p>You're on a 7-day streak! Keep up the good work!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
