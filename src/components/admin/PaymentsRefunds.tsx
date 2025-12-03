
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SearchIcon, DownloadIcon, Filter, DollarSign, CreditCard, TrendingUp, AlertCircle, Eye, CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Transaction {
  id: string;
  transaction_id: string;
  customer_id: string;
  amount: number;
  status: string;
  payment_method?: string;
  created_at: string;
  reference_id?: string;
  type: string;
  description?: string;
  customer?: {
    name: string;
    email: string;
  };
  order?: {
    order_number: string;
  };
}

export const PaymentsRefunds = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<Transaction | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<Transaction[]>([]);
  const [refunds, setRefunds] = useState<Transaction[]>([]);
  
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // Fetch customer transactions (payments and refunds)
      const { data: customerTxns, error } = await supabase
        .from('customer_transactions')
        .select(`
          *,
          customer:profiles!customer_transactions_customer_id_fkey (
            name,
            email
          ),
          order:orders!customer_transactions_reference_id_fkey (
            order_number
          )
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      // Separate payments and refunds
      const paymentTxns = customerTxns?.filter(t => t.type === 'payment') || [];
      const refundTxns = customerTxns?.filter(t => t.type === 'refund') || [];

      setPayments(paymentTxns as Transaction[]);
      setRefunds(refundTxns as Transaction[]);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  // Stats calculations
  const totalPayments = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + Number(p.amount), 0);
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
      case 'cancelled':
        return <Badge className="bg-gray-100 text-gray-800"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const filteredRefunds = refunds.filter(refund => 
    refund.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleApproveRefund = async (refundId: string) => {
    try {
      const { error } = await supabase
        .from('customer_transactions')
        .update({ status: 'completed', processed_at: new Date().toISOString() })
        .eq('id', refundId);

      if (error) throw error;

      toast.success('Refund has been approved and processed');
      fetchTransactions();
    } catch (error) {
      console.error('Error approving refund:', error);
      toast.error('Failed to approve refund');
    }
  };

  const handleRejectRefund = async (refundId: string) => {
    try {
      const { error } = await supabase
        .from('customer_transactions')
        .update({ status: 'cancelled' })
        .eq('id', refundId);

      if (error) throw error;

      toast.error('Refund has been rejected');
      fetchTransactions();
    } catch (error) {
      console.error('Error rejecting refund:', error);
      toast.error('Failed to reject refund');
    }
  };

  // Calculate payment method distribution
  const paymentMethodStats = payments.reduce((acc, p) => {
    const method = p.payment_method || 'Unknown';
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalTransactions = payments.length;
  const successRate = totalTransactions > 0 
    ? ((completedPayments / totalTransactions) * 100).toFixed(1)
    : '0.0';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
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
            <div className="text-2xl font-bold">{formatCurrency(totalPayments)}</div>
            <p className="text-xs text-muted-foreground">From completed payments</p>
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
          <Button variant="outline" size="sm" onClick={fetchTransactions}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payments">Payments ({payments.length})</TabsTrigger>
          <TabsTrigger value="refunds">Refunds ({refunds.length})</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Transactions</CardTitle>
              <CardDescription>
                View and manage all payment transactions from customers.
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
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                        No payment transactions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.transaction_id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{payment.customer?.name || 'Unknown'}</div>
                            <div className="text-sm text-gray-500">{payment.customer?.email || 'N/A'}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{formatCurrency(Number(payment.amount))}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <CreditCard className="w-4 h-4" />
                            {payment.payment_method || 'Card'}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>{formatDate(payment.created_at)}</TableCell>
                        <TableCell>
                          <Dialog open={isDetailsOpen && selectedPayment?.id === payment.id} onOpenChange={setIsDetailsOpen}>
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
                                <DialogTitle>Payment Details - {selectedPayment?.transaction_id}</DialogTitle>
                                <DialogDescription>
                                  Complete transaction information
                                </DialogDescription>
                              </DialogHeader>
                              {selectedPayment && (
                                <div className="grid gap-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Customer Information</h4>
                                      <p><strong>Name:</strong> {selectedPayment.customer?.name || 'Unknown'}</p>
                                      <p><strong>Email:</strong> {selectedPayment.customer?.email || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Transaction Details</h4>
                                      <p><strong>Transaction ID:</strong> {selectedPayment.transaction_id}</p>
                                      <p><strong>Order Number:</strong> {selectedPayment.order?.order_number || 'N/A'}</p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Payment Information</h4>
                                      <p><strong>Amount:</strong> {formatCurrency(Number(selectedPayment.amount))}</p>
                                      <p><strong>Method:</strong> {selectedPayment.payment_method || 'Card'}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Status & Date</h4>
                                      <p><strong>Status:</strong> {getStatusBadge(selectedPayment.status)}</p>
                                      <p><strong>Date:</strong> {formatDate(selectedPayment.created_at)}</p>
                                    </div>
                                  </div>
                                  {selectedPayment.description && (
                                    <div>
                                      <h4 className="font-semibold mb-2">Description</h4>
                                      <p>{selectedPayment.description}</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
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
                  {filteredRefunds.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                        No refund requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRefunds.map((refund) => (
                      <TableRow key={refund.id}>
                        <TableCell className="font-medium">{refund.transaction_id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{refund.customer?.name || 'Unknown'}</div>
                            <div className="text-sm text-gray-500">{refund.customer?.email || 'N/A'}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{formatCurrency(Number(refund.amount))}</TableCell>
                        <TableCell>{refund.description || 'No reason provided'}</TableCell>
                        <TableCell>{getStatusBadge(refund.status)}</TableCell>
                        <TableCell>{formatDate(refund.created_at)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
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
                            {refund.status !== 'pending' && (
                              <span className="text-sm text-gray-500">
                                {refund.status === 'completed' ? 'Processed' : 'Closed'}
                              </span>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
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
                  {Object.entries(paymentMethodStats).map(([method, count]) => {
                    const percentage = totalTransactions > 0 
                      ? ((count / totalTransactions) * 100).toFixed(1)
                      : '0';
                    return (
                      <div key={method}>
                        <div className="flex justify-between items-center mb-1">
                          <span>{method}</span>
                          <span className="font-semibold">{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(paymentMethodStats).length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No payment method data available
                    </p>
                  )}
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
                      <span className="font-semibold text-green-600">{successRate}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Transaction</span>
                    <span className="font-semibold">
                      {formatCurrency(totalTransactions > 0 ? totalPayments / completedPayments : 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Transactions</span>
                    <span className="font-semibold">{totalTransactions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Refund Rate</span>
                    <span className="font-semibold text-yellow-600">
                      {totalTransactions > 0 
                        ? ((refunds.length / totalTransactions) * 100).toFixed(1)
                        : '0.0'}%
                    </span>
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
