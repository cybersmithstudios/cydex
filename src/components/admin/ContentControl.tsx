
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Layout, FileText, ImageIcon, ExternalLink, Save } from 'lucide-react';

export function ContentControl() {
  // Mock content sections
  const contentSections = [
    { id: 1, name: 'Homepage Hero', lastUpdated: '2023-05-01', editor: 'Admin User' },
    { id: 2, name: 'About Us Page', lastUpdated: '2023-04-15', editor: 'Content Manager' },
    { id: 3, name: 'How It Works', lastUpdated: '2023-04-22', editor: 'Admin User' },
    { id: 4, name: 'FAQ Section', lastUpdated: '2023-05-03', editor: 'Support Team' },
    { id: 5, name: 'Promotions Banner', lastUpdated: '2023-05-08', editor: 'Marketing Team' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Website Content Management</CardTitle>
            <CardDescription>
              Update and manage site content, promotions, and marketing materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2 font-medium">Content Section</th>
                    <th className="pb-2 font-medium">Last Updated</th>
                    <th className="pb-2 font-medium">Updated By</th>
                    <th className="pb-2 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contentSections.map((section) => (
                    <tr key={section.id} className="border-b">
                      <td className="py-4 font-medium">{section.name}</td>
                      <td className="py-4">{section.lastUpdated}</td>
                      <td className="py-4">{section.editor}</td>
                      <td className="py-4 text-right">
                        <Button variant="ghost" size="sm">Preview</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common content management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Layout className="mr-2 h-4 w-4" />
                Manage Homepage
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Update FAQs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ImageIcon className="mr-2 h-4 w-4" />
                Media Library
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="mr-2 h-4 w-4" />
                Manage Promotions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Content Editor</CardTitle>
          <CardDescription>
            Edit selected content section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Section Title</label>
              <Input defaultValue="Homepage Hero" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Heading</label>
              <Input defaultValue="Sustainable Deliveries for a Greener Future" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <Textarea 
                rows={6} 
                defaultValue="Cydex is revolutionizing the delivery industry with eco-friendly transportation options that reward both customers and the environment. Join us in reducing carbon emissions while enjoying fast and reliable service." 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Button Text</label>
              <Input defaultValue="Get Started" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Call to Action Link</label>
              <Input defaultValue="/sign-up" />
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button variant="outline" className="mr-2">Cancel</Button>
              <Button className="gap-1.5">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
