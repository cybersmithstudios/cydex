
import React, { useState } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Download,
  Eye,
  Filter,
  Package,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { format } from "date-fns";

// Mock data for delivery logs
const deliveryLogs = [
  {
    id: "DL-8952",
    orderId: "ORD-8720",
    rider: "Ibrahim Bello",
    vendor: "Green Eats Restaurant",
    customer: "Ade Johnson",
    startTime: "2025-04-10T10:00:00",
    endTime: "2025-04-10T10:35:00",
    status: "completed",
    issues: null,
    carbonSaved: "1.2 kg",
    distance: "3.2 km",
  },
  {
    id: "DL-8951",
    orderId: "ORD-8719",
    rider: "Amara Okeke",
    vendor: "Farm Fresh Market",
    customer: "Funke Akindele",
    startTime: "2025-04-10T09:45:00",
    endTime: "2025-04-10T10:20:00",
    status: "completed",
    issues: null,
    carbonSaved: "0.8 kg",
    distance: "2.4 km",
  },
  {
    id: "DL-8950",
    orderId: "ORD-8718",
    rider: "Yusuf Mohammed",
    vendor: "Tech Gadgets Store",
    customer: "Emmanuel Okafor",
    startTime: "2025-04-10T09:30:00",
    endTime: "2025-04-10T10:05:00",
    status: "completed",
    issues: null,
    carbonSaved: "1.5 kg",
    distance: "4.1 km",
  },
  {
    id: "DL-8949",
    orderId: "ORD-8717",
    rider: "Chioma Eze",
    vendor: "Healthy Pharmacy",
    customer: "Ngozi Okonjo",
    startTime: "2025-04-10T09:15:00",
    endTime: null,
    status: "delayed",
    issues: "Rider encountered traffic",
    carbonSaved: "0.7 kg",
    distance: "3.8 km",
  },
  {
    id: "DL-8948",
    orderId: "ORD-8716",
    rider: "Ibrahim Bello",
    vendor: "Books & Stationery Shop",
    customer: "Tunde Bakare",
    startTime: "2025-04-10T09:00:00",
    endTime: "2025-04-10T09:30:00",
    status: "completed",
    issues: "Package slightly damaged",
    carbonSaved: "0.9 kg",
    distance: "2.6 km",
  },
  {
    id: "DL-8947",
    orderId: "ORD-8715",
    rider: "Amara Okeke",
    vendor: "Green Eats Restaurant",
    customer: "Chioma Nwosu",
    startTime: "2025-04-10T08:45:00",
    endTime: "2025-04-10T09:15:00",
    status: "completed",
    issues: null,
    carbonSaved: "1.1 kg",
    distance: "2.9 km",
  },
];

// Status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
          <Check className="mr-1 h-3 w-3" />
          Completed
        </Badge>
      );
    case "in_progress":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
          <Clock className="mr-1 h-3 w-3" />
          In Progress
        </Badge>
      );
    case "delayed":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
          <Clock className="mr-1 h-3 w-3" />
          Delayed
        </Badge>
      );
    case "cancelled":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
          <X className="mr-1 h-3 w-3" />
          Cancelled
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

const DeliveryLogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return format(new Date(dateString), "hh:mm a");
  };

  const calculateDuration = (start: string, end: string | null) => {
    if (!end) return "In progress";
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const durationMinutes = Math.floor((endTime - startTime) / (1000 * 60));
    return `${durationMinutes} min`;
  };

  const handleViewDetails = (log: any) => {
    setSelectedLog(log);
  };

  return (
    <AdminDashboardLayout title="Delivery Logs">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Today
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Status
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-full sm:w-[300px]"
              />
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Total Deliveries</span>
                <span className="text-2xl font-bold">82</span>
                <span className="text-xs text-green-600 mt-1">+12% from yesterday</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="text-2xl font-bold">76</span>
                <span className="text-xs text-green-600 mt-1">92.7% completion rate</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Avg. Delivery Time</span>
                <span className="text-2xl font-bold">24m</span>
                <span className="text-xs text-green-600 mt-1">-2m from last week</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Carbon Saved</span>
                <span className="text-2xl font-bold">58kg</span>
                <span className="text-xs text-green-600 mt-1">Today's deliveries</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Package className="mr-2 h-5 w-5 text-green-600" />
              Delivery Logs
            </CardTitle>
            <CardDescription>
              Recent delivery activities and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Rider</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Carbon Saved</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveryLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.orderId}</TableCell>
                      <TableCell>{log.rider}</TableCell>
                      <TableCell>{log.customer}</TableCell>
                      <TableCell>{formatDate(log.startTime)}</TableCell>
                      <TableCell>{formatDate(log.endTime)}</TableCell>
                      <TableCell>{calculateDuration(log.startTime, log.endTime)}</TableCell>
                      <TableCell>
                        <StatusBadge status={log.status} />
                      </TableCell>
                      <TableCell>{log.carbonSaved}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(log)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default DeliveryLogs;
