
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Settings, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const UserAvatar = () => {
  // Get user data from localStorage or use a default
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'user@example.com',
    avatarUrl: '',
    streak: 0,
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('habitbuilder_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser({
          ...user,
          ...parsedUser,
          // Make sure we have a name to display
          name: parsedUser.name || 'Guest User'
        });
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear stored user data
    localStorage.removeItem('habitbuilder_user');
    
    // Notify the user
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    // Navigate to home
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border">
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback className="bg-habit-light text-habit-primary">
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2">
          <div className="text-xs font-medium mb-1">Current streak</div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full ${i < user.streak ? 'bg-habit-primary' : 'bg-gray-200'}`}
              />
            ))}
            <span className="ml-1 text-sm font-medium">{user.streak} days</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
