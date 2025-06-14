
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Building, Info, Lock, CreditCard } from 'lucide-react';

interface BankingTabProps {
  editing: boolean;
  profile: any;
}

const BankingTab = ({ editing, profile }: BankingTabProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Banking Details
          </CardTitle>
          <CardDescription>Add your payment information to receive earnings</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {/* Empty state for banking details */}
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No banking details added</h3>
            <p className="text-gray-500 mb-4">Add your bank account information to receive payments for deliveries</p>
            <Button className="bg-primary hover:bg-primary-hover text-black">
              Add Banking Details
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex">
              <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">Secure Banking Information</p>
                <p className="text-xs text-blue-600 mt-1">
                  Your banking information will be encrypted and secure. We never share your financial details with vendors or customers.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            Account Security
          </CardTitle>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-xs text-gray-500">Update your account password</p>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Enhance your account security</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BankingTab;
