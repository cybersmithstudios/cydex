
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
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-3 sm:mb-4 md:mb-6 w-full">
        <TabsTrigger value="personal" className="text-xs sm:text-sm">Personal</TabsTrigger>
        <TabsTrigger value="bank" className="text-xs sm:text-sm">Banking</TabsTrigger>
        <TabsTrigger value="reviews" className="text-xs sm:text-sm">Reviews</TabsTrigger>
        <TabsTrigger value="achievements" className="text-xs sm:text-sm">Achievements</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal" className="mt-0">
        <PersonalInfoTab editing={editing} profile={profile} />
      </TabsContent>
      
      <TabsContent value="bank" className="mt-0">
        <BankingTab editing={editing} profile={profile} />
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-0">
        <ReviewsTab profile={profile} recentReviews={recentReviews} />
      </TabsContent>
      
      <TabsContent value="achievements" className="mt-0">
        <AchievementsTab profile={profile} achievements={achievements} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
