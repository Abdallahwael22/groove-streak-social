
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { LogIn } from 'lucide-react';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simple validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      setIsLoading(false);
      return;
    }
    
    // For demo purposes, we're accepting any non-empty credentials
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Logged in",
        description: "Welcome to Habit Builder!",
      });
      
      // Save login info to localStorage to simulate persistence
      localStorage.setItem('habitbuilder_user', JSON.stringify({ 
        name: username,
        loggedIn: true,
        avatarUrl: '',
        streak: 7,
      }));
      
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 mb-4 rounded-full bg-habit-primary flex items-center justify-center text-white font-bold text-2xl">
            HB
          </div>
          <h1 className="text-4xl font-bold text-habit-primary mb-2">HabitBuilder</h1>
          <p className="text-lg text-muted-foreground text-center">
            Build better habits, track your progress, and join a community.
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="bg-card p-6 rounded-lg shadow-sm border">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full gap-2 mt-2"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              <span>{isLoading ? "Logging in..." : "Log In"}</span>
            </Button>
          </div>
          
          <div className="text-center mt-4 text-sm text-muted-foreground">
            <p>Demo App - Any credentials will work</p>
          </div>
        </form>
      </div>
      
      <div className="mt-16 text-xs text-muted-foreground">
        <p>© 2025 HabitBuilder - Build better habits</p>
      </div>
    </div>
  );
};

export default Index;
