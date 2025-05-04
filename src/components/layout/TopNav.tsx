
import { Bell, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../user/UserAvatar';

const TopNav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
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
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-habit-secondary rounded-full"></span>
          </Button>
          <UserAvatar />
        </div>
      </div>
      
      {showMobileMenu && (
        <nav className="mt-4 space-y-2 md:hidden">
          <a href="/" className="block px-3 py-2 rounded-md hover:bg-habit-light">Dashboard</a>
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
