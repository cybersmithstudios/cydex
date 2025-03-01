
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, UserPlus, Edit, Trash2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function UserManagement() {
  const [userRole, setUserRole] = useState<string>('all');
  
  // Mock user data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', status: 'Active', lastActive: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'rider', status: 'Active', lastActive: '5 mins ago' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'vendor', status: 'Inactive', lastActive: '3 days ago' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'customer', status: 'Active', lastActive: '1 day ago' },
    { id: 5, name: 'Dave Brown', email: 'dave@example.com', role: 'admin', status: 'Active', lastActive: 'Just now' },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View and manage all platform users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-1.5">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button className="gap-1.5">
                <UserPlus className="h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <RadioGroup
              defaultValue="all"
              className="flex flex-wrap gap-6"
              value={userRole}
              onValueChange={setUserRole}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All Users</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="customer" id="customer" />
                <Label htmlFor="customer">Customers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rider" id="rider" />
                <Label htmlFor="rider">Riders</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vendor" id="vendor" />
                <Label htmlFor="vendor">Vendors</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin">Admins</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Email</th>
                  <th className="pb-2 font-medium">Role</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Last Active</th>
                  <th className="pb-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter(user => userRole === 'all' || user.role === userRole)
                  .map(user => (
                    <tr key={user.id} className="border-b">
                      <td className="py-4">{user.name}</td>
                      <td className="py-4">{user.email}</td>
                      <td className="py-4 capitalize">{user.role}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4">{user.lastActive}</td>
                      <td className="py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
