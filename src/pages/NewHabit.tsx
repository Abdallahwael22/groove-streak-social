
import MainLayout from '@/components/layout/MainLayout';
import HabitForm from '@/components/habits/HabitForm';

const NewHabit = () => {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <HabitForm />
      </div>
    </MainLayout>
  );
};

export default NewHabit;
