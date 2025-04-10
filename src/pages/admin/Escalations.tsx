
import React, { useState } from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  FileText, 
  MessageCircle, 
  Package, 
  Phone, 
  RotateCw, 
  User 
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock data for escalations
const escalations = [
  {
    id: "ESC-2467",
    orderId: "ORD-8712",
    customerName: "Ade Johnson",
    customerAvatar: null,
    issueType: "late_delivery",
    issueDescription: "Order is significantly delayed beyond estimated time.",
    timestamp: "2025-04-10T09:32:00",
    status: "open",
    priority: "high",
    assignedTo: null,
    responses: [],
  },
  {
    id: "ESC-2466",
    orderId: "ORD-8705",
    customerName: "Ngozi Okonjo",
    customerAvatar: null,
    issueType: "damaged_package",
    issueDescription: "Package arrived with visible damage to contents.",
    timestamp: "2025-04-10T08:45:00",
    status: "in_progress",
    priority: "medium",
    assignedTo: "Supervisor",
    responses: [
      {
        from: "Supervisor",
        message: "We've contacted the rider for more information about the damage.",
        timestamp: "2025-04-10T09:15:00",
      },
    ],
  },
  {
    id: "ESC-2465",
    orderId: "ORD-8701",
    customerName: "Emmanuel Okafor",
    customerAvatar: null,
    issueType: "wrong_items",
    issueDescription: "Received incorrect items in the delivery.",
    timestamp: "2025-04-10T08:20:00",
    status: "in_progress",
    priority: "medium",
    assignedTo: "Supervisor",
    responses: [
      {
        from: "Supervisor",
        message: "We've verified the order details and contacted the vendor.",
        timestamp: "2025-04-10T08:45:00",
      },
    ],
  },
  {
    id: "ESC-2464",
    orderId: "ORD-8697",
    customerName: "Funke Akindele",
    customerAvatar: null,
    issueType: "rider_behavior",
    issueDescription: "Rider was unprofessional during delivery.",
    timestamp: "2025-04-09T17:10:00",
    status: "resolved",
    priority: "high",
    assignedTo: "Admin",
    responses: [
      {
        from: "Admin",
        message: "We've spoken with the rider and addressed the behavior concerns.",
        timestamp: "2025-04-09T17:30:00",
      },
      {
        from: "Admin",
        message: "We've issued a formal apology and provided a discount on the next order.",
        timestamp: "2025-04-09T17:45:00",
      },
    ],
  },
  {
    id: "ESC-2463",
    orderId: "ORD-8694",
    customerName: "Tunde Bakare",
    customerAvatar: null,
    issueType: "payment_issue",
    issueDescription: "Customer was charged twice for the same order.",
    timestamp: "2025-04-09T16:25:00",
    status: "resolved",
    priority: "high",
    assignedTo: "Finance",
    responses: [
      {
        from: "Finance",
        message: "Verified duplicate charge and processed refund.",
        timestamp: "2025-04-09T16:45:00",
      },
      {
        from: "Finance",
        message: "Refund has been processed and should appear in 3-5 business days.",
        timestamp: "2025-04-09T16:50:00",
      },
    ],
  },
];

// Helper function to categorize escalations
const categorizeEscalations = (status: string) => {
  return escalations.filter((esc) => esc.status === status);
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "MMM d, h:mm a");
};

// Status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case "open":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
          Open
        </Badge>
      );
    case "in_progress":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
          In Progress
        </Badge>
      );
    case "resolved":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
          Resolved
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

// Priority badge component
const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
  switch (priority) {
    case "high":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
          High
        </Badge>
      );
    case "medium":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
          Medium
        </Badge>
      );
    case "low":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
          Low
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

// Issue type badge component
const IssueTypeBadge: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case "late_delivery":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
          <Clock className="mr-1 h-3 w-3" />
          Late Delivery
        </Badge>
      );
    case "damaged_package":
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300">
          <Package className="mr-1 h-3 w-3" />
          Damaged Package
        </Badge>
      );
    case "wrong_items":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
          <Package className="mr-1 h-3 w-3" />
          Wrong Items
        </Badge>
      );
    case "rider_behavior":
      return (
        <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-300">
          <User className="mr-1 h-3 w-3" />
          Rider Behavior
        </Badge>
      );
    case "payment_issue":
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300">
          <FileText className="mr-1 h-3 w-3" />
          Payment Issue
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
          Other Issue
        </Badge>
      );
  }
};

