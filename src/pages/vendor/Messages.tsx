
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageSquare,
  Search,
  Send,
  PaperclipIcon,
  Phone,
  Video,
  Info,
  MoreVertical,
  CheckCheck,
  Clock,
  User,
  Users,
  Filter
} from 'lucide-react';

// Mock data for vendor conversations
const conversations = [
  {
    id: 1,
    name: 'Customer Support',
    avatar: null,
    lastMessage: "We've processed your recent payout. Please confirm.",
    time: '10:32 AM',
    unread: 2,
    online: true,
    isSupport: true
  },
  {
    id: 2,
    name: 'Emily Johnson',
    avatar: null,
    lastMessage: "I just placed a new order. Do you have brown rice available?",
    time: 'Yesterday',
    unread: 3,
    online: true,
    isCustomer: true
  },
  {
    id: 3,
    name: 'Alex Martinez',
    avatar: null,
    lastMessage: "On my way to pick up order #ORD-5677 from your store",
    time: 'Yesterday',
    unread: 0,
    online: false,
    isRider: true
  },
  {
    id: 4,
    name: 'Eco Partners Group',
    avatar: null,
    lastMessage: "Meeting rescheduled to Friday at 3pm. Topic: Sustainable packaging",
    time: 'Jul 10',
    unread: 0,
    online: false,
    isGroup: true
  },
  {
    id: 5,
    name: 'David Wilson',
    avatar: null,
    lastMessage: "Thank you for resolving my issue with my last order",
    time: 'Jul 8',
    unread: 0,
    online: false,
    isCustomer: true
  },
  {
    id: 6,
    name: 'Green Supply Chain',
    avatar: null,
    lastMessage: "New delivery of eco-friendly packaging scheduled for Monday",
    time: 'Jul 5',
    unread: 0,
    online: false,
    isSupplier: true
  }
];

const messages = [
  {
    id: 1,
    senderId: 2, // Emily Johnson
    text: "Hi there! I was wondering if you have brown rice in stock? I don't see it on your online menu but I know you sometimes have it.",
    time: '10:00 AM',
    status: 'read'
  },
  {
    id: 2,
    senderId: 'me',
    text: "Hello Emily! Yes, we actually just got a new shipment of organic brown rice this morning. It's not updated on the site yet.",
    time: '10:05 AM',
    status: 'read'
  },
  {
    id: 3,
    senderId: 2,
    text: "That's great! I'd like to order 2kg of brown rice along with my regular order.",
    time: '10:07 AM',
    status: 'read'
  },
  {
    id: 4,
    senderId: 'me',
    text: "Perfect! I've added it to your order #ORD-5682. Would you like me to adjust the delivery time as well?",
    time: '10:10 AM',
    status: 'read'
  },
  {
    id: 5,
    senderId: 2,
    text: "No need, the regular delivery time works fine. Can you also add a bunch of organic spinach if available?",
    time: '10:12 AM',
    status: 'read'
  },
  {
    id: 6,
    senderId: 'me',
    text: "Yes, we have fresh organic spinach. I'll add it to your order. Your new total comes to ₦12,450.75. Is there anything else you'd like?",
    time: '10:15 AM',
    status: 'delivered'
  }
];

