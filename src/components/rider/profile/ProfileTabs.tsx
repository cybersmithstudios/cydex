
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoTab from './tabs/PersonalInfoTab';
import BankingTab from './tabs/BankingTab';
import ReviewsTab from './tabs/ReviewsTab';
import AchievementsTab from './tabs/AchievementsTab';

interface ProfileTabsProps {
  editing: boolean;
  profile: any;
  recentReviews: any[];
  achievements: any[];
}

const ProfileTabs = ({ editing, profile, recentReviews, achievements }: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="personal">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="bank">Banking</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="achievements">Achievements</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal">
        <PersonalInfoTab editing={editing} profile={profile} />
      </TabsContent>
      
      <TabsContent value="bank">
        <BankingTab editing={editing} profile={profile} />
      </TabsContent>
      
      <TabsContent value="reviews">
        <ReviewsTab profile={profile} recentReviews={recentReviews} />
      </TabsContent>
      
      <TabsContent value="achievements">
        <AchievementsTab profile={profile} achievements={achievements} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
