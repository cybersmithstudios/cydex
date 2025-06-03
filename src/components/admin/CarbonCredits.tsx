
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
import { Leaf, TrendingUp, Recycle, Trophy, FileText, Plus, Award, Users, Building, Search, Filter, Download, Eye, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export function CarbonCredits() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Mock stats
  const stats = [
    { title: "Total Carbon Saved", value: "12.6 Tons", change: "+24%", icon: Leaf, color: "text-green-600" },
    { title: "Active Participants", value: "1,845", change: "+12%", icon: Trophy, color: "text-blue-600" },
    { title: "Recycling Rate", value: "78%", change: "+8%", icon: Recycle, color: "text-purple-600" },
    { title: "Credits Issued", value: "28,456", change: "+18%", icon: TrendingUp, color: "text-orange-600" },
  ];

  // Mock carbon credit projects
  const carbonProjects = [
    {
      id: 'CC-001',
      name: 'Urban Tree Planting Initiative',
      category: 'Reforestation',
      organization: 'Green Lagos Foundation',
      status: 'active',
      creditsIssued: 2500,
      targetCredits: 5000,
      startDate: '2023-01-15',
      endDate: '2024-01-15',
      verificationStatus: 'verified',
      location: 'Lagos, Nigeria',
      impact: 'Planted 1,250 trees in urban areas'
    },
    {
      id: 'CC-002',
      name: 'Solar Energy Distribution',
      category: 'Renewable Energy',
      organization: 'SolarTech Nigeria',
      status: 'active',
      creditsIssued: 4200,
      targetCredits: 6000,
      startDate: '2023-03-01',
      endDate: '2024-03-01',
      verificationStatus: 'pending',
      location: 'Abuja, Nigeria',
      impact: 'Installed 500 solar panels for rural communities'
    },
    {
      id: 'CC-003',
      name: 'Waste-to-Energy Program',
      category: 'Waste Management',
      organization: 'EcoWaste Solutions',
      status: 'completed',
      creditsIssued: 3800,
      targetCredits: 3800,
      startDate: '2022-06-01',
      endDate: '2023-06-01',
      verificationStatus: 'verified',
      location: 'Port Harcourt, Nigeria',
      impact: 'Converted 10,000 tons of waste to energy'
    },
    {
      id: 'CC-004',
      name: 'Clean Cook Stoves Distribution',
      category: 'Energy Efficiency',
      organization: 'Clean Cook Initiative',
      status: 'active',
      creditsIssued: 1500,
      targetCredits: 4000,
      startDate: '2023-05-01',
      endDate: '2024-05-01',
      verificationStatus: 'pending',
      location: 'Kano, Nigeria',
      impact: 'Distributed 750 clean cook stoves to rural households'
    }
  ];

  // Mock user carbon credits
  const userCredits = [
    {
      id: 'UC-001',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      totalCredits: 450,
      earnedThisMonth: 75,
      activities: ['Recycling', 'Eco-friendly purchases', 'Tree planting'],
      joinDate: '2023-01-15',
      level: 'Gold',
      rank: 15
    },
    {
      id: 'UC-002',
      userName: 'Sarah Lewis',
      userEmail: 'sarah@example.com',
      totalCredits: 620,
      earnedThisMonth: 95,
      activities: ['Solar usage', 'Recycling', 'Green transport'],
      joinDate: '2022-11-20',
      level: 'Platinum',
      rank: 8
    },
    {
      id: 'UC-003',
      userName: 'Michael Brown',
      userEmail: 'michael@example.com',
      totalCredits: 380,
      earnedThisMonth: 60,
      activities: ['Recycling', 'Energy saving'],
      joinDate: '2023-02-10',
      level: 'Silver',
      rank: 22
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><XCircle className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      'Bronze': 'bg-orange-100 text-orange-800',
      'Silver': 'bg-gray-100 text-gray-800',
      'Gold': 'bg-yellow-100 text-yellow-800',
      'Platinum': 'bg-purple-100 text-purple-800'
    };
    return <Badge className={colors[level] || 'bg-gray-100 text-gray-800'}><Award className="w-3 h-3 mr-1" />{level}</Badge>;
  };

  const filteredProjects = carbonProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateProject = () => {
    toast.success('Carbon credit project created successfully!');
    setIsCreateDialogOpen(false);
  };

  const handleVerifyProject = (projectId: string) => {
    toast.success(`Project ${projectId} has been verified and approved`);
    setIsVerifyDialogOpen(false);
  };

  const handleRejectProject = (projectId: string) => {
    toast.error(`Project ${projectId} verification has been rejected`);
    setIsVerifyDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Carbon Credits Management</h1>
          <p className="text-gray-600">Track and manage carbon credit projects and user participation</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Carbon Credit Project</DialogTitle>
              <DialogDescription>
                Add a new carbon credit project to the platform
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input id="project-name" placeholder="Enter project name" />
                </div>
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" placeholder="Organization name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reforestation">Reforestation</SelectItem>
                      <SelectItem value="renewable-energy">Renewable Energy</SelectItem>
                      <SelectItem value="waste-management">Waste Management</SelectItem>
                      <SelectItem value="energy-efficiency">Energy Efficiency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Project location" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="target-credits">Target Credits</Label>
                  <Input id="target-credits" type="number" placeholder="5000" />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (months)</Label>
                  <Input id="duration" type="number" placeholder="12" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Project Description</Label>
                <Textarea id="description" placeholder="Describe the project objectives and expected impact..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject}>
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{stat.change}</span> from last month
              </p>
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
            placeholder="Search projects..."
            className="w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
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
      
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="users">User Credits</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Credit Projects</CardTitle>
              <CardDescription>
                Manage all carbon credit projects and their progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-gray-500">{project.location}</div>
                        </div>
                      </TableCell>
                      <TableCell>{project.organization}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{project.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{project.creditsIssued}/{project.targetCredits}</span>
                            <span>{Math.round((project.creditsIssued / project.targetCredits) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${(project.creditsIssued / project.targetCredits) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(project.status)}</TableCell>
                      <TableCell>{getVerificationBadge(project.verificationStatus)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {project.verificationStatus === 'pending' && (
                            <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setSelectedProject(project)}
                                >
                                  Verify
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Verify Project</DialogTitle>
                                  <DialogDescription>
                                    Review and verify the carbon credit project
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedProject && (
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold">{selectedProject.name}</h4>
                                      <p className="text-sm text-gray-600">{selectedProject.impact}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <strong>Organization:</strong> {selectedProject.organization}
                                      </div>
                                      <div>
                                        <strong>Category:</strong> {selectedProject.category}
                                      </div>
                                      <div>
                                        <strong>Location:</strong> {selectedProject.location}
                                      </div>
                                      <div>
                                        <strong>Target Credits:</strong> {selectedProject.targetCredits}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => handleRejectProject(selectedProject?.id)}
                                  >
                                    Reject
                                  </Button>
                                  <Button 
                                    onClick={() => handleVerifyProject(selectedProject?.id)}
                                  >
                                    Approve & Verify
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Carbon Credits</CardTitle>
              <CardDescription>
                View and manage user carbon credit earnings and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Total Credits</TableHead>
                    <TableHead>This Month</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Rank</TableHead>
                    <TableHead>Activities</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userCredits.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.userName}</div>
                          <div className="text-sm text-gray-500">{user.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{user.totalCredits}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          {user.earnedThisMonth}
                        </div>
                      </TableCell>
                      <TableCell>{getLevelBadge(user.level)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">#{user.rank}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.activities.slice(0, 2).map((activity, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                          {user.activities.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{user.activities.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Categories Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Reforestation</span>
                    <span className="font-semibold">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Renewable Energy</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Waste Management</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Energy Efficiency</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>CO₂ Reduced</span>
                    <span className="font-semibold">12.6 Tons</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Trees Planted</span>
                    <span className="font-semibold">1,250</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Solar Panels Installed</span>
                    <span className="font-semibold">500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Waste Converted (Tons)</span>
                    <span className="font-semibold">10,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Clean Stoves Distributed</span>
                    <span className="font-semibold">750</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verifications</CardTitle>
              <CardDescription>
                Review and verify carbon credit projects awaiting approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {carbonProjects.filter(p => p.verificationStatus === 'pending').map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-sm text-gray-600">{project.impact}</p>
                        <div className="flex gap-4 text-sm">
                          <span><strong>Organization:</strong> {project.organization}</span>
                          <span><strong>Category:</strong> {project.category}</span>
                          <span><strong>Location:</strong> {project.location}</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">{project.category}</Badge>
                          {getStatusBadge(project.status)}
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
                          onClick={() => handleRejectProject(project.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleVerifyProject(project.id)}
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
      </Tabs>
    </div>
  );
}
