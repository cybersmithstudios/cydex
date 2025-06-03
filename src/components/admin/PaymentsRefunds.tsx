
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SearchIcon, DownloadIcon, Filter, DollarSign, CreditCard, TrendingUp, AlertCircle, Eye, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export const PaymentsRefunds = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Enhanced payment data with more details
  const payments = [
    { 
      id: 'PAY-001', 
      customer: 'John Doe', 
      customerEmail: 'john@example.com',
      amount: '₦5,000', 
      method: 'Card', 
      status: 'completed', 
      date: '2023-04-10',
      orderId: 'ORD-5678',
      transactionId: 'TXN-ABC123',
      gatewayFee: '₦150',
      netAmount: '₦4,850'
    },
    { 
      id: 'PAY-002', 
      customer: 'Sarah Lewis', 
      customerEmail: 'sarah@example.com',
      amount: '₦7,500', 
      method: 'Bank Transfer', 
      status: 'pending', 
      date: '2023-04-09',
      orderId: 'ORD-5679',
      transactionId: 'TXN-DEF456',
      gatewayFee: '₦225',
      netAmount: '₦7,275'
    },
    { 
      id: 'PAY-003', 
      customer: 'Michael Brown', 
      customerEmail: 'michael@example.com',
      amount: '₦3,200', 
      method: 'Wallet', 
      status: 'completed', 
      date: '2023-04-08',
      orderId: 'ORD-5680',
      transactionId: 'TXN-GHI789',
      gatewayFee: '₦96',
      netAmount: '₦3,104'
    },
    { 
      id: 'PAY-004', 
      customer: 'Emma Wilson', 
      customerEmail: 'emma@example.com',
      amount: '₦10,000', 
      method: 'Card', 
      status: 'failed', 
      date: '2023-04-07',
      orderId: 'ORD-5681',
      transactionId: 'TXN-JKL012',
      gatewayFee: '₦0',
      netAmount: '₦0'
    },
  ];
  
  // Enhanced refund data
  const refunds = [
    { 
      id: 'REF-001', 
      customer: 'Emma Wilson', 
      customerEmail: 'emma@example.com',
      amount: '₦10,000', 
      reason: 'Order Cancelled', 
      status: 'completed', 
      date: '2023-04-08',
      originalPaymentId: 'PAY-004',
      processedBy: 'Admin User',
      refundMethod: 'Original Card'
    },
    { 
      id: 'REF-002', 
      customer: 'Alex Johnson', 
      customerEmail: 'alex@example.com',
      amount: '₦4,300', 
      reason: 'Item Unavailable', 
      status: 'pending', 
      date: '2023-04-07',
      originalPaymentId: 'PAY-005',
      processedBy: 'System',
      refundMethod: 'Bank Transfer'
    },
  ];

  // Stats calculations
  const totalPayments = payments.reduce((sum, p) => sum + parseFloat(p.amount.replace('₦', '').replace(',', '')), 0);
  const completedPayments = payments.filter(p => p.status === 'completed').length;
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const failedPayments = payments.filter(p => p.status === 'failed').length;
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const filteredRefunds = refunds.filter(refund => 
    refund.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApproveRefund = (refundId: string) => {
    toast.success(`Refund ${refundId} has been approved and processed`);
  };

  const handleRejectRefund = (refundId: string) => {
    toast.error(`Refund ${refundId} has been rejected`);
  };
  
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{totalPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedPayments}</div>
            <p className="text-xs text-muted-foreground">Successful transactions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedPayments}</div>
            <p className="text-xs text-muted-foreground">Failed transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 gap-4">
        <div className="relative w-full md:w-72">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Transactions</CardTitle>
              <CardDescription>
                View and manage all payment transactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.customer}</div>
                          <div className="text-sm text-gray-500">{payment.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{payment.amount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          {payment.method}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedPayment(payment)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Payment Details - {selectedPayment?.id}</DialogTitle>
                              <DialogDescription>
                                Complete transaction information
                              </DialogDescription>
                            </DialogHeader>
                            {selectedPayment && (
                              <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Customer Information</h4>
                                    <p><strong>Name:</strong> {selectedPayment.customer}</p>
                                    <p><strong>Email:</strong> {selectedPayment.customerEmail}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Transaction Details</h4>
                                    <p><strong>Order ID:</strong> {selectedPayment.orderId}</p>
                                    <p><strong>Transaction ID:</strong> {selectedPayment.transactionId}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Payment Information</h4>
                                    <p><strong>Amount:</strong> {selectedPayment.amount}</p>
                                    <p><strong>Gateway Fee:</strong> {selectedPayment.gatewayFee}</p>
                                    <p><strong>Net Amount:</strong> {selectedPayment.netAmount}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Status & Method</h4>
                                    <p><strong>Status:</strong> {getStatusBadge(selectedPayment.status)}</p>
                                    <p><strong>Method:</strong> {selectedPayment.method}</p>
                                    <p><strong>Date:</strong> {selectedPayment.date}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="refunds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Refund Requests</CardTitle>
              <CardDescription>
                Manage customer refund requests and process approvals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Refund ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRefunds.map((refund) => (
                    <TableRow key={refund.id}>
                      <TableCell className="font-medium">{refund.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{refund.customer}</div>
                          <div className="text-sm text-gray-500">{refund.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{refund.amount}</TableCell>
                      <TableCell>{refund.reason}</TableCell>
                      <TableCell>{getStatusBadge(refund.status)}</TableCell>
                      <TableCell>{refund.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {refund.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-green-600"
                                onClick={() => handleApproveRefund(refund.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600"
                                onClick={() => handleRejectRefund(refund.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Card Payments</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Bank Transfer</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Wallet</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Success Rate</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-600">94.2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Transaction</span>
                    <span className="font-semibold">₦6,425</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Monthly Growth</span>
                    <span className="font-semibold text-green-600">+12.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Refund Rate</span>
                    <span className="font-semibold text-yellow-600">2.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
