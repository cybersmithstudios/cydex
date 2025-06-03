
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Plus, Edit, Trash2, Eye, Upload, Download, Search, Filter, Image, Video, File, Globe, Users, Calendar, Star } from 'lucide-react';
import { toast } from 'sonner';

export function ContentControl() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);

  // Mock content data
  const contentItems = [
    {
      id: 'CNT-001',
      title: 'Welcome to Cydex Logistics',
      type: 'page',
      status: 'published',
      author: 'Admin User',
      createdAt: '2023-05-01',
      updatedAt: '2023-05-15',
      views: 1250,
      category: 'Landing Page',
      content: 'Welcome content for the main landing page...'
    },
    {
      id: 'CNT-002',
      title: 'How Eco-Delivery Works',
      type: 'article',
      status: 'published',
      author: 'Content Team',
      createdAt: '2023-04-20',
      updatedAt: '2023-05-10',
      views: 890,
      category: 'Educational',
      content: 'Step-by-step guide on how our eco-delivery system works...'
    },
    {
      id: 'CNT-003',
      title: 'Carbon Credits Explainer Video',
      type: 'media',
      status: 'draft',
      author: 'Marketing Team',
      createdAt: '2023-05-18',
      updatedAt: '2023-05-18',
      views: 0,
      category: 'Video Content',
      content: 'Educational video about carbon credits and environmental impact...'
    },
    {
      id: 'CNT-004',
      title: 'Partnership Opportunities',
      type: 'page',
      status: 'published',
      author: 'Business Development',
      createdAt: '2023-04-15',
      updatedAt: '2023-05-08',
      views: 650,
      category: 'Business',
      content: 'Information about partnership opportunities with Cydex...'
    },
    {
      id: 'CNT-005',
      title: 'FAQ Section Update',
      type: 'page',
      status: 'review',
      author: 'Support Team',
      createdAt: '2023-05-20',
      updatedAt: '2023-05-22',
      views: 0,
      category: 'Support',
      content: 'Updated frequently asked questions and answers...'
    }
  ];

  // Mock media library
  const mediaItems = [
    {
      id: 'MED-001',
      name: 'hero-image.jpg',
      type: 'image',
      size: '2.4 MB',
      uploadedAt: '2023-05-01',
      uploadedBy: 'Admin User',
      url: '/placeholder-hero.jpg',
      dimensions: '1920x1080'
    },
    {
      id: 'MED-002',
      name: 'delivery-truck.mp4',
      type: 'video',
      size: '15.2 MB',
      uploadedAt: '2023-04-28',
      uploadedBy: 'Marketing Team',
      url: '/delivery-video.mp4',
      duration: '2:30'
    },
    {
      id: 'MED-003',
      name: 'carbon-credits-guide.pdf',
      type: 'document',
      size: '1.8 MB',
      uploadedAt: '2023-05-10',
      uploadedBy: 'Content Team',
      url: '/carbon-guide.pdf',
      pages: 12
    }
  ];

  // Mock analytics data
  const analytics = [
    { page: 'Home Page', views: 15420, uniqueVisitors: 12350, bounceRate: '32%', avgTime: '2:45' },
    { page: 'How It Works', views: 8960, uniqueVisitors: 7240, bounceRate: '28%', avgTime: '3:12' },
    { page: 'Partnership', views: 5680, uniqueVisitors: 4890, bounceRate: '45%', avgTime: '1:58' },
    { page: 'FAQ', views: 4320, uniqueVisitors: 3850, bounceRate: '38%', avgTime: '2:20' },
    { page: 'Contact', views: 3450, uniqueVisitors: 3120, bounceRate: '42%', avgTime: '1:35' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      case 'review':
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case 'archived':
        return <Badge className="bg-red-100 text-red-800">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page':
        return <Globe className="w-4 h-4" />;
      case 'article':
        return <FileText className="w-4 h-4" />;
      case 'media':
        return <Video className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'document':
        return <File className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateContent = () => {
    toast.success('Content created successfully!');
    setIsCreateDialogOpen(false);
  };

  const handleUpdateContent = () => {
    toast.success('Content updated successfully!');
    setIsEditDialogOpen(false);
  };

  const handleDeleteContent = (contentId: string) => {
    toast.success(`Content ${contentId} deleted successfully!`);
  };

  const handlePublishContent = (contentId: string) => {
    toast.success(`Content ${contentId} published successfully!`);
  };

  const stats = [
    { title: "Total Content", value: contentItems.length.toString(), icon: FileText, color: "text-blue-600" },
    { title: "Published", value: contentItems.filter(c => c.status === 'published').length.toString(), icon: Globe, color: "text-green-600" },
    { title: "Draft", value: contentItems.filter(c => c.status === 'draft').length.toString(), icon: Edit, color: "text-yellow-600" },
    { title: "Total Views", value: contentItems.reduce((sum, c) => sum + c.views, 0).toLocaleString(), icon: Eye, color: "text-purple-600" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-gray-600">Manage website content, media, and analytics</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Content</DialogTitle>
              <DialogDescription>
                Add new content to your website
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="content-title">Title</Label>
                  <Input id="content-title" placeholder="Content title" />
                </div>
                <div>
                  <Label htmlFor="content-type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">Page</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="content-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landing">Landing Page</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content-status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="content-body">Content</Label>
                <Textarea 
                  id="content-body" 
                  placeholder="Write your content here..." 
                  className="min-h-32"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateContent}>
                Create Content
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search content..."
            className="w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">Under Review</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="page">Page</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="media">Media</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Items</CardTitle>
              <CardDescription>
                Manage all your website content and pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContent.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(item.type)}
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{item.type}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.author}</TableCell>
                      <TableCell>{item.views.toLocaleString()}</TableCell>
                      <TableCell>{item.updatedAt}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedContent(item)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Content</DialogTitle>
                                <DialogDescription>
                                  Update content information
                                </DialogDescription>
                              </DialogHeader>
                              {selectedContent && (
                                <div className="grid gap-4 py-4">
                                  <div>
                                    <Label htmlFor="edit-title">Title</Label>
                                    <Input id="edit-title" defaultValue={selectedContent.title} />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="edit-category">Category</Label>
                                      <Input id="edit-category" defaultValue={selectedContent.category} />
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-status">Status</Label>
                                      <Select defaultValue={selectedContent.status}>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="draft">Draft</SelectItem>
                                          <SelectItem value="review">Under Review</SelectItem>
                                          <SelectItem value="published">Published</SelectItem>
                                          <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-content">Content</Label>
                                    <Textarea 
                                      id="edit-content" 
                                      defaultValue={selectedContent.content}
                                      className="min-h-32"
                                    />
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleUpdateContent}>
                                  Update Content
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          {item.status === 'draft' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handlePublishContent(item.id)}
                            >
                              <Globe className="w-4 h-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteContent(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>
                Manage images, videos, and documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {mediaItems.map((media) => (
                  <div key={media.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      {getMediaIcon(media.type)}
                      <span className="font-medium truncate">{media.name}</span>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div>Size: {media.size}</div>
                      <div>Uploaded: {media.uploadedAt}</div>
                      <div>By: {media.uploadedBy}</div>
                      {media.dimensions && <div>Dimensions: {media.dimensions}</div>}
                      {media.duration && <div>Duration: {media.duration}</div>}
                      {media.pages && <div>Pages: {media.pages}</div>}
                    </div>
                    <div className="flex gap-1 mt-3">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Analytics</CardTitle>
              <CardDescription>
                Track page views and user engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Unique Visitors</TableHead>
                    <TableHead>Bounce Rate</TableHead>
                    <TableHead>Avg. Time</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.map((page, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{page.page}</TableCell>
                      <TableCell>{page.views.toLocaleString()}</TableCell>
                      <TableCell>{page.uniqueVisitors.toLocaleString()}</TableCell>
                      <TableCell>{page.bounceRate}</TableCell>
                      <TableCell>{page.avgTime}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">
                            {index < 2 ? 'Excellent' : index < 4 ? 'Good' : 'Average'}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Configure search engine optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input id="meta-title" placeholder="Site title for search engines" />
                </div>
                <div>
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea id="meta-description" placeholder="Site description for search engines" />
                </div>
                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input id="keywords" placeholder="eco-delivery, logistics, carbon credits" />
                </div>
                <Button>Update SEO Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Search Performance</CardTitle>
                <CardDescription>
                  Monitor search engine rankings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>eco delivery service</span>
                    <Badge className="bg-green-100 text-green-800">Rank #3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>carbon credit logistics</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Rank #7</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>sustainable shipping</span>
                    <Badge className="bg-green-100 text-green-800">Rank #2</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>green delivery nigeria</span>
                    <Badge className="bg-green-100 text-green-800">Rank #1</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
