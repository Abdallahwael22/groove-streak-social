
import { Link, useNavigate } from 'react-router-dom';
import { Home, LineChart, Users, Calendar, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

const Sidebar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Calendar, label: 'Habits', href: '/habits' },
    { icon: LineChart, label: 'Progress', href: '/progress' },
    { icon: Users, label: 'Community', href: '/community' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];
  
  const isActive = (path: string) => path === location.pathname;

  const handleLogout = () => {
    // Here you would actually handle the logout logic with authentication
    // For now, we'll simulate a logout by navigating to the landing page
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-sidebar p-4 border-r">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 rounded-full bg-habit-primary flex items-center justify-center text-white font-bold">
          HB
        </div>
        <span className="text-xl font-bold text-habit-primary">HabitBuilder</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              isActive(item.href) 
                ? "bg-habit-primary text-white" 
                : "hover:bg-habit-light hover:text-habit-primary"
            )}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="border-t mt-6 pt-4">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
