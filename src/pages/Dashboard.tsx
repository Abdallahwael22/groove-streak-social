
import MainLayout from '@/components/layout/MainLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import SuggestedHabits from '@/components/dashboard/SuggestedHabits';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back, Alex!</h1>
            <p className="text-muted-foreground mt-1">Track your progress and keep building good habits.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link to="/habits">View Habits</Link>
            </Button>
            <Button asChild>
              <Link to="/habits/new">Add New Habit</Link>
            </Button>
          </div>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Active Challenges</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="group">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Reading Challenge</h3>
                        <p className="text-xs text-muted-foreground mt-1">17 days remaining</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">45%</span>
                        <p className="text-xs text-muted-foreground mt-1">Progress</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 h-2 w-full bg-gray-100 rounded-full">
                      <div className="h-2 rounded-full bg-habit-primary" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Water Intake Challenge</h3>
                        <p className="text-xs text-muted-foreground mt-1">10 days remaining</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">75%</span>
                        <p className="text-xs text-muted-foreground mt-1">Progress</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 h-2 w-full bg-gray-100 rounded-full">
                      <div className="h-2 rounded-full bg-habit-primary" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button asChild variant="link" className="text-habit-primary">
                      <Link to="/community">
                        View all challenges
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <SuggestedHabits />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
