
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
import { Handshake, Building, Check, Shield, Plus, Search, Filter, Download, Eye, CheckCircle, XCircle, Mail, Phone, MapPin, Calendar, Users, TrendingUp, Award } from 'lucide-react';
import { toast } from 'sonner';

export function Partnerships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  // Enhanced partners data
  const partners = [
    { 
      id: 1, 
      name: 'EcoDelivery Inc.', 
      type: 'Vendor', 
      status: 'Active', 
      joined: '2023-01-15', 
      carbonCredits: 5430,
      contact: {
        email: 'contact@ecodelivery.com',
        phone: '+234-801-234-5678',
        address: '123 Green Street, Lagos, Nigeria'
      },
      representative: 'Sarah Johnson',
      services: ['Eco-friendly packaging', 'Green delivery solutions', 'Carbon offset programs'],
      metrics: {
        ordersCompleted: 1250,
        carbonSaved: '2.5 tons',
        satisfaction: 94
      },
      contract: {
        type: 'Standard Partnership',
        startDate: '2023-01-15',
        endDate: '2024-01-15',
        revenue: '₦2,450,000'
      }
    },
    { 
      id: 2, 
      name: 'Green Transport Co.', 
      type: 'Logistics', 
      status: 'Active', 
      joined: '2023-02-20', 
      carbonCredits: 3250,
      contact: {
        email: 'info@greentransport.ng',
        phone: '+234-802-345-6789',
        address: '456 Transport Avenue, Abuja, Nigeria'
      },
      representative: 'Michael Adebayo',
      services: ['Electric vehicle fleet', 'Route optimization', 'Emission tracking'],
      metrics: {
        ordersCompleted: 890,
        carbonSaved: '1.8 tons',
        satisfaction: 91
      },
      contract: {
        type: 'Logistics Partnership',
        startDate: '2023-02-20',
        endDate: '2024-02-20',
        revenue: '₦1,850,000'
      }
    },
    { 
      id: 3, 
      name: 'Carbon Offset Foundation', 
      type: 'Non-Profit', 
      status: 'Active', 
      joined: '2023-03-10', 
      carbonCredits: 8760,
      contact: {
        email: 'partnerships@carbonoffset.org',
        phone: '+234-803-456-7890',
        address: '789 Environmental Way, Port Harcourt, Nigeria'
      },
      representative: 'Dr. Amina Hassan',
      services: ['Carbon credit verification', 'Environmental consulting', 'Sustainability training'],
      metrics: {
        projectsCompleted: 45,
        carbonSaved: '8.2 tons',
        satisfaction: 98
      },
      contract: {
        type: 'Strategic Alliance',
        startDate: '2023-03-10',
        endDate: '2025-03-10',
        revenue: 'Non-monetary'
      }
    },
    { 
      id: 4, 
      name: 'Sustainable Packaging Ltd.', 
      type: 'Supplier', 
      status: 'Pending', 
      joined: '2023-05-05', 
      carbonCredits: 0,
      contact: {
        email: 'sales@sustainablepack.com',
        phone: '+234-804-567-8901',
        address: '321 Industrial Estate, Kano, Nigeria'
      },
      representative: 'Ibrahim Musa',
      services: ['Biodegradable packaging', 'Recycled materials', 'Custom eco-solutions'],
      metrics: {
        ordersCompleted: 0,
        carbonSaved: '0 tons',
        satisfaction: 0
      },
      contract: {
        type: 'Supply Agreement',
        startDate: '2023-05-05',
        endDate: '2024-05-05',
        revenue: 'Pending'
      }
    },
    { 
      id: 5, 
      name: 'Clean Energy Initiative', 
      type: 'Non-Profit', 
      status: 'Active', 
      joined: '2023-04-12', 
      carbonCredits: 2100,
      contact: {
        email: 'info@cleanenergy.ng',
        phone: '+234-805-678-9012',
        address: '654 Solar Avenue, Kaduna, Nigeria'
      },
      representative: 'Fatima Abdullahi',
      services: ['Solar panel installation', 'Energy audits', 'Green technology training'],
      metrics: {
        projectsCompleted: 28,
        carbonSaved: '4.1 tons',
        satisfaction: 96
      },
      contract: {
        type: 'Community Partnership',
        startDate: '2023-04-12',
        endDate: '2024-04-12',
        revenue: 'Grant-based'
      }
    }
  ];

  // Partnership applications
  const applications = [
    {
      id: 'APP-001',
      companyName: 'GreenTech Solutions',
      type: 'Technology',
      status: 'pending',
      appliedDate: '2023-06-01',
      representative: 'John Smith',
      email: 'john@greentech.com',
      phone: '+234-806-789-0123',
      services: ['IoT monitoring', 'Smart energy systems', 'Data analytics'],
      proposal: 'Offering smart monitoring solutions for carbon footprint tracking and energy optimization.'
    },
    {
      id: 'APP-002',
      companyName: 'Eco Farmers Cooperative',
      type: 'Supplier',
      status: 'under_review',
      appliedDate: '2023-05-28',
      representative: 'Mary Okafor',
      email: 'mary@ecofarmers.ng',
      phone: '+234-807-890-1234',
      services: ['Organic produce', 'Sustainable farming', 'Local sourcing'],
      proposal: 'Partnership to supply organic, locally-sourced produce with minimal carbon footprint.'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><XCircle className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-100 text-blue-800"><Eye className="w-3 h-3 mr-1" />Under Review</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Suspended</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'Vendor': 'bg-blue-100 text-blue-800',
      'Logistics': 'bg-purple-100 text-purple-800',
      'Non-Profit': 'bg-green-100 text-green-800',
      'Supplier': 'bg-orange-100 text-orange-800',
      'Technology': 'bg-gray-100 text-gray-800'
    };
    return <Badge className={colors[type] || 'bg-gray-100 text-gray-800'}>{type}</Badge>;
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.representative.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || partner.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === 'all' || partner.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreatePartnership = () => {
    toast.success('Partnership created successfully!');
    setIsCreateDialogOpen(false);
  };

  const handleApproveApplication = (applicationId: string) => {
    toast.success(`Application ${applicationId} has been approved`);
  };

  const handleRejectApplication = (applicationId: string) => {
    toast.error(`Application ${applicationId} has been rejected`);
  };

  const stats = [
    { title: "Total Partners", value: partners.length.toString(), icon: Building, color: "text-blue-600" },
    { title: "Active Partnerships", value: partners.filter(p => p.status === 'Active').length.toString(), icon: CheckCircle, color: "text-green-600" },
    { title: "Pending Applications", value: applications.filter(a => a.status === 'pending').length.toString(), icon: XCircle, color: "text-yellow-600" },
    { title: "Total Carbon Credits", value: partners.reduce((sum, p) => sum + p.carbonCredits, 0).toLocaleString(), icon: Award, color: "text-purple-600" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Partnership Management</h1>
          <p className="text-gray-600">Manage partnerships with eco-friendly businesses and organizations</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Partnership</DialogTitle>
              <DialogDescription>
                Add a new partner to the platform
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="partner-name">Partner Name</Label>
                  <Input id="partner-name" placeholder="Company/Organization name" />
                </div>
                <div>
                  <Label htmlFor="partner-type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                      <SelectItem value="supplier">Supplier</SelectItem>
                      <SelectItem value="non-profit">Non-Profit</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="representative">Representative</Label>
                  <Input id="representative" placeholder="Contact person name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contact@partner.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+234-xxx-xxx-xxxx" />
                </div>
                <div>
                  <Label htmlFor="contract-type">Contract Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select contract type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Partnership</SelectItem>
                      <SelectItem value="logistics">Logistics Partnership</SelectItem>
                      <SelectItem value="strategic">Strategic Alliance</SelectItem>
                      <SelectItem value="supply">Supply Agreement</SelectItem>
                      <SelectItem value="community">Community Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Full business address" />
              </div>
              <div>
                <Label htmlFor="services">Services</Label>
                <Textarea id="services" placeholder="Describe the services they provide..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePartnership}>
                Create Partnership
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
            placeholder="Search partners..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
              <SelectItem value="logistics">Logistics</SelectItem>
              <SelectItem value="supplier">Supplier</SelectItem>
              <SelectItem value="non-profit">Non-Profit</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="partners" className="space-y-4">
        <TabsList>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="agreements">Agreements</TabsTrigger>
        </TabsList>

        <TabsContent value="partners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Partnerships</CardTitle>
              <CardDescription>
                Manage your business partnerships and collaborations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partner</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Carbon Credits</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPartners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{partner.name}</div>
                          <div className="text-sm text-gray-500">{partner.representative}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(partner.type)}</TableCell>
                      <TableCell>{getStatusBadge(partner.status)}</TableCell>
                      <TableCell>{partner.joined}</TableCell>
                      <TableCell className="font-semibold">{partner.carbonCredits.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{partner.metrics.satisfaction}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedPartner(partner)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{selectedPartner?.name} - Partnership Details</DialogTitle>
                                <DialogDescription>
                                  Complete partnership information and metrics
                                </DialogDescription>
                              </DialogHeader>
                              {selectedPartner && (
                                <div className="grid gap-6">
                                  {/* Basic Info */}
                                  <div className="grid grid-cols-2 gap-6">
                                    <div>
                                      <h4 className="font-semibold mb-3">Contact Information</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                          <Mail className="w-4 h-4" />
                                          {selectedPartner.contact.email}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Phone className="w-4 h-4" />
                                          {selectedPartner.contact.phone}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <MapPin className="w-4 h-4" />
                                          {selectedPartner.contact.address}
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-3">Partnership Details</h4>
                                      <div className="space-y-2 text-sm">
                                        <div><strong>Type:</strong> {selectedPartner.type}</div>
                                        <div><strong>Status:</strong> {getStatusBadge(selectedPartner.status)}</div>
                                        <div><strong>Representative:</strong> {selectedPartner.representative}</div>
                                        <div><strong>Carbon Credits:</strong> {selectedPartner.carbonCredits.toLocaleString()}</div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Services */}
                                  <div>
                                    <h4 className="font-semibold mb-3">Services Provided</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedPartner.services.map((service, idx) => (
                                        <Badge key={idx} variant="secondary">{service}</Badge>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Metrics */}
                                  <div>
                                    <h4 className="font-semibold mb-3">Performance Metrics</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                      <div className="text-center p-3 bg-gray-50 rounded">
                                        <div className="text-2xl font-bold">{selectedPartner.metrics.ordersCompleted || selectedPartner.metrics.projectsCompleted}</div>
                                        <div className="text-sm text-gray-600">
                                          {selectedPartner.type === 'Non-Profit' ? 'Projects' : 'Orders'} Completed
                                        </div>
                                      </div>
                                      <div className="text-center p-3 bg-gray-50 rounded">
                                        <div className="text-2xl font-bold text-green-600">{selectedPartner.metrics.carbonSaved}</div>
                                        <div className="text-sm text-gray-600">Carbon Saved</div>
                                      </div>
                                      <div className="text-center p-3 bg-gray-50 rounded">
                                        <div className="text-2xl font-bold text-blue-600">{selectedPartner.metrics.satisfaction}%</div>
                                        <div className="text-sm text-gray-600">Satisfaction</div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Contract */}
                                  <div>
                                    <h4 className="font-semibold mb-3">Contract Information</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div><strong>Contract Type:</strong> {selectedPartner.contract.type}</div>
                                      <div><strong>Revenue:</strong> {selectedPartner.contract.revenue}</div>
                                      <div><strong>Start Date:</strong> {selectedPartner.contract.startDate}</div>
                                      <div><strong>End Date:</strong> {selectedPartner.contract.endDate}</div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            Edit
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

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Partnership Applications</CardTitle>
              <CardDescription>
                Review and manage new partnership applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-lg">{app.companyName}</h4>
                          <p className="text-sm text-gray-600">{app.proposal}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><strong>Type:</strong> {getTypeBadge(app.type)}</div>
                          <div><strong>Representative:</strong> {app.representative}</div>
                          <div><strong>Email:</strong> {app.email}</div>
                          <div><strong>Phone:</strong> {app.phone}</div>
                        </div>
                        <div>
                          <strong>Services:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {app.services.map((service, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">{service}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {getStatusBadge(app.status)}
                          <span className="text-sm text-gray-500">Applied: {app.appliedDate}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => handleRejectApplication(app.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleApproveApplication(app.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Partnership Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Vendor', 'Logistics', 'Non-Profit', 'Supplier'].map((type, idx) => {
                    const count = partners.filter(p => p.type === type).length;
                    const percentage = Math.round((count / partners.length) * 100);
                    return (
                      <div key={type}>
                        <div className="flex justify-between items-center">
                          <span>{type}</span>
                          <span className="font-semibold">{percentage}% ({count})</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-purple-600' : idx === 2 ? 'bg-green-600' : 'bg-orange-600'}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partnership Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Average Satisfaction</span>
                    <span className="font-semibold text-green-600">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Carbon Saved</span>
                    <span className="font-semibold">16.6 tons</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Partnerships</span>
                    <span className="font-semibold">{partners.filter(p => p.status === 'Active').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Revenue Generated</span>
                    <span className="font-semibold">₦4.3M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agreements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Partnership Agreements</CardTitle>
              <CardDescription>
                Manage contracts and legal agreements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partner</TableHead>
                    <TableHead>Agreement Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell className="font-medium">{partner.name}</TableCell>
                      <TableCell>{partner.contract.type}</TableCell>
                      <TableCell>{partner.contract.startDate}</TableCell>
                      <TableCell>{partner.contract.endDate}</TableCell>
                      <TableCell>{getStatusBadge(partner.status)}</TableCell>
                      <TableCell>{partner.contract.revenue}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download
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
      </Tabs>
    </div>
  );
}
