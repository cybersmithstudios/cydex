
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, Building, Check, Shield, Plus } from 'lucide-react';

export function Partnerships() {
  // Mock partners data
  const partners = [
    { id: 1, name: 'EcoDelivery Inc.', type: 'Vendor', status: 'Active', joined: '2023-01-15', carbonCredits: 5430 },
    { id: 2, name: 'Green Transport Co.', type: 'Logistics', status: 'Active', joined: '2023-02-20', carbonCredits: 3250 },
    { id: 3, name: 'Carbon Offset Foundation', type: 'Non-Profit', status: 'Active', joined: '2023-03-10', carbonCredits: 8760 },
    { id: 4, name: 'Sustainable Packaging Ltd.', type: 'Supplier', status: 'Pending', joined: '2023-05-05', carbonCredits: 0 },
    { id: 5, name: 'Clean Energy Initiative', type: 'Non-Profit', status: 'Active', joined: '2023-04-12', carbonCredits: 2100 },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Partners & Collaborations</CardTitle>
            <CardDescription>
              Manage partnerships with eco-friendly businesses and organizations
            </CardDescription>
          </div>
          <Button className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add Partner
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
              <div className="bg-primary/20 p-3 rounded-full mb-2">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">24</h3>
              <p className="text-sm text-muted-foreground">Active Business Partners</p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
              <div className="bg-primary/20 p-3 rounded-full mb-2">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">8</h3>
              <p className="text-sm text-muted-foreground">Non-Profit Collaborations</p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
              <div className="bg-primary/20 p-3 rounded-full mb-2">
                <Handshake className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">3</h3>
              <p className="text-sm text-muted-foreground">Pending Partnerships</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2 font-medium">Partner</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Joined</th>
                  <th className="pb-2 font-medium">Carbon Credits</th>
                  <th className="pb-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => (
                  <tr key={partner.id} className="border-b">
                    <td className="py-4 font-medium">{partner.name}</td>
                    <td className="py-4">{partner.type}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        partner.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {partner.status}
                      </span>
                    </td>
                    <td className="py-4">{partner.joined}</td>
                    <td className="py-4">{partner.carbonCredits.toLocaleString()}</td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
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
