
import { Bell, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../user/UserAvatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/sonner";

const TopNav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasNotifications, setHasNotifications] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Streak Reminder",
      message: "Don't forget to complete your habits today!",
      time: "Just now",
      read: false
    },
    {
      id: 2,
      title: "New Challenge",
      message: "A new challenge is available: '30 Days of Meditation'",
      time: "2 hours ago",
      read: false
    }
  ]);
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    setHasNotifications(false);
    
    toast("All notifications marked as read");
  };

  const dismissNotification = (id: number) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== id);
    setNotifications(updatedNotifications);
    
    if (!updatedNotifications.some(n => !n.read)) {
      setHasNotifications(false);
    }
  };

  return (
    <header className="border-b bg-background p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <span className="font-semibold text-habit-primary">HabitBuilder</span>
        </div>
        
        <form onSubmit={handleSearch} className="hidden md:flex max-w-sm items-center space-x-2 flex-1 mx-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search habits, challenges..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                {hasNotifications && (
                  <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-habit-secondary rounded-full"></span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between p-4 border-b">
                <h4 className="font-semibold">Notifications</h4>
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              </div>
              
              {notifications.length > 0 ? (
                <div className="max-h-80 overflow-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 border-b last:border-0 ${
                        notification.read ? 'bg-background' : 'bg-muted/30'
                      }`}
                    >
                      <div className="flex justify-between">
                        <div className="font-medium">{notification.title}</div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5"
                          onClick={() => dismissNotification(notification.id)}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {notification.time}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  <p>No notifications</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => {
                      setNotifications([{
                        id: Date.now(),
                        title: "Welcome Back",
                        message: "Here's a new notification for you to test the system!",
                        time: "Just now",
                        read: false
                      }]);
                      setHasNotifications(true);
                    }}
                  >
                    Test Notification
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
          <UserAvatar />
        </div>
      </div>
      
      {showMobileMenu && (
        <nav className="mt-4 space-y-2 md:hidden">
          <a href="/dashboard" className="block px-3 py-2 rounded-md hover:bg-habit-light">Dashboard</a>
          <a href="/habits" className="block px-3 py-2 rounded-md hover:bg-habit-light">Habits</a>
          <a href="/progress" className="block px-3 py-2 rounded-md hover:bg-habit-light">Progress</a>
          <a href="/community" className="block px-3 py-2 rounded-md hover:bg-habit-light">Community</a>
          <a href="/settings" className="block px-3 py-2 rounded-md hover:bg-habit-light">Settings</a>
          
          <form onSubmit={handleSearch} className="flex items-center space-x-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </nav>
      )}
    </header>
  );
};

export default TopNav;
