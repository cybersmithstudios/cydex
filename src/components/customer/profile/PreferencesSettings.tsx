
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const PreferencesSettings = () => {
  return (
    <div className="space-y-4">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage your notification settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <Switch id="push-notifications" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Change Theme</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesSettings;
