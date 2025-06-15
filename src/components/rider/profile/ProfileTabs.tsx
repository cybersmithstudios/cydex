
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoTab from './tabs/PersonalInfoTab';
import BankingTab from './tabs/BankingTab';
import ReviewsTab from './tabs/ReviewsTab';
import AchievementsTab from './tabs/AchievementsTab';
import SecuritySettings from './SecuritySettings';

interface ProfileTabsProps {
  editing: boolean;
  profile: any;
  recentReviews: any[];
  achievements: any[];
  onAddBankDetails?: (bankDetails: any) => Promise<boolean>;
  onSaveProfile?: (updatedData?: any) => Promise<void>;
}

const ProfileTabs = ({ 
  editing, 
  profile, 
  recentReviews, 
  achievements, 
  onAddBankDetails,
  onSaveProfile 
}: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-3 sm:mb-4 md:mb-6 w-full">
        <TabsTrigger value="personal" className="text-xs sm:text-sm">Personal</TabsTrigger>
        <TabsTrigger value="bank" className="text-xs sm:text-sm">Banking</TabsTrigger>
        <TabsTrigger value="security" className="text-xs sm:text-sm">Security</TabsTrigger>
        <TabsTrigger value="reviews" className="text-xs sm:text-sm">Reviews</TabsTrigger>
        <TabsTrigger value="achievements" className="text-xs sm:text-sm">Achievements</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal" className="mt-0">
        <PersonalInfoTab 
          editing={editing} 
          profile={profile} 
          onSaveProfile={onSaveProfile}
        />
      </TabsContent>
      
      <TabsContent value="bank" className="mt-0">
        <BankingTab editing={editing} profile={profile} onAddBankDetails={onAddBankDetails} />
      </TabsContent>
      
      <TabsContent value="security" className="mt-0">
        <SecuritySettings />
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
