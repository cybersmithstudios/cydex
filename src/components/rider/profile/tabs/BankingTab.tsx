
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Building, Info, Lock, CreditCard, Plus, Trash2 } from 'lucide-react';

interface BankingTabProps {
  editing: boolean;
  profile: any;
  onAddBankDetails?: (bankDetails: any) => Promise<boolean>;
}

const BankingTab = ({ editing, profile, onAddBankDetails }: BankingTabProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [bankForm, setBankForm] = useState({
    bank_name: '',
    account_number: '',
    account_name: '',
    bvn: ''
  });

  const handleAddBank = async () => {
    if (!onAddBankDetails) return;
    
    const success = await onAddBankDetails(bankForm);
    if (success) {
      setBankForm({ bank_name: '', account_number: '', account_name: '', bvn: '' });
      setShowAddForm(false);
    }
  };

  const bankAccounts = profile?.bankDetails || [];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Banking Details
          </CardTitle>
          <CardDescription>Manage your payment information to receive earnings</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {bankAccounts.length === 0 && !showAddForm ? (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No banking details added</h3>
              <p className="text-gray-500 mb-4">Add your bank account information to receive payments for deliveries</p>
              <Button 
                className="bg-primary hover:bg-primary-hover text-black"
                onClick={() => setShowAddForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Banking Details
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {bankAccounts.map((bank: any, index: number) => (
                <div key={bank.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{bank.bank_name}</h4>
                    <div className="flex gap-2">
                      <Badge variant={bank.is_verified ? "default" : "secondary"}>
                        {bank.is_verified ? "Verified" : "Pending"}
                      </Badge>
                      {bank.is_default && <Badge>Default</Badge>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Account Number:</span>
                      <p className="font-medium">{bank.account_number}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Account Name:</span>
                      <p className="font-medium">{bank.account_name}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {!showAddForm && (
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(true)}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Account
                </Button>
              )}
            </div>
          )}

          {showAddForm && (
            <div className="border rounded-lg p-4 mt-4">
              <h4 className="font-medium mb-4">Add Bank Account</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input 
                      id="bank-name"
                      value={bankForm.bank_name}
                      onChange={(e) => setBankForm({ ...bankForm, bank_name: e.target.value })}
                      placeholder="e.g. First Bank"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input 
                      id="account-number"
                      value={bankForm.account_number}
                      onChange={(e) => setBankForm({ ...bankForm, account_number: e.target.value })}
                      placeholder="0123456789"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="account-name">Account Name</Label>
                  <Input 
                    id="account-name"
                    value={bankForm.account_name}
                    onChange={(e) => setBankForm({ ...bankForm, account_name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bvn">BVN (Optional)</Label>
                  <Input 
                    id="bvn"
                    value={bankForm.bvn}
                    onChange={(e) => setBankForm({ ...bankForm, bvn: e.target.value })}
                    placeholder="12345678901"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleAddBank} className="bg-primary hover:bg-primary-hover text-black">
                    Add Account
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
          
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
