
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    bio: 'Building healthy habits one day at a time.',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    dailyReminders: true,
    weeklySummary: true,
    communityUpdates: false
  });
  
  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('habitbuilder_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUserData(prev => ({
          ...prev,
          name: parsedUser.name || prev.name,
          email: parsedUser.email || prev.email,
          bio: parsedUser.bio || prev.bio,
        }));
        
        // Load notification settings if available
        if (parsedUser.notifications) {
          setNotificationSettings(parsedUser.notifications);
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);
  
  const handleProfileUpdate = () => {
    try {
      // Get existing user data
      const savedUser = localStorage.getItem('habitbuilder_user');
      const userObject = savedUser ? JSON.parse(savedUser) : {};
      
      // Update with new data
      const updatedUser = {
        ...userObject,
        ...userData
      };
      
      // Save back to localStorage
      localStorage.setItem('habitbuilder_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile Updated",
        description: "Your profile settings have been saved.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was a problem saving your settings.",
        variant: "destructive",
      });
    }
  };
  
  const handleNotificationUpdate = () => {
    try {
      // Get existing user data
      const savedUser = localStorage.getItem('habitbuilder_user');
      const userObject = savedUser ? JSON.parse(savedUser) : {};
      
      // Update with new notification settings
      const updatedUser = {
        ...userObject,
        notifications: notificationSettings
      };
      
      // Save back to localStorage
      localStorage.setItem('habitbuilder_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Notification Settings Updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was a problem saving your settings.",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">About</Label>
              <Input 
                id="bio" 
                value={userData.bio}
                onChange={(e) => setUserData({...userData, bio: e.target.value})}
              />
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleProfileUpdate}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Reminders</p>
                <p className="text-sm text-muted-foreground">Get reminded of your habits each day</p>
              </div>
              <Switch 
                checked={notificationSettings.dailyReminders}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, dailyReminders: checked})
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Summary</p>
                <p className="text-sm text-muted-foreground">Receive a summary of your week</p>
              </div>
              <Switch 
                checked={notificationSettings.weeklySummary}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, weeklySummary: checked})
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Community Updates</p>
                <p className="text-sm text-muted-foreground">Updates about challenges and community activity</p>
              </div>
              <Switch 
                checked={notificationSettings.communityUpdates}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, communityUpdates: checked})
                }
              />
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleNotificationUpdate}>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>Manage your password and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" className="mr-2" onClick={() => {
                toast({
                  title: "Password Reset",
                  description: "Password reset instructions sent to your email.",
                });
              }}>Reset Password</Button>
              <Button onClick={() => {
                toast({
                  title: "Password Updated",
                  description: "Your password has been updated successfully.",
                });
              }}>Update Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
