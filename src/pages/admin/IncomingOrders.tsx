
import React, { useState } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Eye, 
  Filter, 
  MapPin, 
  Package, 
  RefreshCw, 
  Search, 
  Store 
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-8732",
    vendor: "Green Eats Restaurant",
    address: "123 Palm Avenue, Victoria Island, Lagos",
    timestamp: "10:23 AM",
    status: "pending",
    items: "2x Vegetable Salad, 1x Grilled Chicken",
    customer: "Ade Johnson",
    customerPhone: "+234 701 234 5678",
    price: "₦4,500",
  },
  {
    id: "ORD-8731",
    vendor: "Farm Fresh Market",
    address: "45 Marina Street, Lagos Island, Lagos",
    timestamp: "10:15 AM",
    status: "assigned",
    items: "Grocery package, 2.5kg estimate",
    customer: "Funke Akindele",
    customerPhone: "+234 802 345 6789",
    price: "₦3,200",
  },
  {
    id: "ORD-8730",
    vendor: "Tech Gadgets Store",
    address: "78 Allen Avenue, Ikeja, Lagos",
    timestamp: "10:02 AM",
    status: "in_progress",
    items: "1x Smartphone accessories package",
    customer: "Emmanuel Okafor",
    customerPhone: "+234 903 456 7890",
    price: "₦7,800",
  },
  {
    id: "ORD-8729",
    vendor: "Healthy Pharmacy",
    address: "15 Admiralty Way, Lekki Phase 1, Lagos",
    timestamp: "9:55 AM",
    status: "pending",
    items: "Medication package",
    customer: "Ngozi Okonjo",
    customerPhone: "+234 805 567 8901",
    price: "₦2,850",
  },
  {
    id: "ORD-8728",
    vendor: "Books & Stationery Shop",
    address: "220 Herbert Macaulay Way, Yaba, Lagos",
    timestamp: "9:48 AM",
    status: "assigned",
    items: "2x Textbooks, 1x Stationery set",
    customer: "Tunde Bakare",
    customerPhone: "+234 706 678 9012",
    price: "₦5,300",
  },
];

// Status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
          Pending
        </Badge>
      );
    case "assigned":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
          Assigned
        </Badge>
      );
    case "in_progress":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
          In Progress
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
          Completed
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

const IncomingOrders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
  };

  const filteredOrders = activeTab === "all" 
    ? mockOrders 
    : mockOrders.filter(order => order.status === activeTab);

  return (
    <AdminDashboardLayout title="Incoming Orders">
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8 md:w-[300px] lg:w-[300px]"
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="assigned">Assigned</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium flex items-center">
                            <Package className="h-4 w-4 mr-2 text-green-600" />
                            {order.id}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center mt-1">
                            <Store className="h-4 w-4 mr-2" />
                            {order.vendor}
                          </p>
                        </div>
                        <StatusBadge status={order.status} />
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-start space-x-3 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <span>{order.address}</span>
                      </div>

                      <div className="flex items-center space-x-3 text-sm">
                        <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span>{order.timestamp}</span>
                      </div>

                      <div className="flex items-center space-x-3 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span>Today</span>
                      </div>
                    </div>

                    <div className="bg-muted p-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full flex items-center justify-center"
                        onClick={() => handleViewDetails(order)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Order details modal could be implemented here */}
      </div>
    </AdminDashboardLayout>
  );
};

export default IncomingOrders;
