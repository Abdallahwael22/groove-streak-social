
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ChallengesGrid from '@/components/community/ChallengesGrid';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();
  
  const handleCreateChallenge = () => {
    navigate('/community/new-challenge');
  };
  
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <ChallengesGrid
          onCreateChallenge={handleCreateChallenge}
        />
      </div>
    </MainLayout>
  );
};

export default Community;
