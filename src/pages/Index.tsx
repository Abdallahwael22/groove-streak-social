
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { LogIn } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    // Here you would normally handle authentication
    // For now, we'll simulate a login by navigating to the dashboard
    toast({
      title: "Logged in",
      description: "Welcome to Habit Builder!",
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-habit-primary flex items-center justify-center text-white font-bold text-2xl">
          HB
        </div>
        <h1 className="text-4xl font-bold text-habit-primary mb-4">HabitBuilder</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Build better habits, track your progress, and join a community of like-minded people.
        </p>
        <Button 
          onClick={handleLogin} 
          className="gap-2 text-lg py-6 px-8"
          size="lg"
        >
          <LogIn className="w-5 h-5" />
          <span>Log In</span>
        </Button>
      </div>
      
      <div className="mt-16 text-sm text-muted-foreground">
        <p>Demo App - No real authentication implemented</p>
      </div>
    </div>
  );
};

export default Index;
