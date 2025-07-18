
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Save } from 'lucide-react';

interface PersonalInfoFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  editing: boolean;
  onInputChange: (field: string, value: string) => void;
  onSave: () => Promise<void>;
}

const PersonalInfoForm = ({ formData, editing, onInputChange, onSave }: PersonalInfoFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <User className="h-5 w-5 mr-2" />
          Personal Information
        </CardTitle>
        <CardDescription>Update your basic profile information</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              disabled={!editing}
              className={!editing ? "bg-gray-50" : ""} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              disabled={!editing}
              className={!editing ? "bg-gray-50" : ""} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              value={formData.phone}
              onChange={(e) => onInputChange('phone', e.target.value)}
              disabled={!editing}
              className={!editing ? "bg-gray-50" : ""} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              value={formData.address}
              onChange={(e) => onInputChange('address', e.target.value)}
              disabled={!editing}
              className={!editing ? "bg-gray-50" : ""} 
            />
          </div>
        </div>
        
        {editing && (
          <div className="mt-6 flex justify-end">
            <Button onClick={onSave} className="bg-primary hover:bg-primary-hover text-black">
              <Save className="h-4 w-4 mr-2" />
              Save Personal Info
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
