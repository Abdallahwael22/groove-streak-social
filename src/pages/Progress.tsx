
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'May 1', completion: 70 },
  { date: 'May 2', completion: 80 },
  { date: 'May 3', completion: 90 },
  { date: 'May 4', completion: 85 },
  { date: 'May 5', completion: 95 },
  { date: 'May 6', completion: 100 },
  { date: 'May 7', completion: 90 },
];

const Progress = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Your Progress</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Habit Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="completion" 
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
            <CardHeader>
              <CardTitle>Weekly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { day: 'Monday', completion: '4/5 habits', status: 'good' },
                  { day: 'Tuesday', completion: '5/5 habits', status: 'excellent' },
                  { day: 'Wednesday', completion: '5/5 habits', status: 'excellent' },
                  { day: 'Thursday', completion: '4/5 habits', status: 'good' },
                  { day: 'Friday', completion: '5/5 habits', status: 'excellent' },
                  { day: 'Saturday', completion: '3/5 habits', status: 'average' },
                  { day: 'Sunday', completion: '4/5 habits', status: 'good' },
                ].map((day) => (
                  <div key={day.day} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{day.day}</h3>
                      <p className="text-sm text-muted-foreground">{day.completion}</p>
                    </div>
                    <div className={`h-2.5 w-2.5 rounded-full ${
                      day.status === 'excellent' ? 'bg-green-500' : 
                      day.status === 'good' ? 'bg-blue-500' : 
                      'bg-yellow-500'
                    }`}></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Progress;