const MessageBubble = ({ message, isCurrentUser, senderName = '' }) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
          <AvatarFallback>{senderName.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      
      <div className="max-w-[80%] md:max-w-[70%]">
        <div
          className={`p-3 rounded-lg ${
            isCurrentUser
              ? 'bg-primary text-black'
              : 'bg-gray-100 dark:bg-gray-800'
          }`}
        >
          <p className="text-sm">{message.text}</p>
        </div>
        <div className={`flex items-center mt-1 text-xs text-gray-500 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
          <span>{message.time}</span>
          {isCurrentUser && (
            <span className="ml-1">
              {message.status === 'read' ? (
                <CheckCheck className="h-3 w-3 text-blue-500" />
              ) : message.status === 'delivered' ? (
                <CheckCheck className="h-3 w-3 text-gray-500" />
              ) : (
                <Clock className="h-3 w-3" />
              )}
            </span>
          )}
        </div>
      </div>
      
      {isCurrentUser && (
        <Avatar className="h-8 w-8 ml-2 flex-shrink-0">
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

const VendorMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[1]); // Emily Johnson selected by default
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() === '') return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending message:', messageInput);
    
    // Clear input after sending
    setMessageInput('');
  };
  
  const filteredConversations = conversations
    .filter(conv => conv.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(conv => {
      if (filter === 'all') return true;
      if (filter === 'unread') return conv.unread > 0;
      if (filter === 'customers') return conv.isCustomer;
      if (filter === 'riders') return conv.isRider;
      if (filter === 'support') return conv.isSupport;
      return true;
    });

  return (
    <DashboardLayout userRole="vendor">
      <div className="h-[calc(100vh-64px)] lg:h-screen flex flex-col">
        <div className="flex flex-col md:flex-row h-full">
          {/* Conversations List */}
          <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col h-full">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold mb-4">Vendor Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  className="pl-10"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center p-2">
              <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread 
                    <Badge className="ml-1 bg-primary text-black">
                      {conversations.filter(c => c.unread > 0).length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="ghost" size="icon" className="ml-1">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="flex-grow">
              <div className="p-2 space-y-1">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation.id === conversation.id
                        ? 'bg-primary-light'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {conversation.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                        )}
                      </div>
                      
                      <div className="ml-3 flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium line-clamp-1">{conversation.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-1">
                          <p 
                            className={`text-sm line-clamp-1 ${
                              conversation.unread ? 'font-medium' : 'text-gray-500'
                            }`}
                          >
                            {conversation.lastMessage}
                          </p>
                          
                          {conversation.unread > 0 && (
                            <Badge className="h-5 w-5 flex items-center justify-center p-0 bg-primary text-black">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-1 mt-1">
                          {conversation.isSupport && (
                            <Badge variant="outline" className="text-xs py-0 px-1 h-5">Support</Badge>
                          )}
                          {conversation.isCustomer && (
                            <Badge variant="outline" className="text-xs py-0 px-1 h-5">Customer</Badge>
                          )}
                          {conversation.isRider && (
                            <Badge variant="outline" className="text-xs py-0 px-1 h-5">Rider</Badge>
                          )}
                          {conversation.isGroup && (
                            <Badge variant="outline" className="text-xs py-0 px-1 h-5">Group</Badge>
                          )}
                          {conversation.isSupplier && (
                            <Badge variant="outline" className="text-xs py-0 px-1 h-5">Supplier</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-3 border-t">
              <Button className="w-full bg-primary hover:bg-primary-hover text-black">
                <MessageSquare className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-grow flex flex-col h-full border-t md:border-t-0">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {selectedConversation.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="ml-3">
                  <h3 className="font-medium">{selectedConversation.name}</h3>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 flex items-center">
                      {selectedConversation.online ? (
                        <>
                          <span className="h-2 w-2 bg-green-500 rounded-full inline-block mr-1"></span>
                          Online
                        </>
                      ) : (
                        'Offline'
                      )}
                    </span>
                    
                    {selectedConversation.isCustomer && (
                      <Badge variant="outline" className="text-xs py-0 px-1 h-5 ml-2">Customer</Badge>
                    )}
                    
                    {selectedConversation.isRider && (
                      <Badge variant="outline" className="text-xs py-0 px-1 h-5 ml-2">Rider</Badge>
                    )}
                    
                    {selectedConversation.isSupport && (
                      <Badge variant="outline" className="text-xs py-0 px-1 h-5 ml-2">Support</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {selectedConversation.isGroup ? (
                  <Button variant="ghost" size="icon">
                    <Users className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                )}
                <Button variant="ghost" size="icon">
                  <Info className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-grow p-4">
              {selectedConversation.id === 2 ? (
                <div className="space-y-1">
                  {messages.map((message) => (
                    <MessageBubble 
                      key={message.id}
                      message={message}
                      isCurrentUser={message.senderId === 'me'}
                      senderName={selectedConversation.name}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                      Select a conversation or start a new message
                    </p>
                  </div>
                </div>
              )}
            </ScrollArea>
            
            {/* Message Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
                  <PaperclipIcon className="h-5 w-5" />
                </Button>
                
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow"
                />
                
                <Button type="submit" className="flex-shrink-0 bg-primary hover:bg-primary-hover text-black">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorMessages;
