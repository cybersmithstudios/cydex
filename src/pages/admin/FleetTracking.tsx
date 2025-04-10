
import React, { useState } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Battery, 
  Bike, 
  Clock, 
  MapPin, 
  Package, 
  Phone, 
  RadioTower, 
  Star 
} from "lucide-react";
import { toast } from "sonner";

// Mock data for active riders
const activeRiders = [
  {
    id: "RID-001",
    name: "Ibrahim Bello",
    avatar: null,
    status: "active_delivery",
    location: "Victoria Island",
    coordinates: { lat: 6.4281, lng: 3.4219 },
    currentOrder: "ORD-8731",
    customerName: "Funke Akindele",
    destination: "45 Marina Street, Lagos Island",
    eta: "10 minutes",
    distance: "1.2 km remaining",
    batteryLevel: "82%",
    lastUpdate: "2 minutes ago",
    vehicleType: "e-bike"
  },
  {
    id: "RID-003",
    name: "Yusuf Mohammed",
    avatar: null,
    status: "active_delivery",
    location: "Ikoyi",
    coordinates: { lat: 6.4548, lng: 3.4345 },
    currentOrder: "ORD-8730",
    customerName: "Emmanuel Okafor",
    destination: "78 Allen Avenue, Ikeja",
    eta: "25 minutes",
    distance: "5.8 km remaining",
    batteryLevel: "65%",
    lastUpdate: "1 minute ago",
    vehicleType: "e-bike"
  },
  {
    id: "RID-004",
    name: "Chioma Eze",
    avatar: null,
    status: "active_delivery",
    location: "Victoria Island",
    coordinates: { lat: 6.4315, lng: 3.4236 },
    currentOrder: "ORD-8728",
    customerName: "Tunde Bakare",
    destination: "220 Herbert Macaulay Way, Yaba",
    eta: "18 minutes",
    distance: "3.5 km remaining",
    batteryLevel: "74%",
    lastUpdate: "3 minutes ago",
    vehicleType: "electric-scooter"
  },
  {
    id: "RID-002",
    name: "Amara Okeke",
    avatar: null,
    status: "available",
    location: "Lekki Phase 1",
    coordinates: { lat: 6.4698, lng: 3.5852 },
    currentOrder: null,
    customerName: null,
    destination: null,
    eta: null,
    distance: null,
    batteryLevel: null,
    lastUpdate: "just now",
    vehicleType: "bicycle"
  },
];

// Status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case "active_delivery":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
          On Delivery
        </Badge>
      );
    case "available":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
          Available
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
          Unknown
        </Badge>
      );
  }
};

const FleetTracking = () => {
  const [selectedRider, setSelectedRider] = useState<any>(activeRiders[0]);

  const handleCallRider = (rider: any) => {
    toast.success(`Initiating call to ${rider.name}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <AdminDashboardLayout title="Fleet Tracking">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rider List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Bike className="mr-2 h-5 w-5 text-green-600" />
                Active Riders
              </CardTitle>
              <CardDescription>
                {activeRiders.length} riders currently on duty
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeRiders.map((rider) => (
                <Card 
                  key={rider.id} 
                  className={`cursor-pointer ${selectedRider?.id === rider.id ? 'border-green-500' : ''}`}
                  onClick={() => setSelectedRider(rider)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(rider.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{rider.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <StatusBadge status={rider.status} />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-1 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 text-gray-500 mr-2" />
                        <span>{rider.location}</span>
                      </div>
                      
                      {rider.status === "active_delivery" && (
                        <div className="flex items-center">
                          <Package className="h-3.5 w-3.5 text-gray-500 mr-2" />
                          <span>{rider.currentOrder}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <RadioTower className="h-3.5 w-3.5 text-gray-500 mr-2" />
                        <span>Updated {rider.lastUpdate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Map Section - This would be a real map in production */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full">
              <div className="relative h-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {/* This would be replaced by an actual map component */}
                <div className="text-center">
                  <div className="text-gray-500 mb-2">Map would be displayed here</div>
                  <p className="text-sm text-gray-400">Showing {activeRiders.length} active riders</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Selected: {selectedRider?.name} - {selectedRider?.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Rider Details */}
          {selectedRider && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Bike className="mr-2 h-5 w-5 text-green-600" />
                  Rider Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-lg">{getInitials(selectedRider.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{selectedRider.name}</h3>
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                        <span>4.8</span>
                        <span className="text-muted-foreground ml-1">(342 deliveries)</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Vehicle Type</p>
                      <p className="font-medium">{selectedRider.vehicleType}</p>
                    </div>
                    {selectedRider.batteryLevel && (
                      <div>
                        <p className="text-sm text-muted-foreground">Battery Level</p>
                        <p className="font-medium flex items-center">
                          <Battery className="h-4 w-4 mr-1 text-green-600" />
                          {selectedRider.batteryLevel}
                        </p>
                      </div>
                    )}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={() => handleCallRider(selectedRider)}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Rider
                  </Button>
                </div>

                {selectedRider.status === "active_delivery" ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Order</p>
                      <p className="font-medium">{selectedRider.currentOrder}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-medium">{selectedRider.customerName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <p className="font-medium">{selectedRider.destination}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">ETA</p>
                        <p className="font-medium flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-amber-500" />
                          {selectedRider.eta}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="font-medium">{selectedRider.distance}</p>
                      </div>
                    </div>
                    
                    <Card className="bg-muted">
                      <CardContent className="p-3">
                        <div className="flex items-start space-x-2">
                          <div className="mt-1">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <div className="h-8 w-0.5 bg-gray-300 mx-auto"></div>
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          </div>
                          <div className="flex-1 space-y-2 text-sm">
                            <div>
                              <p className="font-medium">Pickup Point</p>
                              <p className="text-muted-foreground">{selectedRider.location}</p>
                            </div>
                            <div>
                              <p className="font-medium">Delivery Point</p>
                              <p className="text-muted-foreground">{selectedRider.destination}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="flex justify-center">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 mb-2">
                          Available
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">
                        This rider is currently available for delivery assignments
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default FleetTracking;