const Escalations = () => {
  const [activeTab, setActiveTab] = useState("open");
  const [selectedEscalation, setSelectedEscalation] = useState<any>(escalations[0]);
  
  // Get escalations by status
  const openEscalations = categorizeEscalations("open");
  const inProgressEscalations = categorizeEscalations("in_progress");
  const resolvedEscalations = categorizeEscalations("resolved");

  const handleResolveEscalation = () => {
    toast.success(`Escalation ${selectedEscalation.id} marked as resolved`);
  };

  const handleSendResponse = () => {
    toast.success(`Response sent to customer for escalation ${selectedEscalation.id}`);
  };

  const handleContactCustomer = () => {
    toast.success(`Initiating call to ${selectedEscalation.customerName}`);
  };

  const handleReassign = () => {
    toast.success(`Escalation ${selectedEscalation.id} has been reassigned`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <AdminDashboardLayout title="Escalations">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Escalations List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-green-600" />
                Escalations
              </CardTitle>
              <CardDescription>
                Customer reported issues requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="open" value={activeTab} onValueChange={setActiveTab}>
                <div className="px-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="open" className="relative">
                      Open
                      {openEscalations.length > 0 && (
                        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                          {openEscalations.length}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="open" className="mt-0">
                  {openEscalations.map((escalation) => (
                    <div
                      key={escalation.id}
                      className={`border-b p-4 cursor-pointer hover:bg-muted/50 ${
                        selectedEscalation?.id === escalation.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedEscalation(escalation)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{escalation.id}</span>
                            <PriorityBadge priority={escalation.priority} />
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {escalation.orderId} • {formatDate(escalation.timestamp)}
                          </div>
                        </div>
                        <StatusBadge status={escalation.status} />
                      </div>
                      <div className="mt-2">
                        <IssueTypeBadge type={escalation.issueType} />
                      </div>
                    </div>
                  ))}
                  {openEscalations.length === 0 && (
                    <div className="p-6 text-center text-muted-foreground">
                      No open escalations
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="in_progress" className="mt-0">
                  {inProgressEscalations.map((escalation) => (
                    <div
                      key={escalation.id}
                      className={`border-b p-4 cursor-pointer hover:bg-muted/50 ${
                        selectedEscalation?.id === escalation.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedEscalation(escalation)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{escalation.id}</span>
                            <PriorityBadge priority={escalation.priority} />
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {escalation.orderId} • {formatDate(escalation.timestamp)}
                          </div>
                        </div>
                        <StatusBadge status={escalation.status} />
                      </div>
                      <div className="mt-2">
                        <IssueTypeBadge type={escalation.issueType} />
                      </div>
                    </div>
                  ))}
                  {inProgressEscalations.length === 0 && (
                    <div className="p-6 text-center text-muted-foreground">
                      No in-progress escalations
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="resolved" className="mt-0">
                  {resolvedEscalations.map((escalation) => (
                    <div
                      key={escalation.id}
                      className={`border-b p-4 cursor-pointer hover:bg-muted/50 ${
                        selectedEscalation?.id === escalation.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedEscalation(escalation)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{escalation.id}</span>
                            <PriorityBadge priority={escalation.priority} />
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {escalation.orderId} • {formatDate(escalation.timestamp)}
                          </div>
                        </div>
                        <StatusBadge status={escalation.status} />
                      </div>
                      <div className="mt-2">
                        <IssueTypeBadge type={escalation.issueType} />
                      </div>
                    </div>
                  ))}
                  {resolvedEscalations.length === 0 && (
                    <div className="p-6 text-center text-muted-foreground">
                      No resolved escalations
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Escalation Details */}
        <div className="lg:col-span-2">
          {selectedEscalation ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-green-600" />
                    Escalation Details
                  </CardTitle>
                  <StatusBadge status={selectedEscalation.status} />
                </div>
                <CardDescription>
                  {selectedEscalation.id} • {selectedEscalation.orderId}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Customer</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {getInitials(selectedEscalation.customerName)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{selectedEscalation.customerName}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <h3 className="text-sm font-medium text-muted-foreground">Reported</h3>
                    <div className="flex items-center space-x-1 mt-1 justify-end">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(selectedEscalation.timestamp)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground">Issue Type</h3>
                    <PriorityBadge priority={selectedEscalation.priority} />
                  </div>
                  <div className="mt-1">
                    <IssueTypeBadge type={selectedEscalation.issueType} />
                  </div>
                </div>

                <Card className="bg-muted">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium mb-2">Description</h3>
                    <p>{selectedEscalation.issueDescription}</p>
                  </CardContent>
                </Card>

                {selectedEscalation.responses.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Resolution Progress</h3>
                    <div className="space-y-4">
                      {selectedEscalation.responses.map((response: any, index: number) => (
                        <Card key={index} className="bg-background">
                          <CardContent className="p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-sm">
                                {response.from}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatDate(response.timestamp)}
                              </div>
                            </div>
                            <p className="text-sm">{response.message}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEscalation.status !== "resolved" && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium mb-2">Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        className="flex items-center"
                        onClick={handleContactCustomer}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Contact Customer
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center"
                        onClick={handleSendResponse}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center"
                        onClick={handleReassign}
                      >
                        <RotateCw className="mr-2 h-4 w-4" />
                        Reassign
                      </Button>
                      <Button 
                        className="flex items-center"
                        onClick={handleResolveEscalation}
                      >
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Mark Resolved
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Escalation Selected</h3>
                <p className="text-muted-foreground">
                  Select an escalation from the list to view its details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default Escalations;
