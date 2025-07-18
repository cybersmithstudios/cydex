
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Bell, Save } from 'lucide-react';

interface NotificationPreferences {
  app: boolean;
  email: boolean;
  sms: boolean;
  marketing: boolean;
}

interface NotificationPreferencesFormProps {
  preferences: NotificationPreferences;
  editing: boolean;
  onNotificationChange: (field: string, checked: boolean) => void;
  onSave: () => Promise<void>;
}

const NotificationPreferencesForm = ({ preferences, editing, onNotificationChange, onSave }: NotificationPreferencesFormProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Notification Preferences
        </CardTitle>
        <CardDescription>Choose how you want to receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">App Notifications</p>
              <p className="text-sm text-gray-500">Receive push notifications in the app</p>
            </div>
            <Switch 
              checked={preferences.app}
              onCheckedChange={(checked) => onNotificationChange('app', checked)}
              disabled={!editing}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive important updates via email</p>
            </div>
            <Switch 
              checked={preferences.email}
              onCheckedChange={(checked) => onNotificationChange('email', checked)}
              disabled={!editing}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-gray-500">Receive SMS for urgent delivery updates</p>
            </div>
            <Switch 
              checked={preferences.sms}
              onCheckedChange={(checked) => onNotificationChange('sms', checked)}
              disabled={!editing}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Communications</p>
              <p className="text-sm text-gray-500">Receive promotional offers and news</p>
            </div>
            <Switch 
              checked={preferences.marketing}
              onCheckedChange={(checked) => onNotificationChange('marketing', checked)}
              disabled={!editing}
            />
          </div>
        </div>

        {editing && (
          <div className="mt-6 flex justify-end">
            <Button onClick={onSave} className="bg-primary hover:bg-primary-hover text-black">
              <Save className="h-4 w-4 mr-2" />
              Save Notification Preferences
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationPreferencesForm;
