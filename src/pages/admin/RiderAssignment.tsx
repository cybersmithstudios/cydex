
import React, { useState } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bike,
  Check,
  Clock,
  MapPin,
  Package,
  RotateCw,
  Star,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

// Mock data
const pendingOrders = [
  {
    id: "ORD-8732",
    customer: "Ade Johnson",
    address: "123 Palm Avenue, Victoria Island, Lagos",
    items: "2x Vegetable Salad, 1x Grilled Chicken",
    vendor: "Green Eats Restaurant",
    timestamp: "10:23 AM",
    price: "₦4,500",
    distance: "2.4 km",
    status: "pending",
  },
  {
    id: "ORD-8729",
    customer: "Ngozi Okonjo",
    address: "15 Admiralty Way, Lekki Phase 1, Lagos",
    items: "Medication package",
    vendor: "Healthy Pharmacy",
    timestamp: "9:55 AM",
    price: "₦2,850",
    distance: "3.2 km",
    status: "pending",
  },
];

const availableRiders = [
  {
    id: "RID-001",
    name: "Ibrahim Bello",
    avatar: null,
    status: "online",
    location: "Victoria Island",
    distance: "0.8 km",
    rating: 4.9,
    deliveriesCompleted: 342,
    deliveriesToday: 5,
    vehicleType: "e-bike",
    batteryLevel: "82%",
  },
  {
    id: "RID-002",
    name: "Amara Okeke",
    avatar: null,
    status: "online",
    location: "Lekki Phase 1",
    distance: "1.2 km",
    rating: 4.7,
    deliveriesCompleted: 289,
    deliveriesToday: 4,
    vehicleType: "bicycle",
    batteryLevel: null,
  },
  {
    id: "RID-003",
    name: "Yusuf Mohammed",
    avatar: null,
    status: "online",
    location: "Ikoyi",
    distance: "2.5 km",
    rating: 4.8,
    deliveriesCompleted: 412,
    deliveriesToday: 6,
    vehicleType: "e-bike",
    batteryLevel: "65%",
  },
  {
    id: "RID-004",
    name: "Chioma Eze",
    avatar: null,
    status: "busy",
    location: "Victoria Island",
    distance: "1.0 km",
    rating: 4.6,
    deliveriesCompleted: 178,
    deliveriesToday: 3,
    vehicleType: "electric-scooter",
    batteryLevel: "74%",
  },
];

const RiderAssignment = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(pendingOrders[0]);

  const handleAssignRider = (rider: any, order: any) => {
    toast.success(`Order ${order.id} assigned to ${rider.name}`);
    // In a real application, this would update the order status in the database
  };

  const handleAutoAssign = (order: any) => {
    const bestRider = availableRiders.find(rider => rider.status === "online");
    if (bestRider) {
      toast.success(`Order ${order.id} auto-assigned to ${bestRider.name}`);
    } else {
      toast.error("No available riders at the moment");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Status badge component
  const RiderStatusBadge: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
      case "online":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
            Online
          </Badge>
        );
      case "busy":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
            Busy
          </Badge>
        );
      case "offline":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
            Offline
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

  return (
    <AdminDashboardLayout title="Rider Assignment">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Orders Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Package className="mr-2 h-5 w-5 text-green-600" />
                Pending Orders
              </CardTitle>
              <CardDescription>
                Orders awaiting rider assignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="pending">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="assigned">Recently Assigned</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="space-y-4 mt-4">
                  {pendingOrders.map((order) => (
                    <Card
                      key={order.id}
                      className={`overflow-hidden ${
                        selectedOrder?.id === order.id
                          ? "border-green-500"
                          : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              {order.customer}
                            </p>
                          </div>
                          <Button
                            variant={selectedOrder?.id === order.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            {selectedOrder?.id === order.id ? "Selected" : "Select"}
                          </Button>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-start space-x-2 text-sm">
                            <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <span>{order.address}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm mt-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{order.timestamp}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="assigned" className="mt-4">
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <p className="text-muted-foreground">
                      No recently assigned orders to display
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {selectedOrder && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Order ID</h3>
                  <p>{selectedOrder.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Customer</h3>
                  <p>{selectedOrder.customer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Items</h3>
                  <p className="text-sm">{selectedOrder.items}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Vendor</h3>
                  <p>{selectedOrder.vendor}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Delivery Address</h3>
                  <p className="text-sm">{selectedOrder.address}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Price</h3>
                    <p>{selectedOrder.price}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Distance</h3>
                    <p>{selectedOrder.distance}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleAutoAssign(selectedOrder)}
                >
                  <RotateCw className="mr-2 h-4 w-4" />
                  Auto-Assign Best Rider
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Available Riders Column */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Bike className="mr-2 h-5 w-5 text-green-600" />
                Available Riders
              </CardTitle>
              <CardDescription>
                Select a rider to assign to the selected order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRiders.map((rider) => (
                  <Card key={rider.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            {rider.avatar ? (
                              <AvatarImage src={rider.avatar} alt={rider.name} />
                            ) : (
                              <AvatarFallback>{getInitials(rider.name)}</AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{rider.name}</h3>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                              <span className="text-sm">{rider.rating}</span>
                              <span className="text-xs text-muted-foreground">
                                ({rider.deliveriesCompleted} deliveries)
                              </span>
                            </div>
                          </div>
                        </div>
                        <RiderStatusBadge status={rider.status} />
                      </div>

                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span>{rider.location}</span>
                            <span className="text-xs text-muted-foreground block">
                              {rider.distance} from order location
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Bike className="h-4 w-4 text-gray-500" />
                          <span>{rider.vehicleType}</span>
                          {rider.batteryLevel && (
                            <span className="flex items-center text-xs ml-1">
                              <Zap className="h-3 w-3 text-green-600 mr-1" />
                              {rider.batteryLevel}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4 text-gray-500" />
                          <span>{rider.deliveriesToday} deliveries today</span>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4"
                        disabled={rider.status !== "online" || !selectedOrder}
                        onClick={() => selectedOrder && handleAssignRider(rider, selectedOrder)}
                      >
                        {rider.status === "online" ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Assign Order
                          </>
                        ) : (
                          "Currently Unavailable"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default RiderAssignment;
