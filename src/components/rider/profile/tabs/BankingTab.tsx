
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Building, Info, Lock } from 'lucide-react';

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
          <CardDescription>Your payment and banking information</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input 
                  id="bankName" 
                  value={profile.bankDetails.bank} 
                  readOnly={!editing} 
                  className={editing ? "" : "bg-gray-50"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input 
                  id="accountNumber" 
                  value={profile.bankDetails.accountNumber} 
                  readOnly={!editing} 
                  className={editing ? "" : "bg-gray-50"}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name</Label>
                <Input 
                  id="accountName" 
                  value={profile.bankDetails.accountName} 
                  readOnly={!editing} 
                  className={editing ? "" : "bg-gray-50"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bvn">BVN</Label>
                <Input 
                  id="bvn" 
                  value={profile.bankDetails.bvn} 
                  readOnly={true} 
                  className="bg-gray-50"
                />
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <h3 className="font-medium">Payment Settings</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto Withdrawal</p>
                <p className="text-xs text-gray-500">Automatically withdraw earnings every week</p>
              </div>
              <Switch disabled={!editing} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Withdrawal Threshold</p>
                <p className="text-xs text-gray-500">Minimum amount for auto withdrawal</p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">₦</span>
                <Input 
                  type="number"
                  value="10000" 
                  readOnly={!editing} 
                  className={`w-24 ${editing ? "" : "bg-gray-50"}`}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex">
              <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">Secure Banking Information</p>
                <p className="text-xs text-blue-600 mt-1">
                  Your banking information is encrypted and secure. We never share your financial details with vendors or customers.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        {editing && (
          <CardFooter>
            <Button className="w-full bg-primary hover:bg-primary-hover text-black">
              Update Banking Details
            </Button>
          </CardFooter>
        )}
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
                <p className="text-xs text-gray-500">Last changed 3 months ago</p>
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
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Device Management</p>
                <p className="text-xs text-gray-500">2 devices currently logged in</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BankingTab;
