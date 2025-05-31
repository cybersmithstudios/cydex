
import React, { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Package, Clock, MapPin, Leaf, Phone, Navigation, 
  CheckCircle, AlertCircle, Camera, MessageSquare,
  Star, TrendingUp, Calendar
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data for current deliveries
const mockCurrentDeliveries = [
  {
    id: 'ORD-2339',
    vendor: 'Zero Waste Store',
    customer: 'Michael Brown',
    status: 'picking-up',
    address: '123 Green St, Ikoyi, Lagos',
    pickupLocation: 'Zero Waste Store, 42 Marina St, Lagos Island',
    dropoffLocation: '123 Green St, Ikoyi, Lagos',
    customerContact: '+234 812 345 6789',
    eta: '5 minutes',
    items: [
      { id: 1, name: 'Reusable Shopping Bags', quantity: 2 },
      { id: 2, name: 'Bamboo Utensils Set', quantity: 1 }
    ],
    carbonSaved: 0.6,
    startedAt: '10:15 AM',
    estimatedArrival: '10:35 AM',
    progress: 25,
    fee: 8500.75,
    ecoBonus: 1200.25,
    tip: 0,
    customerNotes: 'Please call when you arrive.'
  },
  {
    id: 'ORD-2340',
    vendor: 'OrganicFoods Market',
    customer: 'Amina Ibrahim',
    status: 'delivering',
    address: '45 Park Avenue, Victoria Island, Lagos',
    pickupLocation: 'OrganicFoods Market, 17 Broad St, Lagos',
    dropoffLocation: '45 Park Avenue, Victoria Island, Lagos',
    customerContact: '+234 803 987 6543',
    eta: '12 minutes',
    items: [
      { id: 1, name: 'Organic Vegetables Bundle', quantity: 1 },
      { id: 2, name: 'Free-range Eggs', quantity: 2 },
      { id: 3, name: 'Almond Milk', quantity: 1 }
    ],
    carbonSaved: 0.8,
    startedAt: '11:05 AM',
    estimatedArrival: '11:30 AM',
    progress: 65,
    fee: 12350.50,
    ecoBonus: 1850.00,
    tip: 1000,
    customerNotes: 'Leave package at the security desk if I\'m not around.'
  }
];

const mockCompletedDeliveries = [
  {
    id: 'ORD-2337',
    vendor: 'Green Earth Groceries',
    customer: 'Sarah Okafor',
    status: 'completed',
    address: '78 Admiralty Way, Lekki Phase 1',
    completedAt: 'Today, 9:45 AM',
    items: 3,
    carbonSaved: 0.9,
    fee: 10800.25,
    ecoBonus: 1650.75,
    tip: 2000,
    rating: 5
  },
  {
    id: 'ORD-2334',
    vendor: 'Fresh Farm Produce',
    customer: 'Emmanuel Adegoke',
    status: 'completed',
    address: '23 Olubunmi Owa St, Lekki',
    completedAt: 'Today, 8:20 AM',
    items: 5,
    carbonSaved: 1.2,
    fee: 15620.00,
    ecoBonus: 2200.50,
    tip: 1500,
    rating: 4
  },
  {
    id: 'ORD-2328',
    vendor: 'Tech Gadgets Store',
    customer: 'Chidi Okonkwo',
    status: 'completed',
    address: '15 Allen Avenue, Ikeja',
    completedAt: 'Yesterday, 5:30 PM',
    items: 1,
    carbonSaved: 0.4,
    fee: 9500.75,
    ecoBonus: 950.25,
    tip: 500,
    rating: 5
  }
];

const CurrentDeliveriesPage = () => {
  const { user } = useAuth();
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [showIssueDialog, setShowIssueDialog] = useState(false);
  const [issueDescription, setIssueDescription] = useState('');
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [showProofDialog, setShowProofDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'picking-up':
        return <Badge className="bg-blue-500">Picking Up</Badge>;
      case 'delivering':
        return <Badge className="bg-amber-500">Delivering</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handleMarkAsDelivered = (delivery) => {
    setSelectedDelivery(delivery);
    setShowCompletionDialog(true);
  };

  const handleUploadProof = (delivery) => {
    setSelectedDelivery(delivery);
    setShowProofDialog(true);
  };

  const handleReportIssue = (delivery) => {
    setSelectedDelivery(delivery);
    setShowIssueDialog(true);
  };

  const handleViewDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setShowDeliveryDialog(true);
  };

  const handleCompleteDelivery = () => {
    // In a real app, you would call an API here
    console.log('Delivery completed:', selectedDelivery.id);
    setShowCompletionDialog(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const pendingCount = mockCurrentDeliveries.filter(d => d.status === 'picking-up' || d.status === 'delivering').length;
  const completedCount = mockCompletedDeliveries.length;

  return (
    <DashboardLayout userRole="RIDER">
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Current Deliveries</h1>
            <p className="text-gray-600">Track and manage your active deliveries</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-black">
            <Navigation className="mr-2 h-5 w-5" />
            Open Navigation
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Deliveries</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today's Completed</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Earnings Today</p>
                <p className="text-2xl font-bold">₦{
                  [...mockCurrentDeliveries, ...mockCompletedDeliveries].reduce(
                    (sum, delivery) => sum + delivery.fee + delivery.ecoBonus + (delivery.tip || 0), 0
                  ).toLocaleString('en-NG', {maximumFractionDigits: 2})
                }</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <Leaf className="h-5 w-5 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Carbon Saved</p>
                <p className="text-2xl font-bold">{
                  [...mockCurrentDeliveries, ...mockCompletedDeliveries].reduce(
                    (sum, delivery) => sum + delivery.carbonSaved, 0
                  ).toFixed(1)} kg</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for deliveries */}
        <Tabs defaultValue="active" className="mb-6">
          <TabsList>
            <TabsTrigger value="active">Active Deliveries ({pendingCount})</TabsTrigger>
            <TabsTrigger value="completed">Completed Today ({completedCount})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {mockCurrentDeliveries.length > 0 ? (
              <div className="space-y-6">
                {mockCurrentDeliveries.map((delivery) => (
                  <Card key={delivery.id} className="overflow-hidden border-2 border-primary-light">
                    <CardContent className="p-0">
                      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="mr-3">
                            {getStatusBadge(delivery.status)}
                          </div>
                          <h3 className="font-medium">{delivery.id}</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          Started at {delivery.startedAt}
                        </p>
                      </div>

                      <div className="p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div className="mb-4 md:mb-0">
                            <div className="flex items-center mb-2">
                              <div className="p-2 bg-primary-light rounded-full">
                                {delivery.status === 'picking-up' ? (
                                  <MapPin className="h-5 w-5 text-primary" />
                                ) : (
                                  <Package className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <h3 className="ml-2 font-medium">
                                {delivery.status === 'picking-up' ? (
                                  <>Picking up from <span className="font-semibold">{delivery.vendor}</span></>
                                ) : (
                                  <>Delivering to <span className="font-semibold">{delivery.customer}</span></>
                                )}
                              </h3>
                            </div>
                            
                            <p className="text-sm text-gray-600 ml-9">
                              {delivery.status === 'picking-up' ? delivery.pickupLocation : delivery.dropoffLocation}
                            </p>
                            
                            <div className="flex items-center mt-3 ml-9">
                              <Clock className="h-4 w-4 text-gray-500 mr-1" />
                              <span className="text-sm text-gray-600">ETA: {delivery.eta}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-start md:items-end">
                            <p className="font-medium text-lg mb-1">
                              ₦{(delivery.fee + delivery.ecoBonus + (delivery.tip || 0)).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </p>
                            <div className="text-sm text-green-600 mb-2">
                              +₦{delivery.ecoBonus.toLocaleString('en-NG', {maximumFractionDigits: 2})} eco bonus
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="text-xs" onClick={() => handleViewDelivery(delivery)}>
                                View Details
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs" onClick={() => handleReportIssue(delivery)}>
                                Report Issue
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between items-center text-sm mb-1">
                            <span>{delivery.status === 'picking-up' ? 'On way to pickup' : 'On way to destination'}</span>
                            <span>ETA: {delivery.estimatedArrival}</span>
                          </div>
                          <Progress value={delivery.progress} className="h-2" />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center md:justify-between">
                          <Button variant="outline" className="flex-1 max-w-[200px]">
                            <Phone className="mr-2 h-4 w-4" />
                            Call {delivery.status === 'picking-up' ? 'Vendor' : 'Customer'}
                          </Button>
                          <Button variant="outline" className="flex-1 max-w-[200px]">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <Button className="flex-1 max-w-[200px] bg-primary hover:bg-primary-hover text-black" onClick={() => delivery.status === 'picking-up' ? handleUploadProof(delivery) : handleMarkAsDelivered(delivery)}>
                            {delivery.status === 'picking-up' ? (
                              <>
                                <Camera className="mr-2 h-4 w-4" />
                                Confirm Pickup
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Delivered
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Package className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No active deliveries</h3>
                  <p className="text-gray-500 text-center max-w-md mb-4">
                    You don't have any active deliveries at the moment. Check the available orders to start delivering!
                  </p>
                  <Button className="bg-primary hover:bg-primary-hover text-black">
                    View Available Orders
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="space-y-4">
              {mockCompletedDeliveries.map((delivery) => (
                <Card key={delivery.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="p-3 bg-green-100 rounded-full">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        
                        <div>
                          <div className="flex items-center">
                            <Badge className="bg-green-500">Completed</Badge>
                            <span className="mx-2 text-gray-500">•</span>
                            <span className="text-sm font-medium">{delivery.id}</span>
                          </div>
                          
                          <h3 className="font-medium mt-2">
                            {delivery.vendor} → {delivery.customer}
                          </h3>
                          
                          <div className="mt-1 flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{delivery.address}</span>
                          </div>
                          
                          <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">{delivery.items}</span> items
                            </div>
                            <div>
                              Completed: <span className="font-medium">{delivery.completedAt}</span>
                            </div>
                            <div className="flex items-center text-green-600">
                              <Leaf className="h-4 w-4 mr-1" />
                              <span>{delivery.carbonSaved} kg CO₂ saved</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:text-right">
                        <p className="font-medium text-lg">
                          ₦{(delivery.fee + delivery.ecoBonus + delivery.tip).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </p>
                        <div className="text-sm text-green-600">
                          +₦{delivery.ecoBonus.toLocaleString('en-NG', {maximumFractionDigits: 2})} eco bonus
                        </div>
                        {delivery.tip > 0 && (
                          <div className="text-sm text-blue-600">
                            +₦{delivery.tip.toLocaleString('en-NG', {maximumFractionDigits: 2})} tip
                          </div>
                        )}
                        
                        <div className="flex items-center justify-end mt-2">
                          <span className="text-sm mr-2">Rating:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < delivery.rating ? 'text-amber-500' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Delivery Details Dialog */}
        <Dialog open={showDeliveryDialog} onOpenChange={setShowDeliveryDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delivery Details</DialogTitle>
              <DialogDescription>
                {selectedDelivery?.id} - {selectedDelivery?.status === 'picking-up' ? 'Picking Up' : 'Delivering'}
              </DialogDescription>
            </DialogHeader>
            
            {selectedDelivery && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{selectedDelivery.status === 'picking-up' ? 'Pickup Information' : 'Delivery Information'}</h4>
                  <Card className="bg-gray-50">
                    <CardContent className="p-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{selectedDelivery.status === 'picking-up' ? selectedDelivery.vendor : selectedDelivery.customer}</p>
                          <p className="text-sm text-gray-600">
                            {selectedDelivery.status === 'picking-up' ? selectedDelivery.pickupLocation : selectedDelivery.dropoffLocation}
                          </p>
                          {selectedDelivery.status === 'delivering' && (
                            <p className="text-sm text-gray-600 mt-1">
                              Contact: {selectedDelivery.customerContact}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Items ({selectedDelivery.items.length})</h4>
                  <div className="space-y-2">
                    {selectedDelivery.items.map(item => (
                      <div 
                        key={item.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedItem?.id === item.id ? 'border-primary bg-primary-light' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="flex justify-between">
                          <p>{item.name}</p>
                          <p className="text-gray-600">x{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedDelivery.customerNotes && (
                  <div>
                    <h4 className="font-medium mb-2">Customer Notes</h4>
                    <p className="text-sm bg-amber-50 p-3 rounded-lg border border-amber-100">
                      {selectedDelivery.customerNotes}
                    </p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium mb-2">Payment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₦{selectedDelivery.fee.toLocaleString('en-NG', {maximumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Eco Bonus</span>
                      <span>+₦{selectedDelivery.ecoBonus.toLocaleString('en-NG', {maximumFractionDigits: 2})}</span>
                    </div>
                    {selectedDelivery.tip > 0 && (
                      <div className="flex justify-between text-blue-600">
                        <span>Customer Tip</span>
                        <span>+₦{selectedDelivery.tip.toLocaleString('en-NG', {maximumFractionDigits: 2})}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium border-t pt-2 mt-2">
                      <span>Total</span>
                      <span>₦{(selectedDelivery.fee + selectedDelivery.ecoBonus + (selectedDelivery.tip || 0)).toLocaleString('en-NG', {maximumFractionDigits: 2})}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter className="flex space-x-2 sm:justify-between">
              <Button variant="outline" onClick={() => setShowDeliveryDialog(false)}>
                Close
              </Button>
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowDeliveryDialog(false);
                    handleReportIssue(selectedDelivery);
                  }}
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Report Issue
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary-hover text-black"
                  onClick={() => {
                    setShowDeliveryDialog(false);
                    selectedDelivery?.status === 'picking-up' ? 
                      handleUploadProof(selectedDelivery) :
                      handleMarkAsDelivered(selectedDelivery);
                  }}
                >
                  {selectedDelivery?.status === 'picking-up' ? (
                    <>
                      <Camera className="mr-2 h-4 w-4" />
                      Confirm Pickup
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark Delivered
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Issue Report Dialog */}
        <Dialog open={showIssueDialog} onOpenChange={setShowIssueDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report an Issue</DialogTitle>
              <DialogDescription>
                Describe the issue you're experiencing with order {selectedDelivery?.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="issue-type">Issue Type</Label>
                <select 
                  id="issue-type"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Unable to find pickup location</option>
                  <option>Customer unavailable at delivery location</option>
                  <option>Item(s) damaged during transport</option>
                  <option>Incorrect address information</option>
                  <option>Vehicle/transportation issue</option>
                  <option>Other issue</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="issue-description">Description</Label>
                <textarea 
                  id="issue-description"
                  className="w-full h-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Provide details about the issue..."
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="issue-photos">Upload Photos (Optional)</Label>
                <Input 
                  id="issue-photos"
                  type="file" 
                  accept="image/*"
                  multiple
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowIssueDialog(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-black"
                onClick={() => {
                  console.log('Issue reported:', {
                    orderId: selectedDelivery?.id,
                    description: issueDescription
                  });
                  setShowIssueDialog(false);
                  setIssueDescription('');
                }}
              >
                Submit Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Mark as Delivered Dialog */}
        <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete Delivery</DialogTitle>
              <DialogDescription>
                Confirm delivery of order {selectedDelivery?.id} to {selectedDelivery?.customer}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="delivery-photos">Upload Delivery Proof</Label>
                <Input 
                  id="delivery-photos"
                  type="file" 
                  accept="image/*"
                  required
                />
                <p className="text-xs text-gray-500">Please take a clear photo of the delivered package</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="delivery-notes">Delivery Notes (Optional)</Label>
                <textarea 
                  id="delivery-notes"
                  className="w-full h-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add any notes about this delivery..."
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="contactless" className="rounded text-primary" />
                <Label htmlFor="contactless">This was a contactless delivery</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCompletionDialog(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-black"
                onClick={handleCompleteDelivery}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Complete Delivery
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Proof of Pickup Dialog */}
        <Dialog open={showProofDialog} onOpenChange={setShowProofDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Pickup</DialogTitle>
              <DialogDescription>
                Verify pickup of order {selectedDelivery?.id} from {selectedDelivery?.vendor}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickup-photos">Upload Pickup Proof</Label>
                <Input 
                  id="pickup-photos"
                  type="file" 
                  accept="image/*"
                  required
                />
                <p className="text-xs text-gray-500">Please take a clear photo of the picked up items</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickup-notes">Pickup Notes (Optional)</Label>
                <textarea 
                  id="pickup-notes"
                  className="w-full h-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add any notes about this pickup..."
                />
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">Verify Items:</p>
                {selectedDelivery?.items.map(item => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <input type="checkbox" id={`item-${item.id}`} className="rounded text-primary" />
                    <Label htmlFor={`item-${item.id}`}>{item.name} (x{item.quantity})</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowProofDialog(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-black"
                onClick={() => {
                  console.log('Pickup confirmed:', selectedDelivery?.id);
                  setShowProofDialog(false);
                }}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm Pickup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default CurrentDeliveriesPage;
