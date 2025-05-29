
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const SecuritySettings = () => {
  return (
    <div className="space-y-4">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password to keep your account secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Change Password</Button>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span>Enable Two-Factor Authentication</span>
            <Switch id="2fa" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
