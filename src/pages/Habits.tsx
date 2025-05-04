
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HabitsList from '@/components/habits/HabitsList';
import { useNavigate } from 'react-router-dom';

const Habits = () => {
  const navigate = useNavigate();
  
  const handleAddHabit = () => {
    navigate('/habits/new');
  };
  
  const handleEditHabit = (id: string) => {
    navigate(`/habits/edit/${id}`);
  };
  
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <HabitsList 
          onAddHabit={handleAddHabit} 
          onEditHabit={handleEditHabit}
        />
      </div>
    </MainLayout>
  );
};

export default Habits;
