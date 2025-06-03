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
        return <Badge className="bg-blue-500 text-xs">Picking Up</Badge>;
      case 'delivering':
        return <Badge className="bg-amber-500 text-xs">Delivering</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 text-xs">Completed</Badge>;
      default:
        return <Badge className="text-xs">Unknown</Badge>;
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
      <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 md:mb-6 gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Current Deliveries</h1>
            <p className="text-sm sm:text-base text-gray-600">Track and manage your active deliveries</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9">
            <Navigation className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            Open Navigation
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
          <Card>
            <CardContent className="p-2 sm:p-3 md:p-4 flex flex-row items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 truncate">Active Deliveries</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold">{pendingCount}</p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full flex-shrink-0">
                <Package className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-2 sm:p-3 md:p-4 flex flex-row items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 truncate">Today's Completed</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold">{completedCount}</p>
              </div>
              <div className="p-2 sm:p-3 bg-green-100 rounded-full flex-shrink-0">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-2 sm:p-3 md:p-4 flex flex-row items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 truncate">Earnings Today</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold">₦{
                  [...mockCurrentDeliveries, ...mockCompletedDeliveries].reduce(
                    (sum, delivery) => sum + delivery.fee + delivery.ecoBonus + (delivery.tip || 0), 0
                  ).toLocaleString('en-NG', {maximumFractionDigits: 2})
                }</p>
              </div>
              <div className="p-2 sm:p-3 bg-amber-100 rounded-full flex-shrink-0">
                <Leaf className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-2 sm:p-3 md:p-4 flex flex-row items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 truncate">Carbon Saved</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold">{
                  [...mockCurrentDeliveries, ...mockCompletedDeliveries].reduce(
                    (sum, delivery) => sum + delivery.carbonSaved, 0
                  ).toFixed(1)} kg</p>
              </div>
              <div className="p-2 sm:p-3 bg-green-100 rounded-full flex-shrink-0">
                <Leaf className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for deliveries */}
        <Tabs defaultValue="active" className="mb-3 sm:mb-4 md:mb-6">
          <TabsList className="w-full">
            <TabsTrigger value="active" className="text-xs sm:text-sm flex-1">Active Deliveries ({pendingCount})</TabsTrigger>
            <TabsTrigger value="completed" className="text-xs sm:text-sm flex-1">Completed Today ({completedCount})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {mockCurrentDeliveries.length > 0 ? (
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {mockCurrentDeliveries.map((delivery) => (
                  <Card key={delivery.id} className="overflow-hidden border-2 border-primary-light">
                    <CardContent className="p-0">
                      <div className="p-2 sm:p-3 md:p-4 border-b bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center min-w-0 flex-1">
                          <div className="mr-2 sm:mr-3 flex-shrink-0">
                            {getStatusBadge(delivery.status)}
                          </div>
                          <h3 className="font-medium text-sm sm:text-base truncate">{delivery.id}</h3>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 flex-shrink-0">
                          Started at {delivery.startedAt}
                        </p>
                      </div>

                      <div className="p-2 sm:p-3 md:p-4">
                        <div className="flex flex-col lg:flex-row justify-between mb-3 sm:mb-4">
                          <div className="mb-3 sm:mb-4 lg:mb-0">
                            <div className="flex items-center mb-2">
                              <div className="p-1.5 sm:p-2 bg-primary-light rounded-full flex-shrink-0">
                                {delivery.status === 'picking-up' ? (
                                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                ) : (
                                  <Package className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                )}
                              </div>
                              <h3 className="ml-2 font-medium text-sm sm:text-base min-w-0">
                                {delivery.status === 'picking-up' ? (
                                  <>Picking up from <span className="font-semibold truncate">{delivery.vendor}</span></>
                                ) : (
                                  <>Delivering to <span className="font-semibold truncate">{delivery.customer}</span></>
                                )}
                              </h3>
                            </div>
                            
                            <p className="text-xs sm:text-sm text-gray-600 ml-7 sm:ml-9 truncate">
                              {delivery.status === 'picking-up' ? delivery.pickupLocation : delivery.dropoffLocation}
                            </p>
                            
                            <div className="flex items-center mt-2 sm:mt-3 ml-7 sm:ml-9">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-1" />
                              <span className="text-xs sm:text-sm text-gray-600">ETA: {delivery.eta}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-start lg:items-end">
                            <p className="font-medium text-base sm:text-lg mb-1">
                              ₦{(delivery.fee + delivery.ecoBonus + (delivery.tip || 0)).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </p>
                            <div className="text-xs sm:text-sm text-green-600 mb-2">
                              +₦{delivery.ecoBonus.toLocaleString('en-NG', {maximumFractionDigits: 2})} eco bonus
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button variant="outline" size="sm" className="text-xs h-7 sm:h-8" onClick={() => handleViewDelivery(delivery)}>
                                View Details
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs h-7 sm:h-8" onClick={() => handleReportIssue(delivery)}>
                                Report Issue
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-3 sm:mb-4">
                          <div className="flex justify-between items-center text-xs sm:text-sm mb-1">
                            <span>{delivery.status === 'picking-up' ? 'On way to pickup' : 'On way to destination'}</span>
                            <span>ETA: {delivery.estimatedArrival}</span>
                          </div>
                          <Progress value={delivery.progress} className="h-2" />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" className="flex-1 text-xs sm:text-sm h-8 sm:h-9">
                            <Phone className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            Call {delivery.status === 'picking-up' ? 'Vendor' : 'Customer'}
                          </Button>
                          <Button variant="outline" className="flex-1 text-xs sm:text-sm h-8 sm:h-9">
                            <MessageSquare className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            Message
                          </Button>
                          <Button className="flex-1 bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9" onClick={() => delivery.status === 'picking-up' ? handleUploadProof(delivery) : handleMarkAsDelivered(delivery)}>
                            {delivery.status === 'picking-up' ? (
                              <>
                                <Camera className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                Confirm Pickup
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
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
                <CardContent className="flex flex-col items-center justify-center py-8 sm:py-10">
                  <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium mb-2">No active deliveries</h3>
                  <p className="text-gray-500 text-center max-w-md mb-3 sm:mb-4 text-sm sm:text-base">
                    You don't have any active deliveries at the moment. Check the available orders to start delivering!
                  </p>
                  <Button className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9">
                    View Available Orders
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="space-y-3 sm:space-y-4">
              {mockCompletedDeliveries.map((delivery) => (
                <Card key={delivery.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 sm:p-3 bg-green-100 rounded-full flex-shrink-0">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                        </div>
                        
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                            <Badge className="bg-green-500 text-xs">Completed</Badge>
                            <span className="mx-1 sm:mx-2 text-gray-500 hidden sm:inline">•</span>
                            <span className="text-xs sm:text-sm font-medium">{delivery.id}</span>
                          </div>
                          
                          <h3 className="font-medium mt-2 text-sm sm:text-base truncate">
                            {delivery.vendor} → {delivery.customer}
                          </h3>
                          
                          <div className="mt-1 flex items-center text-xs sm:text-sm text-gray-600">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{delivery.address}</span>
                          </div>
                          
                          <div className="mt-2 flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                            <div>
                              <span className="font-medium">{delivery.items}</span> items
                            </div>
                            <div>
                              Completed: <span className="font-medium">{delivery.completedAt}</span>
                            </div>
                            <div className="flex items-center text-green-600">
                              <Leaf className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                              <span>{delivery.carbonSaved} kg CO₂ saved</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 sm:mt-0 sm:text-right sm:ml-4">
                        <p className="font-medium text-base sm:text-lg">
                          ₦{(delivery.fee + delivery.ecoBonus + delivery.tip).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </p>
                        <div className="text-xs sm:text-sm text-green-600">
                          +₦{delivery.ecoBonus.toLocaleString('en-NG', {maximumFractionDigits: 2})} eco bonus
                        </div>
                        {delivery.tip > 0 && (
                          <div className="text-xs sm:text-sm text-blue-600">
                            +₦{delivery.tip.toLocaleString('en-NG', {maximumFractionDigits: 2})} tip
                          </div>
                        )}
                        
                        <div className="flex items-center justify-start sm:justify-end mt-2">
                          <span className="text-xs sm:text-sm mr-2">Rating:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${i < delivery.rating ? 'text-amber-500' : 'text-gray-300'}`} 
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
          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">Delivery Details</DialogTitle>
              <DialogDescription className="text-sm">
                {selectedDelivery?.id} - {selectedDelivery?.status === 'picking-up' ? 'Picking Up' : 'Delivering'}
              </DialogDescription>
            </DialogHeader>
            
            {selectedDelivery && (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-sm sm:text-base">{selectedDelivery.status === 'picking-up' ? 'Pickup Information' : 'Delivery Information'}</h4>
                  <Card className="bg-gray-50">
                    <CardContent className="p-2 sm:p-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-sm sm:text-base truncate">{selectedDelivery.status === 'picking-up' ? selectedDelivery.vendor : selectedDelivery.customer}</p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {selectedDelivery.status === 'picking-up' ? selectedDelivery.pickupLocation : selectedDelivery.dropoffLocation}
                          </p>
                          {selectedDelivery.status === 'delivering' && (
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">
                              Contact: {selectedDelivery.customerContact}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Items ({selectedDelivery.items.length})</h4>
                  <div className="space-y-2">
                    {selectedDelivery.items.map(item => (
                      <div 
                        key={item.id}
                        className={`p-2 sm:p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedItem?.id === item.id ? 'border-primary bg-primary-light' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="flex justify-between">
                          <p className="text-sm sm:text-base truncate">{item.name}</p>
                          <p className="text-gray-600 text-sm">x{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedDelivery.customerNotes && (
                  <div>
                    <h4 className="font-medium mb-2 text-sm sm:text-base">Customer Notes</h4>
                    <p className="text-xs sm:text-sm bg-amber-50 p-2 sm:p-3 rounded-lg border border-amber-100">
                      {selectedDelivery.customerNotes}
                    </p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Payment Details</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
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
            
            <DialogFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 sm:justify-between">
              <Button variant="outline" onClick={() => setShowDeliveryDialog(false)} className="text-xs sm:text-sm h-8 sm:h-9">
                Close
              </Button>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowDeliveryDialog(false);
                    handleReportIssue(selectedDelivery);
                  }}
                  className="text-xs sm:text-sm h-8 sm:h-9"
                >
                  <AlertCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Report Issue
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9"
                  onClick={() => {
                    setShowDeliveryDialog(false);
                    selectedDelivery?.status === 'picking-up' ? 
                      handleUploadProof(selectedDelivery) :
                      handleMarkAsDelivered(selectedDelivery);
                  }}
                >
                  {selectedDelivery?.status === 'picking-up' ? (
                    <>
                      <Camera className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Confirm Pickup
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
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
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">Report an Issue</DialogTitle>
              <DialogDescription className="text-sm">
                Describe the issue you're experiencing with order {selectedDelivery?.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="issue-type" className="text-sm">Issue Type</Label>
                <select 
                  id="issue-type"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm h-8 sm:h-9"
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
                <Label htmlFor="issue-description" className="text-sm">Description</Label>
                <textarea 
                  id="issue-description"
                  className="w-full h-20 sm:h-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Provide details about the issue..."
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="issue-photos" className="text-sm">Upload Photos (Optional)</Label>
                <Input 
                  id="issue-photos"
                  type="file" 
                  accept="image/*"
                  multiple
                  className="text-sm h-8 sm:h-9"
                />
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" onClick={() => setShowIssueDialog(false)} className="text-xs sm:text-sm h-8 sm:h-9">
                Cancel
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9"
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
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">Complete Delivery</DialogTitle>
              <DialogDescription className="text-sm">
                Confirm delivery of order {selectedDelivery?.id} to {selectedDelivery?.customer}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="delivery-photos" className="text-sm">Upload Delivery Proof</Label>
                <Input 
                  id="delivery-photos"
                  type="file" 
                  accept="image/*"
                  required
                  className="text-sm h-8 sm:h-9"
                />
                <p className="text-xs text-gray-500">Please take a clear photo of the delivered package</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="delivery-notes" className="text-sm">Delivery Notes (Optional)</Label>
                <textarea 
                  id="delivery-notes"
                  className="w-full h-20 sm:h-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Add any notes about this delivery..."
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="contactless" className="rounded text-primary" />
                <Label htmlFor="contactless" className="text-sm">This was a contactless delivery</Label>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" onClick={() => setShowCompletionDialog(false)} className="text-xs sm:text-sm h-8 sm:h-9">
                Cancel
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9"
                onClick={handleCompleteDelivery}
              >
                <CheckCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Complete Delivery
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Proof of Pickup Dialog */}
        <Dialog open={showProofDialog} onOpenChange={setShowProofDialog}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">Confirm Pickup</DialogTitle>
              <DialogDescription className="text-sm">
                Verify pickup of order {selectedDelivery?.id} from {selectedDelivery?.vendor}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickup-photos" className="text-sm">Upload Pickup Proof</Label>
                <Input 
                  id="pickup-photos"
                  type="file" 
                  accept="image/*"
                  required
                  className="text-sm h-8 sm:h-9"
                />
                <p className="text-xs text-gray-500">Please take a clear photo of the picked up items</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickup-notes" className="text-sm">Pickup Notes (Optional)</Label>
                <textarea 
                  id="pickup-notes"
                  className="w-full h-20 sm:h-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Add any notes about this pickup..."
                />
              </div>
              
              <div className="space-y-2">
                <p className="font-medium text-sm">Verify Items:</p>
                {selectedDelivery?.items.map(item => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <input type="checkbox" id={`item-${item.id}`} className="rounded text-primary" />
                    <Label htmlFor={`item-${item.id}`} className="text-sm">{item.name} (x{item.quantity})</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" onClick={() => setShowProofDialog(false)} className="text-xs sm:text-sm h-8 sm:h-9">
                Cancel
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-black text-xs sm:text-sm h-8 sm:h-9"
                onClick={() => {
                  console.log('Pickup confirmed:', selectedDelivery?.id);
                  setShowProofDialog(false);
                }}
              >
                <CheckCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
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
